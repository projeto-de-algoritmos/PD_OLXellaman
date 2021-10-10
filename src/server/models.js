class Node {
    constructor(name) {
      this.id = ''+Math.random().toString(36).substr(2, 9);
      this.name = name;
    }
  }
  
  class Edge {
    constructor(to, from, length) {
      this.to = to;
      this.from = from;
      this.length = length;
    }
  }
  
  class Graph {
    constructor() {
      this.nodes = [];
      this.edges = {};
    }
  
    addNode(node) {
      this.nodes.push(node);
    }
  
    addEdge(from, to, length) {
      if (!this.edges[from.id]) {
        this.edges[from.id] = {};
      }
      this.edges[from.id][to.id] = new Edge(to, from, length);
    }
  
    getNode(id) {
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].id === id) {
          return this.nodes[i];
        }
      }
      return null;
    }
  
    getEdge(from, to) {
      let from_node_edges = this.edges[from.id];
      if (from_node_edges) {
        return from_node_edges[to.id];
      }
      return null;
    }
  
    getNeighbors(node) {
      let neighbors = [];
      let from_node_edges = this.edges[node.id];
      if (from_node_edges) {
        for (let to_id in from_node_edges) {
          neighbors.push(this.getNode(to_id));
        }
      }
      return neighbors;
    }
  
    removeNode(node) {
      let index = this.nodes.indexOf(node.id);
      this.nodes.splice(index, 1);
      delete this.edges[node.id];
    }
  }

module.exports = {
  Node,
  Graph
}