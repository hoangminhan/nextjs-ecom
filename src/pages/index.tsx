import { productApi } from "@/api-client/product-api";
import { MainLayout } from "@/components/layout";
import { SectionContent } from "@/components/section-content";
import { shoeProperties } from "@/types";
import {
  // GetServerSideProps,
  // GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
interface HomePageProps {
  listProduct: shoeProperties[];
  productType: shoeProperties[];
  productListForYou: shoeProperties[];
}
const HomePage = (props: HomePageProps) => {
  const { listProduct, productType, productListForYou } = props;

  return (
    <div className="pt-8 max-w-[1200px] my-0 mx-auto">
      <Head>
        <title>HAShoes</title>
      </Head>
      <SectionContent data={productType} title="Dành riêng cho bạn" />
      <div className="mt-8">
        <SectionContent data={listProduct} title="Mới nhất" />
      </div>
      <div className="mt-8">
        <SectionContent data={productListForYou} title="Dành cho bạn" />
      </div>
    </div>
  );
};

HomePage.Layout = MainLayout;
export default HomePage;

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
  const { data: productForYou } = await productApi.getProductsType({
    items: 8,
    name: "converse",
    page: 1,
    sort_price: 0,
  });
  return {
    props: {
      listProduct: Array.isArray(product) ? handleGetdata(product) : [],
      productType: Array.isArray(data) ? handleGetdata(data) : [],
      productListForYou: Array.isArray(productForYou)
        ? handleGetdata(productForYou)
        : [],
    },
  };
};
