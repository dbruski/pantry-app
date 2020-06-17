import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/GlobalStyle';
import { PantryContext } from '../context';
import { lightTheme, darkTheme } from '../theme/theme';

const MainTemplate = ({ children }) => {
  const { state } = useContext(PantryContext);
  const { isThemeDark } = state;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
