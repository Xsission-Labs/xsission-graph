# Function Dependency Visualizer

A Visual Studio Code extension that visualizes JavaScript and TypeScript function dependencies as an interactive graph.

![Function Dependency Graph Example](docs/images/graph-example.png)

## Features

- Analyzes JavaScript and TypeScript files to generate function dependency graphs
- Displays an interactive D3.js visualization of function calls
- Supports dragging nodes to rearrange the graph
- Provides search functionality to locate specific functions
- Highlights function references within the graph

## Installation

You can install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=XsissionLabs.xsission-function-visualizer).

### Manual Installation

1. Download the `.vsix` file from the [latest release](https://github.com/xsission/xsission-function-visualizer/releases/latest)
2. Open VS Code and go to Extensions
3. Click on the "..." menu in the top-right of the Extensions view
4. Select "Install from VSIX..." and choose the downloaded file

## Usage

1. Open a JavaScript or TypeScript file in VS Code
2. Right-click in the editor and select "Show Function Dependency Graph" from the context menu, or use the command palette (Ctrl+Shift+P) and search for "Show Function Dependency Graph"
3. The function dependencies will be analyzed and displayed in an interactive graph

### Graph Interaction

- **Pan**: Click and drag on the background
- **Zoom**: Use the mouse wheel
- **Drag Nodes**: Click and drag on any node to rearrange the graph
- **Search**: Use the search box to find specific functions
- **Reset View**: Click the reset button to return to the default view

## Project Structure

This project is a monorepo containing several packages:

- `packages/extension`: The VS Code extension
- `packages/webview`: The webview UI components for the graph visualization
- `packages/rust`: Rust-based AST parser that analyzes function dependencies

## Development

### Prerequisites

- Node.js 16.x or later
- Rust and Cargo (for the AST parser)
- wasm-pack (for WebAssembly compilation)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/xsission/xsission-function-visualizer.git
   cd xsission-function-visualizer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

### Testing the Extension

1. Open the project in VS Code
2. Press F5 to start debugging
3. This will open a new VS Code window with the extension loaded

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [D3.js](https://d3js.org/) for the visualization library
- [SWC](https://swc.rs/) for the Rust-based JavaScript/TypeScript parser 