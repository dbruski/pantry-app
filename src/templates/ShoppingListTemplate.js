import React from 'react';
import styled from 'styled-components';
import PageTemplate from './PageTemplate';

const StyledHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: 5px;
`;

const ShoppingListTemplate = ({ items }) => {
  return (
    <PageTemplate>
      <StyledHeader>Shopping list</StyledHeader>
      {items.map((item) => item.name)}
    </PageTemplate>
  );
};

export default ShoppingListTemplate;
