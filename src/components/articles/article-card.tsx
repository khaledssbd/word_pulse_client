'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Sparkles, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { TArticle } from '@/types';
import { deleteArticle, summarizeArticle } from '@/services/Article';
import { toast } from 'sonner';
import { ArticleModal } from './article-modal';

interface ArticleCardProps {
  article: TArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    try {
      setIsDeleting(true);
      const result = await deleteArticle(article.id);

      if (result.success) {
        toast.success(result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    try {
      setIsSummarizing(true);
      setError('');
      setSummary('');

      const result = await summarizeArticle(article.id);

      if (result.success) {
        setSummary(result.data.summary);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to generate summary');
    } finally {
      setIsSummarizing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ArticleModal article={article}>
      <Card className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <p className="text-sm text-gray-500">
            Created on {formatDate(article.createdAt)}
          </p>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-gray-700 line-clamp-3 mb-4">{article.body}</p>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {isSummarizing && !summary && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
              <Skeleton className="h-4 w-20 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          )}

          {summary && !isSummarizing && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">
                AI Summary:
              </h4>
              <p className="text-sm text-blue-800">{summary}</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="flex-1 bg-transparent"
          >
            {isSummarizing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {isSummarizing ? 'Summarizing' : 'Summarize'}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={e => e.stopPropagation()} // Prevent modal from opening
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Article</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{article.title}&quot;?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={e => e.stopPropagation()}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </ArticleModal>
  );
}
