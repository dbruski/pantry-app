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
  padding-bottom: 24px;
  background-image: repeating-linear-gradient(
    white 0px,
    white 24px,
    hsl(200, 50%, 50%) 25px
  );
  box-shadow: 0 10px 20px -10px hsl(0, 0%, 50%);
  display: grid;
  grid-template-columns: 80px 1fr 0.2fr;
  overflow: hidden;

  ::after {
    content: '';
    height: calc(100% + 24px);
    width: 2px;
    background: #f00;
  }
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

const StyledAction = styled.p`
  opacity: 0;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`;

const StyledItem = styled.li`
  padding: 0 40px 0 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 3s ease-in-out;

  ::first-letter {
    text-transform: uppercase;
  }

  ::after {
    content: '';
    position: absolute;
    transform: translate(0, 50%);
    width: 0;
    height: 2px;
    background: black;
    border-radius: 25%;
    transition: 0.3s ease-in-out;
  }

  :hover {
    ::after {
      width: 10%;
    }
    ${StyledAction} {
      opacity: 1;
    }
  }
`;

const StyledItemCategory = styled.li`
  padding: 0 0 0 40px;
  font-weight: ${({ theme }) => theme.bold};
  height: 24px;
`;

const StyledItemHeader = styled.li`
  padding: 10px 40px 24px 40px;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const ShoppingListTemplate = ({ products }) => {
  const neededItems = products
    .map((group) =>
      group.items.filter((item) => item.minimum - item.quantity > 0).length > 0
        ? group
        : null,
    )
    .filter((group) => group !== null);

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
        <ul>
          <StyledItemHeader>You need to buy:</StyledItemHeader>
          {neededItems.map((group) => (
            <div key={group.category}>
              <StyledItemCategory>{group.category}:</StyledItemCategory>
              {group.items.map((item) =>
                item.minimum - item.quantity > 0 ? (
                  <StyledItem key={item.name}>
                    <StyledParagraph>
                      - {item.name} {item.minimum - item.quantity}{' '}
                      {item.measure}
                    </StyledParagraph>
                    <StyledAction
                      onClick={() => handleModalToggle(item, group.category)}
                    >
                      V
                    </StyledAction>
                  </StyledItem>
                ) : null,
              )}
            </div>
          ))}
        </ul>
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

ShoppingListTemplate.propTypes = {
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
};

export default ShoppingListTemplate;

/* 
{products.map((group) =>
            group.items.map((item) =>
              item.minimum - item.quantity > 0 ? (
                <div key={group.category}>
                  <StyledItemCategory>{group.category}:</StyledItemCategory>
                  {group.items.map((item) =>
                    item.minimum - item.quantity > 0 ? (
                      <StyledItem key={item.name}>
                        <StyledParagraph>
                          - {item.name} {item.minimum - item.quantity}{' '}
                          {item.measure}
                        </StyledParagraph>
                        <StyledAction
                          onClick={() =>
                            handleModalToggle(item, group.category)
                          }
                        >
                          V
                        </StyledAction>
                      </StyledItem>
                    ) : null,
                  )}
                </div>
              ) : null,
            ),
          )}
*/
