import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import { addCategory as addCategoryAction } from '../../../actions';
import { PantryContext } from '../../../context';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledWrapper = styled.div`
  height: 250px;
  background: ${({ theme }) => theme.grey};
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
  font-size: 100px;
  color: ${({ theme }) => theme.primary};
  width: 125px;
  height: 125px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const AddCategoryCard = () => {
  const { state, dispatch } = useContext(PantryContext);
  const [inputValue, setInputValue] = useState('');
  const inputField = useRef(null);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const checkIfUnique = (wantToAdd) => {
    const categories = state.products.map((group) => group.category);
    return categories.includes(wantToAdd.toLowerCase());
  };

  const handleAddCategory = () => {
    if (!inputValue) {
      inputField.current.focus();
    } else {
      !checkIfUnique(inputValue) &&
        dispatch(addCategoryAction(inputValue.toLowerCase()));
    }
    setInputValue('');
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        <Input
          ref={inputField}
          transparent
          onChange={handleInputChange}
          value={inputValue}
          placeholder="new category"
        />
      </StyledHeader>
      <StyledContainer>
        <StyledButton onClick={handleAddCategory}>
          <FontAwesomeIcon icon={faPlus} />
        </StyledButton>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default AddCategoryCard;
