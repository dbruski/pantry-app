import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../routes';

const StyledWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px 0%;
  width: 100vw;
  height: 10vh;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

const StyledLogo = styled.h1`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.bold};
  margin-left: 5vw;
  letter-spacing: -4px;
`;

const StyledLinksList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledLink = styled.li`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.white};
  transition: 0.4s ease;

  &:hover {
    color: ${({ theme }) => theme.grey};
  }

  &.active {
    color: ${({ theme }) => theme.grey2};
  }
`;

const SettingsButton = styled(StyledLink)`
  align-self: center;
  text-align: right;
  margin-right: 5vw;
  cursor: pointer;
`;

const Navbar = () => (
  <StyledWrapper>
    <StyledLogo as={NavLink} to={routes.pantry}>
      PantryApp
    </StyledLogo>
    <StyledLinksList>
      <StyledLink as={NavLink} exact to={routes.pantry} activeclass="active">
        Pantry
      </StyledLink>
      <StyledLink as={NavLink} to={routes.shopping} activeclass="active">
        Shopping List
      </StyledLink>
    </StyledLinksList>
    <SettingsButton as={NavLink} to={routes.settings} activeclass="active">
      Settings
    </SettingsButton>
  </StyledWrapper>
);

export default Navbar;
