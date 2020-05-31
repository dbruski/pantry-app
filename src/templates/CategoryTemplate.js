import React, { useState } from 'react';
import styled from 'styled-components';
import PageTemplate from './PageTemplate';
import Input from '../components/atoms/Input/Input';

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

const StyledContainer = styled.main`
  margin-top: 25px;
  min-height: 300px;
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
`;

const StyledItem = styled.header`
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.25fr;
`;

const StyledHeading = styled(StyledItem)`
  /* background: ${({ theme }) => theme.primary}; */
  color: ${({ theme }) => theme.primary};
  font-weight: ${({ theme }) => theme.bold};
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const Category = ({ data }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const { category, items } = data;

  const handleSearchInputChange = (e) => setSearchInputValue(e.target.value);
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
      <StyledContainer>
        <StyledHeading>
          <p>Name</p>
          <p>Have/need</p>
          <p>Actions</p>
        </StyledHeading>
      </StyledContainer>
    </PageTemplate>
  );
};

export default Category;
