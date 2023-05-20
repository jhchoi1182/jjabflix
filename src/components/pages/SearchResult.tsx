import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { searchAPI } from "../../api/Apis";
import { IGetData } from "../../interface/Interface";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import styled from "styled-components";
import SearchedItem from "../organisms/Item/SearchedItem";
import { ItemGridContainer } from "../atoms/Layout";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../lib/atoms";
import Loadingspinner from "../molecules/Loading/Loadingspinner";
import Footer from "../organisms/Footer/Footer";

const SearchResult = () => {
  const location = useLocation();
  const setHoveredCategory = useSetRecoilState(categoryAtom);

  const pressDetailButton = location.search.split("/").length > 1;
  const pathnameId = location.search.split("/")[1];
  const keyword = new URLSearchParams(location.search).get("keyword")?.split("/")[0];

  const { data, isLoading, isError } = useQuery<IGetData>(["searchKeyword", keyword], () => searchAPI(keyword ?? ""));

  useEffect(() => {
    setHoveredCategory("search");
  }, [setHoveredCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loadingspinner />
      ) : (
        <React.Fragment>
          <SearchResult.Wrapper>
            <ItemGridContainer>
              {isLoading ? (
                <Loadingspinner />
              ) : isError ? (
                <div>정보 없음</div>
              ) : (
                data?.results.map((content) => <SearchedItem key={content.id} keyword={keyword ?? ""} {...content} />)
              )}
            </ItemGridContainer>
            <AnimatePresence>{pressDetailButton && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
          </SearchResult.Wrapper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SearchResult;

SearchResult.Wrapper = styled.div`
  padding: 190px 60px;
  @media (max-width: 1399px) {
    margin-bottom: -5rem;
  }
`;
