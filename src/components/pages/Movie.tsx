import React from "react";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import Footer from "../organisms/Footer/Footer";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IGetData } from "../../interface/Interface";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { movieAPI, posterAPI } from "../../api/Apis";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useRecoilValue } from "recoil";
import { FavoriteAtom } from "../../lib/atoms";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const Movie = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const favoriteItem = useRecoilValue(FavoriteAtom);

  const { data: popular = { results: [] }, isLoading } = useQuery<IGetData>(["popular", "movie"], movieAPI.popular, {
    staleTime: 100000,
  });
  const { data: top_rated = { results: [] } } = useQuery<IGetData>(["top_rated", "movie"], movieAPI.top_rated, {
    staleTime: 100000,
  });
  const { data: nowPlaying = { results: [] } } = useQuery<IGetData>(["nowPlaying", "movie"], movieAPI.nowPlaying, {
    staleTime: 100000,
  });
  const { data: upcoming = { results: [] } } = useQuery<IGetData>(["upcoming", "movie"], movieAPI.upcoming, {
    staleTime: 100000,
  });

  const backgroundImg = popular?.results[0]?.backdrop_path ?? popular?.results[0]?.poster_path;
  const id = popular?.results[0]?.id ?? 0;

  /** 즐겨찾기 콘텐츠가 담긴 배열을 Slide 타입에 맞추기 */
  const favoriteMovie = favoriteItem.filter((content) => content.media_type === "movie");
  const favoriteMovieObject = {
    results: favoriteMovie,
  };
  console.log(favoriteMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loadingspinner />
      ) : (
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <TabLabel>영화</TabLabel>
            <MainBanner id={id} media_type={"movie"} category="popular" />
          </BannerCoverImage>
          <SlideContainer marginTop="-7rem">
            <Slide title="지금 뜨고 있는 영화" category="popular" type="movie" {...popular} />
            <Slide title="평단의 찬사를 받은 영화" category="top_rated" type="movie" {...top_rated} />
            <Slide title="지금 상영 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
            <Slide title="상영 예정작" category="upcoming" type="movie" {...upcoming} />
            {favoriteMovie.length !== 0 && (
              <Slide title="내가 찜한 영화" category="favoriteMovie" type="movie" {...favoriteMovieObject} />
            )}
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      )}
      <Footer />
    </Wrapper>
  );
};

export default Movie;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
