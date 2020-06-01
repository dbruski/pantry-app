import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import { PantryContext } from '../../../context';
import {
  editItem as editItemAction,
  deleteItem as deleteItemAction,
} from '../../../actions';

const StyledWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 35vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 0.2fr 1fr;
  background: white;
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
  border-radius: 18px;

  ${({ modalType }) =>
    modalType === 'delete'
      ? css`
          height: 25vh;
          grid-template-rows: 0.25fr 0.75fr;
        `
      : null}
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.l};
  background: ${({ theme }) => theme.primary};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 50%;
  width: 25%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledLabel = styled.label`
  margin-bottom: -25px;
`;

const Modal = ({ data, closeModal }) => {
  const { item, category, type } = data;
  const { name, quantity, minimum, measure } = item;
  const { state, dispatch } = useContext(PantryContext);
  const { products } = state;

  const values = {
    name,
    quantity,
    minimum,
    measure,
  };

  const [FormValue, setFormValue] = useState(values);

  const handleInputChange = (e) =>
    setFormValue({ ...FormValue, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    editItem(FormValue, category);
  };

  const editItem = (item, category) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(editItemAction(item, category, index));
  };

  const deleteItem = (item, category) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(deleteItemAction(item, category, index));
  };

  const handleDeleteItem = () => {
    deleteItem(item, category);
    closeModal();
  };

  const renderSwitch = (type) => {
    switch (type) {
      case 'delete':
        return (
          <>
            <StyledHeader>
              Are you sure you want to delete {item.name}?
            </StyledHeader>
            <StyledButtonsContainer>
              <StyledButton onClick={handleDeleteItem}>confirm</StyledButton>
              <StyledButton secondary onClick={closeModal}>
                cancel
              </StyledButton>
            </StyledButtonsContainer>
          </>
        );
      case 'edit':
        return (
          <>
            <StyledHeader>You are editing {name}</StyledHeader>
            <StyledForm onSubmit={handleSubmit}>
              <StyledLabel htmlFor="name">Name</StyledLabel>
              <Input
                placeholder="name*"
                onChange={handleInputChange}
                name="name"
                id="name"
                type="text"
                required
                value={FormValue.name}
              />
              <StyledLabel htmlFor="quantity">Quantity</StyledLabel>
              <Input
                placeholder="quantity*"
                onChange={handleInputChange}
                name="quantity"
                id="quantity"
                type="number"
                required
                value={FormValue.quantity}
              />
              <StyledLabel htmlFor="minimum">Minimum</StyledLabel>
              <Input
                placeholder="minimum*"
                onChange={handleInputChange}
                name="minimum"
                id="minimum"
                type="number"
                required
                value={FormValue.minimum}
              />
              <StyledLabel htmlFor="measure">Measure</StyledLabel>
              <Input
                placeholder="measure units*"
                onChange={handleInputChange}
                name="measure"
                id="measure"
                type="text"
                required
                value={FormValue.measure}
              />
              <StyledButtonsContainer>
                <Button>Edit item</Button>
                <Button secondary onClick={closeModal}>
                  Cancel
                </Button>
              </StyledButtonsContainer>
            </StyledForm>
          </>
        );
      default:
        return 'foo';
    }
  };

  return <StyledWrapper modalType={type}>{renderSwitch(type)}</StyledWrapper>;
};

export default Modal;