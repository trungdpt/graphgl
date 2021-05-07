import { FC } from 'react';
import { Dashboard, EmployeeGrid } from './pages/Router';

export interface IRoute {
    id: string;
    component: FC;
    exact: boolean;
}

const Routes: IRoute[] = [
    { id: '/', component: Dashboard, exact: true },
    { id: '/dashboard', component: Dashboard, exact: true },
    { id: '/employee', component: EmployeeGrid, exact: true },
];

export default Routes;