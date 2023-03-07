import { shoeProperties } from "@/types";
import Image from "next/image";
import * as React from "react";
import { StarFilled } from "@ant-design/icons";
import Link from "next/link";
import { filterPrice } from "@/const";
import { useRouter } from "next/router";

export interface SectionContentProps {
  data: shoeProperties[];
  title: string;
  isFillter?: boolean;
  currentPage?: number;
  isLoading?: boolean;
  isLoadMore?: boolean;
  destinationPath?: string;
}

export function SectionContent(props: SectionContentProps) {
  const {
    data,
    title,
    isFillter,
    currentPage,
    isLoadMore,
    destinationPath,
  } = props;
  const [quantityProduct, setQuantityProduct] = React.useState(10);
  const router = useRouter();

  return (
    <div className="shadow-card rounded-[0.5rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xl font-semibold capitalize text-[#212427]">
          {title}
        </p>
        {isFillter && (
          <div className="flex items-center gap-2">
            {/* <p className="cursor-pointer">Tăng</p>
            <p className="cursor-pointer">Giảm</p> */}
            {filterPrice.map((item, index) => {
              return (
                <p
                  key={item.value}
                  className={`cursor-pointer px-2 py-1 rounded-lg hover:bg-primaryColor hover:text-white duration-200 ease-in-out ${
                    item.value == router?.query._sort_price ||
                    (!Object.keys(router.query).includes("_sort_price") &&
                      item.value === "0")
                      ? "bg-primaryColor text-white"
                      : "bg-transparent text-black"
                  }
                
                  `}
                  onClick={() => {
                    router.push({
                      pathname: router.pathname,
                      query: {
                        _page: currentPage,
                        _sort_price: item.value,
                        [`${destinationPath}`]: title.replaceAll(" ", "-"),
                      },
                    });
                  }}
                >
                  {item.title}
                </p>
              );
            })}
          </div>
        )}
      </div>
      {/* body */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 cursor-pointer">
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`rounded-md border border-solid border-[#e8dfec] p-4 ${
                index <= quantityProduct ? "block" : "hidden"
              }`}
              data-aos="zoom-in"
            >
              <Link href={`/detail/${item._id}`}>
                <div className="flex gap-1 text-[0.9rem] text-slate-500">
                  <p className="flex gap items-center mb-1">
                    <StarFilled
                      style={{ color: "#b5b51d", marginRight: "2px" }}
                    />
                    {item.rating > 5 ? 5 : item.rating}
                    <span>/5</span>
                  </p>
                </div>
                <p className="mb-2 truncate text-[1.1rem] font-semibold capitalize text-slate-800">
                  {item.name}
                </p>
                <div className="group w-[250px] h-[250px] [perspective:1000px]">
                  <div className="relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute w-[250px] h-[250px] inset-0">
                      <Image
                        src={item.poster[0].url}
                        alt=""
                        fill
                        object-fit="contain"
                      />
                    </div>
                    <div className="absolute w-[250px] h-[250px] inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <Image
                        src={item.poster[1].url}
                        alt=""
                        fill
                        object-fit="contain"
                      />
                    </div>
                  </div>
                </div>

                {/* price */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col gap-1 text-[1.2rem] font-semibold text-[#ec1839]">
                    <p className="text-[0.85rem] text-slate-500">Giá bán</p>
                    <p>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 2,
                      }).format(item.price)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-1">
                    {item.poster.slice(0, 2).map((shoe, index) => {
                      return (
                        <div
                          key={shoe.id}
                          className="border-solid border-[1px] border-[#e8dfec] rounded-sm cursor-pointer relative w-10 h-10"
                        >
                          <Image
                            src={item.poster[index].url}
                            alt=""
                            fill
                            object-fit="contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* load more */}
      {isLoadMore && (
        <div className="mt-9 flex justify-center">
          <p
            className="px-3 py-1 bg-primaryColor text-white rounded-md cursor-pointer duration-150 hover:scale-105 ease-in-out"
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  items: Number(router.query.items) <= 10 ? 20 : 10,
                },
              });
            }}
          >
            {quantityProduct <= 10 ? "Show more" : "Show less"}
          </p>
        </div>
      )}
    </div>
  );
}
