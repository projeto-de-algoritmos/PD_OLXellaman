import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {renderTable} from './ItemTable';

const ItemForm = ({items}) => {
  const itemNames = items.map(item => item.name);

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required('Nome do Item é obrigatório').min(5, "Minimo 5 letras"),
    itemPrice: Yup.number().typeError('Apenas números').min(0, "Apenas valores maiores que 1").required('Obrigatório'),
    tradeFor: Yup.mixed().oneOf(itemNames).required('Trade for is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
    console.log(' foi ')
    renderTable()
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nome do item</label>
          <input
            name="itemName"
            type="text"
            {...register('itemName')}
            className={`form-control ${errors.itemName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.itemName?.message}</div>
        </div>

        <div className="form-group">
          <label>Preço do item</label>
          <input
            name="itemPrice"
            type="text" pattern="[0-9]*"
            {...register('itemPrice')}
            className={`form-control ${errors.itemPrice ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.itemPrice?.message}</div>
        </div>

        <div class="form-group">
          <label for="inputState">Interesse</label>
            <select id="inputState" class="form-control">
              {itemNames.map(name => {
                return <option selected>{name}</option>                
              })}
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Ofertar
          </button>
        </div>
      </form>
    </div>
  );

}

export default ItemForm;