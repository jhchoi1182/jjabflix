import React, { useEffect, useRef } from "react";
import { posterAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useLazyLoad, useQueryWithDummy } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const Home = () => {
  const { pathnameId } = useParams();
  const { Trending, PopularMovie, PopularTv, TopRateMovie, TopRateTV, NowPlayingMovie, OnTheAirTV } =
    useQueryWithDummy();

  const { data: trending, isLoading: TrendingLoading, isError: TrendingError } = Trending;
  const { data: popularMovie, isLoading: PopularMovieLoading, isError: PopularMovieError } = PopularMovie;
  const { data: popularTv, isLoading: PopularTvLoading, isError: PopularTvError } = PopularTv;
  const { data: top_rated_movie, isLoading: TopRateMovieLoading, isError: TopRateMovieError } = TopRateMovie;
  const { data: top_rated_tv, isLoading: TopRateTVLoading, isError: TopRateTVError } = TopRateTV;
  const { data: nowPlaying, isLoading: NowPlayingMovieLoading, isError: NowPlayingMovieError } = NowPlayingMovie;
  const { data: on_the_air, isLoading: OnTheAirTVLoading, isError: OnTheAirTVError } = OnTheAirTV;

  const backgroundImg = trending?.results[1]?.backdrop_path ?? trending?.results[1]?.poster_path;
  const id = trending?.results[1]?.id ?? 0;
  const mediaType = trending?.results[1]?.media_type ?? "movie";

  /** 스크롤 시 슬라이드 추가 렌더링되는 로직 */
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const slide4Ref = useRef(null);
  const slide5Ref = useRef(null);
  const slide6Ref = useRef(null);
  const slide7Ref = useRef(null);

  const slideRefs = [slide1Ref, slide2Ref, slide3Ref, slide4Ref, slide5Ref, slide6Ref, slide7Ref];
  const currentSlide = useLazyLoad(slideRefs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
          <MainBanner id={id} media_type={mediaType} category="trending" />
        </BannerCoverImage>
        <SlideContainer>
          {TrendingError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 0 && (
              <div ref={slide1Ref}>
                <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />
              </div>
            )
          )}
          {PopularMovieError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 1 && (
              <div ref={slide2Ref}>
                <Slide title="인기 있는 영화" category="popularMovie" type="movie" {...popularMovie} />
              </div>
            )
          )}
          {PopularTvError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 2 && (
              <div ref={slide3Ref}>
                <Slide title="안 보면 유행에 뒤처지는 시리즈" category="popularTv" type="tv" {...popularTv} />
              </div>
            )
          )}
          {TopRateMovieError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 3 && (
              <div ref={slide4Ref}>
                <Slide title="평점 높은 영화" category="top_rated_movie" type="movie" {...top_rated_movie} />
              </div>
            )
          )}
          {TopRateTVError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 4 && (
              <div ref={slide5Ref}>
                <Slide title="호평 받은 시리즈" category="top_rated_tv" type="tv" {...top_rated_tv} />
              </div>
            )
          )}
          {NowPlayingMovieError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 5 && (
              <div ref={slide6Ref}>
                <Slide title="개봉 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
              </div>
            )
          )}
          {OnTheAirTVError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 6 && (
              <div ref={slide7Ref}>
                <Slide title="상영 중인 시리즈" category="on_the_air" type="tv" {...on_the_air} />
              </div>
            )
          )}
        </SlideContainer>
        <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
      </Wrapper>
    </React.Fragment>
  );
};

export default Home;
