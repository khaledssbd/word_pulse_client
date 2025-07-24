'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

// getAllArticles
export const getAllArticles = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString());
  }

  if (query?.tag) {
    params.append('tag', query?.tag.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles?limit=${limit}&page=${page}&${params}`,
      {
        method: 'GET',
        next: {
          tags: ['ARTICLES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// createAnArticle
export const createAnArticle = async (content: FieldValues): Promise<any> => {
  const token = await getValidToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(content),
  });

  revalidateTag('ARTICLES');

  const result = await res.json();
  return result;
};

// deleteArticle
export const deleteArticle = async (id: string): Promise<any> => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: token },
      }
    );

    revalidateTag('ARTICLES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export async function summarizeArticle(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles/${id}/summarize`,
      {
        method: 'POST',
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
}
