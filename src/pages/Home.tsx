import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";
import { homeAPI } from "../Api/Apis";
import DetaileBox from "../Components/Common/Slider/DetaileBox";
import Loading from "../Components/Common/Loading";
import Wrapper from "../Components/Layout/Wrapper";
import Banner from "../Components/Common/Banner";
import Slider from "../Components/Common/Slider/Slider";
import { IGetData } from "../Interface/ApiInterface";

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
