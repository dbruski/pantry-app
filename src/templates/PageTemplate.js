import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from '../components/organisms/Navbar/Navbar';
import { device } from '../helpers/device';

const StyledWrapper = styled.div`
  position: relative;
  min-height: 90vh;
  margin-bottom: 10vh;
  padding: 25px 20px;

  @media ${device.screen} {
    margin: 10vh 0 0 0;
    padding: 45px 60px;
  }
`;

const StyledMobileLogo = styled.header`
  padding: 25px 0 0 0;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.primary};
  letter-spacing: -4px;
  text-align: center;
  user-select: none;
  @media ${device.screen} {
    display: none;
  }
`;

const PageTemplate = ({ children }) => (
  <>
    <Navbar />
    <StyledMobileLogo>PantryApp</StyledMobileLogo>
    <StyledWrapper>{children}</StyledWrapper>
  </>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
