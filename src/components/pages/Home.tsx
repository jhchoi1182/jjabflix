import React from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI, posterAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import Loading from "../atoms/Loading/Loading";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IGetData } from "../../interface/Interface";
import Footer from "../organisms/Footer/Footer";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";

const Home = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const { data: trending = { results: [] }, isLoading } = useQuery<IGetData>(["trending"], homeAPI.trending, {
    // select: (data) => {
    //   const test = data.results.slice(1);
    //
    //   return test;
    // },
    staleTime: 100000,
  });
  const { data: nowPlaying = { results: [] } } = useQuery<IGetData>(["nowPlaying"], homeAPI.nowPlaying, {
    staleTime: 100000,
  });

  const backgroundImg = trending?.results[0]?.backdrop_path ?? trending?.results[0]?.poster_path;
  const id = trending?.results[0]?.id ?? 0;
  const mediaType = trending?.results[0]?.media_type ?? "";

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <MainBanner id={id} media_type={mediaType} category="trending" />
          </BannerCoverImage>
          <SlideContainer>
            <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />
            <Slide title="상영 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      )}
      <Footer />
    </Wrapper>
  );
};

export default Home;
