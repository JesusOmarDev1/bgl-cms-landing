import { motion } from 'motion/react'
import { SearchIcon, Loader2Icon } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardHeader } from '../ui/card'

export default function SearchLoading() {
  return (
    <div className="container max-w-6xl mx-auto py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-px w-full" />
      </div>

      {/* Loading animation */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="relative">
            <SearchIcon className="h-5 w-5" />
            <div className="absolute -inset-1">
              <Loader2Icon className="h-7 w-7 text-primary/30" />
            </div>
          </div>
          <span className="text-sm font-medium">Buscando...</span>
        </div>
      </div>

      {/* Results skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <Card className="h-full">
              <CardHeader className="p-4 pb-3">
                <Skeleton className="h-48 w-full rounded-lg" />
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
                <div className="flex justify-between items-center pt-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
