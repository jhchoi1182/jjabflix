import React from "react";
import styled from "styled-components";
import { Genre } from "../../../interface/Interface";
import * as fonts from "../../../styles/Fonts";
import { Tag } from "../../atoms/Layout/Item/ItemCaptionLayouts";

type TagBoxProps = {
  genres: Genre[];
};
const TagBox: React.FC<TagBoxProps> = ({ genres }) => {
  return (
    <Tag>
      {genres.map((genre, i) => (
        <li key={`genre_${i}`}>{genre.name}</li>
      ))}
    </Tag>
  );
};

export default TagBox;
