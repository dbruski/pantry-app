import React, { useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { PantryContext } from '../../../context';
import { device } from '../../../helpers/device';

const appear = keyframes`
  0% {
    transform: translate(-50%, 100%);
    opacity: 0;
    box-shadow: 0px 2px 4px 0 hsl(0, 0%, 0%);
    
  }
  20% {
    transform: translate(-50%, 0);
    opacity: 1;
    box-shadow: 0;
  }
  80% {
    transform: translate(-50%, 0)
    opacity: 1;
  }
  90% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 0;
    box-shadow: 0px 4px 8px 0 hsl(0, 0%, 0%);
  }
`;

const StyledWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  width: auto;
  height: 100px;
  background: ${({ theme }) => theme.primary};
  padding: 0 10px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${appear} 3s ease-in-out both;

  @media ${device.screen} {
    width: 430px;
  }
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.m};
  text-align: center;
`;

const Popup = () => {
  const { state, setPopup } = useContext(PantryContext);
  const { popup } = state;

  useEffect(() => {
    setTimeout(() => {
      setPopup(false, '');
    }, 3000);
    //eslint-disable-next-line
  }, [popup.open]);

  return (
    <StyledWrapper>
      <StyledParagraph>{popup.message}</StyledParagraph>
    </StyledWrapper>
  );
};

export default Popup;
