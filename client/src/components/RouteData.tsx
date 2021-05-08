import { Dashboard, EmployeeGrid } from '../pages/Router';
import { IRoute } from './RouteConfig';

const RouteData: IRoute[] = [
    {
        id: '/dashboard',
        component: Dashboard,
        exact: true,
        breadcrumbs: [{ text: 'Home', route: '/' }, { text: 'Dashboard' }],
    },
    {
        id: '/employee',
        component: EmployeeGrid,
        exact: true,
        breadcrumbs: [{ text: 'Home', route: '/' }, { text: 'Manage' }, { text: 'Employee' }],
    },
];

export default RouteData;
