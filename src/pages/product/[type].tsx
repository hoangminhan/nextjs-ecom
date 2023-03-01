import { productApi } from "@/api-client/product-api";
import { SectionContent } from "@/components";
import { MainLayout } from "@/components/layout";
import { shoeProperties } from "@/types";
import { Pagination } from "antd";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";

export interface ProductTypeProps {
  listProductType: shoeProperties[];
  title: string;
  totalItem: number;
  currentPage: number;
  valueSort: number | string;
}

export default function ProductType(props: ProductTypeProps) {
  const { listProductType, title, totalItem, currentPage, valueSort } = props;
  const router = useRouter();
  console.log({ listProductType, valueSort });

  return (
    <div className="max-w-[1200px] mx-auto mt-12">
      <SectionContent
        title={title.replaceAll("-", " ")}
        data={listProductType}
        currentPage={currentPage}
        isFillter
      />
      {totalItem > 10 && (
        <div className="flex justify-center my-8">
          <Pagination
            total={totalItem}
            defaultCurrent={currentPage}
            onChange={(page, pageSize) => {
              console.log({ router, page });
              router.push({
                query: {
                  _page: +page,
                  _sort_price: valueSort,
                  type: title,
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
ProductType.Layout = MainLayout;
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader("Cache-Control", "s-maxage=5,stale-while-revalidate=5");
  const { params, query } = context;
  const page = query._page || 1;
  const sort_price = query._sort_price || 0;

  const data = await productApi.getProductNSX({
    page,
    nsx: params?.type || "",
    sort_price,
    items: 10,
  });
  console.log(data);
  return {
    props: {
      listProductType: data.data,
      title: params?.type,
      totalItem: data.length,
      currentPage: page,
      valueSort: sort_price,
    },
  };
};
