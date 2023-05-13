import React from "react";

type ReleaseDateProps = {
  ReleaseDate: Date;
};
const ReleaseDate: React.FC<ReleaseDateProps> = ({ ReleaseDate }) => {
  const ReleaseYear = new Date(ReleaseDate).getFullYear();
  const renderRelease = isNaN(ReleaseYear) ? "미정" : ReleaseYear;

  return <span>{renderRelease}</span>;
};

export default ReleaseDate;
