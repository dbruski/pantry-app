import React from 'react';
import PropTypes from 'prop-types';
import CategoryTemplate from '../templates/CategoryTemplate';

const Category = ({ location }) => {
  const { state } = location;

  return <CategoryTemplate category={state}></CategoryTemplate>;
};

Category.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Category;
