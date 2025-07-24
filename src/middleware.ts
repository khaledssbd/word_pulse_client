import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './services/Auth';

const authRoutes = ['/auth/register', '/auth/login'];

export const middleware = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        `${origin}/auth/login?redirectPath=${pathname}`
      );
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: ['/auth/register', '/auth/login', '/profile'],
};
