import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import Modal from '../components/organisms/Modal/Modal';
import { device } from '../helpers/device';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: 5px;
`;

const StyledContainer = styled.div`
  width: 90vw;
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
  grid-template-columns: 40px 1fr 0.15fr;
  overflow: hidden;

  ::after {
    content: '';
    height: calc(100% + 24px);
    width: 2px;
    background: #f00;
  }

  @media ${device.screen} {
    width: 50vw;
    grid-template-columns: 80px 1fr 0.2fr;
  }
`;

const StyledHolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledHole = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.grey};
  box-shadow: inset 0 2px 2px hsl(0, 0%, 30%);
  border-radius: 50px;

  @media ${device.screen} {
    width: 30px;
    height: 30px;
  }
`;

const StyledItem = styled.li`
  padding: 0 40px 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::first-letter {
    text-transform: uppercase;
  }

  @media ${device.screen} {
    padding: 0 40px 0 45px;

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
    :hover::after {
      width: 10%;
    }
  }
`;

const StyledAction = styled.p`
  transition: 0.2s ease-in-out;
  cursor: pointer;
`;

const StyledItemCategory = styled.li`
  padding: 0 0 0 20px;
  font-weight: ${({ theme }) => theme.bold};
  height: 24px;

  @media ${device.screen} {
    padding: 0 0 0 40px;
  }
`;

const StyledItemHeader = styled.li`
  padding: 24px 40px 26px 20px;
  font-size: ${({ theme }) => theme.fontSize.l};

  @media ${device.screen} {
    padding: 10px 40px 24px 40px;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledCardIcon = styled(FontAwesomeIcon)`
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
          <StyledItemHeader>
            {neededItems.length
              ? 'You need to buy:'
              : "You don't need to go shopping"}
          </StyledItemHeader>
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
                      <StyledCardIcon icon={faCartArrowDown} />
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
