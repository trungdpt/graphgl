import React, { FC, useState } from 'react';
import { IBreadcrumbItem } from './Breadcrumb';

interface IContext {
    breadcrumbs: IBreadcrumbItem[];
    setBreadcrumbs?(data: IBreadcrumbItem[]): void;
}

interface IContextProviderProp {
    children: React.ReactNode;
}

export const AppContext = React.createContext<IContext>({ breadcrumbs: [] });

const AppContextProvider: FC<IContextProviderProp> = (prop: IContextProviderProp) => {
    const { children } = prop || {};
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([]);

    return (
        <AppContext.Provider
            value={{
                breadcrumbs,
                setBreadcrumbs: (data) => setBreadcrumbs(data),
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
