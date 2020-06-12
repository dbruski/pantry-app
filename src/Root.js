import React from 'react';
import MainTemplate from './templates/MainTemplate';
import { Provider } from './context';
import { routes } from './routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pantry from './views/Pantry';
import Category from './views/Category';
import ShoppingList from './views/ShoppingList';
import Settings from './views/Settings';

const App = () => {
  return (
    <Provider>
      <MainTemplate>
        <BrowserRouter>
          <Switch>
            <Route exact path={routes.pantry} component={Pantry} />
            <Route exact path={routes.shopping} component={ShoppingList} />
            <Route exact path={routes.settings} component={Settings} />
            <Route path={routes.pantryCategory} component={Category} />
          </Switch>
        </BrowserRouter>
      </MainTemplate>
    </Provider>
  );
};

export default App;
