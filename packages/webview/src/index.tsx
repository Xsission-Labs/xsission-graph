import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DependencyGraph } from './components/DependencyGraph';

// Get VS Code API
const vscode = acquireVsCodeApi();

// Initialize the root component
ReactDOM.render(
  <React.StrictMode>
    <DependencyGraph vscode={vscode} />
  </React.StrictMode>,
  document.getElementById('app')
); 