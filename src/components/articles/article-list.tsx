import { ArticleCard } from './article-card';
import { ArticleListProps } from '../Home';

export function ArticleList({ articles, searchParams }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles found.</p>
        <p className="text-gray-400 text-sm mt-2">
          {searchParams.search || searchParams.tag
            ? 'Try adjusting your search criteria.'
            : 'Create your first article to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
