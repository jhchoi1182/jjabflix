import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { flex } from "../../../styles/css";
import { SearchIcon } from "../../atoms/Icons";
import { theme } from "../../../styles/theme";

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
      <SearchIcon onClick={toggleSearch} animate={{ x: isSearch ? -185 : 0 }} transition={{ type: "linear" }} />
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
  ${flex("none")}
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
  border: 1px solid ${theme.white.lighter};
`;
