import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { PantryContext } from '../../../context';
import { addItem as addItemAction } from '../../../actions';
import { device } from '../../../helpers/device';

const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 100%;
  display: grid;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  width: 100vw;
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

  @media ${device.screen} {
    width: 30vw;
    top: 65%;
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

const StyledErrorParagraph = styled.p`
  color: hsl(0, 75%, 50%);
  font-weight: ${({ theme }) => theme.bold};
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
  const [isAlertShown, setIsAlertShown] = useState(false);
  const { state, dispatch, setPopup } = useContext(PantryContext);
  const { products } = state;

  useEffect(() => {
    setTimeout(() => {
      setIsAlertShown(false);
    }, 3000);
  }, [isAlertShown]);

  const checkIfUnique = (wantToAdd) => {
    const group = products.filter((group) => group.category === category);
    const items = group[0].items.map((item) => item.name.toLowerCase());
    return !items.includes(wantToAdd.toLowerCase());
  };

  const handleInputChange = (e) =>
    setFormValue({
      ...FormValue,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIfUnique(FormValue.name)) {
      addItem(FormValue, category);
    } else {
      setIsAlertShown(true);
    }
  };

  const addItem = (item, category) => {
    const index = products.findIndex((group) => group.category === category);
    dispatch(addItemAction(item, category, index));
    setPopup(true, `Item ${item.name} was added to ${category}.`);
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
        {isAlertShown && (
          <StyledErrorParagraph>That item already exists</StyledErrorParagraph>
        )}
        <Input
          placeholder="quantity*"
          onChange={handleInputChange}
          name="quantity"
          type="number"
          min="0"
          required
          value={FormValue.quantity}
        />
        <Input
          placeholder="minimum*"
          onChange={handleInputChange}
          name="minimum"
          type="number"
          min="0"
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
