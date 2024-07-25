import React from "react";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalStyle from "../styles/globalStyles";
import Header from "../components/organisms/Header/Header";
import { CartProvider } from "../context/CartProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
};

export default MyApp;
