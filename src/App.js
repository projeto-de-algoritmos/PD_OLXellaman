import React, { useState} from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import './App.css';
import ItemForm from './ItemForm';
import {ItemTable} from './ItemTable';
import ItemCalc from './ItemCalc';
import {getAllItems, getAllTrades, addTrade, calcTrade} from './server/djikstra';

const App = ({graph}) => {
  const [localGraph, setLocalGraph] = useState(graph);
  const [localItems, setLocalItems] = useState(getAllItems(graph));
  const [localTrades, setLocalTrades] = useState(getAllTrades(graph));
  const [bestDeal, setBestDealSteps] = useState([]);

  const updateLocalTrades = newTrade => {
    const obj = addTrade(localGraph, newTrade);
    setLocalGraph(obj.graph);
    setLocalTrades(getAllTrades(obj.graph));
    setLocalItems(getAllItems(obj.graph));
  }

  const calcBestPrice = ({fromId, toId}) => {
    const {trades} = calcTrade(localGraph, fromId, toId);
    const steps = [];
    const total = trades.reduce((acc, curr) => curr.tradeTax + acc, 0);
    trades.map(trade => {
      steps.push(`Troque o seu ${trade.from} por ${trade.to} com um adicional de ${trade.tradeTax}`);
    });
    steps.push(`Total: ${total}`);
    setBestDealSteps(steps);
  }

  return (
    <Container className="p-3">
      <Jumbotron>
        <h2 className="header">Faça suas trocas</h2>
        <ItemForm items={localItems} updateLocalTrades={updateLocalTrades}/>
        <h2 className="header">Calcule o melhor preço</h2>
        <ItemCalc items={localItems} calcBestPrice={calcBestPrice}/>
        {bestDeal.length > 0 && bestDeal.map(step => (<div><span>{step}</span><br></br></div>))}
      </Jumbotron>
      <h3>Trocas possíveis</h3>
      <ItemTable trades={localTrades} />
    </Container>
  );
};

export default App;
