import React, { useState } from 'react';

interface IContext {
}

export const AppContext = React.createContext<IContext>({});

const AppContextProvider = (prop: {
    initialValues?: {},
    children: React.ReactNode
}) => {
    const { initialValues, children } = prop || {};

    return (
        <AppContext.Provider
            value={{

            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;