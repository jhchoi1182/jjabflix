import styled, { css } from "styled-components";

export const ItemGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 78px;
  grid-column-gap: 8px;
  @media (max-width: 1399px) {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5vw;
    grid-column-gap: 8px;
  }
  @media (max-width: 1099px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 799px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 48px;
    grid-column-gap: 8px;
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5vw;
    grid-column-gap: 8px;
  }
  @media (max-width: 630px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3vw;
    grid-column-gap: 8px;
  }
  @media (max-width: 499px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const nthChild = css`
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
  &:nth-child(6n) {
    transform-origin: center right;
  }
`;
