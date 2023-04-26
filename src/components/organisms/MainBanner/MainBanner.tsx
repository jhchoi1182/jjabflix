import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../interface/Interface";
import * as fonts from "../../../styles/Css";
import * as Button from "../../molecules/Button/RectangleButton";
import { ChildrenProps } from "../../../utils/type";

export type MainBannerProps = {
  id: number;
  media_type: string;
};

type BannerContentProps = {
  Title: React.FC<ChildrenProps>;
  Detail: React.FC<ChildrenProps>;
};

const MainBanner: React.FC<MainBannerProps> & BannerContentProps = ({ id, media_type }) => {
  const { data } = useQuery<IResult | undefined>(["bannerDetail"], () => detailAPI({ id, media_type }));
  const { backdrop_path, poster_path, title, overview } = data || {};

  return (
    <Banner bgimg={posterAPI(backdrop_path ?? poster_path)}>
      <MainBanner.Title>{title}</MainBanner.Title>
      <MainBanner.Detail>{overview}</MainBanner.Detail>
      <ButtonBox>
        <Button.Play />
        <Button.Detaile />
      </ButtonBox>
    </Banner>
  );
};

export default MainBanner;

const Banner = styled.div<{ bgimg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1)),
    url(${(props) => props.bgimg});
  height: 100vh;
  padding: 60px;
`;

MainBanner.Title = styled.h2`
  ${fonts.LargeTitle}
  margin-bottom: 2rem;
`;

MainBanner.Detail = styled.p`
  ${fonts.LargeOverview}
  width: 50%;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1.4rem;
`;
