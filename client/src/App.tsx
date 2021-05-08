import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from './components/RouteConfig';
import Routers from './components/RouteData';
import AppContextProvider from './components/AppContext';
import AppLayout from './components/AppLayout';
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';

const App: FC = () => (
    <div className="app-root">
        <AppContextProvider>
            <Router>
                <AppLayout>
                    <RouteConfig data={Routers} />
                </AppLayout>
            </Router>
        </AppContextProvider>
    </div>
);

export default App;
