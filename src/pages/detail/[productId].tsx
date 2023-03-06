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
import { CheckCircleTwoTone, StarFilled } from "@ant-design/icons";
import Head from "next/head";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { SuggestProduct } from "@/components";

export interface DetailProductProps {
  productInfo: shoeProperties;
  dataSuggest: shoeProperties[];
}

export default function DetailProduct(props: DetailProductProps) {
  const { productInfo, dataSuggest } = props;
  const [currentShoe, setCurrentShoe] = React.useState<string>("");
  const [currentSize, setCurrentSize] = React.useState<number>();
  const router = useRouter();
  const createMarkup = () => {
    return { __html: productInfo.description };
  };

  React.useEffect(() => {
    if (Object.keys(productInfo || {}).length) {
      setCurrentShoe(productInfo.poster[0].url);
    }
  }, [productInfo, router.query.productId]);
  if (router.isFallback) {
    return <div>Loading....</div>;
  }
  return (
    <div className="mt-8 max-w-[1200px] mx-auto">
      <Head>
        <title>{productInfo.name}</title>
      </Head>
      <div className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href={"/"} legacyBehavior>
              <a>Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div
              onClick={() => {
                router.push({
                  pathname: `/trademark/${productInfo.key}`,
                  query: {
                    limit: 10,
                    _page: 1,
                  },
                });
              }}
            >
              {/* href={`/trademark/${productInfo.key}?_page=1&limit=10`}
               passHref  */}
              <p className="capitalize">{productInfo.key}</p>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p className="capitalize">{productInfo.name}</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="shadow-card rounded-[0.5rem] flex gap-3 p-5 lg:flex-row">
        {/* info product */}
        <div className="flex-1 flex flex-col">
          <div className="">
            <h3 className="mb-3">Thông tin sản phẩm</h3>
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
          <div className="mt-4">
            <h3>Mô tả sản phẩm</h3>
            {/* <p>
              {productInfo.description.replace("<p>", "").replace("</p>", "")}
            </p> */}
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>
        </div>
        {/* detail product */}
        <div className="flex-1">
          <div className="text-center capitalize flex justify-center">
            <h2 className="w-fit bg-primaryColor text-[#f3eeee] px-3 py-1 rounded-lg">
              {productInfo.name}
            </h2>
          </div>
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
              <div className="relative h-[320px] w-[320px] overflow-hidden">
                <Image
                  src={currentShoe}
                  alt=""
                  fill
                  object-fit="contain"
                  className="hover:scale-110 duration-150 ease-linear"
                />
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

              {/* quanlity rate, comment */}
              <div className="flex justify-center gap-4 mt-4 text-[16px] text-slate-600">
                {/* Evaluate */}
                <div>
                  {productInfo.numReviews ? (
                    <p>
                      {productInfo.numReviews} <span>đánh giá</span>
                    </p>
                  ) : (
                    <p>Chưa có đánh giá</p>
                  )}
                </div>
                <div>
                  {productInfo.numReviews ? (
                    <p className="flex items-center gap-1">
                      <span className="mr-2">|</span>
                      {productInfo.numReviews - 4} <span>phản hồi</span>
                    </p>
                  ) : (
                    <p>Chưa có phản hồi</p>
                  )}
                </div>
                <div>
                  <p className="flex items-center gap-1">
                    <span className="mr-2">|</span>
                    <StarFilled
                      style={{ color: "#b5b51d", marginRight: "2px" }}
                    />
                    {productInfo.rating < 5 ? productInfo.rating : 5}{" "}
                    <span>/5</span>
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
      {/* recomment product */}
      <SuggestProduct dataSuggest={dataSuggest} />
    </div>
  );
}
DetailProduct.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

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
  const { product } = await productApi.getProductById(`${idDetail}`);
  const { data } = await productApi.getProductsType({
    limit: 10,
    name: product?.key,
    page: 1,
    sort_price: 0,
  });
  return {
    props: {
      productInfo: product ? product : {},
      dataSuggest: data,
    },
    revalidate: 60 * 5,
  };
};
