import { getAllArticles } from '@/services/Article';
import Home from '@/components/Home';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const HomePage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;

  const { data: articles, meta } = await getAllArticles(
    query.page as string,
    '12',
    query
  );

  return (
    <div>
      <Home articles={articles} searchParams={query} />
    </div>
  );
};

export default HomePage;
