import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import PageTemplate from './PageTemplate';
import Input from '../components/atoms/Input/Input';
import ButtonIcon from '../components/atoms/Button/ButtonIcon';
import List from '../components/organisms/List/List';
import Modal from '../components/organisms/Modal/Modal';
import { PantryContext } from '../context';

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: 5px;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.grey3};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  margin: -10px 0 10px 0px;
`;

const AddItemButton = styled(ButtonIcon)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  z-index: 99;
  transition: 0.4s ease all;

  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      background: #f00;
      transform: translate(-450%, -50%) rotate(-135deg);
    `}
`;

const Category = ({ data }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { category, items } = data;

  const { state } = useContext(PantryContext);

  const handleSearchInputChange = (e) => setSearchInputValue(e.target.value);
  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
    console.log(data);
    console.log(state);
  };

  return (
    <PageTemplate>
      <StyledHeader>{category}</StyledHeader>
      <StyledParagraph>
        {items.length} item{items.length > 1 ? 's' : null}
      </StyledParagraph>
      <Input
        search
        placeholder="search"
        value={searchInputValue}
        onChange={handleSearchInputChange}
      />
      <List items={items} />
      <AddItemButton onClick={handleModalClick} isModalOpen={isModalOpen}>
        +
      </AddItemButton>
      {isModalOpen && <Modal category={category} />}
    </PageTemplate>
  );
};

export default Category;
