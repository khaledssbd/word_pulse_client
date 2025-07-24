import { ArticleList } from '@/components/articles/article-list';
import { CreateArticleDialog } from '@/components/articles/create-article-dialog';
import { SearchBar } from '@/components/search/search-bar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import { ArticleListSkeleton } from '@/components/articles/article-list-skeleton';
import { TArticle } from '@/types';
import { IMeta } from '@/types/meta';

export interface ArticleListProps {
  articles: TArticle[];
  searchParams: {
    search?: string;
    tag?: string;
    page?: string;
  };
  meta: IMeta;
}

const Home = ({ articles = [], searchParams, meta }: ArticleListProps) => {
  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Your Articles</h2>
            <CreateArticleDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </CreateArticleDialog>
          </div>

          <SearchBar />
        </div>

        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList
            articles={articles}
            searchParams={searchParams}
            meta={meta}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
