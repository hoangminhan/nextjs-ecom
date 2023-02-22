import { productApi } from "@/api-client/product-api";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout, shoeProperties } from "@/types";
import {
  // GetServerSideProps,
  // GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
interface HomePageProps {
  listProduct: [];
}
const HomePage = (props: HomePageProps) => {
  const { listProduct } = props;
  console.log("clg", listProduct);
  return <div>HomePage</div>;
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
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { product } = await productApi.getListProduct({ limit: 8 });
  console.log("run");
  return {
    props: {
      listProduct:
        product.map((item: shoeProperties) => {
          return {
            _id: item._id,
            poster: item.poster,
            price: item.price,
            name: item.name,
          };
        }) || [],
    },
  };
};
