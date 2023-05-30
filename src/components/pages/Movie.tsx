import { useEffect, useRef, useMemo } from "react";
import MainBanner from "../organisms/MainBanner/MainBanner";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import { useParams } from "react-router-dom";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { posterAPI } from "../../api/Apis";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { MainBannerCoverImage } from "../atoms/UI/MainBannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useLocalWithDummy, useQueryWithDummy, useRenderSlide } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";
import { SlideObject } from "../../utils/Hooks/useRenderSlide";

const Movie = () => {
  const { pathnameId } = useParams();
  const { PopularMovie, TopRateMovie, NowPlayingMovie, UpcomingMovie } = useQueryWithDummy();
  const favoriteMovieCopyWithDummy = useLocalWithDummy("movie");
  const { data: popular, isLoading: PopularMovieLoading } = PopularMovie;

  /** 메인 배너에 사용될 데이터 */
  const memoizedPopular = useMemo(() => {
    const backgroundImg = popular?.results[1]?.backdrop_path ?? popular?.results[1]?.poster_path;
    const id = popular?.results[1]?.id ?? 0;
    return {
      backgroundImg,
      id,
    };
  }, [popular?.results]);
  const { backgroundImg, id } = memoizedPopular;

  /** 슬라이드 렌더링에 사용될 데이터 */
  const slides: SlideObject[] = [
    new SlideObject(useRef(null), "지금 뜨고 있는 영화", "popular", "movie", PopularMovie),
    new SlideObject(useRef(null), "평단의 찬사를 받은 영화", "top_rated", "movie", TopRateMovie),
    new SlideObject(useRef(null), "지금 상영 중인 영화", "nowPlaying", "movie", NowPlayingMovie),
    new SlideObject(useRef(null), "상영 예정작", "upcoming", "movie", UpcomingMovie),
    new SlideObject(useRef(null), "내가 찜한 영화", "favoriteMovie", "movie", undefined, favoriteMovieCopyWithDummy),
  ];
  const renderSlide = useRenderSlide(slides);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return PopularMovieLoading ? (
    <Loadingspinner />
  ) : (
    <Wrapper>
      <MainBannerCoverImage bgimg={posterAPI(backgroundImg)}>
        <TabLabel>영화</TabLabel>
        <MainBanner id={id} media_type={"movie"} category="popular" />
      </MainBannerCoverImage>
      <SlideContainer marginTop="-7rem">{renderSlide}</SlideContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
    </Wrapper>
  );
};

export default Movie;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
