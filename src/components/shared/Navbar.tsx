'use client';

import logo from '@/assets/logo.png';
import { Button } from '../ui/button';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

import { logOut } from '@/services/Auth';
import { useUser } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/constants';
import Image from 'next/image';

const Navbar = () => {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    setIsLoading(true);
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/auth/login');
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo for all */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="hidden sm:flex text-2xl font-medium items-center"
            >
              <Image
                src={logo}
                alt="Logo Image"
                className="h-10 w-10 object-contain"
              />
              <span className="text-primary">Word</span>Pulse
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.email ? user?.email : 'Guest'}
            </span>
            {user?.email ? (
              <Button variant="outline" size="sm" onClick={handleLogOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLogin}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
