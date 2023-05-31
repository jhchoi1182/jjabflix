import { useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "../atoms/Layout";
import { MainBannerCoverImage } from "../atoms/UI/MainBannerCoverImage";
import { posterAPI } from "../../api/Apis";
import MainBanner from "../organisms/MainBanner/MainBanner";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { useLocalWithDummy, useQueryWithDummy, useRenderSlide } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";
import { SlideObject } from "../../utils/Hooks/useRenderSlide";

const Tv = () => {
  const { pathnameId } = useParams();
  const { PopularTv, TopRateTV, OnTheAirTV, AiringTodayTV } = useQueryWithDummy();
  const favoriteTvCopyWithDummy = useLocalWithDummy("tv");
  const { data: popular, isLoading: PopularTvLoading } = PopularTv;

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
    new SlideObject(useRef(null), "지금 뜨고 있는 시리즈", "popular", "tv", PopularTv),
    new SlideObject(useRef(null), "평단의 찬사를 받은 시리즈", "top_rated", "tv", TopRateTV),
    new SlideObject(useRef(null), "지금 방영 중인 시리즈", "nowPlaying", "tv", OnTheAirTV),
    new SlideObject(useRef(null), "오늘 방영 예정인 시리즈", "upcoming", "tv", AiringTodayTV),
    new SlideObject(useRef(null), "내가 찜한 시리즈", "favoriteTv", "tv", undefined, favoriteTvCopyWithDummy),
  ];
  const renderSlide = useRenderSlide(slides);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [PopularTvLoading]);

  return PopularTvLoading ? (
    <Loadingspinner />
  ) : (
    <Wrapper>
      <MainBannerCoverImage bgimg={posterAPI(backgroundImg)}>
        <TabLabel>시리즈</TabLabel>
        <MainBanner id={id} media_type="tv" category="popular" />
      </MainBannerCoverImage>
      <SlideContainer marginTop="-7rem">{renderSlide}</SlideContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
    </Wrapper>
  );
};

export default Tv;

const TabLabel = styled.div`
  padding: 75px 5vw 0;
  ${font.page_title}
`;
