import React, { createContext, useReducer } from 'react';
import reducer from '../reducers';
import { initial } from '../store/initial';

export const PantryContext = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <PantryContext.Provider value={{ state, dispatch }}>
      {children}
    </PantryContext.Provider>
  );
};
