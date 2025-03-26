# Extension Package

This package contains the VS Code extension implementation for the Xsission Function Visualizer.

## Overview

The extension package is responsible for:
- Integrating with VS Code's extension API
- Parsing JavaScript and TypeScript files for function dependencies
- Creating and managing the webview panel for visualization
- Handling user commands and interactions
- Communicating with the Rust/WASM module for performance-critical operations

## Architecture

```
src/
├── extension.ts         # Main extension entry point
├── panels/              # Webview panel management
│   ├── dependencyGraphPanel.ts  # Graph panel implementation
│   └── webviewHelper.ts         # HTML and CSS for the webview
├── parser/              # Code parsing implementation
│   ├── jstsParser.ts    # JavaScript/TypeScript parser
│   └── types.ts         # TypeScript type definitions
└── wasm/                # WebAssembly integration
    └── wasmLoader.ts    # Loads and initializes WASM module
```

## Development

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- TypeScript knowledge
- VS Code Extension API knowledge

### Setup
```bash
# Navigate to the extension directory
cd packages/extension

# Install dependencies
npm install

# Build the extension
npm run compile
```

### Testing
```bash
# Run the tests
npm run test
```

## Key Concepts

### Dependency Graph Panel
The `DependencyGraphPanel` class manages the webview that displays the function dependency graph. It handles communication between the extension and the webview, and provides methods for updating the graph visualization.

### JS/TS Parser
The `JSTSParser` class is responsible for parsing JavaScript and TypeScript files to extract function declarations and dependencies. It uses TypeScript's compiler API to analyze the code.

### WASM Integration
The `wasmLoader` module loads and initializes the WebAssembly module that provides high-performance graph processing capabilities.

## VS Code Integration

The extension integrates with VS Code through:
- Commands registered in the extension activation function
- Event listeners for document changes
- Webview panel management
- Status bar items and notifications 