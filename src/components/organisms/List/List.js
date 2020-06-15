import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '../../../helpers/device';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledContainer = styled.ul`
  margin-top: 25px;
  min-height: 300px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 50%);
  overflow: hidden;
`;

const StyledItem = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 0.33fr);
  padding: 15px 10px;
  transition: 0.4s ease;

  @media ${device.screen} {
    grid-template-columns: 1fr 0.25fr 0.25fr;
    padding: 15px 20px;

    :hover {
      background: ${({ theme }) => theme.grey};
    }
  }
`;

const StyledHeading = styled(StyledItem)`
  display: grid;
  color: ${({ theme }) => theme.primary};
  font-weight: ${({ theme }) => theme.bold};
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const StyledItemName = styled.p`
  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledItemAmount = styled.p`
  text-align: center;
`;

const StyledItemActions = styled.p`
  text-align: center;
`;

const StyledDeleteIcon = styled.span`
  color: hsl(0, 90%, 50%);
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 0 10px;
  cursor: pointer;
`;

const StyledEditIcon = styled(StyledDeleteIcon)`
  color: hsl(45, 90%, 50%);
`;

const List = ({ items, category, setIsModalVisible }) => {
  const handleModalToggle = (type, item, category) => {
    setIsModalVisible({
      modalVisible: true,
      modalType: type,
      item,
      category,
    });
  };

  return (
    <StyledContainer>
      <StyledHeading>
        <StyledItemName>Name</StyledItemName>
        <StyledItemAmount>Have / need</StyledItemAmount>
        <StyledItemActions>Actions</StyledItemActions>
      </StyledHeading>
      {items.map(({ name, quantity, minimum, measure }) => (
        <StyledItem key={name}>
          <StyledItemName>{name}</StyledItemName>
          <StyledItemAmount>
            {quantity} / {minimum} {measure}
          </StyledItemAmount>
          <StyledItemActions>
            <StyledEditIcon
              onClick={(e) =>
                handleModalToggle(
                  'edit',
                  { name, quantity, minimum, measure },
                  category,
                )
              }
            >
              <FontAwesomeIcon icon={faEdit} />
            </StyledEditIcon>
            /
            <StyledDeleteIcon
              onClick={(e) => handleModalToggle('delete', { name }, category)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </StyledDeleteIcon>
          </StyledItemActions>
        </StyledItem>
      ))}
    </StyledContainer>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      minimum: PropTypes.number.isRequired,
      measure: PropTypes.string.isRequired,
    }),
  ),
  category: PropTypes.string.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default List;
