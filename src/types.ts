import { QueryClient } from "@tanstack/react-query";
import { createAuthContext } from "./context/auth-context";

export interface UserModel {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    roles?: string[];
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse extends UserModel {
    accessToken: string;
    refreshToken: string;
}

export interface AuthContext {
    isAuthenticated: boolean;
    user: UserModel | null;
    login: (token: string, user: UserModel) => void;
    logout: () => void;
    refresh: () => void;
}

export interface AuthState {
    token: string | null;
    user: UserModel | null;
}

export interface RouterContext {
    queryClient: QueryClient;
    auth: ReturnType<typeof createAuthContext>;
}