import React from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../../api/Apis";
import DetaileBox from "../templates/DetaileBox/DetaileBox";
import Loading from "../atoms/Loading/Loading";
import Wrapper from "../atoms/Layout/Wrapper";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BackdropOverlay from "../atoms/Modal/BackdropOverlay";
import { IGetData } from "../../interface/Interface";
import styled from "styled-components";

const Home = () => {
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

  const contentsMatch = useMatch("/:dataId");
  const navigate = useNavigate();

  const closeOverlay = () => navigate("/");

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <MainBanner id={trending?.results[0]?.id ?? 0} media_type={trending?.results[0]?.media_type ?? ""} />
          <SlideContainer>
            <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />
            <Slide title="상영 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
          </SlideContainer>
          <AnimatePresence>
            {contentsMatch && (
              <React.Fragment>
                <BackdropOverlay animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeOverlay} />
                <DetaileBox />
              </React.Fragment>
            )}
          </AnimatePresence>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default Home;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34rem;
`;
