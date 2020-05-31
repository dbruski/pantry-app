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
  transition: 0.4s ease-in-out;

  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      background: #f00;
      transform: translate(-450%, -50%) rotate(-135deg);
    `}
`;

const CategoryTemplate = ({ category }) => {
  const { state } = useContext(PantryContext);
  const [group] = state.filter((group) => group.category === category);
  const { items } = group;

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInputChange = (e) => setSearchInputValue(e.target.value);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchInputValue.toLowerCase()),
  );

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
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
      <List items={filteredItems} />
      <AddItemButton onClick={handleModalClick} isModalOpen={isModalOpen}>
        +
      </AddItemButton>
      {isModalOpen && <Modal category={category} />}
    </PageTemplate>
  );
};

CategoryTemplate.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryTemplate;
