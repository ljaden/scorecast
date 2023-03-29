import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { useState } from "react";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/RtkGlobals/store";
import { Provider } from "react-redux";

// font
const font = Montserrat({ subsets: ["latin"], variable: "--font-mon" });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // layout
  const getLayout = Component.getLayout ?? ((page) => page);

  // Query Client & global settings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className={`${font.variable} font-sans`}>
          {getLayout(<Component {...pageProps} />)}
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
