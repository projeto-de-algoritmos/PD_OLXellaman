import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ItemCalc = ({ items, calcBestPrice }) => {
  const initialInputState = { fromId: items[0].id, toId: items[1].id };
  const [eachEntry, setEachEntry] = useState(initialInputState);

  const handleInputChange = ({ name, value }) => {
    setEachEntry({ ...eachEntry, [name]: value });
  };

  const onSubmit = () => {
    calcBestPrice(eachEntry);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Eu tenho um:</Form.Label>
        <Form.Control
          name="fromId"
          className={`form-control`}
          onChange={(e) => {
            handleInputChange({ name: "fromId", value: e.target.value });
          }}
          as="select"
        >
          {items.map((item) => (
            <option value={item.id}>{`${item.name} (id=${item.id})`}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>E quero adquirir um:</Form.Label>
        <Form.Control
          name="toId"
          className={`form-control`}
          onChange={(e) => {
            handleInputChange({ name: "toId", value: e.target.value });
          }}
          as="select"
        >
          {items
            .filter((item) => item.id !== eachEntry.fromId)
            .map((item) => (
              <option value={item.id}>{`${item.name} (id=${item.id})`}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Button onClick={onSubmit} className="btn btn-primary">
        Calcular
      </Button>
    </Form>
  );
};

export default ItemCalc;
