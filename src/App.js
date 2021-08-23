import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import './App.css';
import ItemForm from './ItemForm';
import {ItemTable} from './ItemTable';

const App = ({graph}) => {
  const updateLocalTrades = newTrade => {
  }

  return (
    <Container className="p-3">
    <Jumbotron>
        <ItemForm items={localItems} updateLocalTrades={updateLocalTrades}/>
      <ItemTable trades={localTrades} />
  )
};

export default App;
