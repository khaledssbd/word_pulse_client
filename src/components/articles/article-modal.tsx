'use client';

import { TArticle } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface ArticleModalProps {
  article: TArticle;
  children: React.ReactNode;
}

export function ArticleModal({ article, children }: ArticleModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            {article.title}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Created on {formatDate(article.createdAt)}
          </p>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-700 whitespace-pre-wrap">{article.body}</p>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
