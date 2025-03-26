# Contributing to Function Dependency Visualizer

Thank you for your interest in contributing to the Function Dependency Visualizer! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Development Environment

1. Fork the repository on GitHub
2. Clone your fork to your local machine
3. Install dependencies with `npm install`
4. Build the project with `npm run build`

### Project Structure

The project is organized as a monorepo with three main packages:

- `packages/extension`: VS Code extension implementation
- `packages/webview`: D3.js-based visualization interface
- `packages/rust`: High-performance graph processing in Rust/WASM

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with the following information:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- VS Code version and extension version
- Screenshots if applicable

### Suggesting Enhancements

If you have an idea for a new feature or improvement, please create an issue with:

- A clear, descriptive title
- A detailed description of the proposed enhancement
- Any relevant mockups or examples
- Why this enhancement would be useful to most users

### Pull Requests

1. Create a new branch for your feature or fix
2. Make your changes with appropriate tests
3. Follow the coding conventions (see below)
4. Push your branch and create a pull request
5. Update the README.md if necessary
6. Ensure all tests pass

### Commit Messages

Please use clear, descriptive commit messages that explain why the change was made. We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Coding Conventions

### TypeScript/JavaScript

- Follow the TypeScript linting rules defined in the project
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use descriptive variable and function names
- Add appropriate JSDoc comments for public APIs

### Rust

- Follow Rust's style guide (run `cargo fmt`)
- Write good error messages that are helpful to users
- Write comments for non-obvious code
- Include unit tests for all new functionality

### Testing

- Write tests for all new features and bug fixes
- Ensure all existing tests continue to pass
- Update test documentation as needed

## Release Process

Our release process follows these steps:

1. Updates to the main branch after review
2. Version bump according to semantic versioning
3. Release notes update
4. Publishing to VS Code Marketplace

## Questions?

If you have any questions or need help, please:

- Create an issue on GitHub
- Reach out to the maintainers directly

Thank you for contributing to the Function Dependency Visualizer! 