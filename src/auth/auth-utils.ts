export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
}

export const authUtils = {
    getUser: (): User | null => {
        try {
            const stored = localStorage.getItem('auth-user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    },
    
    setUser: (user: User) => {
        localStorage.setItem('auth-user', JSON.stringify(user));
    },
    
    removeUser: () => {
        localStorage.removeItem('auth-user');
    },
    
    isAuthenticated: (): boolean => {
        return !!authUtils.getUser();
    },
    
    hasRole: (role: string): boolean => {
        const user = authUtils.getUser();
        return user?.role === role;
    },
    
    login: async (email: string, password: string): Promise<User> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'admin@example.com' && password === 'admin123') {
            const user = { id: '1', email, name: 'Admin User', role: 'admin' as const };
            authUtils.setUser(user);
            return user;
        } else if (email === 'user@example.com' && password === 'user123') {
            const user = { id: '2', email, name: 'Regular User', role: 'user' as const };
            authUtils.setUser(user);
            return user;
        }
        
        throw new Error('Invalid email or password');
    },
    
    logout: () => {
        authUtils.removeUser();
    }
};