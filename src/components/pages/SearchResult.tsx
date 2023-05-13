import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useOutletContext } from "react-router-dom";
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
import Loading from "../atoms/Loading/Loading";

const SearchResult: React.FC & {
  Wrapper: React.FC<ChildrenProps>;
} = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const setHoveredCategory = useSetRecoilState(categoryAtom);

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading, isError } = useQuery<IGetData>(["searchKeyword", keyword], () => searchAPI(keyword ?? ""));

  useEffect(() => {
    setHoveredCategory("search");
  }, [setHoveredCategory]);

  return (
    <SearchResult.Wrapper>
      <ItemGridContainer>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>정보 없음</div>
        ) : (
          data?.results.map((content) => <DataFetcherItem key={content.id} {...content} />)
        )}
      </ItemGridContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
    </SearchResult.Wrapper>
  );
};

export default SearchResult;

SearchResult.Wrapper = styled.div`
  padding: 190px 60px;
`;
