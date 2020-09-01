export const initial =
  localStorage.getItem('pantry-state') == null
    ? {
        products: [],
        isThemeDark: false,
        popup: {
          open: false,
          message: '',
        },
      }
    : JSON.parse(localStorage.getItem('pantry-state'));
