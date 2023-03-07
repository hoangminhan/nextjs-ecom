import { MainLayout } from "@/components/layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import * as React from "react";
import { shoeProperties } from "@/types";
import { useRouter } from "next/router";
import { productApi } from "@/api-client/product-api";
import { SectionContent } from "@/components";

export interface TrademarkProps {
  dataTradeMark: shoeProperties[];
  title: string;
}

export default function Trademark({ dataTradeMark, title }: TrademarkProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <div className="max-w-[1200px] mx-auto mt-12">
      <SectionContent
        title={title}
        data={dataTradeMark}
        destinationPath="trademarktype"
        isFillter
        isLoadMore
      />
    </div>
  );
}

Trademark.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params, query } = context;

  let result;
  if (params?.trademarktype) {
    try {
      const currentPage = query?._page || 1;
      const limit = query?.limit || 10;

      const sort_price = query._sort_price || 0;
      const { data } = await productApi.getProductsType({
        name: params?.trademarktype,
        items: limit,
        sort_price,
        page: currentPage,
      });
      result = [...data];
    } catch (error) {
      console.log("err", error);
    }
  }

  return {
    props: {
      dataTradeMark: Array.isArray(result) ? result : [],
      title: params?.trademarktype,
    },
  };
};
