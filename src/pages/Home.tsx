import React from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../Api/Apis";
import DetaileBox from "../Components/Common/Detail/DetaileBox";
import Loading from "../Components/Common/Loading";
import Wrapper from "../Components/Layout/Wrapper";
import Banner from "../Components/Common/MainBanner";
import Slider from "../Components/Common/Slider/Slider";
import { IGetData } from "../Interface/ApiInterface";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BackdropOverlay from "../Components/Common/Detail/BackdropOverlay";

const Home = () => {
  const { data, isLoading } = useQuery<IGetData>(["trending"], homeAPI);
  const contentsMatch = useMatch("/:dataId");
  const navigate = useNavigate();
  const closeOverlay = () => navigate("/");
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
          <AnimatePresence>
            {contentsMatch && (
              <>
                <BackdropOverlay animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeOverlay} />
                <DetaileBox />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
