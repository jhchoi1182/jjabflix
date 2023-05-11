import React from "react";
import styled from "styled-components";
import { normal2, normal3 } from "../../../../styles/Fonts";
import Rating from "../../../atoms/Slide/Rating";
import ReleaseDate from "../../../atoms/Slide/ReleaseDate";
import { RunningTime, Seasons } from "../../../atoms/Slide/RunningTime";
import { AdultIcon, Age15, HD } from "../../../atoms/Icons";
import { IContent } from "../../../../interface/Interface";

interface ITopDescriptionBox extends IContent {
  toBottomScrollHandler: () => void;
}

const TopDescriptionBox: React.FC<ITopDescriptionBox> = ({
  vote_average,
  release_date,
  seasons,
  runtime,
  overview,
  adult,
  production_companies,
  genres,
  tagline,
  toBottomScrollHandler,
}) => {
  return (
    <TopDescription>
      <LeftInfoDiv>
        <MedaDataBox>
          <Rating voteAverage={vote_average} />
          <ReleaseDate ReleaseDate={release_date} />
          {(seasons && <Seasons seasons={seasons} />) || (runtime && <RunningTime runtime={runtime} />)}
          <HD size="basic" />
        </MedaDataBox>
        {adult ? <AdultIcon size="basic" /> : <Age15 size="basic" />}
        <Overview>{overview}</Overview>
      </LeftInfoDiv>
      <RightInfoDiv>
        <DetailMetaData>
          <Label>제작사: </Label>
          <TextBox>
            {production_companies.map((company, i) => {
              if (i === production_companies.length - 1) {
                return <Text key={company.name}>{`${company.name}`}</Text>;
              } else {
                return <Text key={company.name}>{`${company.name},`}</Text>;
              }
            })}
          </TextBox>
          <More onClick={toBottomScrollHandler}>더 보기</More>
        </DetailMetaData>
        <DetailMetaData>
          <div>
            <Label>장르:</Label>
            {genres.map((genre, i) => {
              if (i === genres.length - 1) {
                return <Text key={genre.name}>{`${genre.name}`}</Text>;
              } else {
                return <Text key={genre.name}>{`${genre.name},`}</Text>;
              }
            })}
          </div>
        </DetailMetaData>
        {tagline && tagline !== "" && (
          <DetailMetaData>
            <div>
              <Label>태그라인:</Label>
              <Text>{tagline}</Text>
            </div>
          </DetailMetaData>
        )}
      </RightInfoDiv>
    </TopDescription>
  );
};

export default TopDescriptionBox;

const TopDescription = styled.div`
  display: flex;
  gap: 3rem;
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

const LeftInfoDiv = styled.div`
  width: 67%;
`;

const RightInfoDiv = styled.div`
  width: 33%;
  margin-top: -2.5rem;
`;

const DetailMetaData = styled.div`
  display: flex;
  margin-bottom: 1.7rem;
`;

const TextBox = styled.div`
  width: 14rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.span`
  color: ${(props) => props.theme.white.lighter};
  margin-right: 0.5rem;
`;

const More = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.white.lighter};
  font-style: italic;
  cursor: pointer;
`;

const Label = styled.label`
  color: ${(props) => props.theme.grey.lighter};
  margin-right: 0.5rem;
`;
