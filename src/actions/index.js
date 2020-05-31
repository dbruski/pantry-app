export const addItem = (item, category) => {
  return {
    type: 'ADD_ITEM',
    payload: { item, category },
  };
};
