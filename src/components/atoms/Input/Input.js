import styled, { css } from 'styled-components';
import searchIcon from '../../../assets/icons/search.svg';

const Input = styled.input`
  padding: 10px 20px;
  background: ${({ theme }) => theme.grey2};
  font-weight: ${({ theme }) => theme.light};
  font-size: ${({ theme }) => theme.fontSize.m};
  outline: none;
  border: none;
  border-radius: 50px;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey3};
  }

  ${({ transparent }) =>
    transparent &&
    css`
      width: 50%;
      font-weight: ${({ theme }) => theme.bold};
      color: hsl(0, 0%, 100%);
      background: transparent;
      border-radius: 0;
      border-bottom: 1px solid hsl(0, 0%, 100%);

      ::placeholder {
        color: ${({ theme }) => theme.white};
      }
    `}

  ${({ search }) =>
    search &&
    css`
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${searchIcon});
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
    `}
`;

export default Input;
