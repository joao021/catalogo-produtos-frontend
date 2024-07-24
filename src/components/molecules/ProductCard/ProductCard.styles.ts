import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  gap: 0.5rem;
  background: white;

  img {
    width: 100%;
    height: 100%;
    max-height: 130px;
    border-radius: 0.5rem;
    object-fit: contain;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Title = styled.h2`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #666;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Price = styled.p`
  font-size: 1.2rem;
  color: #333;
  font-weight: 700;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
