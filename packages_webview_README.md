# Webview Package

This package contains the web-based visualization interface for the Xsission Function Visualizer.

## Overview

The webview package is responsible for:
- Rendering the interactive function dependency graph using D3.js
- Handling user interactions with the graph (dragging, zooming, clicking)
- Communicating with the VS Code extension
- Providing a responsive and intuitive user interface

## Architecture

```
src/
├── index.ts           # Main entry point
├── styles.css         # CSS styles for the visualization
└── types/             # TypeScript type definitions
```

## Development

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Knowledge of D3.js and TypeScript
- Basic understanding of VS Code webview API

### Setup
```bash
# Navigate to the webview directory
cd packages/webview

# Install dependencies
npm install

# Build the webview
npm run build
```

### Running in Development Mode
The webview is typically rendered within VS Code, but you can develop it in isolation:

```bash
# Start the development server
npm run dev
```

This will open the webview in a browser with mock data for testing.

## Key Concepts

### Graph Visualization
The webview uses D3.js to render an interactive force-directed graph. Nodes represent functions, and edges represent function calls or dependencies.

### VS Code Communication
The webview communicates with the VS Code extension through the VS Code API's message passing system. It receives graph data and sends user actions back to the extension.

### Interaction Modes
The graph supports various interaction modes:
- Pan and zoom for navigation
- Node dragging for arranging the graph
- Node selection for highlighting related functions
- Double-clicking for jumping to function definitions

## Styling and Themes

The webview supports VS Code's themes through CSS variables injected by the extension. This ensures that the visualization matches the user's VS Code theme preferences.

## Performance Considerations

For large codebases, the graph can contain many nodes and edges. The implementation includes several optimizations:
- Efficient D3.js force layout settings
- Limited number of displayed nodes (configurable)
- Improved rendering performance through D3 optimization techniques
- On-demand rendering of node labels and details 