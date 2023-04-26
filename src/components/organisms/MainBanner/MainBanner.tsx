import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../lib/Atoms";
import * as fonts from "../../../styles/Css";
import { ChildrenProps } from "../../../utils/type";
import { AddIcon, DetailIcon, PlayIcon } from "../../atoms/Icons";

export type MainBannerProps = {
  id: number;
  type: string;
};

type BannerContentProps = {
  Title: React.FC<ChildrenProps>;
  Detail: React.FC<ChildrenProps>;
};

const MainBanner: React.FC<MainBannerProps> & BannerContentProps = ({ id, type }) => {
  const { data } = useQuery<IResult | undefined>(["bannerDetail"], () => detailAPI({ id, type }));
  const { backdrop_path, poster_path, title, overview } = data || {};

  return (
    <Banner bgimg={posterAPI(backdrop_path ?? poster_path)}>
      <MainBanner.Title>{title}</MainBanner.Title>
      <MainBanner.Detail>{overview}</MainBanner.Detail>
      <ButtonBox>
        {/* <PlayButton>
          <PlayIcon size={1.75} />
          재생
        </PlayButton>
        <DetailButton>
          <DetailIcon size={1.75} />
          상세 정보
        </DetailButton> */}
        <MiniPlay>
          <PlayIcon size={1.4} />
        </MiniPlay>
        <AddButton>
          <AddIcon size={1.4} />
        </AddButton>
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

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3vw;
  padding: 0.65vw 1.7vw;
  border-radius: 4px;
  background-color: ${(props) => props.theme.white.lighter};
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const MiniPlay = styled.button`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.white.lighter};
  background-color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled.button`
  display: flex;
  padding: 0.8rem;
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.black.vertLighter};
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  &:hover {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;

const DetailButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3vw;
  padding: 0.65vw 1.7vw;
  border-radius: 4px;
  background-color: rgba(109, 109, 110, 0.7);
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.white.lighter};
  &:hover {
    background-color: rgba(109, 109, 110, 0.3);
  }
`;
