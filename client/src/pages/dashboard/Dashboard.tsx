import { FC, useContext, useEffect } from 'react';
import { AppContext } from '../../components/AppContext';
import { IBreadcrumbItem } from '../../components/Breadcrumb';
import OrgLayout from './OrgLayout';

interface IDashboardProp {
    breadcrumbs: IBreadcrumbItem[];
}

const Dashboard: FC<IDashboardProp> = (prop: IDashboardProp) => {
    const { breadcrumbs } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs || []);
    }, [breadcrumbs, setBreadcrumbs]);

    return (
        <div className="dashboard" style={{ height: '100%' }}>
            <OrgLayout />
        </div>
    );
};

export default Dashboard;
