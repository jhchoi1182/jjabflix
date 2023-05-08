import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IContent } from "../../../interface/Interface";
import * as Button from "../../molecules/Button/RectangleButton";
import * as fonts from "../../../styles/Fonts";
import { useNavigate } from "react-router-dom";

export type MainBannerProps = {
  id: number;
  media_type: string;
};

const MainBanner: React.FC<MainBannerProps> = ({ id, media_type }) => {
  const { data } = useQuery<IContent | undefined>(["bannerDetail"], () => detailAPI({ id, media_type }));
  const { backdrop_path, poster_path, title, name, overview } = data || {};

  return (
    <Banner bgimg={posterAPI(backdrop_path ?? poster_path)}>
      <Title>{title ?? name}</Title>
      <Overview>{overview}</Overview>
      <ButtonBox>
        <Button.Play buttonSize="mainButton" />
        <Button.Detail buttonSize="mainButton" />
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
  padding: 60px;
`;

const Title = styled.h2`
  ${fonts.big2}
  ${fonts.bold}
  margin-bottom: 2.3rem;
  width: 37%;
`;

const Overview = styled.p`
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
