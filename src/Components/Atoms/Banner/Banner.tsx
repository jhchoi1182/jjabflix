import { css } from "styled-components";

export const bgImg = css<{ bgimg: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
`;
