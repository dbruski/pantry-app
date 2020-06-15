import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import { PantryContext } from '../context';
import Button from '../components/atoms/Button/Button';
import Input from '../components/atoms/Input/Input';
import {
  deleteCategory as deleteCategoryAction,
  editCategory as editCategoryAction,
} from '../actions';

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 5px 0;

  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.l};
    `}
`;

const StyledSelect = styled.select`
  padding: 10px 25px;
  border-radius: 12px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;

const SettingsTemplate = ({ state }) => {
  const { dispatch } = useContext(PantryContext);
  const categories = state.products.map((group) => group.category);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isItemGoingToBeDeleted, setIsItemGoingToBeDeleted] = useState(false);
  const [isNameBeingChanged, setIsNameBeingChanged] = useState(false);

  const handleSelectChange = (e) => setSelectedCategory(e.target.value);
  const handleDeleteCategoryClick = () => {
    setIsItemGoingToBeDeleted(!isItemGoingToBeDeleted);
    setIsNameBeingChanged(false);
  };
  const handleChangeCategoryNameClick = () => {
    setIsNameBeingChanged(!isNameBeingChanged);
    setIsItemGoingToBeDeleted(false);
  };
  const handleInputChange = (e) => setNewCategoryName(e.target.value);

  const deleteCategory = () => {
    dispatch(deleteCategoryAction(selectedCategory));
    setIsItemGoingToBeDeleted(false);
  };
  const editCategory = () => {
    const index = state.products.findIndex(
      (group) => group.category === selectedCategory,
    );
    if (newCategoryName) {
      dispatch(editCategoryAction(selectedCategory, newCategoryName, index));
      setIsNameBeingChanged(false);
      setNewCategoryName('');
    }
  };

  return (
    <PageTemplate>
      <StyledHeader>Settings</StyledHeader>
      <StyledHeader small>Category management</StyledHeader>
      <StyledSelect onChange={handleSelectChange} value={selectedCategory}>
        <option value="">select category</option>
        {categories.map((category) => (
          <option key={category} value={category} onChange={handleSelectChange}>
            {category}
          </option>
        ))}
      </StyledSelect>
      {selectedCategory && (
        <>
          <StyledHeader small>What would you like to do</StyledHeader>
          <StyledButtonsContainer>
            <Button onClick={handleChangeCategoryNameClick}>
              Change category name
            </Button>
            <Button secondary onClick={handleDeleteCategoryClick}>
              Delete category
            </Button>
          </StyledButtonsContainer>
          {isItemGoingToBeDeleted && (
            <>
              <StyledHeader small>Are you sure?</StyledHeader>
              <StyledButtonsContainer>
                <Button onClick={deleteCategory}>delete</Button>
                <Button secondary onClick={handleDeleteCategoryClick}>
                  return
                </Button>
              </StyledButtonsContainer>
            </>
          )}
          {isNameBeingChanged && (
            <>
              <StyledHeader small>Enter new name</StyledHeader>
              <Input
                type="text"
                placeholder="new name"
                value={newCategoryName}
                onChange={handleInputChange}
                required
              />
              <StyledButtonsContainer>
                <Button onClick={editCategory}>change</Button>
                <Button secondary onClick={handleChangeCategoryNameClick}>
                  return
                </Button>
              </StyledButtonsContainer>
            </>
          )}
        </>
      )}
    </PageTemplate>
  );
};

SettingsTemplate.propTypes = {
  state: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            minimum: PropTypes.number.isRequired,
            measure: PropTypes.string.isRequired,
          }),
        ),
      }),
    ),
  }),
};
export default SettingsTemplate;
