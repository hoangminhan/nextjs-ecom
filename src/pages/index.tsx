import { productApi } from "@/api-client/product-api";
import { MainLayout } from "@/components/layout";
import { SectionContent } from "@/components/section-content";
import { NextPageWithLayout, shoeProperties } from "@/types";
import {
  // GetServerSideProps,
  // GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { useEffect } from "react";
interface HomePageProps {
  listProduct: shoeProperties[];
  productType: shoeProperties[];
}
const HomePage = (props: HomePageProps) => {
  const { listProduct, productType } = props;
  console.log("clg", listProduct);
  console.log("clgType", productType);
  // useEffect(() => {
  //   (async () => {
  //     await productApi.getListProduct({ limit: 8 });
  //   })();
  // });
  return (
    <div className="pt-8 max-w-[1200px] my-0 mx-auto">
      <SectionContent data={productType} title="Dành riêng cho bạn" />
    </div>
  );
};

HomePage.Layout = MainLayout;
export default HomePage;

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const data = await productApi.getListProduct({ limit: 8 });
//   console.log("run", data);
//   return {
//     props: {
//       listProduct: data,
//     },
//   };
// };

// server side run at build-time
// dev => always when request. Prod=> run khi build
const handleGetdata = (data: shoeProperties[]) => {
  return data.map((item: shoeProperties) => {
    return {
      _id: item._id,
      poster: item.poster,
      price: item.price,
      collections: item.collections,
      name: item.name,
      rating: item.rating,
      numReviews: item.numReviews,
    };
  });
};
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { product } = await productApi.getListProduct({ limit: 8 });
  const { data } = await productApi.getProductsType({
    items: 8,
    name: "puma",
    page: 1,
    sort_price: 0,
  });
  // console.log({ product_type });
  return {
    props: {
      listProduct: Array.isArray(product) ? handleGetdata(product) : [],
      productType: Array.isArray(data) ? handleGetdata(data) : [],
    },
  };
};
