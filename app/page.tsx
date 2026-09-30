import Category from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Slider from "@/components/slider/Slider";
import Story from "@/components/stories/Story";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchUsers } from "@/services/category";
import { HomeApi } from "@/services/home";
import { Products } from "@/services/product";
import { ProductsDetails } from "@/services/productdetails";
import { Heart } from "lucide-react";

import Image from "next/image";

export default async function Home() {
  const { data } = await fetchUsers();
  const { data: HomeAds } = await HomeApi();
  //  let { data: details } = await ProductsDetails(id);
  console.log(HomeAds);
  // console.log(data)

  const categoryNames = data.map((item: any) => item.name);

  const categoriesWithProducts = await Promise.all(
    categoryNames.map(async (catName: string) => {
      const { data: productName } = await Products(catName);
      console.log(productName);
      return {
        categoryName: catName,
        products: productName || [],
      };
    }),
  );

  return (
    <>
      <div className="container mx-auto space-y-10 px-4">
        <Navbar />
        <Category />
        <Story />
        <Slider />

        <div className="space-y-12">
          {categoriesWithProducts.map(({ categoryName, products }, index) =>
            categoryName && products.length > 0 ? (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-bold">{categoryName}</h2>

                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {products.map((product: any, pIndex: number) => (
                      <CarouselItem
                        key={pIndex}
                        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                      >
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex flex-col p-2 w-full h-[350px] relative">
                              <div className="border bg-white  w-fit absolute rounded-full p-1">
                              <Heart  />
                              </div>
                              <Image
                                src={product.image.url}
                                width={800}
                                height={800}
                                alt={product.name || product.title || "Product"}
                                className="h-full"
                              />
                              <p className="mt-2">
                                {product.name.replace(/[---_]/g, '').split(' ').slice(0, 5).join(' ').replace(/[-–—_]$/, '').trim()}
                              </p>
                              <div className=" mt-2">
                                {product.pricing.on_sale? (
                                  <div>
                                    <span className="text-xl  text-primary">
                                      {product.pricing.sale_price?.formatted}
                                    </span>
                                    <div>
                                      <span className="text-lg text-gray-400 line-through">
                                        {product.pricing.regular_price.formatted}
                                      </span>
                                      <span className="text-xl">
                                        {Math.round(
                                          ((product.pricing.regular_price.amount -
                                            product.pricing.sale_price.amount) /
                                            product.pricing.regular_price.amount) *
                                            100,
                                        )}
                                        %
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-xl  text-primary">
                                    {product.pricing.regular_price.formatted}
                                  </span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : null,
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
