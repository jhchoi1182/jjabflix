import React, { useEffect } from "react";
import { posterAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Footer from "../organisms/Footer/Footer";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useQueryWithDummy } from "../../utils/Hooks";

const Home = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const { Trending, PopularMovie, PopularTv, TopRateMovie, TopRateTV, NowPlayingMovie, OnTheAirTV } =
    useQueryWithDummy();

  const { data: trending, isError: TrendingError } = Trending;
  const { data: popularMovie, isError: PopularMovieError } = PopularMovie;
  const { data: popularTv, isError: PopularTvError } = PopularTv;
  const { data: top_rated_movie, isError: TopRateMovieError } = TopRateMovie;
  const { data: top_rated_tv, isError: TopRateTVError } = TopRateTV;
  const { data: nowPlaying, isError: NowPlayingMovieError } = NowPlayingMovie;
  const { data: on_the_air, isError: OnTheAirTVError } = OnTheAirTV;

  const backgroundImg = trending?.results[1]?.backdrop_path ?? trending?.results[1]?.poster_path;
  const id = trending?.results[1]?.id ?? 0;
  const mediaType = trending?.results[1]?.media_type ?? "movie";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <MainBanner id={id} media_type={mediaType} category="trending" />
          </BannerCoverImage>
          <SlideContainer>
            {TrendingError ? <div>에러</div> : <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />}
            {PopularMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="인기 있는 영화" category="popularMovie" type="movie" {...popularMovie} />
            )}
            {PopularTvError ? (
              <div>에러</div>
            ) : (
              <Slide title="안 보면 유행에 뒤처지는 시리즈" category="popularTv" type="tv" {...popularTv} />
            )}
            {TopRateMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="평점 높은 영화" category="top_rated_movie" type="movie" {...top_rated_movie} />
            )}
            {TopRateTVError ? (
              <div>에러</div>
            ) : (
              <Slide title="호평 받은 시리즈" category="top_rated_tv" type="tv" {...top_rated_tv} />
            )}
            {NowPlayingMovieError ? (
              <div>에러</div>
            ) : (
              <Slide title="개봉 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
            )}
            {OnTheAirTVError ? (
              <div>에러</div>
            ) : (
              <Slide title="상영 중인 시리즈" category="on_the_air" type="tv" {...on_the_air} />
            )}
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      }
      <Footer />
    </Wrapper>
  );
};

export default Home;
