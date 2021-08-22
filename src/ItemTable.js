// lista de items
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

// const mockData = [
//   {from: {id: 1, name: "cachorro"}, to: {id: 2, name: "coelho"}, tradeTax: 20},
//   {from: {id: 2, name: "gato"}, to: {id: 2, name: "gaga"}, tradeTax: 2},
//   {from: {id: 3, name: "peixe"}, to: {id: 2, name: "tete"}, tradeTax: 3},
//   {from: {id: 4, name: "urso"}, to: {id: 2, name: "vaca"}, tradeTax: 4},
//   {from: {id: 5, name: "viado"}, to: {id: 2, name: "sgsgs"}, tradeTax: 5},
// ]

const renderTable = (mockData) => {
  const mapItems = (mockData) => {
    return mockData.map((item) => {
      // console.log(item);
      return (
        <>
          <tr>

            <td> {item.from.name} </td>
            <td> {item.tradeTax} </td>
            <td> {item.to.name} </td>
          </tr>
        </>
      );
    });
  };
  return mockData.length ? mapItems(mockData) : "loading....";
};

const ItemTable = ({trocas}) => {
  console.log(trocas)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome do item</th>
          <th>Quanto você precisa pagar</th>
          <th>Interesse de troca</th>
        </tr>
      </thead>
      <tbody>{renderTable(trocas)}</tbody>
    </Table>
  );
};

export {ItemTable, renderTable}
