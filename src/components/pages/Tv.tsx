import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "../atoms/Layout";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { posterAPI } from "../../api/Apis";
import MainBanner from "../organisms/MainBanner/MainBanner";
import SlideContainer from "../atoms/Slide/SlideContainer";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { useLazyLoad, useLocalWithDummy, useQueryWithDummy } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const Tv = () => {
  const { pathnameId } = useParams();
  const { PopularTv, TopRateTV, OnTheAirTV, AiringTodayTV } = useQueryWithDummy();
  const favoriteTvCopyWithDummy = useLocalWithDummy("tv");

  const { data: popular, isLoading: PopularTvLoading, isError: PopularTvError } = PopularTv;
  const { data: top_rated, isLoading: TopRateTVLoading, isError: TopRateTVError } = TopRateTV;
  const { data: on_the_air, isLoading: OnTheAirTVLoading, isError: OnTheAirTVError } = OnTheAirTV;
  const { data: airing_today, isLoading: AiringTodayTVLoading, isError: AiringTodayTVError } = AiringTodayTV;

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

  return (
    <React.Fragment>
      <Wrapper>
        <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
          <TabLabel>시리즈</TabLabel>
          <MainBanner id={id} media_type={"tv"} category="popular" />
        </BannerCoverImage>
        <SlideContainer marginTop="-7rem">
          {PopularTvError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 0 && (
              <div ref={slide1Ref}>
                <Slide title="지금 뜨고 있는 시리즈" category="popular" type="tv" {...popular} />
              </div>
            )
          )}
          {TopRateTVError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 1 && (
              <div ref={slide2Ref}>
                <Slide title="평단의 찬사를 받은 시리즈" category="top_rated" type="tv" {...top_rated} />
              </div>
            )
          )}
          {OnTheAirTVError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 2 && (
              <div ref={slide3Ref}>
                <Slide title="지금 방영 중인 시리즈" category="nowPlaying" type="tv" {...on_the_air} />
              </div>
            )
          )}
          {AiringTodayTVError ? (
            <div>에러</div>
          ) : (
            currentSlide >= 3 && (
              <div ref={slide4Ref}>
                <Slide title="오늘 방영 예정인 시리즈" category="upcoming" type="tv" {...airing_today} />
              </div>
            )
          )}
          {currentSlide >= 4 && (
            <div ref={slide5Ref}>
              {favoriteTvCopyWithDummy?.results?.length > 1 && (
                <Slide title="내가 찜한 시리즈" category="favoriteTv" type="tv" {...favoriteTvCopyWithDummy} />
              )}
            </div>
          )}
        </SlideContainer>
        <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
      </Wrapper>
    </React.Fragment>
  );
};

export default Tv;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
