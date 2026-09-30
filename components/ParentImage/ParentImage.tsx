"use client";
import { useState } from "react";
import ImagesSlider from "../imagesSlider/ImagesSlider";
import ImageProduct from "../imagesProduct/ImageProduct";

type ProductImage = { url: string };
type ProductData = { images: ProductImage[] };

export default function ParentImage({ data }: { data: ProductData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <ImageProduct
        data={data}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}/>
      <ImagesSlider
        data={data}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}/>
        
    </>
  );
}
