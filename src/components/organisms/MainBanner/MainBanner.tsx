import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../interface/Interface";
import { ChildrenProps } from "../../../utils/type";
import * as Button from "../../molecules/Button/RectangleButton";
import * as fonts from "../../../styles/Fonts";

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
  const { backdrop_path, poster_path, title, name, overview } = data || {};

  return (
    <Banner bgimg={posterAPI(backdrop_path ?? poster_path)}>
      <MainBanner.Title>{title ?? name}</MainBanner.Title>
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
  justify-content: flex-end;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1)),
    url(${(props) => props.bgimg});
  height: 100vh;
  padding: 60px;
`;

MainBanner.Title = styled.h2`
  ${fonts.big}
  ${fonts.bold}
  margin-bottom: 2.3rem;
`;

MainBanner.Detail = styled.p`
  ${fonts.mid2}
  ${fonts.bold}
  width: 37%;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1.4rem;
  margin-top: 3.2rem;
  margin-bottom: 19rem;
`;
