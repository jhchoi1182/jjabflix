import React, { useEffect, useRef } from "react";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import { useParams } from "react-router-dom";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { posterAPI } from "../../api/Apis";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useLazyLoad, useLocalWithDummy, useQueryWithDummy } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const Movie = () => {
  const { pathnameId } = useParams();
  const { PopularMovie, TopRateMovie, NowPlayingMovie, UpcomingMovie } = useQueryWithDummy();
  const favoriteMovieCopyWithDummy = useLocalWithDummy("movie");

  const { data: popular, isLoading: PopularMovieLoading, isError: PopularMovieError } = PopularMovie;
  const { data: top_rated, isLoading: TopRateMovieLoading, isError: TopRateMovieError } = TopRateMovie;
  const { data: nowPlaying, isLoading: NowPlayingMovieLoading, isError: NowPlayingMovieError } = NowPlayingMovie;
  const { data: upcoming, isLoading: UpcomingMovieLoading, isError: UpcomingMovieError } = UpcomingMovie;

  const backgroundImg = popular?.results[1]?.backdrop_path ?? popular?.results[1]?.poster_path;
  const id = popular?.results[1]?.id ?? 0;

  /** 스크롤 시 슬라이드 추가 렌더링되는 로직 */
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const slide4Ref = useRef(null);
  const slide5Ref = useRef(null);

  const slideRefs = [slide1Ref, slide2Ref, slide3Ref, slide4Ref, slide5Ref];
  const currentSlide = useLazyLoad(slideRefs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(favoriteMovieCopyWithDummy?.results?.length > 1 && favoriteMovieCopyWithDummy?.results[0]?.id !== 0);

  return (
    <React.Fragment>
      {PopularMovieLoading && TopRateMovieLoading && NowPlayingMovieLoading && UpcomingMovieLoading ? (
        <Loadingspinner />
      ) : (
        <Wrapper>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <TabLabel>영화</TabLabel>
            <MainBanner id={id} media_type={"movie"} category="popular" />
          </BannerCoverImage>
          <SlideContainer marginTop="-7rem">
            {PopularMovieError ? (
              <div>에러</div>
            ) : (
              currentSlide >= 0 && (
                <div ref={slide1Ref}>
                  <Slide title="지금 뜨고 있는 영화" category="popular" type="movie" {...popular} />
                </div>
              )
            )}
            {TopRateMovieError ? (
              <div>에러</div>
            ) : (
              currentSlide >= 1 && (
                <div ref={slide2Ref}>
                  <Slide title="평단의 찬사를 받은 영화" category="top_rated" type="movie" {...top_rated} />
                </div>
              )
            )}
            {NowPlayingMovieError ? (
              <div>에러</div>
            ) : (
              currentSlide >= 2 && (
                <div ref={slide3Ref}>
                  <Slide title="지금 상영 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
                </div>
              )
            )}
            {UpcomingMovieError ? (
              <div>에러</div>
            ) : (
              currentSlide >= 3 && (
                <div ref={slide4Ref}>
                  <Slide title="상영 예정작" category="upcoming" type="movie" {...upcoming} />
                </div>
              )
            )}
            {currentSlide >= 4 && (
              <div ref={slide5Ref}>
                {favoriteMovieCopyWithDummy?.results?.length > 1 && (
                  <Slide title="내가 찜한 영화" category="favoriteMovie" type="movie" {...favoriteMovieCopyWithDummy} />
                )}
              </div>
            )}
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default Movie;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
