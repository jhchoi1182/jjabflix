import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import { searchAPI } from "../Api/Apis";
import { IGetData } from "../Interface/ApiInterface";

const SearchResult = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IGetData>(["searchKeyword"], () => searchAPI(keyword ?? ""));

  return <>{data ? <div>안녕</div> : "검색결과 없음"}</>;
};

export default SearchResult;
