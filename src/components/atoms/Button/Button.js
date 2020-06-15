import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  min-width: 96px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.bold};
  border: none;
  border-radius: 50px;
  text-transform: uppercase;

  ${({ secondary }) =>
    secondary &&
    css`
      background: grey;
    `}
`;

export default Button;
