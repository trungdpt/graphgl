import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IBreadcrumbItem } from './Breadcrumb';
import NotFound from './NotFound';

export interface IRoute {
    id: string;
    component: React.ElementType;
    exact: boolean;
    breadcrumbs?: IBreadcrumbItem[];
}

interface IRouteConfigProp {
    data?: IRoute[];
}

const RouteConfig: FC<IRouteConfigProp> = (prop: IRouteConfigProp) => {
    const { data } = prop || {};

    const component = (data || []).map((item: IRoute) => {
        const { id, component: Component, exact, breadcrumbs } = item || {};
        return (
            <Route
                key={id}
                path={id}
                exact={exact}
                render={(routeProp) => <Component {...routeProp} breadcrumbs={breadcrumbs} />}
            />
        );
    });
    return (
        <Switch>
            {component}
            <Route component={NotFound} />
        </Switch>
    );
};

export default RouteConfig;
