import React from "react";
import styled from "styled-components";
import Rating from "../../atoms/Slide/Rating";
import ReleaseDate from "../../atoms/Slide/ReleaseDate";
import { RunningTime, Seasons } from "../../atoms/Slide/RunningTime";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { normal2, normal3 } from "../../../styles/Fonts";

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

const DetailMetaDataLeft: React.FC<IDetailMetaDataLeft> = ({
  vote_average,
  release_date,
  seasons,
  runtime,
  overview,
  adult,
  title,
  name,
}) => {
  return (
    <WidthContainer>
      <MedaDataBox>
        <Rating voteAverage={vote_average} />
        <ReleaseDate ReleaseDate={release_date} />
        {(seasons && <Seasons seasons={seasons} />) || (runtime && <RunningTime runtime={runtime} />)}
        <HD size="basic" />
      </MedaDataBox>
      {adult ? <AdultIcon size="basic" /> : <Age15 size="basic" />}
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
  ${normal2}
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Overview = styled.p`
  margin-top: 3.2rem;
  ${normal3}
  line-height: 1.5;
`;
