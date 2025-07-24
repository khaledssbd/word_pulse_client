import { Skeleton } from "@/components/ui/skeleton"

export function SummarySkeleton() {
  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
      <div className="flex items-center mb-2">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  )
}
