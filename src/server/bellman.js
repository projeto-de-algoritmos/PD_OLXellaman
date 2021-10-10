const bellman = (graph, source) => {
  const dist = {};
  const prev = {};
  for (let node of graph.nodes) {
    dist[node.id] = Infinity;
    prev[node.id] = undefined;
  }
  dist[source.id] = 0;

  for (let i = 0; i < graph.nodes.length - 1; i++) {
    for (let [_, edge] of Object.entries(graph.edges)) {
      for (let [_, v] of Object.entries(edge)) {
        let alt = dist[v.from.id] + v.length;
        if (alt < dist[v.to.id]) {
          dist[v.to.id] = alt;
          prev[v.to.id] = v.from;
        }
      }
    }
  }

  for (let [_, edge] of Object.entries(graph.edges)) {
    for (let [_, v] of Object.entries(edge)) {
      let alt = dist[v.from.id] + v.length;
      if (alt < dist[v.to.id]) {
        return {
          error: {
            message: "Não é possível fazer a troca. Ciclo negativo detectado!",
          },
        };
      }
    }
  }

  return {
    dist,
    prev,
    error: false,
  };
};

module.exports = {
  bellman,
};
