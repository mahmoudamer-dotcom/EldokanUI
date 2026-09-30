"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function Slider() {
  return (
    <div>
      <Carousel
     opts={{ loop: true }}
         plugins={[

        Autoplay({
          delay: 4000,
        }),
      ]}
      
      className="w-full mt-4 h-100 ">
        <CarouselContent className="h-100  mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="h-100 ">
              <div className="p-1 h-100 ">
                <Card className="h-100 ">
                  <CardContent className=" flex aspect-square items-center justify-center p-6 h-100">
                    <span className="text-4xl font-semibold">{index + 1}</span>
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
  );
}
