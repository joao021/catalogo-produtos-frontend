import React from "react";
import ProductList from "../../components/organisms/ProductList/ProductList";
import GlobalStyle from "../../styles/globalStyles";
import { Container } from "../../app/globals";

const HomePage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <ProductList />
      </Container>
    </>
  );
};

export default HomePage;
