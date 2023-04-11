import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../Api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../Lib/Atoms";
import * as fonts from "../../../Styles/Css";
import { ChildrenProps } from "../../../Utils/type";

export type MainBannerProps = {
  id: number;
  type: string;
};

type LegibilityProps = {
  Title: React.FC<ChildrenProps>;
  Detail: React.FC<ChildrenProps>;
};

const MainBanner: React.FC<MainBannerProps> & LegibilityProps = ({ id, type }) => {
  const { data } = useQuery<IResult | undefined>(["bannerDetail"], () => detailAPI({ id, type }));
  const { backdrop_path, poster_path, title, overview } = data || {};

  return (
    <Banner bg={posterAPI(backdrop_path ?? poster_path)}>
      <MainBanner.Title>{title}</MainBanner.Title>
      <MainBanner.Detail>{overview}</MainBanner.Detail>
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

MainBanner.Title = styled.h2`
  ${fonts.LargeTitle}
  margin-bottom: 2rem;
`;

MainBanner.Detail = styled.p`
  ${fonts.LargeOverview}
  width: 50%;
`;
