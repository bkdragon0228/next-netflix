import "../styles/reset.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Hydrate, QueryClientProvider } from "react-query";
import { getQueryClient } from "./queryClient";

export default function App({ Component, pageProps }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
