import React, { createContext, JSX } from 'react';

import useAuth from '../hooks/useAuth';

export const AuthContext = createContext<unknown>(null);

interface Props {
    children: JSX.Element
}

export const AuthProvider = ({ children }: Props) => {
    const { user, loading, setUser } = useAuth();

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
