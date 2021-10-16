import React, { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./App.css";
import ItemForm from "./ItemForm";
import { ItemTable } from "./ItemTable";
import ItemCalc from "./ItemCalc";
import { getAllItems, getAllTrades, addTrade, calcTrade } from "./server/util";

const App = ({ graph }) => {
  const [localGraph, setLocalGraph] = useState(graph);
  const [localItems, setLocalItems] = useState(getAllItems(graph));
  const [localTrades, setLocalTrades] = useState(getAllTrades(graph));
  const [bestDeal, setBestDealSteps] = useState([]);
  const [error, setError] = useState("");

  const updateLocalTrades = (newTrade) => {
    const obj = addTrade(localGraph, newTrade);
    setLocalGraph(obj.graph);
    setLocalTrades(getAllTrades(obj.graph));
    setLocalItems(getAllItems(obj.graph));
  };

  const calcBestPrice = ({ fromId, toId }) => {
    const { trades, error } = calcTrade(
      localGraph,
      fromId,
      toId,
      "bellmanFord"
    );

    if (error) {
      setError(error.message);
      return;
    }

    if (trades.length === 0) {
      setError("Não é possível fazer a troca");
      return;
    }

    const total = trades.reduce((acc, curr) => curr.tradeTax + acc, 0);
    const steps = trades.map((trade) => {
      const { from, to, tradeTax } = trade;
      if (tradeTax > 0) {
        return `Troque o seu ${from} por ${to} pagando ${tradeTax}`;
      }
      return `Troque o seu ${from} por ${to} recebendo ${tradeTax * -1}`;
    });
    const totalMessage = (total) => {
      if (total > 0) {
        return `Você vai receber um valor total de ${total}`;
      } else {
        return `Você vai gastar um valor total de ${total * -1}`;
      }
    };
    console.log(totalMessage);
    steps.push(`Total: ${totalMessage(total)}`);
    setBestDealSteps(steps);
  };

  const displaySteps = (steps) => {
    return steps.map((step) => (
      <div>
        <span>{step}</span>
        <br></br>
      </div>
    ));
  };

  return (
    <Container className="p-3">
      <Jumbotron>
        <h2 className="header">Faça suas trocas</h2>
        <ItemForm items={localItems} updateLocalTrades={updateLocalTrades} />
        <h2 className="header">Calcule o melhor preço</h2>
        <ItemCalc items={localItems} calcBestPrice={calcBestPrice} />
        {bestDeal.length ? displaySteps(bestDeal) : error.length ? error : null}
      </Jumbotron>
      <h3>Trocas possíveis</h3>
      <ItemTable trades={localTrades} />
    </Container>
  );
};

export default App;
