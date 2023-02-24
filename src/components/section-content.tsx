import { shoeProperties } from "@/types";
import Image from "next/image";
import * as React from "react";
import { NumericFormat } from "react-number-format";

export interface SectionContentProps {
  data: shoeProperties[];
  title: string;
}

export function SectionContent(props: SectionContentProps) {
  const { data, title } = props;
  return (
    <div className="shadow-card rounded-[0.5rem] p-5">
      <div className="mb-2">
        <p className="text-xl font-semibold capitalize text-[#212427]">
          {title}
        </p>
      </div>
      {/* body */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded border border-solid border-[#e8dfec] p-4"
            >
              <p className="flex gap-1 text-[0.9rem] text-slate-500">
                {item.rating}
              </p>
              <p className="mb-2 truncate text-[1.1rem] font-semibold capitalize text-slate-800">
                {item.name}
              </p>
              <div>
                <Image
                  src={item.poster[0].url}
                  alt=""
                  width={250}
                  height={250}
                />
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
                <div className="flex justify-end">
                  {item.poster.slice(0, 2).map((shoe, index) => {
                    return (
                      <div key={index}>
                        <Image
                          src={shoe.url}
                          alt=""
                          width={40}
                          height={40}
                          className="flex rounded border border-[#e8dfec]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
