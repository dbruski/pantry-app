export const addItem = (item, category, index) => {
  return {
    type: 'ADD_ITEM',
    payload: { item, category, index },
  };
};

export const editItem = (item, category, index) => {
  return {
    type: 'EDIT_ITEM',
    payload: { item, category, index },
  };
};

export const deleteItem = (item, category, index) => {
  return {
    type: 'DELETE_ITEM',
    payload: { item, category, index },
  };
};

export const boughtItem = (item, category, bought, index) => {
  return {
    type: 'BOUGHT_ITEM',
    payload: { item, category, index, bought },
  };
};
