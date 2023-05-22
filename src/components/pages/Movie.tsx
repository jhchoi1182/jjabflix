import React, { useEffect, useRef } from "react";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import { useParams } from "react-router-dom";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { posterAPI } from "../../api/Apis";
import styled from "styled-components";
import { font } from "../../styles/Fonts";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import { useLazyLoad, useLocalWithDummy, useQueryWithDummy } from "../../utils/Hooks";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const Movie = () => {
  const { pathnameId } = useParams();
  const { PopularMovie, TopRateMovie, NowPlayingMovie, UpcomingMovie } = useQueryWithDummy();
  const favoriteMovieCopyWithDummy = useLocalWithDummy("movie");

  const { data: popular, isLoading: PopularMovieLoading } = PopularMovie;

  const backgroundImg = popular?.results[1]?.backdrop_path ?? popular?.results[1]?.poster_path;
  const id = popular?.results[1]?.id ?? 0;

  const slides = [
    { ref: useRef(null), title: "지금 뜨고 있는 영화", category: "popular", type: "movie", data: PopularMovie },
    { ref: useRef(null), title: "평단의 찬사를 받은 영화", category: "top_rated", type: "movie", data: TopRateMovie },
    { ref: useRef(null), title: "지금 상영 중인 영화", category: "nowPlaying", type: "movie", data: NowPlayingMovie },
    { ref: useRef(null), title: "상영 예정작", category: "upcoming", type: "movie", data: UpcomingMovie },
    {
      ref: useRef(null),
      title: "내가 찜한 영화",
      category: "favoriteMovie",
      type: "movie",
      bookmarkdata: favoriteMovieCopyWithDummy,
    },
  ];

  /** 스크롤 시 슬라이드 추가 렌더링되는 로직 */
  const currentSlide = useLazyLoad(slides.map((slide) => slide.ref));

  /** 슬라이드 렌더 함수 */
  const renderSlide = (i: number) => {
    const { ref, title, category, type, data, bookmarkdata } = slides[i];
    if (data) {
      const { data: categoryData, isLoading, isError } = data;
      if (isLoading) return <Loadingspinner key={category} />;
      if (isError) return <div key={category}>에러</div>;
      if (currentSlide >= i) {
        return (
          <div key={category} ref={ref}>
            <Slide title={title} category={category} type={type} {...categoryData} />
          </div>
        );
      } else return null;
    }
    if (bookmarkdata) {
      return (
        currentSlide >= i && (
          <div key={category} ref={ref}>
            {bookmarkdata?.results?.length > 1 && (
              <Slide title={title} category={category} type={type} {...bookmarkdata} />
            )}
          </div>
        )
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return PopularMovieLoading ? (
    <Loadingspinner />
  ) : (
    <Wrapper>
      <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
        <TabLabel>영화</TabLabel>
        <MainBanner id={id} media_type={"movie"} category="popular" />
      </BannerCoverImage>
      <SlideContainer marginTop="-7rem">{slides.map((v, i) => renderSlide(i))}</SlideContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
    </Wrapper>
  );
};

export default Movie;

const TabLabel = styled.div`
  padding: 75px 60px 0;
  ${font.page_title}
`;
