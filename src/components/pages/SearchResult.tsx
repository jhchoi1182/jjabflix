import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { searchAPI } from "../../api/Apis";
import { IGetData } from "../../interface/Interface";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../lib/atoms";
import Loadingspinner from "../molecules/Loading/Loadingspinner";
import SearchResultList from "../templates/SearchResult/SearchResultList";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";

const SearchResult = () => {
  const location = useLocation();
  const setHoveredCategory = useSetRecoilState(categoryAtom);

  const pressDetailButton = location.search.split("/").length > 1;
  const pathnameId = location.search.split("/")[1];
  const keyword = new URLSearchParams(location.search).get("keyword")?.split("/")[0];

  const {
    data = { results: [] },
    isLoading,
    isError,
  } = useQuery<IGetData>(["searchKeyword", keyword], () => searchAPI(keyword ?? ""));

  useEffect(() => {
    setHoveredCategory("search");
  }, [setHoveredCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoading]);

  return (
    <SearchResult.Wrapper>
      {isLoading ? <Loadingspinner /> : isError ? <div>에러</div> : <SearchResultList {...data} keyword={keyword} />}
      <AnimatePresence>{pressDetailButton && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
    </SearchResult.Wrapper>
  );
};

export default SearchResult;

SearchResult.Wrapper = styled.div`
  padding: 190px 60px;
  @media (max-width: 1399px) {
    margin-bottom: -5rem;
  }
`;
