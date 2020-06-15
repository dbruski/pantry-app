import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import { PantryContext } from '../../../context';
import {
  editItem as editItemAction,
  deleteItem as deleteItemAction,
  boughtItem as boughtItemAction,
} from '../../../actions';
import { device } from '../../../helpers/device';

const StyledWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 85vw;
  height: 80vh;
  display: grid;
  grid-template-rows: 0.2fr 1fr;
  background: white;
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
  border-radius: 18px;
  z-index: 9999;

  @media ${device.screen} {
    width: 30vw;
    height: 70vh;
  }

  ${({ modalType }) =>
    modalType === 'delete'
      ? css`
          height: 30vh;
          grid-template-rows: 0.25fr 0.75fr;

          @media ${device.screen} {
            height: 25vh;
          }
        `
      : null}

  ${({ modalType }) =>
    modalType === 'shopping'
      ? css`
          height: 40vh;
          @media ${device.screen} {
            height: 30vh;
          }
        `
      : null}
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.l};
  background: ${({ theme }) => theme.primary};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`;

const StyledContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 100%;
  width: 50%;
`;

const StyledForm = styled.form`
  width: 50%;
  margin: 0 auto;
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
  const [BoughtValue, setBoughtValue] = useState(0);

  const handleInputChange = (e) =>
    setFormValue({ ...FormValue, [e.target.name]: e.target.value });

  const handleBoughtInputChange = (e) =>
    setBoughtValue(parseInt(e.target.value));

  const editItem = (item, category) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(editItemAction(item, category, index));
  };

  const deleteItem = (item, category) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(deleteItemAction(item, category, index));
  };

  const boughtItem = (item, category, bought) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(boughtItemAction(item, category, bought, index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editItem(FormValue, category);
    closeModal();
  };

  const handleDeleteItem = () => {
    deleteItem(item, category);
    closeModal();
  };

  const handleBoughtItem = () => {
    boughtItem(item, category, BoughtValue);
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
            <StyledContainer>
              <StyledButtonsContainer>
                <StyledButton onClick={handleDeleteItem}>confirm</StyledButton>
                <StyledButton secondary onClick={closeModal}>
                  cancel
                </StyledButton>
              </StyledButtonsContainer>
            </StyledContainer>
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
                min="0"
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
                min="0"
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
                <Button>Edit</Button>
                <Button secondary onClick={closeModal}>
                  Cancel
                </Button>
              </StyledButtonsContainer>
            </StyledForm>
          </>
        );
      case 'shopping':
        return (
          <>
            <StyledHeader>Bought {item.name}</StyledHeader>
            <StyledContainer>
              <p>
                How many {item.measure} of {item.name} did you buy?
              </p>
              <Input
                placeholder="quantity*"
                onChange={handleBoughtInputChange}
                name="bought"
                id="bought"
                type="number"
                min="0"
                required
                value={BoughtValue}
              />
              <StyledButtonsContainer>
                <StyledButton onClick={handleBoughtItem}>update</StyledButton>
                <StyledButton secondary onClick={closeModal}>
                  cancel
                </StyledButton>
              </StyledButtonsContainer>
            </StyledContainer>
          </>
        );
      default:
        return 'foo';
    }
  };

  return <StyledWrapper modalType={type}>{renderSwitch(type)}</StyledWrapper>;
};

Modal.propTypes = {
  data: PropTypes.shape({
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      minimum: PropTypes.number.isRequired,
      measure: PropTypes.string.isRequired,
    }),
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
