import React from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../../Api/Apis";
import DetaileBox from "../Templates/detaileBox/DetaileBox";
import Loading from "../Atoms/loading/Loading";
import Wrapper from "../Atoms/layout/Wrapper";
import MainBanner from "../Organisms/mainBanner/MainBanner";
import Slide from "../Organisms/slide/Slide";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BackdropOverlay from "../Atoms/modal/BackdropOverlay";
import { IGetData } from "../../Lib/Atoms";

const Home = () => {
  const { data: trending = { results: [] }, isLoading } = useQuery<IGetData>(["trending"], homeAPI, {
    // select: (data) => {
    //   const test = data.results;
    //   data.results.push(...test);
    //   return data;
    // },
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
          <MainBanner id={trending?.results[0]?.id ?? 0} type={trending?.results[0]?.media_type ?? ""} />
          <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />
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
