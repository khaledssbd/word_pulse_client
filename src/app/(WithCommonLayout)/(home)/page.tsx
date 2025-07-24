import { getAllArticles } from '@/services/Article';
import Home from '@/components/Home';
import { Paginate } from '@/components/shared/Pagination';

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
      <Home articles={articles} searchParams={query} meta={meta} />
      <div className="flex justify-center mt-8">
        <Paginate meta={meta} />
      </div>
    </div>
  );
};

export default HomePage;
