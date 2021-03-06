import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import styled, { css } from 'styled-components';
import PageTemplate from './PageTemplate';
import Input from '../components/atoms/Input/Input';
import ButtonIcon from '../components/atoms/Button/ButtonIcon';
import List from '../components/organisms/List/List';
import AddItemBar from '../components/organisms/AddItemBar/AddItemBar';
import Modal from '../components/organisms/Modal/Modal';
import { device } from '../helpers/device';

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.black};
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
  position: fixed;
  bottom: 25px;
  right: -25px;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  z-index: 99;
  transition: 0.4s ease-in-out;


  ${({ isAddItemBarOpen }) =>
    isAddItemBarOpen &&
    css`
      background: #f00;
      transform: translate(-275%, -50%) rotate(-135deg);
    `}

  @media ${device.screen} {
    bottom: 10px;
    right: 10px;

    ${({ isAddItemBarOpen }) =>
      isAddItemBarOpen &&
      css`
        background: #f00;
        transform: translate(-450%, -50%) rotate(-135deg);
      `}
  }
`;

const CategoryTemplate = ({ category, state }) => {
  const { products } = state;

  if (!category) {
    category = window.location.pathname.substring(1);
  }

  const [group] = products.filter((group) => group.category === category);
  const items = group ? [...group.items] : [];

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isAddItemBarOpen, setIsAddItemBarOpen] = useState(false);

  const handleSearchInputChange = (e) => setSearchInputValue(e.target.value);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchInputValue.toLowerCase()),
  );

  const handleAddClick = () => {
    setIsAddItemBarOpen(!isAddItemBarOpen);
  };

  const [isModalVisible, setIsModalVisible] = useState({
    modalVisible: false,
    modalType: '',
    item: {},
    category: '',
  });

  const handleCloseModal = () => {
    setIsModalVisible({
      modalVisible: false,
      modalType: '',
      item: {},
      category: '',
    });
  };

  return (
    <PageTemplate>
      {group ? (
        <>
          <StyledHeader>{category}</StyledHeader>
          <StyledParagraph>
            {group.items.length} item{group.items.length > 1 ? 's' : null}
          </StyledParagraph>
          <Input
            search
            placeholder="search"
            value={searchInputValue}
            onChange={handleSearchInputChange}
          />
          <List
            items={filteredItems}
            category={category}
            setIsModalVisible={setIsModalVisible}
          />
          <AddItemButton
            onClick={handleAddClick}
            isAddItemBarOpen={isAddItemBarOpen}
          >
            +
          </AddItemButton>
          {isAddItemBarOpen && <AddItemBar category={category} />}
          {isModalVisible.modalVisible && (
            <Modal
              data={{
                item: isModalVisible.item,
                category: isModalVisible.category,
                type: isModalVisible.modalType,
              }}
              closeModal={handleCloseModal}
            />
          )}
        </>
      ) : (
        <>
          <StyledHeader>There isn't such page</StyledHeader>
          <Link to={routes.pantry}>Go back to home</Link>
        </>
      )}
    </PageTemplate>
  );
};

CategoryTemplate.propTypes = {
  category: PropTypes.string,
};

export default CategoryTemplate;
