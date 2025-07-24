import { HeaderSkeleton } from "./header-skeleton"
import { SearchBarSkeleton } from "@/components/search/search-skeleton"
import { ArticleListSkeleton } from "@/components/articles/article-list-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSkeleton />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          <SearchBarSkeleton />
        </div>

        <ArticleListSkeleton />
      </main>
    </div>
  )
}
