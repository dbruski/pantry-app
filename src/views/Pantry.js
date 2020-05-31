import React, { useContext } from 'react';
import Card from '../components/molecules/Card/Card';
import GridTemplate from '../templates/GridTemplate';
import { PantryContext } from '../context';

const Pantry = () => {
  const { state } = useContext(PantryContext);

  return (
    <GridTemplate>
      {state.map((group) => (
        <Card key={group.category} group={group} />
      ))}
    </GridTemplate>
  );
};

export default Pantry;
