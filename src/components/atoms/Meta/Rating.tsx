import styled from "styled-components";
import { fontWeight } from "../../../styles/Fonts";

interface RatingProps {
  voteAverage?: number;
}

const Rating = ({ voteAverage }: RatingProps) => {
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
    font-weight: ${fontWeight.Heavy};
  }
`;
