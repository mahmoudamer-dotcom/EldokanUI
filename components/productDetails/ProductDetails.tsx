"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { Lottie } from "lottie-react";
import addedToBagAnimation from "@/public/Added to Bag.json";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function ProductDetails({ data }: { data: ProductData }) {
  let categorySeller = data.categories.map((i) => i.name);
  console.log(data);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-7">
          <h2 className="text-xl">{data.brand?.name}</h2>
        </div>
        <p className="text-3xl">{data.name}</p>

        <span>SKU:{data.sku}</span>
        <div className="flex items-center gap-3 mt-2">
          {data.pricing.on_sale ? (
            <div>
              <span className="text-2xl font-bold text-primary">
                {data.pricing.sale_price?.formatted}
              </span>
              <div>
                <span className="text-lg text-gray-400 line-through">
                  {data.pricing.regular_price.formatted}
                </span>
                <span className="text-xl">
                  {Math.round(
                    ((data.pricing.regular_price.amount -
                      data.pricing.sale_price.amount) /
                      data.pricing.regular_price.amount) *
                      100,
                  )}
                  %
                </span>
              </div>
            </div>
          ) : (
            <span className="text-2xl font-bold">
              {data.pricing.regular_price.formatted}
            </span>
          )}
        </div>
        {/* Best Seller */}
        <div>
          <p>Explore other Bestseller in  <Link href={`/category/${categorySeller}`} className="text-blue-600">{categorySeller}</Link> </p>
        </div>

        {data.attributes.map((item, index) => (
          <p className="text-xl" key={index}>
            {item.name}:{item.options.map((item) => item.name)}
          </p>
        ))}

        <div className="flex gap-3 items-center w-full">
          <Button variant="outline" className="p-5 w-[50%]">
            Buy Now
          </Button>

          <Button className="p-5 w-[50%]">
            Add Cart
            <MdOutlineShoppingBag />
          </Button>
        </div>
      </div>
    </>
  );
}
