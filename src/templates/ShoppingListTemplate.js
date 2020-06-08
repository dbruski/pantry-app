import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import Modal from '../components/organisms/Modal/Modal';

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: 5px;
`;

const StyledContainer = styled.div`
  width: 50vw;
  margin-top: 25px;
  min-height: 300px;
  background-image: repeating-linear-gradient(
    white 0px,
    white 24px,
    hsl(200, 50%, 50%) 25px
  );
  box-shadow: 0 10px 20px -10px hsl(0, 0%, 50%);
  display: grid;
  grid-template-columns: 80px 1fr 0.2fr;
  overflow: hidden;
`;

const StyledHolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledHole = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.grey};
  box-shadow: inset 0 2px 2px hsl(0, 0%, 30%);
  border-radius: 50px;
`;

const StyledList = styled.ul`
  border-right: 2px solid #f00;
`;

const StyledItem = styled.li`
  padding: 0 40px 0 45px;
  font-size: ${({ theme }) => theme.fontSize.m};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledItemCategory = styled.li`
  padding: 0 0 0 40px;
  font-weight: ${({ theme }) => theme.bold};
  /* font-size: ${({ theme }) => theme.fontSize.l}; */
`;

const StyledItemHeader = styled.li`
  padding: 10px 40px 15px 40px;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const ShoppingListTemplate = ({ items }) => {
  const [isModalVisible, setIsModalVisible] = useState({
    modalVisible: false,
    modalType: 'shopping',
    item: {},
    category: '',
  });

  const handleModalToggle = (item, category) => {
    setIsModalVisible({
      modalVisible: true,
      modalType: 'shopping',
      item,
      category,
    });
  };

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
      <StyledHeader>Shopping list</StyledHeader>
      <StyledContainer>
        <StyledHolesContainer>
          <StyledHole></StyledHole>
          <StyledHole></StyledHole>
        </StyledHolesContainer>
        <StyledList>
          <StyledItemHeader>You need to buy:</StyledItemHeader>
          {/* {items.map(({ name, measure, quantity, minimum }) => (
            <StyledItem key={name}>
              {name} - {minimum - quantity} {measure}
            </StyledItem>
          ))} */}

          {items.map((group) =>
            group.items.map((item) =>
              item.minimum - item.quantity > 0 ? (
                <div key={group.category}>
                  <StyledItemCategory>{group.category}:</StyledItemCategory>
                  {group.items.map((item) =>
                    item.minimum - item.quantity > 0 ? (
                      <StyledItem key={item.name}>
                        <p>
                          - {item.name} {item.minimum - item.quantity}{' '}
                          {item.measure}
                        </p>
                        <p
                          onClick={() =>
                            handleModalToggle(item, group.category)
                          }
                        >
                          add
                        </p>
                      </StyledItem>
                    ) : null,
                  )}
                </div>
              ) : null,
            ),
          )}
        </StyledList>
      </StyledContainer>
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
    </PageTemplate>
  );
};

export default ShoppingListTemplate;
