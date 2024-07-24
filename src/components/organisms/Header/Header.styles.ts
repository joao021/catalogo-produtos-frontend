import styled from "styled-components";

export const HeaderWrap = styled.header`
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    max-width: 80px;
    object-fit: contain;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

export const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  svg {
    fill: currentColor;
  }
`;