import styled from "styled-components";
import Image from "next/image";

export const HeaderWrap = styled.header`
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    max-width: 80px;
    object-fit: contain;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
`;

export const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartTitle = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 1em;
  text-align: center;
  color: #888;
`;

export const EmptyCartMessage = styled.p`
  text-align: center;
  padding: 10px;
  font-size: 0.9em;
  color: #888;
`;

export const CloseCartButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ViewCartButton = styled.button`
  width: 100%;
  background-color: #ff5a00;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  text-align: center;
`;

export const CartItemsBox = styled.div`
  position: absolute;
  top: 50px;
  right: 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  img {
    margin-right: 10px;
  }

  span {
    flex: 1;
    text-align: left;
  }

  span:last-child {
    margin-left: auto;
    color: #ff5a00;
  }
`;

export const CartButton = styled.button`
  background: none;
  border: none;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const CartCounter = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 0.8em;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Imagelogo = styled.img`
  cursor: pointer;
`;
