'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { loginUser, registerUser } from '@/services/Auth';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/context/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '../ui/password-input';
import { registerSchema } from '@/app/validationSchemas';

const passwordRequirements = [
  { label: 'One uppercase letter', test: (pw: string) => /[A-Z]/.test(pw) },
  { label: 'One lowercase letter', test: (pw: string) => /[a-z]/.test(pw) },
  { label: 'One number', test: (pw: string) => /[0-9]/.test(pw) },
  {
    label: 'One special character',
    test: (pw: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(pw),
  },
  { label: 'Minimum 8 characters', test: (pw: string) => pw.length >= 8 },
];

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch('password') || '';
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const router = useRouter();
  const { setIsLoading } = useUser();

  useEffect(() => {
    const valid = passwordRequirements.every(rule => rule.test(password));
    setIsPasswordValid(valid);
  }, [password]);

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);

      if (res?.success) {
        toast.success(res.message);
        router.push('/');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} value={field.value || ''} />
                </FormControl>

                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((rule, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          rule.test(password) ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      />
                      <span
                        className={`${
                          rule.test(password)
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-2"
            // disabled={!isPasswordValid}
            type="submit"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
