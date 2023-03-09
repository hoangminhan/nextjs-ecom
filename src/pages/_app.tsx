import "@/styles/globals.scss";
import { AppPropsWithLayout } from "@/types";
import "tailwindcss/tailwind.css";
import axiosClient from "@/api-client/axios-client";
import { ScrollToTop } from "@/components";
import { UseContextProvider } from "@/context";
import AOS from "aos";
import "aos/dist/aos.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { SWRConfig } from "swr";

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

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig
      value={{
        fetcher: (url) => {
          return axiosClient.get(url);
        },
        shouldRetryOnError: false,
      }}
    >
      <UseContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </UseContextProvider>
      <ScrollToTop />
      <NextNProgress height={6} stopDelayMs={0} color="#3069fe" />
    </SWRConfig>
  );
}
