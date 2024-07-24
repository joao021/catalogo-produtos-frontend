import React from "react";
import GlobalStyle, { Container } from "../../app/globals";
import Header from "../../components/organisms/Header/Header";
import ProductList from "../../components/organisms/ProductList/ProductList";

const HomePage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <ProductList />
      </Container>
    </>
  );
};

export default HomePage;
