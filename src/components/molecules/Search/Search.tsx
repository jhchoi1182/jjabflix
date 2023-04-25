import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IForm {
  keyword: string;
}

const Search = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();

  const toggleSearch = () => setIsSearch((prev) => !prev);

  const searchResult = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <SearchBox onSubmit={handleSubmit(searchResult)}>
      <motion.svg
        onClick={toggleSearch}
        animate={{ x: isSearch ? -185 : 0 }}
        transition={{ type: "linear" }}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </motion.svg>
      <SearchInput
        transition={{ type: "linear" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSearch ? 1 : 0 }}
        placeholder="제목, 사람, 장르"
        {...register("keyword", { required: false })}
      />
    </SearchBox>
  );
};

export default Search;

const SearchBox = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 2.5rem;
  }
`;

const SearchInput = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 0.5rem 1rem;
  padding-left: 4rem;
  z-index: -1;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
