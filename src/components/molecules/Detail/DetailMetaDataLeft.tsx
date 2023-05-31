import styled from "styled-components";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { Rating, ReleaseDate, RunningTime, Seasons } from "../../atoms/Meta";
import { font, fontWeight } from "../../../styles/Fonts";

interface IDetailMetaDataLeft {
  vote_average: number;
  release_date: Date;
  seasons?: [];
  runtime?: number;
  overview?: string;
  adult: boolean;
  title: string;
  name?: string;
}

const DetailMetaDataLeft = ({
  vote_average,
  release_date,
  seasons,
  runtime,
  overview,
  adult,
  title,
  name,
}: IDetailMetaDataLeft) => {
  const isRuntime = runtime !== undefined && runtime !== null && runtime !== 0;

  return (
    <WidthContainer>
      <MedaDataBox>
        <Rating voteAverage={vote_average} />
        <ReleaseDate ReleaseDate={release_date} />
        {(seasons && <Seasons seasons={seasons} />) || (isRuntime && <RunningTime runtime={runtime} />)}
        <HD size="big" />
      </MedaDataBox>
      {adult ? <AdultIcon size="basic" /> : <Age15 size="big" />}
      <Overview>{overview === "" ? title || name : overview}</Overview>
    </WidthContainer>
  );
};

export default DetailMetaDataLeft;

const WidthContainer = styled.div`
  width: 67%;
`;

const MedaDataBox = styled.div`
  display: flex;
  font-weight: ${fontWeight.Bold};
  gap: 1rem;
  margin-bottom: 0.5rem;
  @media (max-width: 525px) {
    display: block;
  }
`;

const Overview = styled.p`
  margin-top: 3.2rem;
  ${font.S_overview}
  line-height: 1.5;
`;
