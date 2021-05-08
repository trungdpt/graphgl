import { useContext } from 'react';
import { Breadcrumb } from 'antd';
import { AppContext } from './AppContext';

export interface IBreadcrumbItem {
    text: string;
    route?: string;
}

const Breadcrumbs = () => {
    const appContext = useContext(AppContext);
    const { breadcrumbs } = appContext || {};
    const children = (breadcrumbs || []).map((breadcrumb, index) => {
        const { text, route } = breadcrumb || {};
        return (
            <Breadcrumb.Item
                key={index}
                className="app-breadcrumb-item"
                href={route}
            >
                {text}
            </Breadcrumb.Item>
        );
    });
    return (
        <Breadcrumb className="app-breadcrumb">
            {children}
        </Breadcrumb>
    );
};

export default Breadcrumbs;