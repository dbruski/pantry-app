import React, { useContext } from 'react';
import { PantryContext } from '../context';
import ShoppingListTemplate from '../templates/ShoppingListTemplate';

const ShoppingList = () => {
  const { state } = useContext(PantryContext);
  const { products } = state;
  const toBuy = products
    .map((group) => group.items)
    .reduce((previous, current) => [...previous, ...current], [])
    .filter((item) => (item.quantity < item.minimum ? item : null));
  console.log(toBuy);
  return <ShoppingListTemplate items={toBuy}></ShoppingListTemplate>;
};

export default ShoppingList;
