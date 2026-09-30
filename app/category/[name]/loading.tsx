import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar/Navbar";
import Category from "@/components/category/Category";

export default function Loading() {
  return (
    <>
    <div className="container mx-auto">

   
      <Navbar />
      <Category />
      <div className="grid grid-cols-4 gap-3 md:grid-col-2 mt-4 ">
      {Array.from({ length: 10 }).map((_, index) => (
       
          <Card className=" mx-auto w-full max-w-sm pt-0 " key={index}>
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
              <CardAction>
                <Skeleton className="h-4 w-2/3" />
              </CardAction>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardFooter className="grid grid-cols-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardFooter>
          </Card>
      
     
    ))}
    </div>
     </div>
    </>
  );
}
