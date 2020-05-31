export const addItem = (item, category, index) => {
  return {
    type: 'ADD_ITEM',
    payload: { item, category, index },
  };
};
