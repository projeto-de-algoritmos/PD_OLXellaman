const {Graph, Node} = require('./models');

const buildGraph = () => {
  let graph = new Graph();

  let book = new Node('book');
  let poster = new Node("poster");
  let rare_lp = new Node("rare lp");
  let bass_guitar = new Node("bass guitar");
  let piano = new Node("piano");
  let drumset = new Node("drumset");

  graph.addNode(book);
  graph.addNode(poster);
  graph.addNode(rare_lp);
  graph.addNode(bass_guitar);
  graph.addNode(piano);
  graph.addNode(drumset);

  graph.addEdge(book, poster, 0);
  graph.addEdge(book, rare_lp, 5);
  graph.addEdge(rare_lp, bass_guitar, 15);
  graph.addEdge(rare_lp, drumset, 20);
  graph.addEdge(poster, bass_guitar, 30);
  graph.addEdge(poster, drumset, 35);
  graph.addEdge(bass_guitar, piano, 20);
  graph.addEdge(drumset, piano, 10);

  return graph;
}

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
    q = q.filter((id) => id !== u.id);

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
  while (previousNode !== undefined) {
    route.push(previousNode.id);
    let temp = previousNode;
    previousNode = prev[temp.id];
  }
  route.reverse();
  return route;
};

const addTrade = (graph, item) => {
  const toNode = graph.getNode(item.fromId);
  const fromNode = new Node(item.name);
  graph.addNode(fromNode);
  graph.addEdge(toNode, fromNode, parseFloat(item.tradeTax));
  return {graph, newNodeId: toNode.id};
}

const calcTrade = (graph, fromId, toId) => {
  const fromNode = graph.getNode(fromId);
  const toNode = graph.getNode(toId);
  const {
    dist,
    prev
  } = dijkstra(graph, fromNode);

  const route = toArray(prev, toNode);
  const total = dist[toNode.id];
  const nodes = route.map((id) => graph.getNode(id));
  
  let trades = nodes.map((node, idx) => {
        let next = nodes[idx + 1]
        if(next){
            const edge = graph.getEdge(node, next)
            return {
                from: node.name,
                to: next.name,
                tradeTax: edge.length
            }
        }
    })
  trades = trades.filter((trade) => trade !== undefined)
  return {
    total,
    trades
  };
}

const doTrade = (graph, item) => {
  const {
    route,
    total
  } = calcTrade(item);
  const fromNode = graph.getNode(item.fromId);
  const toNode = graph.getNode(item.toId);
  graph.removeNode(fromNode);
  graph.removeNode(toNode);
  return {
    route,
    total
  }
}

const getAllTrades = (graph) => {
  const trades = [];
  for (let [_, edge] of Object.entries(graph.edges)) {
    for (let [_, v] of Object.entries(edge)) {
      trades.push({
        from: v.from,
        to: v.to,
        tradeTax: v.length
      });
    }
  }
  return trades;
}

const getAllItems = (graph) => {
  const items = [];
  for (let node of graph.nodes) {
    items.push({
      id: node.id,
      name: node.name
    });
  }
  return items;
}

module.exports = {
    addTrade,
    doTrade,
    calcTrade,
    getAllTrades,
    getAllItems,
    buildGraph
}
