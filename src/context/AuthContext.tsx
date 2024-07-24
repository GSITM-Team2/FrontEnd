"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import configurationInfo from "../../src/app/firebase.js"; // firebase 설정 파일의 경로를 확인하세요

// Firebase 설정
const firebaseConfig = configurationInfo();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
    user: User | null;
    idToken: string | null;
    setUser: (user: User | null) => void;
    setIdToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                user.getIdToken().then(setIdToken);
            } else {
                setIdToken(null);
            }
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, idToken, setUser, setIdToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
