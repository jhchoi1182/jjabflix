import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { IContent } from "../../../interface/Interface";
import { Information } from "../../atoms/Layout";
import { Rating, RunningTime, Seasons } from "../../atoms/Meta";

interface IInfoBox extends IContent {
  noHD?: Boolean;
}

const InfoBox = ({ vote_average, adult, seasons, runtime, noHD }: IInfoBox) => {
  const isRuntime = runtime !== undefined && runtime !== null && runtime !== 0;

  return (
    <Information>
      {vote_average !== 0 && <Rating voteAverage={vote_average} />}
      {adult ? <AdultIcon size="small" /> : <Age15 size="basic" />}
      {(seasons && <Seasons seasons={seasons} />) || (isRuntime && <RunningTime runtime={runtime} />)}
      {!noHD && <HD size="basic" />}
    </Information>
  );
};

export default InfoBox;
