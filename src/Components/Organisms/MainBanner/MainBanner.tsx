import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../Api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../Lib/Atoms";

export interface IBanner {
  id: number;
  type: string;
}

const MainBanner = ({ id, type }: IBanner) => {
  const { data } = useQuery<IResult | undefined>(["bannerDetail"], () => detailAPI({ id, type }));

  return (
    <Banner bg={posterAPI(data?.backdrop_path ?? data?.poster_path)}>
      <Title>{data?.title}</Title>
      <Detail>{data?.overview}</Detail>
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
  font-weight: 700;
`;

const Detail = styled.p`
  width: 50%;
  font-size: 2.5rem;
  font-weight: 500;
`;
