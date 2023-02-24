import "@/styles/globals.scss";
import "tailwindcss/tailwind.css";
// import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { AppPropsWithLayout, NextPageWithLayout } from "@/types";
import { EmptyLayout } from "@/components/layout/empty-layout";
import { SWRConfig } from "swr";
import axiosClient from "@/api-client/axios-client";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  // return getLayout(<Component {...pageProps} />);
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosClient.get(url),
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
