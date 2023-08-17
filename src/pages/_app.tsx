import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextProvider } from "@/Contexts/UserContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <LoadingScreen />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
