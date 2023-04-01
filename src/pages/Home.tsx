import React from "react";
import { IGetData, homeAPI } from "../api";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "../components/common/Wrapper";
import Banner from "../components/common/Banner";
import Loading from "../components/Loading";
import Slider from "../components/common/slider/Slider";

const Home = () => {
  const { data, isLoading } = useQuery<IGetData>(["trending"], homeAPI);
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
        </>
      )}
    </Wrapper>
  );
};

export default Home;
