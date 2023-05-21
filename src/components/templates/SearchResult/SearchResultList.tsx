import React from "react";
import { IGetData } from "../../../interface/Interface";
import { ItemGridContainer } from "../../atoms/Layout";
import SearchedItem from "../../organisms/Item/SearchedItem";

interface ISearchResultList extends IGetData {
  keyword?: string;
}

const SearchResultList = ({ keyword, ...data }: ISearchResultList) => {
  return (
    <ItemGridContainer>
      {data?.results.map((content) => (
        <SearchedItem key={content.id} keyword={keyword ?? ""} {...content} />
      ))}
    </ItemGridContainer>
  );
};

export default SearchResultList;
