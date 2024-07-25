import React, { useState, useRef, useEffect } from "react";
import {
  CartButton,
  Container,
  HeaderWrap,
  Imagelogo,
  CartItemsBox,
  CartItem,
  RemoveButton,
  CartCounter,
  CartTitle,
  EmptyCartMessage,
} from "./Header.styles";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";
const Header: React.FC = ({}) => {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const { cartItems = [], removeFromCart = () => {} } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    router.push("/products");
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  const cartItemCount = cartItems.length;
  const displayCount = cartItemCount > 3 ? "3+" : cartItemCount;

  return (
    <HeaderWrap>
      <Container>
        <Imagelogo
          onClick={handleLogoClick}
          width={50}
          height={30}
          src="/assets/allu-logo.png"
          alt="alluLogo"
        />
        <CartButton onClick={handleCartClick}>
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && <CartCounter>{displayCount}</CartCounter>}
        </CartButton>
      </Container>
      {showCart && (
        <CartItemsBox ref={cartRef}>
          <CartTitle>Produtos Adicionados Recentemente</CartTitle>
          {cartItems.length === 0 ? (
            <EmptyCartMessage>Seu carrinho está vazio</EmptyCartMessage>
          ) : (
            <>
              {cartItems.slice(0, 4).map((item: any) => (
                <CartItem key={item.id}>
                  <Image
                    src={item.imageUrlFront}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    X
                  </RemoveButton>
                </CartItem>
              ))}
              {cartItems.length > 4 && (
                <EmptyCartMessage>
                  {cartItems.length - 4} mais produtos no carrinho
                </EmptyCartMessage>
              )}
            </>
          )}
        </CartItemsBox>
      )}
    </HeaderWrap>
  );
};

export default Header;
