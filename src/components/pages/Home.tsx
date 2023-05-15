import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI, movieAPI, posterAPI, tvAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IGetData, IContent } from "../../interface/Interface";
import Footer from "../organisms/Footer/Footer";
import SlideContainer from "../atoms/Slide/SlideContainer";
import { BannerCoverImage } from "../atoms/UI/BannerCoverImage";
import { Wrapper } from "../atoms/Layout";
import Loadingspinner from "../molecules/Loading/Loadingspinner";

const dummyData: IContent = {
  adult: false,
  backdrop_path: "",
  genres: [],
  id: 0,
  original_title: "",
  overview: "",
  poster_path: "",
  release_date: new Date(),
  tagline: "",
  title: "",
  vote_average: 0,
  category: "",
  media_type: "tv",
  production_companies: [],
  production_countries: [],
};

const Home = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const { data: trending = { results: [] }, isLoading } = useQuery<IGetData>(["trending"], homeAPI.trending, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });
  const { data: popularMovie = { results: [] } } = useQuery<IGetData>(["popular", "movie"], movieAPI.popular, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });
  const { data: popularTv = { results: [] } } = useQuery<IGetData>(["popular", "tv"], tvAPI.popular, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });
  const { data: top_rated_movie = { results: [] } } = useQuery<IGetData>(["top_rated", "movie"], movieAPI.top_rated, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });
  const { data: top_rated_tv = { results: [] } } = useQuery<IGetData>(["top_rated", "tv"], tvAPI.top_rated, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });
  const { data: nowPlaying = { results: [] } } = useQuery<IGetData>(["nowPlaying", "movie"], movieAPI.nowPlaying, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });
  const { data: on_the_air = { results: [] } } = useQuery<IGetData>(["on_the_air", "tv"], tvAPI.on_the_air, {
    select: (data) => {
      if (data.results[0].id === 0) {
        return data;
      } else {
        data.results.unshift(dummyData);
        return data;
      }
    },
    staleTime: 100000,
  });

  const backgroundImg = trending?.results[1]?.backdrop_path ?? trending?.results[1]?.poster_path;
  const id = trending?.results[1]?.id ?? 0;
  const mediaType = trending?.results[1]?.media_type ?? "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loadingspinner />
      ) : (
        <React.Fragment>
          <BannerCoverImage bgimg={posterAPI(backgroundImg)}>
            <MainBanner id={id} media_type={mediaType} category="trending" />
          </BannerCoverImage>
          <SlideContainer>
            <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />
            <Slide title="인기 있는 영화" category="popularMovie" type="movie" {...popularMovie} />
            <Slide title="안 보면 유행에 뒤처지는 시리즈" category="popularTv" type="tv" {...popularTv} />
            <Slide title="평점 높은 영화" category="top_rated_movie" type="movie" {...top_rated_movie} />
            <Slide title="호평 받은 시리즈" category="top_rated_tv" type="tv" {...top_rated_tv} />
            <Slide title="개봉 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
            <Slide title="상영 중인 시리즈" category="on_the_air" type="tv" {...on_the_air} />
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      )}
      <Footer />
    </Wrapper>
  );
};

export default Home;
