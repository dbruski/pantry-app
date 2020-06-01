import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.ul`
  margin-top: 25px;
  min-height: 300px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
`;

const StyledItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.25fr;
  padding: 15px 20px;
  transition: 0.4s ease;

  :hover {
    background: ${({ theme }) => theme.grey};
  }
`;

const StyledHeading = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.25fr;
  padding: 15px 20px;
  color: ${({ theme }) => theme.primary};
  font-weight: ${({ theme }) => theme.bold};
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const StyledItemName = styled.p`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledItemAmount = styled.p`
  text-align: center;
`;

const StyledItemActions = styled.p`
  text-align: center;
`;

const StyledActionLink = styled.span`
  font-weight: ${({ theme }) => theme.bold};
`;

const List = ({ items, category, setIsModalVisible }) => {
  const handleModalToggle = (e, item, category) => {
    setIsModalVisible({
      modalVisible: true,
      modalType: e.target.textContent,
      item,
      category,
    });
  };

  return (
    <StyledContainer>
      <StyledHeading>
        <StyledItemName>Name</StyledItemName>
        <StyledItemAmount>Have / need</StyledItemAmount>
        <StyledItemActions>Actions</StyledItemActions>
      </StyledHeading>
      {items.map(({ name, quantity, minimum, measure }) => (
        <StyledItem key={name}>
          <StyledItemName>{name}</StyledItemName>
          <StyledItemAmount>
            {quantity} / {minimum} {measure}
          </StyledItemAmount>
          <StyledItemActions>
            <StyledActionLink
              onClick={(e) =>
                handleModalToggle(
                  e,
                  { name, quantity, minimum, measure },
                  category,
                )
              }
            >
              edit
            </StyledActionLink>
            /
            <StyledActionLink
              onClick={(e) =>
                handleModalToggle(
                  e,
                  { name, quantity, minimum, measure },
                  category,
                )
              }
            >
              delete
            </StyledActionLink>
          </StyledItemActions>
        </StyledItem>
      ))}
    </StyledContainer>
  );
};

export default List;
