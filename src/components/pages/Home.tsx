import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailBox/DetailModalContainer";
import Loading from "../atoms/Loading/Loading";
import Wrapper from "../atoms/Layout/Wrapper";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { Link, useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IGetData } from "../../interface/Interface";
import styled from "styled-components";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "../atoms/Icons";

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
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      )}
      <Footer>
        <FooterIconbox>
          <a href="https://www.facebook.com/NetflixKR" rel="noopener noreferrer" target="_blank">
            <FacebookIcon size={2.4} />
          </a>
          <a href="https://www.instagram.com/netflixkr/" rel="noopener noreferrer" target="_blank">
            <InstagramIcon size={2.4} />
          </a>
          <a href="https://twitter.com/netflixkr" rel="noopener noreferrer" target="_blank">
            <TwitterIcon size={2.4} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured"
            rel="noopener noreferrer"
            target="_blank"
          >
            <YoutubeIcon size={2.4} />
          </a>
        </FooterIconbox>
      </Footer>
    </Wrapper>
  );
};

export default Home;

const SlideContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: -40px;
`;

const Footer = styled.section`
  width: 113.2rem;
  height: 34.8rem;
  margin: 0 auto;
`;

const FooterIconbox = styled.div`
  display: flex;
  gap: 1.9rem;
  a {
    width: 3.2rem;
    height: 3.7rem;
  }
`;
