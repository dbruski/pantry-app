import React from 'react';
import styled from 'styled-components';
import PageTemplate from './PageTemplate';
import { device } from '../helpers/device';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 50px;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.screen} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GridTemplate = ({ children }) => (
  <PageTemplate>
    <StyledWrapper>{children}</StyledWrapper>
  </PageTemplate>
);

export default GridTemplate;
