import { AuthContext, AuthState, UserModel } from "@/src/types";

export const createAuthContext = (): AuthContext => {
    const getStoredAuth = (): AuthState => {
        try {
            const token = localStorage.getItem('accessToken');
            const userStr = localStorage.getItem('user');
            return {
                token,
                user: userStr ? JSON.parse(userStr) : null,
            };
        } catch (error) {
            console.error('Error parsing stored auth data:', error);
            return { token: null, user: null };
        }
    };

    let authState = getStoredAuth();

    return {
        get isAuthenticated(): boolean {
            const currentState = getStoredAuth();
            return !!currentState.token;
        },
        
        get user(): UserModel | null {
            const currentState = getStoredAuth();
            return currentState.user;
        },

        login: (token: string, userData: UserModel): void => {
            try {
                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', JSON.stringify(userData));
                authState = { token, user: userData };
            } catch (error) {
                console.error('Error storing auth data:', error);
            }
        },
        
        logout: (): void => {
            try {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                localStorage.removeItem('refreshToken');
                authState = { token: null, user: null };
            } catch (error) {
                console.error('Error clearing auth data:', error);
            }
        },
        
        refresh: (): void => {
            authState = getStoredAuth();
        }
    };
};