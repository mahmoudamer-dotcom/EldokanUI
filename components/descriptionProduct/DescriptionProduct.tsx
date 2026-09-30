"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@base-ui/react";
import Return from "../ReturnsRefunds/Return";
export default function DescriptionProduct({ data }: { data: ProductData }) {
  const [info, setInfo] = useState(data.description_html);
  const [infoReturn, setReturn] = useState("");
  const [itemactive, setItemActive] = useState("");

  console.log(data);
  return (
    <>
      <div className="flex justify-center gap-7 mt-4 mb-4">
        <Button
          onClick={(e) => {
            setInfo(data.description_html);
            setReturn("");
            setItemActive("Description");
          }}
          className={
            itemactive === "Description"
              ? "border p-2 rounded-2xl bg-blue-800 text-white cursor-pointer"
              : "border p-2 rounded-2xl cursor-pointer"
          }
        >
          Description
        </Button>
        <Button
          onClick={(e) => {
            setInfo(data.short_description_html);
            setReturn("");
            setItemActive("Product Specifications");
          }}
          className={
            itemactive === "Product Specifications"
              ? "border p-2 rounded-2xl bg-blue-800 text-white cursor-pointer"
              : "border p-2 rounded-2xl cursor-pointer"
          }
        >
          Product Specifications
        </Button>
        <Button
          onClick={(e) => {
            setReturn("return");
            setItemActive("Returns & Refunds");
          }}
          className={
            itemactive === "Returns & Refunds"
              ? "border p-2 rounded-2xl bg-blue-800 text-white cursor-pointer"
              : "border p-2 rounded-2xl cursor-pointer"
          }
        >
          Returns & Refunds
        </Button>
      </div>
      {infoReturn == "return" ? (
        <Return />
      ) : (
        <div
          className="prose w-full text-gray-700 leading-relaxed space-y-6
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-4
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-6 [&_h2]:mb-3
          [&_p]:text-base [&_p]:text-gray-600 [&_p]:my-3
          [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:my-4
          [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:my-4
          [&_img]:rounded-xl [&_img]:shadow-md [&_img]:mx-auto [&_img]:my-6 [&_img]:max-w-full
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm
          [&_th]:bg-gray-100 [&_th]:p-3 [&_th]:border [&_th]:border-gray-200 [&_th]:font-semibold
          [&_td]:p-3 [&_td]:border [&_td]:border-gray-200 [&_tr]:text-center"
          dangerouslySetInnerHTML={{ __html: info }}
        ></div>
      )}
    </>
  );
}
