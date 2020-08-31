import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from '../components/organisms/Navbar/Navbar';
import Popup from '../components/molecules/Popup/Popup';
import { device } from '../helpers/device';
import { PantryContext } from '../context';

const StyledWrapper = styled.div`
  position: relative;
  min-height: 90vh;
  margin-bottom: 8vh;
  padding: 25px 20px;
  background: ${({ theme }) => theme.white};
  transition: 0.4s ease;
  @media ${device.screen} {
    margin: 10vh 0 0 0;
    padding: 45px 60px;
  }
`;

const StyledMobileLogo = styled.header`
  background: ${({ theme }) => theme.white};
  padding: 25px 0 0 0;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.primary};
  letter-spacing: -4px;
  text-align: center;
  user-select: none;
  transition: background-color 0.4s ease;
  @media ${device.screen} {
    display: none;
  }
`;

const PageTemplate = ({ children }) => {
  const { state } = useContext(PantryContext);

  return (
    <>
      <Navbar />
      <StyledMobileLogo>PantryApp</StyledMobileLogo>
      <StyledWrapper>{children}</StyledWrapper>

      {state.popup.open && <Popup />}
    </>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
