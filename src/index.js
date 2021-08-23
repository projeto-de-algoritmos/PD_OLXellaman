import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import {buildGraph} from './server/djikstra';

const graph = buildGraph();

ReactDOM.render(<App graph={graph}/>, document.getElementById('root'));
