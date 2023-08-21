import "@/styles/globals.css";

import Navbar from "@/components/shared/Navbar";
import { UserContextProvider } from "@/context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import store from "@/store/store";
const { library } = require("@fortawesome/fontawesome-svg-core");

export const queryClient = new QueryClient();

library.add(fas);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserContextProvider>
            <Navbar />
            <Component {...pageProps} />
          </UserContextProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
