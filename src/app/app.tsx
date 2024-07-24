"use client";

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
const MyApp: React.FC<{ Component: React.FC; pageProps: any }> = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;