import React from "react";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FavoriteAtom } from "../../lib/atoms";
import { Wrapper } from "../atoms/Layout";
import Loading from "../atoms/Loading/Loading";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { posterAPI, tvAPI } from "../../api/Apis";
import MainBanner from "../organisms/MainBanner/MainBanner";
import SlideContainer from "../atoms/Slide/SlideContainer";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import Footer from "../organisms/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { IGetData } from "../../interface/Interface";
import styled from "styled-components";
import { bold, largerem } from "../../styles/Fonts";

const Tv = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const favoriteItem = useRecoilValue(FavoriteAtom);

  const { data: popular = { results: [] }, isLoading } = useQuery<IGetData>(["popular", "tv"], tvAPI.popular, {
    staleTime: 100000,
  });
  const { data: top_rated = { results: [] } } = useQuery<IGetData>(["top_rated", "tv"], tvAPI.top_rated, {
    staleTime: 100000,
  });
  const { data: on_the_air = { results: [] } } = useQuery<IGetData>(["on_the_air", "tv"], tvAPI.on_the_air, {
    staleTime: 100000,
  });
  const { data: airing_today = { results: [] } } = useQuery<IGetData>(["airing_today", "tv"], tvAPI.airing_today, {
    staleTime: 100000,
  });

  const backgroundImg = popular?.results[0]?.backdrop_path ?? popular?.results[0]?.poster_path;
  const id = popular?.results[0]?.id ?? 0;

  /** 즐겨찾기 콘텐츠가 담긴 배열을 Slide 타입에 맞추기 */
  const favoriteTv = favoriteItem.filter((content) => content.media_type === "tv");
  const favoriteTvObject = {
    results: favoriteTv,
  };
  console.log(on_the_air);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <TabLabel>시리즈</TabLabel>
            <MainBanner id={id} media_type={"tv"} category="popular" />
          </BannerCoverImage>
          <SlideContainer marginTop="-7rem">
            <Slide title="지금 뜨고 있는 시리즈" category="popular" type="tv" {...popular} />
            <Slide title="평단의 찬사를 받은 시리즈" category="top_rated" type="tv" {...top_rated} />
            <Slide title="지금 방영 중인 시리즈" category="nowPlaying" type="tv" {...on_the_air} />
            <Slide title="오늘 방영 예정인 시리즈" category="upcoming" type="tv" {...airing_today} />
            <Slide title="내가 찜한 시리즈" category="favoriteTv" type="tv" {...favoriteTvObject} />
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      )}
      <Footer />
    </Wrapper>
  );
};

export default Tv;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${largerem}
  ${bold}
`;
