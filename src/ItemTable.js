// lista de items
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const renderTable = (data) => {
  const mapItems = (data) => {
    return data.map((item) => {
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
  return data.length ? mapItems(data) : "Loading...";
};

const ItemTable = ({trades}) => {
  console.log(trades)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome do item</th>
          <th>Quanto você precisa pagar</th>
          <th>Interesse de troca</th>
        </tr>
      </thead>
      <tbody>{renderTable(trades)}</tbody>
    </Table>
  );
};

export {ItemTable, renderTable}
