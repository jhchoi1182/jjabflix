import React, { useCallback, useEffect, useMemo } from "react";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import Footer from "../organisms/Footer/Footer";
import { useOutletContext } from "react-router-dom";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { posterAPI } from "../../api/Apis";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useRecoilValue } from "recoil";
import { FavoriteAtom } from "../../lib/atoms";
import { dummyData, useQueryWithDummy } from "../../utils/Hooks";
import { IGetData } from "../../interface/Interface";

const Movie = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const favoriteItem = useRecoilValue(FavoriteAtom);
  const { PopularMovie, TopRateMovie, NowPlayingMovie, UpcomingMovie } = useQueryWithDummy();

  const { data: popular, isError: PopularMovieError } = PopularMovie;
  const { data: top_rated, isError: TopRateMovieError } = TopRateMovie;
  const { data: nowPlaying, isError: NowPlayingMovieError } = NowPlayingMovie;
  const { data: upcoming, isError: UpcomingMovieError } = UpcomingMovie;

  const backgroundImg = popular?.results[1]?.backdrop_path ?? popular?.results[1]?.poster_path;
  const id = popular?.results[1]?.id ?? 0;

  /** 즐겨찾기 콘텐츠가 담긴 배열을 Slide 타입에 맞추기 */
  const favoriteMovie = favoriteItem.filter((content) => content.media_type === "movie");
  const favoriteMovieObject = useMemo<IGetData>(() => {
    return { results: favoriteMovie };
  }, [favoriteMovie]);

  const unshiftDummyFavoriteMovieObject = useCallback(() => {
    if (favoriteMovieObject?.results[0]?.id === 0) return favoriteMovieObject;
    else return favoriteMovieObject?.results.unshift(dummyData);
  }, [favoriteMovieObject]);

  useEffect(() => {
    unshiftDummyFavoriteMovieObject();
  }, [unshiftDummyFavoriteMovieObject]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <Wrapper>
      {
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <TabLabel>영화</TabLabel>
            <MainBanner id={id} media_type={"movie"} category="popular" />
          </BannerCoverImage>
          <SlideContainer marginTop="-7rem">
            {PopularMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="지금 뜨고 있는 영화" category="popular" type="movie" {...popular} />
            )}
            {TopRateMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="평단의 찬사를 받은 영화" category="top_rated" type="movie" {...top_rated} />
            )}
            {NowPlayingMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="지금 상영 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
            )}
            {UpcomingMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="상영 예정작" category="upcoming" type="movie" {...upcoming} />
            )}
            {favoriteMovie.length !== 0 && (
              <Slide
                title="내가 찜한 영화"
                category="favoriteMovie"
                type="movie"
                isFavoriteSlide
                {...favoriteMovieObject}
              />
            )}
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      }
      <Footer />
    </Wrapper>
  );
};

export default Movie;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
