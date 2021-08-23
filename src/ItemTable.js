import React from "react";
import Table from "react-bootstrap/Table";

const renderTable = (data) => {
  const mapItems = (data) => {
    return data.map((item) => {
      return (
        <>
          <tr>
            <td> {item.to.name} </td>
            <td> {item.from.name} </td>
            <td> {item.tradeTax} </td>
          </tr>
        </>
      );
    });
  };
  return data.length ? mapItems(data) : "Loading...";
};

const ItemTable = ({trades}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item</th>
          <th>Interesse de troca</th>
          <th>Taxa adicional</th>
        </tr>
      </thead>
      <tbody>{renderTable(trades)}</tbody>
    </Table>
  );
};

export {ItemTable, renderTable}
