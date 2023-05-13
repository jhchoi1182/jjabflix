import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { searchAPI } from "../../api/Apis";
import { IGetData } from "../../interface/Interface";
import { ChildrenProps } from "../../interface/type";
import { AnimatePresence } from "framer-motion";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import styled from "styled-components";
import DataFetcherItem from "../organisms/Item/DataFetcherItem";
import { ItemGridContainer } from "../atoms/Layout";

const SearchResult: React.FC & {
  Wrapper: React.FC<ChildrenProps>;
} = () => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isError } = useQuery<IGetData>(["searchKeyword"], () => searchAPI(keyword ?? ""));

  return (
    <SearchResult.Wrapper>
      <ItemGridContainer>
        {isError ? <div>오류</div> : data?.results.map((content) => <DataFetcherItem key={content.id} {...content} />)}
      </ItemGridContainer>
      <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
    </SearchResult.Wrapper>
  );
};

export default SearchResult;

SearchResult.Wrapper = styled.div`
  padding: 190px 60px;
`;
