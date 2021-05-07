import { FC } from 'react';
import { Router } from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';
import { createHashHistory } from 'history';
import Routers, { IRoute } from './Routers';
import AppContextProvider from './components/AppContext';
import AppLayout from './components/AppLayout';
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';

const history = createHashHistory();

const App: FC = () => (
  <div className="app-root">
    <AppContextProvider initialValues={{ history }}>
      <AppLayout>
        <Router history={history}>
          <Switch>
            {(Routers || []).map((item: IRoute) => {
              const { id, component: Component, exact } = item || {};
              return (
                <Route exact={exact} path={id} key={id}>
                  <Component />
                </Route>
              );
            })}
          </Switch>
        </Router>
      </AppLayout>
    </AppContextProvider>
  </div>
);

export default App;
