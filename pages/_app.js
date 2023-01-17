import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { QueryClientProvider } from "react-query";
import { getQueryClient } from "./queryClient";

export default function App({ Component, pageProps }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
