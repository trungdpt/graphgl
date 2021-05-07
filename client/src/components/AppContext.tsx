import React, { useState } from 'react';
import { HashHistory } from 'history';

interface IContext {
    history?: HashHistory;
    setHistory?(history: HashHistory): void;
}

export const AppContext = React.createContext<IContext>({});

const AppContextProvider = (prop: {
    initialValues: { history: HashHistory },
    children: React.ReactNode
}) => {
    const { initialValues, children } = prop || {};
    const [history, setHistory] = useState<HashHistory | undefined>(initialValues.history);

    return (
        <AppContext.Provider
            value={{
                history,
                setHistory: (history: HashHistory) => setHistory(history)
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;