"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type ProductImage = { url: string };
type ProductData = { images: ProductImage[] };

export default function ImagesSlider({
  data,
  selectedIndex,
  onSelectIndex,
}: {
  data: ProductData;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}) {
  return (
    <Carousel opts={{ align: "start" }} 
      plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
    className="mx-auto w-full mt-1 ">
      <CarouselContent className="p-6">
        {data.images.map((item, index) => (
          <CarouselItem
            key={`${item.url}-${index}`}
            className="basis-1/2 lg:basis-1/3 m-1 "
          >
            <button
              type="button"
              onClick={() => onSelectIndex(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={selectedIndex === index}
              className={`w-full rounded-md  ${selectedIndex === index ? "ring-2 ring-primary" : ""}`}
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={item.url}
                    width={700}
                    height={700}
                    alt={`Product image ${index + 1}`}
                  />
                </CardContent>
              </Card>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
  );
}
