import React from "react";
import styled from "styled-components";
import { Heavy } from "../../../styles/Fonts";

type RatingProps = {
  voteAverage?: number;
};

const Rating: React.FC<RatingProps> = ({ voteAverage }) => {
  const rating = voteAverage ? voteAverage.toFixed(1) : "없음";

  return (
    <RatingBox>
      <p>평점</p>
      <span>{rating}</span>
    </RatingBox>
  );
};

export default Rating;

const RatingBox = styled.span`
  display: flex;
  color: #45d068;
  gap: 0.3rem;
  span {
    ${Heavy}
  }
`;
