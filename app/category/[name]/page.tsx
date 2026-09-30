import Category from "@/components/category/Category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar/Navbar";
import { Products } from "@/services/product";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer/Footer";

export default async function page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  let { name } = await params;
  const decodedName = decodeURIComponent(name);
  const { data } = await Products(decodedName);
  console.log(data);

  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Category />
        <div className="grid grid-cols-4 gap-3 md:grid-col-2 mt-4 ">
          {data.filter((item) => item.stock?.status === 'in_stock')
          .map((item) => {
            return (
              
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className=" mx-auto w-full  pt-0 ">
                  <Image
                    src={item.image.url}
                    alt="Event cover"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <CardHeader>
                    <CardAction>
                      <Badge variant="secondary">{item.seller?.name}</Badge>
                    </CardAction>
                    <CardTitle>{item.name.replace(/[---_+]/g,' ').split(' ').slice(0, 3).join(' ').replace(/[-–—_+]$/, '').trim()}</CardTitle>
                      <div className=" mt-2">
                                {item.pricing.on_sale ? (
                                  <div>
                                    <span className="text-xl  text-primary">
                                      {item.pricing.sale_price?.formatted}
                                    </span>
                                    <div>
                                      <span className="text-lg text-gray-400 line-through">
                                        {item.pricing.regular_price.formatted}
                                      </span>
                                      <span className="text-xl">
                                        {Math.round(
                                          ((item.pricing.regular_price.amount -
                                            item.pricing.sale_price.amount) /
                                            item.pricing.regular_price.amount) *
                                            100,
                                        )}
                                        %
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-xl  text-primary">
                                    {item.pricing.regular_price.formatted}
                                  </span>
                                )}
                              </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
