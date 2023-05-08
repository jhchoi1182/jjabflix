import React from "react";
import * as fonts from "../../../styles/Fonts";
import styled from "styled-components";
import { flex } from "../../../styles/Css";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { IContent } from "../../../interface/Interface";
import Rating from "../../atoms/Slide/Rating";

const SlideItemInfoBox: React.FC<IContent> = ({ vote_average, adult, seasons, runtime }) => {
  const totalMinutes = runtime ?? 0;
  const { hours, minutes } = {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };

  return (
    <InfoBox>
      {vote_average !== 0 && <Rating voteAverage={vote_average} />}
      {adult ? <AdultIcon size="basic" /> : <Age15 size="basic" />}
      {seasons ? (
        <span>{`시즌 ${seasons?.length}개`}</span>
      ) : runtime !== 0 ? (
        <span>{`${hours}시간 ${minutes}분`}</span>
      ) : (
        ""
      )}
      <HD size="basic" />
    </InfoBox>
  );
};

export default SlideItemInfoBox;

export const InfoBox = styled.div`
  ${flex("none")}
  ${fonts.small2}
  gap: 0.6rem;
  margin-top: 1.5rem;
`;
