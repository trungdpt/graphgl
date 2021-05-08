import { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Routers, { IRoute } from './Routers';
import AppContextProvider from './components/AppContext';
import AppLayout from './components/AppLayout';
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';

const App: FC = () => (
  <div className="app-root">
    <AppContextProvider>
      <Router>
        <AppLayout>
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
        </AppLayout>
      </Router>
    </AppContextProvider>
  </div>
);

export default App;
