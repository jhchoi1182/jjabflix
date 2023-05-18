import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Wrapper } from "../atoms/Layout";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { posterAPI } from "../../api/Apis";
import MainBanner from "../organisms/MainBanner/MainBanner";
import SlideContainer from "../atoms/Slide/SlideContainer";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import Footer from "../organisms/Footer/Footer";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { useLocalWithDummy, useQueryWithDummy } from "../../utils/Hooks";

const Tv = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const { PopularTv, TopRateTV, OnTheAirTV, AiringTodayTV } = useQueryWithDummy();
  const favoriteTvCopyWithDummy = useLocalWithDummy("tv");

  const { data: popular, isError: PopularTvError } = PopularTv;
  const { data: top_rated, isError: TopRateTVError } = TopRateTV;
  const { data: on_the_air, isError: OnTheAirTVError } = OnTheAirTV;
  const { data: airing_today, isError: AiringTodayTVError } = AiringTodayTV;

  const backgroundImg = popular?.results[1]?.backdrop_path ?? popular?.results[1]?.poster_path;
  const id = popular?.results[1]?.id ?? 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <TabLabel>시리즈</TabLabel>
            <MainBanner id={id} media_type={"tv"} category="popular" />
          </BannerCoverImage>
          <SlideContainer marginTop="-7rem">
            {PopularTvError ? (
              <div>에러</div>
            ) : (
              <Slide title="지금 뜨고 있는 시리즈" category="popular" type="tv" {...popular} />
            )}
            {TopRateTVError ? (
              <div>에러</div>
            ) : (
              <Slide title="평단의 찬사를 받은 시리즈" category="top_rated" type="tv" {...top_rated} />
            )}
            {OnTheAirTVError ? (
              <div>에러</div>
            ) : (
              <Slide title="지금 방영 중인 시리즈" category="nowPlaying" type="tv" {...on_the_air} />
            )}
            {AiringTodayTVError ? (
              <div>에러</div>
            ) : (
              <Slide title="오늘 방영 예정인 시리즈" category="upcoming" type="tv" {...airing_today} />
            )}
            {favoriteTvCopyWithDummy?.results?.length !== 0 && (
              <Slide title="내가 찜한 시리즈" category="favoriteTv" type="tv" {...favoriteTvCopyWithDummy} />
            )}
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      }
      <Footer />
    </Wrapper>
  );
};

export default Tv;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
