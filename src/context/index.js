import React, { createContext, useReducer, useEffect } from 'react';
import reducer from '../reducers';
import { initial } from '../store/initial';

export const PantryContext = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem('pantry-state', JSON.stringify(state));
  }, [state]);

  return (
    <PantryContext.Provider value={{ state, dispatch }}>
      {children}
    </PantryContext.Provider>
  );
};
