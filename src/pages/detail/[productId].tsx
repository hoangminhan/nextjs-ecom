import { productApi } from "@/api-client/product-api";
import { MainLayout } from "@/components/layout";
import { shoeProperties } from "@/types";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";

export interface DetailProductProps {
  productInfo: shoeProperties;
}

export default function DetailProduct(props: DetailProductProps) {
  const { productInfo } = props;
  const [currentShoe, setCurrentShoe] = React.useState<string>("");
  const [currentSize, setCurrentSize] = React.useState<number>();
  const router = useRouter();

  React.useEffect(() => {
    if (Object.keys(productInfo || {}).length && currentShoe === "") {
      setCurrentShoe(productInfo.poster[0].url);
      // setCurrentSize(productInfo.size[0]);
    }
  }, [productInfo]);
  if (router.isFallback) {
    return <div>Loading....</div>;
  }
  return (
    <div className="mt-8 max-w-[1200px] mx-auto">
      <div className="shadow-card rounded-[0.5rem] flex gap-3 p-5 lg:flex-row">
        {/* info product */}
        <div className="flex-1 flex flex-col">
          <div className="">
            <h3>Thông tin sản phẩm</h3>
            <p>
              Tên sản phẩm: <span>{productInfo.name}</span>
            </p>
            <p>
              Nhà xuất bản: <span>{productInfo.key}</span>
            </p>
            <p>
              Bộ sưu tập: <span>{productInfo.collections}</span>
            </p>
            <p>
              Dành cho: <span>{productInfo.sex}</span>
            </p>
          </div>
          {/* des product */}
          <div>
            <h3>Mô tả sản phẩm</h3>
            <p>
              {productInfo.description.replace("<p>", "").replace("</p>", "")}
            </p>
          </div>
        </div>
        {/* detail product */}
        <div className="flex-1">
          <h2 className="text-center">{productInfo.name}</h2>
          <div className="mt-4 flex justify-center gap-6 items-center">
            {/* type */}
            <div className="flex flex-col gap-2">
              {productInfo.poster.map((typeShoe, index) => {
                return (
                  <div
                    key={typeShoe.url}
                    className={`relative border-solid border-[1px] border-[#e8dfec] w-[60px] h-[60px] cursor-pointer`}
                    onClick={() => {
                      setCurrentShoe((pre) => {
                        return pre === typeShoe.url ? pre : typeShoe.url;
                      });
                    }}
                  >
                    <Image
                      key={typeShoe.url}
                      src={typeShoe.url}
                      fill
                      object-fit="contain"
                      alt="#"
                    />
                    {currentShoe === typeShoe.url && (
                      <div className="absolute z-10 bottom-0 left-[50%] -translate-x-1/2">
                        <CheckCircleTwoTone />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/*  */}
            <div>
              <div className="relative h-[320px] w-[320px]">
                <Image src={currentShoe} alt="" fill object-fit="contain" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <p>
                  <span className="font-bold">Price:</span>
                  <span className="ml-1 text-[#ec1839]">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      minimumFractionDigits: 2,
                    }).format(productInfo.price)}
                  </span>
                </p>
                <div>
                  <p className="px-3 py-2 bg-[#ccc] rounded-md cursor-pointer">
                    Add to card
                  </p>
                </div>
              </div>
            </div>
            {/* size */}
            <div className="flex flex-col gap-3">
              <h3>Size</h3>
              <div className="flex flex-col gap-2">
                {productInfo.size.map((sizeShoe) => {
                  return (
                    <p
                      key={sizeShoe}
                      className={`hover:bg-[#ff8b05] hover:text-white duration-250 ease-linear rounded-md p-2 border-solid border-[1px] border-[#e8dfec] cursor-pointer ${
                        currentSize === sizeShoe
                          ? "bg-[#ff8b05] text-white"
                          : "bg-transparent text-black"
                      }`}
                      onClick={() => {
                        if (currentSize !== sizeShoe) {
                          setCurrentSize(sizeShoe);
                        }
                      }}
                    >
                      {sizeShoe}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
DetailProduct.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const { product } = await productApi.getListProduct({ limit: 10 });

  return {
    paths: Array.isArray(product)
      ? product?.map((item: shoeProperties) => ({
          params: { productId: `${item._id}` },
        }))
      : [],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const idDetail = context.params?.productId;
  let result;
  if (idDetail) {
    result = await productApi.getProductById(`${idDetail}`);
  }
  return {
    props: {
      productInfo: result?.product ? result?.product : {},
    },
  };
};
