import { useEffect, useRef, useMemo } from "react";
import { posterAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import MainBanner from "../organisms/MainBanner/MainBanner";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { MainBannerCoverImage } from "../atoms/UI/MainBannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useQueryWithDummy, useRenderSlide, SlideObject } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const Home = () => {
  const { pathnameId } = useParams();
  const { Trending, PopularMovie, PopularTv, TopRateMovie, TopRateTV, NowPlayingMovie, OnTheAirTV } =
    useQueryWithDummy();
  const { data: trending, isLoading: TrendingLoading } = Trending;

  /** 메인 배너에 사용될 데이터 */
  const memoizedTrending = useMemo(() => {
    const backgroundImg = trending?.results[1]?.backdrop_path ?? trending?.results[1]?.poster_path;
    const id = trending?.results[1]?.id ?? 0;
    const mediaType = trending?.results[1]?.media_type ?? "movie";
    return {
      backgroundImg,
      id,
      mediaType,
    };
  }, [trending?.results]);
  const { backgroundImg, id, mediaType } = memoizedTrending;

  /** 슬라이드 렌더링에 사용될 데이터 */
  const slides: SlideObject[] = [
    new SlideObject(useRef(null), "지금 뜨는 콘텐츠", "trending", "trending", Trending),
    new SlideObject(useRef(null), "인기 있는 영화", "popularMovie", "movie", PopularMovie),
    new SlideObject(useRef(null), "안 보면 유행에 뒤처지는 시리즈", "popularTv", "tv", PopularTv),
    new SlideObject(useRef(null), "평점 높은 영화", "top_rated_movie", "movie", TopRateMovie),
    new SlideObject(useRef(null), "호평 받은 시리즈", "top_rated_tv", "tv", TopRateTV),
    new SlideObject(useRef(null), "개봉 중인 영화", "nowPlaying", "movie", NowPlayingMovie),
    new SlideObject(useRef(null), "상영 중인 시리즈", "on_the_air", "tv", OnTheAirTV),
  ];
  const renderSlide = useRenderSlide(slides);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [TrendingLoading]);

  return TrendingLoading ? (
    <Loadingspinner />
  ) : (
    <Wrapper>
      <MainBannerCoverImage bgimg={posterAPI(backgroundImg)}>
        <MainBanner id={id} media_type={mediaType} category="trending" />
      </MainBannerCoverImage>
      <SlideContainer>{renderSlide}</SlideContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
