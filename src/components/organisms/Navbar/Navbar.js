import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { device } from '../../../helpers/device';
import {
  faCog,
  faWarehouse,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 8vh;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  display: grid;
  z-index: 99999;
  box-shadow: 0 0 30px 0 hsl(0, 0%, 50%);

  @media ${device.screen} {
    top: 0;
    left: 0;
    height: 10vh;
    padding: 15px 0;
    box-shadow: 0 0 0 0;
  }
`;

const StyledLinksList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledLogo = styled.h1`
  display: none;

  @media ${device.screen} {
    display: block;
    color: ${({ theme }) => theme.white};
    font-weight: ${({ theme }) => theme.bold};
    font-size: ${({ theme }) => theme.fontSize.xl};
    letter-spacing: -4px;
  }
`;

const StyledLink = styled.li`
  color: ${({ theme }) => theme.white};
  transition: 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33vw;

  :nth-child(3) {
    border-left: 1px solid ${({ theme }) => theme.grey};
    border-right: 1px solid ${({ theme }) => theme.grey2};
  }

  &.active {
    color: ${({ theme }) => theme.grey2};
  }
  @media ${device.screen} {
    width: auto;

    :nth-child(3) {
      border: none;
    }
  }
`;

const SettingsButton = styled(StyledLink)`
  cursor: pointer;
`;

const StyledLinkIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.fontSize.l};
  @media ${device.screen} {
    display: none;
  }
`;

const StyledLinkParagraph = styled.p`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media ${device.screen} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const Navbar = () => (
  <StyledWrapper>
    <StyledLinksList>
      <StyledLogo as={Link} to={routes.pantry}>
        PantryApp
      </StyledLogo>
      <StyledLink as={NavLink} exact to={routes.pantry} activeclass="active">
        <StyledLinkIcon icon={faWarehouse} />
        <StyledLinkParagraph>Pantry</StyledLinkParagraph>
      </StyledLink>
      <StyledLink as={NavLink} to={routes.shopping} activeclass="active">
        <StyledLinkIcon icon={faShoppingCart} />
        <StyledLinkParagraph>Shopping List</StyledLinkParagraph>
      </StyledLink>
      <SettingsButton as={NavLink} to={routes.settings} activeclass="active">
        <StyledLinkIcon icon={faCog} />
        <StyledLinkParagraph>Settings</StyledLinkParagraph>
      </SettingsButton>
    </StyledLinksList>
  </StyledWrapper>
);

export default Navbar;
