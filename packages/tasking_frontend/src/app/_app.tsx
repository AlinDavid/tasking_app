import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { status } = error.response || {};

        if (status === 401) {
          Cookies.remove("accessToken");
          router.push("/signin");
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
