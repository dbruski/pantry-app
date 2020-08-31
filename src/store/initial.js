export const initial =
  localStorage.getItem('pantry-state') == null
    ? {
        products: [
          {
            category: 'fruits',
            items: [
              {
                name: 'apple',
                quantity: 3,
                minimum: 2,
                measure: 'szt.',
              },
              {
                name: 'banana',
                quantity: 5,
                minimum: 3,
                measure: 'szt.',
              },
            ],
          },
          {
            category: 'vegetables',
            items: [
              {
                name: 'potatoes',
                quantity: 2,
                minimum: 2,
                measure: 'kg',
              },
              {
                name: 'tomatoes',
                quantity: 0,
                minimum: 1,
                measure: 'szt.',
              },
            ],
          },
          {
            category: 'drinks',
            items: [
              {
                name: 'water',
                quantity: 3,
                minimum: 2,
                measure: 'bottles',
              },
              {
                name: 'beer',
                quantity: 1,
                minimum: 2,
                measure: 'bottles',
              },
            ],
          },
        ],
        isThemeDark: false,
        popup: {
          open: false,
          message: '',
        },
      }
    : JSON.parse(localStorage.getItem('pantry-state'));
