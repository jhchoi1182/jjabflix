import styled, { css } from "styled-components";

export const ItemGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 78px;
  grid-column-gap: 8px;
`;

export const nthChild = css`
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
  &:nth-child(6n) {
    transform-origin: center right;
  }
`;
