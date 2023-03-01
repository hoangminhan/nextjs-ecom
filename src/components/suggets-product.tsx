import { productApi } from "@/api-client/product-api";
import { shoeProperties } from "@/types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import * as React from "react";
import { SectionContent } from "./section-content";

export interface SuggestProductProps {
  dataSuggest: shoeProperties[];
}

export function SuggestProduct(props: SuggestProductProps) {
  const { dataSuggest } = props;
  return (
    <div className="mt-8">
      <SectionContent title="Sản phẩm tương tự" data={dataSuggest} />
    </div>
  );
}
// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   return {
//     const data = await productApi.getProductsType({limit:10,
//         name: keyword,
//         page: 1,
//         sort_price: 0,
//     })
//     props: {
//       dataSuggest: [],
//     },
//   };
// };
