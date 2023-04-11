import React from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../../Api/Apis";
import DetaileBox from "../Templates/DetaileBox";
import Loading from "../Atoms/Loading/Loading";
import Wrapper from "../Atoms/LayoutCss/Wrapper";
import MainBanner from "../Organisms/MainBanner/MainBanner";
import Slider from "../Molecules/Slider/Slider";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BackdropOverlay from "../Atoms/Modal/BackdropOverlay";
import { IGetData } from "../../Lib/Atoms";

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
          <MainBanner id={data?.results[0].id ?? 0} type={data?.results[0].media_type ?? ""} />
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
