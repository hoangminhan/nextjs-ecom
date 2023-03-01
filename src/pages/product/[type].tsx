import { productApi } from "@/api-client/product-api";
import { SectionContent } from "@/components";
import { MainLayout } from "@/components/layout";
import { shoeProperties } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";

export interface ProductTypeProps {
  listProductType: shoeProperties[];
  title: string;
}

export default function ProductType(props: ProductTypeProps) {
  const { listProductType, title } = props;
  console.log({ listProductType });

  return (
    <div className="max-w-[1200px] mx-auto mt-12">
      <SectionContent
        title={title.replaceAll("-", " ")}
        data={listProductType}
        isFillter
      />
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
  const sort_price = query._sort_price || "0";
  const limit = 8;

  const { data } = await productApi.getProductNSX({
    page,
    nsx: params?.type || "",
    sort_price,
    item: limit,
  });
  console.log(params);
  return {
    props: {
      listProductType: data,
      title: params?.type,
    },
  };
};
