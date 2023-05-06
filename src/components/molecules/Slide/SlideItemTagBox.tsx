import React from "react";
import styled from "styled-components";
import { Genre } from "../../../interface/Interface";
import * as fonts from "../../../styles/Fonts";

type SlideItemTagBoxProps = {
  genres: Genre[];
};
const SlideItemTagBox: React.FC<SlideItemTagBoxProps> = ({ genres }) => {
  return (
    <TagBox>
      {genres.map((genre, i) => (
        <li key={`genre_${i}`}>{genre.name}</li>
      ))}
    </TagBox>
  );
};

export default SlideItemTagBox;

export const TagBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  ${fonts.normal}
  li {
    position: relative;
  }
  li:not(:first-child) {
    padding-left: 1rem;
  }
  li:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: ${(props) => props.theme.black.vertLighter};
    border-radius: 100%;
  }
`;
