import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";
import { IGetData, homeAPI } from "../api";
import DetaileBox from "../components/common/slider/DetaileBox";
import Loading from "../components/Loading";
import Wrapper from "../components/common/Wrapper";
import Banner from "../components/common/Banner";
import Slider from "../components/common/slider/Slider";

const Home = () => {
  const { data, isLoading } = useQuery<IGetData>(["trending"], homeAPI);
  const contentsMatch = useMatch("/:dataId");
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner
            title={data?.results[0].title ?? ""}
            detail={data?.results[0].overview ?? ""}
            poster={data?.results[0].backdrop_path ?? ""}
          />
          <Slider {...data!} />
          {contentsMatch && <DetaileBox />}
        </>
      )}
    </Wrapper>
  );
};

export default Home;
