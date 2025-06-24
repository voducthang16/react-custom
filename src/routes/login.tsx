import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { requireGuest } from '@/utils/auth-guards';
import type { LoginCredentials, LoginResponse } from '@/src/types';

const searchSchema = z.object({
    redirect: z.string().optional(),
});

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required').trim(),
    password: z.string().min(1, 'Password is required'),
});

type SearchParams = z.infer<typeof searchSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return response.json();
};

export const Route = createFileRoute('/login')({
    component: Login,
    validateSearch: searchSchema,
    beforeLoad: ({ context, search }) => {
        requireGuest(context, search);
    },
    staticData: {
        title: "Login",
    },
});

function Login() {
    const navigate = useNavigate();
    const search = Route.useSearch() as SearchParams;
    const { auth } = Route.useRouteContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data: LoginResponse) => {
            auth.login(data.accessToken, {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                image: data.image,
            });
            
            localStorage.setItem('refreshToken', data.refreshToken);

            const redirectTo = search.redirect || '/dashboard';
            navigate({ to: redirectTo });
        },
        onError: (error: Error) => {
            console.error('Login failed:', error);
        },
    });

    const onSubmit = (data: LoginFormData): void => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        🔐 Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your credentials to access protected routes
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {loginMutation.error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            <div className="text-sm text-red-700">
                                {loginMutation.error.message}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username *
                            </label>
                            <input
                                id="username"
                                type="text"
                                autoComplete="username"
                                {...register('username')}
                                disabled={loginMutation.isPending || isSubmitting}
                                className={`mt-1 appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 ${
                                    errors.username 
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300'
                                }`}
                                placeholder="Enter your username"
                                aria-invalid={errors.username ? 'true' : 'false'}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                {...register('password')}
                                disabled={loginMutation.isPending || isSubmitting}
                                className={`mt-1 appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 ${
                                    errors.password 
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300'
                                }`}
                                placeholder="Enter your password"
                                aria-invalid={errors.password ? 'true' : 'false'}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loginMutation.isPending || isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {(loginMutation.isPending || isSubmitting) && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            )}
                            {(loginMutation.isPending || isSubmitting) ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
                        <div className="text-xs text-blue-800 space-y-1">
                            <div>
                                <strong>Admin:</strong> emilys / emilyspass
                            </div>
                            <div>
                                <strong>User:</strong> michaelw / michaelwpass
                            </div>
                        </div>
                    </div>

                    {search.redirect && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-700">
                                You need to sign in to access: <code className="bg-yellow-100 px-1 rounded">{search.redirect}</code>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}