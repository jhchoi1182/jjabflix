import React from "react";
import { Genre } from "../../../interface/Interface";
import { Tag } from "../../atoms/Layout/ItemLayout/ItemCaptionLayouts";

interface TagBoxProps {
  genres: Genre[];
  oneLine?: boolean;
}
const TagBox = ({ genres, oneLine }: TagBoxProps) => {
  const oneLineTag = genres.slice(0, 2).map((genre) => <li key={`genre_${genre.id}`}>{genre.name}</li>);
  const tag = genres.map((genre, i) => <li key={`genre_${i}`}>{genre.name}</li>);

  return <Tag>{oneLine ? oneLineTag : tag}</Tag>;
};

export default TagBox;
