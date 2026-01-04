"use client";

import { User } from "@entities/user";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import { DEMO_CREDENTIALS, demoUser } from "./model";

const STORAGE_KEY = "auth-user";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (id: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Restore Date objects
                parsed.joinedAt = new Date(parsed.joinedAt);
                setUser(parsed);
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback((id: string, password: string): boolean => {
        if (
            id === DEMO_CREDENTIALS.id &&
            password === DEMO_CREDENTIALS.password
        ) {
            setUser(demoUser);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
