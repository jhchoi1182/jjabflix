import React from "react";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { IContent } from "../../../interface/Interface";
import Rating from "../../atoms/Slide/Rating";
import { RunningTime, Seasons } from "../../atoms/Slide/RunningTime";
import { Information } from "../../atoms/Layout/Item/ItemCaptionLayouts";

const InfoBox: React.FC<IContent> = ({ vote_average, adult, seasons, runtime }) => {
  return (
    <Information>
      {vote_average !== 0 && <Rating voteAverage={vote_average} />}
      {adult ? <AdultIcon size="basic" /> : <Age15 size="basic" />}
      {(seasons && <Seasons seasons={seasons} />) || (runtime && <RunningTime runtime={runtime} />)}
      <HD size="basic" />
    </Information>
  );
};

export default InfoBox;
