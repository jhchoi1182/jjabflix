import React from "react";
import * as fonts from "../../../styles/Fonts";
import styled from "styled-components";
import { flex } from "../../../styles/css";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { IContent } from "../../../interface/Interface";
import Rating from "../../atoms/Slide/Rating";
import { RunningTime, Seasons } from "../../atoms/Slide/RunningTime";

const SlideItemInfoBox: React.FC<IContent> = ({ vote_average, adult, seasons, runtime }) => {
  return (
    <InfoBox>
      {vote_average !== 0 && <Rating voteAverage={vote_average} />}
      {adult ? <AdultIcon size="basic" /> : <Age15 size="basic" />}
      {(seasons && <Seasons seasons={seasons} />) || (runtime && <RunningTime runtime={runtime} />)}
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
