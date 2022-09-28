import { ReactElement, ReactNode, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import "../src/index.css";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";

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
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link href="/fontawesome/v5.13.0/css/all.min.css" rel="stylesheet" />
          <link
            href="/fontawesome/v5.13.0/css/v4-shims.min.css"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href="/icons/hn.png" />

          <title>SKDE - Kvalitetsregistre</title>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `//<![CDATA[
      // prettier-ignore
      const isIE = /*@cc_on!@*/false || !!document.documentMode;
      if (isIE) {
        alert(
          "Internett Explorer støtter dessverre ikke dette nettstedet.\nPrøv med en tryggere og mer moderne nettleser som f.eks:\n Chrome, Firefox, Safari, Opera, eller Edge"
        );
      }
      //]]>`,
            }}
          />
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryParamProvider>
  );
}
