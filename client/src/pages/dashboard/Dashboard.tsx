import { FC, useContext, useEffect } from 'react';
import { AppContext } from '../../components/AppContext';
import { IBreadcrumbItem } from '../../components/Breadcrumb';

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
      Dashboard
    </div>
  );
};

export default Dashboard;