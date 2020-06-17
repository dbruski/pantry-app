import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import sun from '../../../assets/sun.png';
import moon from '../../../assets/moon.png';

const StyledWrapper = styled.div``;

const StyledSwitcher = styled.label`
  position: relative;
  background: ${({ theme }) => theme.grey};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  display: inline-block;
  cursor: pointer;
  transition: 0.4s ease;
  width: 100px;
  height: 50px;

  ::after {
    position: absolute;
    left: 2px;
    top: 2px;
    background-image: url(${sun});
    background-size: cover;
    border-radius: 50%;
    content: '';
    display: inline-block;
    width: 42px;
    height: 42px;
    cursor: pointer;
    transition: 0.4s ease;
  }
`;

const StyledCheckbox = styled.input`
  display: none;

  :checked ~ ${StyledSwitcher} {
    background: ${({ theme }) => theme.grey};
    border-color: ${({ theme }) => theme.grey3};

    ::after {
      background-image: url(${moon});
      transform: translateX(50px);
    }
  }
`;

const Toggler = ({ checked, changeFunction }) => {
  return (
    <StyledWrapper>
      <StyledCheckbox
        id="checkbox"
        type="checkbox"
        checked={checked}
        onChange={changeFunction}
      />
      <StyledSwitcher htmlFor="checkbox" />
    </StyledWrapper>
  );
};

Toggler.propTypes = {
  checked: PropTypes.bool.isRequired,
  changeFunction: PropTypes.func.isRequired,
};

export default Toggler;
