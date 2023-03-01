import "@/styles/globals.scss";
import "tailwindcss/tailwind.css";
// import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { AppPropsWithLayout, NextPageWithLayout } from "@/types";
import { EmptyLayout } from "@/components/layout/empty-layout";
import { SWRConfig } from "swr";
import axiosClient from "@/api-client/axios-client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollToTop } from "@/components";
import NextNProgress from "nextjs-progressbar";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  // return getLayout(<Component {...pageProps} />);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      initClassName: "aos-init",
    });
  }, []);

  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <SWRConfig
      value={{
        fetcher: (url) => {
          return axiosClient.get(url);
        },
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
        <ScrollToTop />
        <NextNProgress />
      </Layout>
    </SWRConfig>
  );
}
