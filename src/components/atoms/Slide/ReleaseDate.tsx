import React from "react";
import styled from "styled-components";

type ReleaseDateProps = {
  ReleaseDate: Date;
};
const ReleaseDate: React.FC<ReleaseDateProps> = ({ ReleaseDate }) => {
  const ReleaseYear = new Date(ReleaseDate).getFullYear();

  return <ReleaseDateSpan>{ReleaseYear}</ReleaseDateSpan>;
};

export default ReleaseDate;

const ReleaseDateSpan = styled.span``;
