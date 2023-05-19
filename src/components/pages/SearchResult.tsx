import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { searchAPI } from "../../api/Apis";
import { IGetData } from "../../interface/Interface";
import { ChildrenProps } from "../../interface/type";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import styled from "styled-components";
import DataFetcherItem from "../organisms/Item/DataFetcherItem";
import { ItemGridContainer } from "../atoms/Layout";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../lib/atoms";
import Loadingspinner from "../molecules/Loading/Loadingspinner";
import Footer from "../organisms/Footer/Footer";

const SearchResult: React.FC & {
  Wrapper: React.FC<ChildrenProps>;
} = () => {
  const location = useLocation();
  const setHoveredCategory = useSetRecoilState(categoryAtom);

  const pressDetailButton = location.search.split("/").length > 1;
  const keyword = new URLSearchParams(location.search).get("keyword")?.split("/")[0];

  const { data, isLoading, isError } = useQuery<IGetData>(["searchKeyword", keyword], () => searchAPI(keyword ?? ""));

  useEffect(() => {
    setHoveredCategory("search");
  }, [setHoveredCategory]);

  return (
    <React.Fragment>
      <SearchResult.Wrapper>
        <ItemGridContainer>
          {isLoading ? (
            <Loadingspinner />
          ) : isError ? (
            <div>정보 없음</div>
          ) : (
            data?.results.map((content) => <DataFetcherItem key={content.id} keyword={keyword ?? ""} {...content} />)
          )}
        </ItemGridContainer>
        <AnimatePresence>{pressDetailButton && <DetailModalContainer />}</AnimatePresence>
      </SearchResult.Wrapper>
      <Footer />
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
