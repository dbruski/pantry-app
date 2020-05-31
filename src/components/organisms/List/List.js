import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.ul`
  margin-top: 25px;
  min-height: 300px;
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

const List = ({ items }) => {
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
          <StyledItemActions>update / delete</StyledItemActions>
        </StyledItem>
      ))}
    </StyledContainer>
  );
};

export default List;
