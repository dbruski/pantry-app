const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_ITEM':
      return [
        ...state.filter((group) => group.category !== payload.category),
        {
          category: state[payload.index].category,
          items: [...state[payload.index].items, payload.item],
        },
      ];
    default:
      return state;
  }
};

export default reducer;
