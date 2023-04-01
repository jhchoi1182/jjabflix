import React from "react";
import styled from "styled-components";
import { posterAPI } from "../../api";

interface IBanner {
  title: string;
  detail: string;
  poster: string;
}

const Banner = ({ title, detail, poster }: IBanner) => {
  console.log(posterAPI(poster));

  return (
    <ContentsBox bgImg={posterAPI(poster)}>
      <Title>{title}</Title>
      <Detail>{detail}</Detail>
    </ContentsBox>
  );
};

export default Banner;

const ContentsBox = styled.div<{ bgImg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImg});
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
