import React, { createContext, useReducer, useEffect } from 'react';
import reducer from '../reducers';
import { initial } from '../store/initial';
import { setPopup as setPopupAction } from '../actions';

export const PantryContext = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  const setPopup = (value, message) => {
    dispatch(setPopupAction(value, message));
  };

  useEffect(() => {
    localStorage.setItem(
      'pantry-state',
      JSON.stringify({
        products: state.products,
        isThemeDark: state.isThemeDark,
        popup: {
          open: false,
        },
      }),
    );
  }, [state]);

  return (
    <PantryContext.Provider value={{ state, dispatch, setPopup }}>
      {children}
    </PantryContext.Provider>
  );
};
