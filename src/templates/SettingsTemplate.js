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
  margin-bottom: 5px;

  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.l};
    `}
`;

const StyledSelect = styled.select`
  padding: 25px;
  border-radius: 12px;
`;

const StyledSelectItem = styled.option`
  padding: 25px;
`;

const SettingsTemplate = ({ state }) => {
  const { dispatch } = useContext(PantryContext);
  const categories = state.products.map((group) => group.category);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isNameBeingChanged, setIsNameBeingChanged] = useState(false);

  const handleSelectChange = (e) => setSelectedCategory(e.target.value);
  const handleChangeCategoryNameClik = () =>
    setIsNameBeingChanged(!isNameBeingChanged);
  const handleInputChange = (e) => setNewCategoryName(e.target.value);

  const deleteCategory = () => dispatch(deleteCategoryAction(selectedCategory));
  const editCategory = () => {
    const index = state.products.findIndex(
      (group) => group.category === selectedCategory,
    );
    if (newCategoryName) {
      dispatch(editCategoryAction(selectedCategory, newCategoryName, index));
    }
  };

  return (
    <PageTemplate>
      <StyledHeader>Settings</StyledHeader>
      <StyledSelect onChange={handleSelectChange} value={selectedCategory}>
        <StyledSelectItem value="">select category</StyledSelectItem>
        {categories.map((category) => (
          <StyledSelectItem
            key={category}
            value={category}
            onChange={handleSelectChange}
          >
            {category}
          </StyledSelectItem>
        ))}
      </StyledSelect>
      {selectedCategory && (
        <>
          <StyledHeader small>WHAT DO you want to do</StyledHeader>
          <Button onClick={handleChangeCategoryNameClik}>
            Change category name
          </Button>
          <Button secondary onClick={deleteCategory}>
            Delete category
          </Button>
          {isNameBeingChanged && (
            <>
              <StyledHeader small>New category name</StyledHeader>
              <Input
                type="text"
                placeholder="new name"
                value={newCategoryName}
                onChange={handleInputChange}
                required
              />
              <Button onClick={editCategory}>change</Button>
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
