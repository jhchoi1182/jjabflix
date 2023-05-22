import { useEffect, useRef } from "react";
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
  const { data: trending, isLoading: TrendingLoading } = Trending;

  const backgroundImg = trending?.results[1]?.backdrop_path ?? trending?.results[1]?.poster_path;
  const id = trending?.results[1]?.id ?? 0;
  const mediaType = trending?.results[1]?.media_type ?? "movie";

  const slides = [
    { ref: useRef(null), title: "지금 뜨는 콘텐츠", category: "trending", type: "trending", data: Trending },
    { ref: useRef(null), title: "인기 있는 영화", category: "popularMovie", type: "movie", data: PopularMovie },
    { ref: useRef(null), title: "안 보면 유행에 뒤처지는 시리즈", category: "popularTv", type: "tv", data: PopularTv },
    { ref: useRef(null), title: "평점 높은 영화", category: "top_rated_movie", type: "movie", data: TopRateMovie },
    { ref: useRef(null), title: "호평 받은 시리즈", category: "top_rated_tv", type: "tv", data: TopRateTV },
    { ref: useRef(null), title: "개봉 중인 영화", category: "nowPlaying", type: "movie", data: NowPlayingMovie },
    { ref: useRef(null), title: "상영 중인 시리즈", category: "on_the_air", type: "tv", data: OnTheAirTV },
  ];

  /** 스크롤 시 슬라이드 추가 렌더링되는 로직 */
  const currentSlide = useLazyLoad(slides.map((slide) => slide.ref));

  /** 슬라이드 렌더 함수 */
  const renderSlide = (i: number) => {
    const { ref, title, category, type, data } = slides[i];
    const { data: categoryData, isLoading, isError } = data;
    if (isLoading) return <Loadingspinner />;
    if (isError) return <div>에러</div>;
    if (currentSlide >= i) {
      return (
        <div ref={ref}>
          <Slide title={title} category={category} type={type} {...categoryData} />
        </div>
      );
    } else return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return TrendingLoading ? (
    <Loadingspinner />
  ) : (
    <Wrapper>
      <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
        <MainBanner id={id} media_type={mediaType} category="trending" />
      </BannerCoverImage>
      <SlideContainer>{slides.map((v, i) => renderSlide(i))}</SlideContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
    </Wrapper>
  );
};

export default Home;
