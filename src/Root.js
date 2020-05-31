import React from 'react';
import MainTemplate from './templates/MainTemplate';
import { Provider } from './context';
import { routes } from './routes';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Pantry from './views/Pantry';
import Category from './views/Category';
import TestingComponents from './testingcomponents';

const App = () => {
  return (
    <Provider>
      <MainTemplate>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={routes.home}
              render={() => <Redirect to={routes.pantry} />}
            />
            <Route path={routes.pantryCategory} component={Category} />
            <Route exact path={routes.pantry} component={Pantry} />
            <Route exact path={routes.shopping} component={TestingComponents} />
            <Route exact path={routes.settings} component={TestingComponents} />
          </Switch>
        </BrowserRouter>
      </MainTemplate>
    </Provider>
  );
};

export default App;
