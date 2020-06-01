export const initial = {
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
};
