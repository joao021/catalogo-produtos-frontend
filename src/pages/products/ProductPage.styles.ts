import styled from "styled-components";
import Slider from "react-slick";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 1rem;
`;

export const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: contain;
  }
  .slick-slider {
    width: 500px;
  }
`;

export const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
`;

export const ImageCarousel = styled(Slider)`
  .slick-prev,
  .slick-next {
    z-index: 1;
    color: black;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
  }
  ,
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const Description = styled.p`
  font-size: 1.2em;
  margin: 20px 0;
`;

export const Price = styled.p`
  font-size: 1.2em;
  color: #0070f3;
  margin: 10px 0;
  text-align: center;
`;

export const PriceOption = styled.div<{ isSelected: boolean }>`
  font-size: 1.2em;
  color: ${({ isSelected }) => (isSelected ? "#005bb5" : "#0070f3")};
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #005bb5" : "2px solid transparent"};
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const AddToCartButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1em;
  color: white;
  background-color: ${({ disabled }) => (disabled ? "#a0a0a0" : "#0070f3")};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 20px;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#a0a0a0" : "#005bb5")};
  }
`;
