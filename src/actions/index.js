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

export const addCategory = (name) => {
  return {
    type: 'ADD_CATEGORY',
    payload: { name },
  };
};

export const editCategory = (oldName, newName, index) => {
  return {
    type: 'EDIT_CATEGORY',
    payload: { oldName, newName, index },
  };
};

export const deleteCategory = (name) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: { name },
  };
};

export const changeTheme = () => {
  return {
    type: 'CHANGE_THEME',
  };
};
