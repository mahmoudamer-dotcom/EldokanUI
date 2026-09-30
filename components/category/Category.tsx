
import { fetchUsers } from "@/services/category";
import Link from "next/link";

export default async function Category() {
  const { data } = await fetchUsers();

  return (
    <div>
      {
        <div className="mt-4 ">
          {data.map((item: any, index: number) => {
            return (
              <Link
                href={`/category/${item.slug || item.name}`}
                className="text-[18px]  border-r-2 border-[#222222] pl-2 pr-2 text-[#222222] last:border-r-0"
                key={index}
              >
                {item.name}
              </Link>
            );
          })
          
          
          }
        </div>
      }
    </div>
  );
}
