import React from "react";
import Table from "react-bootstrap/Table";

const transformTradeTax = (tradeTax) => {
  console.log(tradeTax);
  if (tradeTax > 0) {
    return `Recebendo mais ${tradeTax} dinheiros`;
  }
  return `Pagando mais ${tradeTax * -1} dinheiros`;
};

const renderTable = (data) => {
  const mapItems = (data) => {
    return data.map((item) => {
      return (
        <>
          <tr>
            <td> {item.from.name} </td>
            <td> {item.to.name} </td>
            <td> {transformTradeTax(item.tradeTax)} </td>
          </tr>
        </>
      );
    });
  };
  return data.length ? mapItems(data) : "Loading...";
};

const ItemTable = ({ trades }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item disponível</th>
          <th>Interesse de troca</th>
          <th>Valor adicional</th>
        </tr>
      </thead>
      <tbody>{renderTable(trades)}</tbody>
    </Table>
  );
};

export { ItemTable, renderTable };
