import { Dashboard, EmployeeGrid, Practice } from '../pages/Router';
import { IRoute } from '../components/RouteConfig';
import { IBreadcrumbItem } from '../components/Breadcrumb';

const homeItem: IBreadcrumbItem = { text: 'Home', route: '/' };
const manageItem: IBreadcrumbItem = { text: 'Manage' };

const RouteData: IRoute[] = [
    {
        id: '/dashboard',
        component: Dashboard,
        exact: true,
        breadcrumbs: [homeItem, { text: 'Dashboard' }],
    },
    {
        id: '/employee',
        component: EmployeeGrid,
        exact: true,
        breadcrumbs: [homeItem, manageItem, { text: 'Employee' }],
    },
    {
        id: '/practice',
        component: Practice,
        exact: true,
        breadcrumbs: [homeItem, manageItem, { text: 'Practice' }],
    },
];

export default RouteData;
