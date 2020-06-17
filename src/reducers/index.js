const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_ITEM':
      return {
        ...state,
        products: [
          ...state.products.filter(
            (group) => group.category !== payload.category,
          ),
          {
            category: payload.category,
            items: [...state.products[payload.index].items, payload.item],
          },
        ],
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        products: [
          ...state.products.filter(
            (group) => group.category !== payload.category,
          ),
          {
            category: payload.category,
            items: [
              ...state.products[payload.index].items.filter(
                (item) => item.name !== payload.item.name,
              ),
              payload.item,
            ],
          },
        ],
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        products: [
          ...state.products.filter(
            (group) => group.category !== payload.category,
          ),
          {
            category: payload.category,
            items: [
              ...state.products[payload.index].items.filter(
                (item) => item.name !== payload.item.name,
              ),
            ],
          },
        ],
      };
    case 'BOUGHT_ITEM':
      return {
        ...state,
        products: [
          ...state.products.filter(
            (group) => group.category !== payload.category,
          ),
          {
            category: payload.category,
            items: [
              ...state.products[payload.index].items.map((item) =>
                item.name === payload.item.name
                  ? {
                      name: payload.item.name,
                      quantity: payload.item.quantity + payload.bought,
                      minimum: payload.item.minimum,
                      measure: payload.item.measure,
                    }
                  : item,
              ),
            ],
          },
        ],
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        products: [...state.products, { category: payload.name, items: [] }],
      };
    case 'EDIT_CATEGORY':
      return {
        ...state,
        products: [
          ...state.products.filter(
            (group) => group.category !== payload.oldName,
          ),
          {
            category: payload.newName,
            items: [...state.products[payload.index].items],
          },
        ],
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        products: [
          ...state.products.filter((group) => group.category !== payload.name),
        ],
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        isThemeDark: !state.isThemeDark,
      };
    default:
      return state;
  }
};

export default reducer;
