import { Suspense } from 'react';
import LoginForm from '@/components/auth/login-form';
import { AuthFormSkeleton } from '@/components/auth/auth-skeleton';

const LoginPage = async () => {
  return (
    <Suspense fallback={<AuthFormSkeleton />}>
      <LoginPageContent />
    </Suspense>
  );
};

const LoginPageContent = async () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
