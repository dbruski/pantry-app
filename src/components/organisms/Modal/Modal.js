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
  /* align-self: center; */
  /* background: blue; */
`;

const StyledForm = styled.form`
  display: flex;
  /* background: red; */
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Modal = ({ category }) => {
  const [FormValue, setFormValue] = useState({
    name: '',
    quantity: null,
    minimum: null,
    measure: '',
  });
  const { state, dispatch } = useContext(PantryContext);

  const handleInputChange = (e) =>
    setFormValue({ ...FormValue, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(FormValue, category);
  };

  const addItem = (item, category) => {
    console.log(state);
    dispatch(addItemAction(item, category));
    console.log(state);
  };

  return (
    <StyledWrapper>
      <StyledHeader>Add new item to {category} </StyledHeader>
      <StyledForm autocomplete="off" onSubmit={handleSubmit}>
        <Input
          placeholder="name"
          onChange={handleInputChange}
          name="name"
          type="text"
          isRequired
        />
        <Input
          placeholder="quantity"
          onChange={handleInputChange}
          name="quantity"
          type="number"
          autocomplete="off"
          isRequired
        />
        <Input
          placeholder="minimum"
          onChange={handleInputChange}
          name="minimum"
          type="number"
          isRequired
        />
        <Input
          placeholder="measure units"
          onChange={handleInputChange}
          name="measure"
          type="text"
          isRequired
        />
        <Button>Add item</Button>
      </StyledForm>
      <StyledParagraph> Fields with * are required. </StyledParagraph>
    </StyledWrapper>
  );
};

Modal.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Modal;
