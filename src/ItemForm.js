import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';

const ItemForm = ({items, updateLocalTrades}) => {
  const initialInputState = { name: "", tradeTax: "", fromId:items[0].id };
  const [eachEntry, setEachEntry] = useState(initialInputState);

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    updateLocalTrades(eachEntry);
  }

  return (
    <Form>
      <Form.Group>
          <Form.Label>Eu tenho um:</Form.Label>
          <Form.Control
            name="name"
            type="text"
            className={`form-control`}
            onChange={handleInputChange}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label>E aceito trocar por um:</Form.Label>
          <Form.Control
            name="fromId"
            className={`form-control`}
            onChange={
              (e) => {
                handleInputChange({ target: { name: "fromId", value: e.target.value } });
              }
            }
            as="select"
          >
          {items.map(item => (
            <option value={item.id}>{item.name}</option>
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Com um adicional de troca:</Form.Label>
          <Form.Control
          name="tradeTax"
          className={`form-control`}
          onChange={handleInputChange}
          />
        </Form.Group>

        <Button onClick ={onSubmit} className="btn btn-primary">
          Ofertar
        </Button>
    </Form>
  );

}

export default ItemForm;