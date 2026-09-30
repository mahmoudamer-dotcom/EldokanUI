import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Category from '@/components/category/Category'
import Navbar from '@/components/navbar/Navbar'

export default function Loading() {
  return (
    <main className="container mx-auto px-4" aria-label="Loading page">
      <Navbar />
      <Category />
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card className="mx-auto w-full max-w-sm overflow-hidden pt-0" key={index}>
            <Skeleton className="aspect-square w-full" />
            <CardHeader>
              <CardAction>
                <Skeleton className="h-4 w-2/3" />
              </CardAction>
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
