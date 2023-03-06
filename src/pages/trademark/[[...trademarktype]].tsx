import { MainLayout } from "@/components/layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import * as React from "react";
import { shoeProperties } from "@/types";
import { useRouter } from "next/router";
import { productApi } from "@/api-client/product-api";
import { SectionContent } from "@/components";
import { ParsedUrlQuery } from "querystring";

export interface TrademarkProps {
  dataTradeMark: shoeProperties[];
}
interface Params extends ParsedUrlQuery {
  trademarktype: string[];
}

export default function Trademark({ dataTradeMark }: TrademarkProps) {
  console.log({ dataTradeMark });
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <div className="max-w-[1200px] mx-auto mt-12">
      <SectionContent title="hello" data={dataTradeMark} isLoadMore />
    </div>
  );
}

Trademark.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { product } = await productApi.getListProduct({ limit: 1 });
  console.log("pro", product);
  // const paths = product?.map?.length
  //   ? product?.map((item, index) => {
  //       console.log(item.key);
  //       return { params: { trademarkname: item.key } };
  //     })
  //   : [];
  const paths = product?.length
    ? product.map((item) => ({
        params: { trademarktype: [item.key] },
      }))
    : [];

  return { paths, fallback: false };

  // return {
  //   paths: [
  //     {
  //       params: {
  //         trademarkname: Array.isArray(product) ? product[0].key : "",
  //       },
  //     },
  //   ],
  //   fallback: "blocking",
  // };
};
export const getStaticProps: GetStaticProps<TrademarkProps, Params> = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const query = context as Record<string, string>;
  console.log("context", context);
  console.log("params", params);
  console.log("đâsdasd", getQueryString(query));

  let result;
  // if (params?.trademarkname) {
  //   try {
  //     const { data } = await productApi.getProductsType({
  //       name: params?.trademarkname,
  //       limit: 10,
  //     });
  //     result = [...data];
  //   } catch (error) {
  //     console.log("err", error);
  //   }
  // }

  return {
    props: {
      dataTradeMark: Array.isArray(result) ? result : [],
    },
    revalidate: 1,
  };
};
function getQueryString(query: Record<string, string>) {
  const keys = Object.keys(query);
  if (!keys.length) {
    return "";
  }

  const queryString = keys.map((key) => `${key}=${query[key]}`).join("&");
  return `?${queryString}`;
}
