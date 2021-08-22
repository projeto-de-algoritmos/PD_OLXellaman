const {Graph, Node} = require('./models');

const dijkstra = (graph, source) => {
  const minDist = (priorityQueue, dist) => {
    let minNode = null;
    for (let node of priorityQueue) {
      if (minNode == null) {
        minNode = node;
      } else if (dist[node] < dist[minNode]) {
        minNode = node;
      }
      return minNode;
    }
  };

  let q = [];
  let dist = {};
  let prev = {};
  for (let node of graph.nodes) {
    dist[node.id] = Infinity;
    dist[node.id] = Infinity;
    q.push(node.id);
  }

  dist[source.id] = 0;

  while ([...q].length > 0) {
    let u = graph.getNode(minDist(q, dist));
    q = q.filter((id) => id != u.id);

    if (u.id in graph.edges) {
      for (let [_, v] of Object.entries(graph.edges[u.id])) {
        let alt = dist[u.id] + v.length;
        if (alt < dist[v.to.id]) {
          dist[v.to.id] = alt;
          prev[v.to.id] = u;
        }
      }
    }
  }
  return {
    dist,
    prev
  };
};

const toArray = (prev, fromNode) => {
  let previousNode = prev[fromNode.id];
  let route = [fromNode.id];
  while (previousNode != undefined) {
    route.push(previousNode.id);
    let temp = previousNode;
    previousNode = prev[temp.id];
  }
  route.reverse();
  return route;
};
