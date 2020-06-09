import React, { useContext } from 'react';
import Card from '../components/molecules/Card/Card';
import AddCategoryCard from '../components/molecules/Card/AddCategoryCard';
import GridTemplate from '../templates/GridTemplate';
import { PantryContext } from '../context';

const Pantry = () => {
  const { state } = useContext(PantryContext);
  const { products } = state;
  return (
    <GridTemplate>
      {products.map((group) => (
        <Card key={group.category} group={group} />
      ))}
      <AddCategoryCard />
    </GridTemplate>
  );
};

export default Pantry;
