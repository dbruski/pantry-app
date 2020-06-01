import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { PantryContext } from '../../../context';
import { addItem as addItemAction } from '../../../actions';

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  display: grid;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  width: 30vw;
  height: 100vh;
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
  padding: 75px 25px 150px 25px;
  border-left: 10px solid ${({ theme }) => theme.primary};
  background: white;
  transform: translate(-100%, -55%);
  animation: appear 0.4s ease-in-out;

  @keyframes appear {
    0% {
      transform: translate(50%, -55%);
    }
    100% {
      transform: translate(-100%, -55%);
    }
  }
`;

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const AddItemBar = ({ category }) => {
  const emptyForm = {
    name: '',
    quantity: '',
    minimum: '',
    measure: '',
  };

  const [FormValue, setFormValue] = useState(emptyForm);
  const { state, dispatch } = useContext(PantryContext);
  const { products } = state;

  const handleInputChange = (e) =>
    setFormValue({ ...FormValue, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(FormValue, category);
  };

  const addItem = (item, category) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(addItemAction(item, category, index));
    setFormValue(emptyForm);
  };

  return (
    <StyledWrapper>
      <StyledHeader>Add new item to {category} </StyledHeader>
      <StyledForm autocomplete="off" onSubmit={handleSubmit}>
        <Input
          placeholder="name*"
          onChange={handleInputChange}
          name="name"
          type="text"
          required
          value={FormValue.name}
        />
        <Input
          placeholder="quantity*"
          onChange={handleInputChange}
          name="quantity"
          type="number"
          required
          value={FormValue.quantity}
        />
        <Input
          placeholder="minimum*"
          onChange={handleInputChange}
          name="minimum"
          type="number"
          required
          value={FormValue.minimum}
        />
        <Input
          placeholder="measure units*"
          onChange={handleInputChange}
          name="measure"
          type="text"
          required
          value={FormValue.measure}
        />
        <Button>Add item</Button>
      </StyledForm>
      <StyledParagraph> Fields with * are required. </StyledParagraph>
    </StyledWrapper>
  );
};

AddItemBar.propTypes = {
  category: PropTypes.string.isRequired,
};

export default AddItemBar;
