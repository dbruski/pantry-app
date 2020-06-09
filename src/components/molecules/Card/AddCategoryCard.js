import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import { addCategory as addCategoryAction } from '../../../actions';
import { PantryContext } from '../../../context';

const StyledWrapper = styled.div`
  height: 250px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
  border-radius: 12px;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const StyledHeader = styled.div`
  background: ${({ theme }) => theme.primary};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 15px 10px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  font-size: 180px;
  color: ${({ theme }) => theme.primary};
  width: 125px;
  height: 125px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const StyledParagraph = styled.p``;

const AddCategoryCard = () => {
  const { dispatch } = useContext(PantryContext);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddCategory = () => {
    if (inputValue) dispatch(addCategoryAction(inputValue));
    setInputValue('');
  };
  return (
    <StyledWrapper>
      <StyledHeader>
        <Input transparent onChange={handleInputChange} value={inputValue} />
      </StyledHeader>
      <StyledContainer>
        <StyledParagraph>Add new category</StyledParagraph>
        <StyledButton onClick={handleAddCategory}>+</StyledButton>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default AddCategoryCard;
