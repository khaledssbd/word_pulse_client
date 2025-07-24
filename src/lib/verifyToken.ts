'use server';

import { getNewToken } from '@/services/Auth';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get('accessToken')!.value;
  const refreshToken = cookieStore.get('refreshToken')!.value;

  if (!accessToken || (await isTokenExpired(accessToken))) {
    const { data } = await getNewToken(refreshToken);
    accessToken = data?.accessToken;
    (await cookies()).set('accessToken', accessToken);
  }

  return accessToken;
};
