import Category from "@/components/category/Category";
import Navbar from "@/components/navbar/Navbar";
import { ProductsDetails } from "@/services/productdetails";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import ParentImage from "@/components/ParentImage/ParentImage";
import ProductDetails from "@/components/productDetails/ProductDetails";
import DescriptionProduct from "@/components/descriptionProduct/DescriptionProduct";
import Footer from "@/components/footer/Footer";

export default async function page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  let { id } = await params;
  let { data } = await ProductsDetails(id);
  let categoryName = data.categories.map((i) => i.name);
  console.log(data);
  return (
    <>
    <div className="container mx-auto">

    
      <Navbar />
      <Category />
      <Breadcrumb className="mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/">Home</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link href={`/category/${categoryName}`}>{categoryName}</Link>
              }
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-2 gap-7">
        <div>
          <ParentImage data={data} />
        </div>
        <div>
          <ProductDetails data={data} />
        </div>
      </div>
      <DescriptionProduct data={data}/>
      </div>
      <Footer/>
    </>
  );
}
