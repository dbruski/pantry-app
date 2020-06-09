import React, { useContext } from 'react';
import { PantryContext } from '../context';
import ShoppingListTemplate from '../templates/ShoppingListTemplate';

const ShoppingList = () => {
  const { state } = useContext(PantryContext);
  const { products } = state;
  return <ShoppingListTemplate products={products}></ShoppingListTemplate>;
};

export default ShoppingList;
