import React from 'react';
import styled from 'styled-components';
import PageTemplate from './PageTemplate';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
`;

const GridTemplate = ({ children }) => (
  <PageTemplate>
    <StyledWrapper>{children}</StyledWrapper>
  </PageTemplate>
);

export default GridTemplate;
