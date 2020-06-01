import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 250px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
  border-radius: 12px;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
  cursor: pointer;
`;

const StyledHeader = styled.div`
  background: ${({ theme }) => theme.primary};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 15px 25px;
`;

const StyledHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.white};
`;

const StyledList = styled.ul`
  padding: 10px 15px;
  overflow: hidden;
`;

const StyledListItem = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const Card = ({ group }) => {
  const [redirect, setRedirect] = useState(false);
  const { category, items } = group;

  const handleCardClick = () => setRedirect(!redirect);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/${category}`,
          state: category,
        }}
      />
    );
  }

  return (
    <StyledWrapper onClick={() => handleCardClick()}>
      <StyledHeader>
        <StyledHeading>{category}</StyledHeading>
      </StyledHeader>
      <StyledList>
        {items.map(({ name, quantity, minimum, measure }) => (
          <StyledListItem key={name}>
            <StyledParagraph>{name}</StyledParagraph>
            <StyledParagraph>
              {quantity} / {minimum} {measure}
            </StyledParagraph>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

Card.propTypes = {
  group: PropTypes.shape({
    category: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        minimum: PropTypes.number.isRequired,
        measure: PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default Card;
