import { fetchUsers } from "@/services/category";
import { LifeBuoy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const { data } = await fetchUsers();
  // console.log(data);
  return (
    <>
      <div className="bg-[#F7F7F7] text-black mt-4">
        <div className="container mx-auto flex justify-between p-2 ">
          <div className="flex gap-2 ">
            <div className=" flex-col gap-2">
              <h2>We're Always Here To Help</h2>
              <p>Reach out to us through any of these support channels</p>
            </div>
          </div>
          <div>
            <h2>Phone Support</h2>
            <Link
              href="https://wa.me/201006806022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center text-[15px] font-medium"
            >
              <LifeBuoy
                color="#222222"
                className="bg-gray-300 rounded-full p-1 w-[30px] h-[30px]"
              />
              01006806022
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-black text-white">
        <div className="container mx-auto p-2">
          <div className="flex flex-col gap-2 mb-4 mt-2  w-fit">
            
            {data.map((item , index) => (
              <Link key={index} href={`/category/${item.slug || item.name}`}>
                {item.name}
              </Link>
            ))}
          </div>

          
          <div className="flex justify-between items-center">
            <div>
              <Image
                src="/image/Eldokan-logo.webp"
                width={100}
                height={100}
                className="rounded-[5px]"
                alt="Eldokan Logo"
              />
            </div>

            <div className="flex gap-4">
              <Link href="https://sell.eldokan.com/login" target="_blank">
                Sell With Us
              </Link>
              <Link href="https://sell.eldokan.com/login" target="_blank">
                Careers
              </Link>
              <Link href="https://sell.eldokan.com/login" target="_blank">
                Privacy Policy
              </Link>
              <Link href="https://sell.eldokan.com/login" target="_blank">
                Terms of Use
              </Link>
              <Link href="https://sell.eldokan.com/login" target="_blank">
                Terms of Sale
              </Link>
              <Link href="https://sell.eldokan.com/login" target="_blank">
                Returns & Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
