import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 1rem;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  box-sizing: content-box;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;
