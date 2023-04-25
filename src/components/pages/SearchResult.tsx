import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import { searchAPI } from "../../api/Apis";
import { IGetData } from "../../lib/Atoms";

const SearchResult = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IGetData>(["searchKeyword"], () => searchAPI(keyword ?? ""));

  return <React.Fragment>{data ? <div>안녕</div> : "검색결과 없음"}</React.Fragment>;
};

export default SearchResult;
