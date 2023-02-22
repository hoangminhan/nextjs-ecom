import "@/styles/globals.scss";
import "tailwindcss/tailwind.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { AppPropsWithLayout, NextPageWithLayout } from "@/types";
import { EmptyLayout } from "@/components/layout/empty-layout";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  // return getLayout(<Component {...pageProps} />);
  console.log("render");
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
