import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define D3 type extensions for better type safety
interface D3DragEvent extends d3.D3Event {
  active: boolean;
  sourceEvent: MouseEvent;
  subject: any;
  x: number;
  y: number;
}

interface Node {
  id: string;
  name: string;
  color?: string;
  fixed?: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  value?: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface DependencyGraphProps {
  vscode: any;
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ vscode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<any>(null);

  useEffect(() => {
    // Listen for messages from the extension
    const messageListener = (event: MessageEvent) => {
      const message = event.data;
      
      switch (message.type) {
        case 'update':
          updateGraph(message.data);
          break;
        case 'highlight':
          highlightNode(message.nodeId);
          break;
      }
    };

    window.addEventListener('message', messageListener);

    // Initialize the graph
    initGraph();

    // Tell the extension we're ready to receive data
    vscode.postMessage({ type: 'ready' });

    return () => {
      window.removeEventListener('message', messageListener);
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [vscode]);

  const initGraph = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear existing graph
    svg.selectAll('*').remove();

    // Create the zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform.toString());
      });

    // Apply zoom behavior to svg
    svg.call(zoom);

    // Create a container for the graph
    const container = svg.append('g')
      .attr('class', 'container');

    // Add arrow marker for the links
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', 'var(--link-color)')
      .style('stroke', 'none');

    // Reset view button
    document.getElementById('reset-view')?.addEventListener('click', () => {
      svg.transition().duration(750).call(
        zoom.transform as any,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8)
      );
    });

    // Search functionality
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length < 2) {
          searchResults.innerHTML = '';
          searchResults.classList.remove('show');
          return;
        }

        const data = simulationRef.current?.nodes() || [];
        const matches = data.filter(node => 
          node.name.toLowerCase().includes(query)
        ).slice(0, 10);

        if (matches.length > 0) {
          searchResults.innerHTML = '';
          matches.forEach(node => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = node.name;
            item.addEventListener('click', () => {
              highlightNode(node.id);
              searchInput.value = '';
              searchResults.innerHTML = '';
              searchResults.classList.remove('show');
            });
            searchResults.appendChild(item);
          });
          searchResults.classList.add('show');
        } else {
          searchResults.innerHTML = '';
          searchResults.classList.remove('show');
        }
      });
    }
    
    // Center the graph initially
    svg.call(zoom.transform as any, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8));
  };

  const updateGraph = (data: GraphData) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = svg.select('.container');
    
    // Process the links data to ensure source and target are objects
    const links = data.links.map(link => {
      const sourceNode = data.nodes.find(n => n.id === link.source || n.id === (link.source as Node).id);
      const targetNode = data.nodes.find(n => n.id === link.target || n.id === (link.target as Node).id);
      return {
        ...link,
        source: sourceNode || link.source,
        target: targetNode || link.target
      };
    });

    // Create the simulation
    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('collide', d3.forceCollide().radius(30))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    // Store simulation for later use
    simulationRef.current = simulation;

    // Create the links
    const link = container.selectAll('.link')
      .data(links)
      .join('line')
      .attr('class', 'link')
      .attr('marker-end', 'url(#arrowhead)');

    // Create a group for each node
    const nodeGroup = container.selectAll('.node')
      .data(data.nodes, (d: any) => d.id)
      .join('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // Add circles to each node group
    nodeGroup.selectAll('circle')
      .data((d: Node) => [d])
      .join('circle')
      .attr('r', 8);

    // Add text labels to each node group
    nodeGroup.selectAll('text')
      .data((d: Node) => [d])
      .join('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(d => d.name);

    // Add click handler to nodes
    nodeGroup.on('click', (event, d) => {
      const selectedNode = d3.select(event.currentTarget);
      const wasSelected = selectedNode.classed('selected');
      
      // Deselect all nodes
      container.selectAll('.node').classed('selected', false);
      container.selectAll('.link').classed('highlighted', false);
      
      if (!wasSelected) {
        // Select this node
        selectedNode.classed('selected', true);
        
        // Highlight connected links
        container.selectAll('.link').each(function(link: any) {
          if (link.source.id === d.id || link.target.id === d.id) {
            d3.select(this).classed('highlighted', true);
          }
        });
        
        // Notify the extension about the selection
        vscode.postMessage({
          type: 'select',
          nodeId: d.id
        });
      }
    });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x || 0)
        .attr('y1', d => (d.source as Node).y || 0)
        .attr('x2', d => (d.target as Node).x || 0)
        .attr('y2', d => (d.target as Node).y || 0);

      nodeGroup
        .attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Define drag functions
    function dragstarted(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      if (!d.fixed) {
        d.fx = null;
        d.fy = null;
      }
    }
  };

  const highlightNode = (nodeId: string) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = svg.select('.container');
    
    // Deselect all nodes
    container.selectAll('.node').classed('selected', false);
    container.selectAll('.link').classed('highlighted', false);
    
    // Find the node by ID
    const node = container.selectAll('.node').filter((d: any) => d.id === nodeId);
    
    if (!node.empty()) {
      // Select the node
      node.classed('selected', true);
      
      // Highlight connected links
      container.selectAll('.link').each(function(d: any) {
        if (d.source.id === nodeId || d.target.id === nodeId) {
          d3.select(this).classed('highlighted', true);
        }
      });
      
      // Get the node data to center it
      const nodeData = node.datum() as Node;
      if (nodeData.x && nodeData.y && svgRef.current) {
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        
        // Smoothly center on the node
        svg.transition().duration(750).call(
          d3.zoom<SVGSVGElement, unknown>().transform as any,
          d3.zoomIdentity.translate(width/2 - nodeData.x, height/2 - nodeData.y).scale(1)
        );
      }
    }
  };

  return (
    <svg ref={svgRef} id="graph" />
  );
}; 