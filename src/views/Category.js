import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CategoryTemplate from '../templates/CategoryTemplate';
import { PantryContext } from '../context';

const Category = ({ location }) => {
  const { state } = useContext(PantryContext);
  return <CategoryTemplate category={location.state} state={state} />;
};

Category.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Category;
