import React, { useState } from 'react';
import { IBreadcrumbItem } from './Breadcrumb';

interface IContext {
    breadcrumbs: IBreadcrumbItem[],
    setBreadcrumbs?(data: IBreadcrumbItem[]): void
}

export const AppContext = React.createContext<IContext>({ breadcrumbs: [] });

const AppContextProvider = (prop: {
    children: React.ReactNode
}) => {
    const { children } = prop || {};
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([]);

    return (
        <AppContext.Provider
            value={{
                breadcrumbs,
                setBreadcrumbs: (data) => setBreadcrumbs(data)
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;