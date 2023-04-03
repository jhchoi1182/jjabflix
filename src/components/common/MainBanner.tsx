import React from "react";
import styled from "styled-components";
import { posterAPI } from "../../Api/Apis";
import { IBanner } from "../../Interface/ContentsInterface";

const MainBanner = ({ title, detail, poster }: IBanner) => {
  return (
    <Banner bg={posterAPI(poster)}>
      <Title>{title}</Title>
      <Detail>{detail}</Detail>
    </Banner>
  );
};

export default MainBanner;

const Banner = styled.div<{ bg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1)),
    url(${(props) => props.bg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 6rem;
  margin-bottom: 2rem;
`;

const Detail = styled.p`
  width: 50%;
  font-size: 2.5rem;
`;
