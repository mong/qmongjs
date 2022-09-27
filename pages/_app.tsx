import { ReactElement, ReactNode, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import "../src/index.css";
//import { ReactQueryDevtools } from "react-query/types/devtools";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Header />
        {page}
        <Footer />
      </>
    ));

  return (
    <QueryParamProvider adapter={NextAdapter}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        {/*<ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </QueryParamProvider>
  );
}
