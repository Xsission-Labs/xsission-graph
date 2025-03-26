# Rust Package

This package contains the Rust implementation of performance-critical components for the Xsission Function Visualizer.

## Overview

The Rust package is responsible for:
- High-performance graph algorithms
- Processing dependency data efficiently
- Compiling to WebAssembly for browser integration
- Providing a clean API for JavaScript/TypeScript integration

## Architecture

```
src/
├── lib.rs             # Main library entry point
├── graph/             # Graph algorithm implementations
│   ├── mod.rs         # Module definition
│   ├── processor.rs   # Graph data processing
│   └── cycles.rs      # Cycle detection algorithms
└── wasm/              # WebAssembly bindings
    ├── mod.rs         # Module definition
    └── bindings.rs    # JavaScript/TypeScript API bindings
```

## Development

### Prerequisites
- Rust (latest stable version)
- wasm-pack for WebAssembly compilation
- cargo and rustc

### Setup
```bash
# Navigate to the rust directory
cd packages/rust

# Build the Rust library
cargo build

# Build the WebAssembly module
wasm-pack build --target web
```

### Testing
```bash
# Run the tests
cargo test
```

## Key Concepts

### Graph Processing
The Rust package implements efficient graph processing algorithms, including:
- Dependency graph construction
- Cycle detection in directed graphs
- Degree centrality calculation
- Node importance scoring

### WebAssembly Integration
The code is compiled to WebAssembly (WASM) for integration with the JavaScript/TypeScript codebase. The WASM bindings provide a clean API for JavaScript to call into the Rust code.

### Performance Optimizations
The Rust implementation focuses on high performance:
- Efficient memory usage
- Fast graph traversal algorithms
- Minimal data copying between JavaScript and Rust
- Optimized data structures for graph representation

## API Reference

The WASM module exposes the following main functions:

### `process_dependency_graph`
Processes the raw dependency data into a format suitable for visualization.

### `find_cycles`
Detects cycles (circular dependencies) in the function call graph.

### `analyze_dependencies`
Performs advanced analysis on the dependency graph to identify important functions and pathways. 