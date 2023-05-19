import styled from "styled-components";

export const BannerCoverImage = styled.div<{ bgimg: string }>`
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1)),
    url(${(props) => props.bgimg});
`;
