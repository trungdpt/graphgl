import { FC, useContext, useEffect } from 'react';
import { AppContext } from '../../components/AppContext';
import { IBreadcrumbItem } from '../../components/Breadcrumb';

interface IEmployeeGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

const EmployeeGrid: FC<IEmployeeGridProp> = (prop: IEmployeeGridProp) => {
    const { breadcrumbs } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs || []);
    }, [breadcrumbs, setBreadcrumbs]);

    return <div>Employee</div>;
};

export default EmployeeGrid;
