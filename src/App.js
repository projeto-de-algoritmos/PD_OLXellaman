import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import './App.css';
import ItemForm from './ItemForm';
import {ItemTable} from './ItemTable';

const App = () => {
  const trocas = [
    {from: {id: 1, name: "Item 1"}, to: {id: 2, name: "Item 2"}, tradeTax: 20},
    {from: {id: 3, name: "Item 3"}, to: {id: 4, name: "Item 4"}, tradeTax: 2},
    {from: {id: 3, name: "Item 4"}, to: {id: 5, name: "Item 5"}, tradeTax: 3},
    {from: {id: 6, name: "Item 6"}, to: {id: 7, name: "Item 7"}, tradeTax: 4},
  ];
  
  const items = [
      {name: "Item 1", id: 1},
      {name: "Item 2", id: 2},
      {name: "Item 3", id: 3}, 
      {name: "Item 4", id: 4},
      {name: "Item 5", id: 5},
      {name: "Item 6", id: 6}, 
      {name: "Item 7", id: 7},
  ]

  return (
    <Container className="p-3">
    <Jumbotron>
      <h1 className="header">Faça suas trocas</h1>
     <ItemForm items={items} />
    </Jumbotron>
    <div>Lista de items</div>
    <ItemTable trocas={trocas}/>
  </Container>
  )
};

export default App;
