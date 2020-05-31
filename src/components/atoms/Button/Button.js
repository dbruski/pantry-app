import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.bold};
  border: none;
  border-radius: 50px;
  text-transform: uppercase;
  cursor: pointer;
`;

export default Button;
