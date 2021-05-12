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
        <div className="dashboard">
            <fieldset className="field-set">
                <legend>Sơ đồ tổ chức</legend>
                <OrgLayout />
            </fieldset>
        </div>
    );
};

export default Dashboard;
