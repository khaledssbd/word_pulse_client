import { Skeleton } from "@/components/ui/skeleton"

export function SearchBarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-48">
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  )
}
