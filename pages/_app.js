import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
