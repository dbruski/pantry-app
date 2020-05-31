const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_ITEM':
      return {
        payload,
      };
      console.log(state);
    default:
      return state;
  }
};

export default reducer;
