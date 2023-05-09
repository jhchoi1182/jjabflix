import React from "react";

type ReleaseDateProps = {
  ReleaseDate: Date;
};
const ReleaseDate: React.FC<ReleaseDateProps> = ({ ReleaseDate }) => {
  const ReleaseYear = new Date(ReleaseDate).getFullYear();

  return <span>{ReleaseYear}</span>;
};

export default ReleaseDate;
