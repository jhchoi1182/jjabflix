import React, { useRef } from "react";
import styled from "styled-components";
import { IContent } from "../../../interface/Interface";
import Rating from "../../atoms/Slide/Rating";
import ReleaseDate from "../../atoms/Slide/ReleaseDate";
import { RunningTime, Seasons } from "../../atoms/Slide/RunningTime";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";
import { mid2rem, normal2, normal3 } from "../../../styles/Fonts";

const DescriptionBox: React.FC<IContent> = ({
  title,
  name,
  vote_average,
  release_date,
  seasons,
  runtime,
  adult,
  overview,
  production_companies,
  production_countries,
  genres,
  tagline,
}) => {
  /** 더 보기 클릭 시 스크롤 맨 밑으로 */
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const toBottomScrollHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PaddingContainer>
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
      <BottomDescription ref={scrollRef}>
        <BottomTitle>{`${title || name} 상세 정보`}</BottomTitle>
        <BottomDetailMetaDataBox>
          <BottomDetailMetaData>
            <div>
              <Label>제작사:</Label>
              {production_companies.map((company, i) => {
                if (i === production_companies.length - 1) {
                  return <Text key={company.name}>{`${company.name}`}</Text>;
                } else {
                  return <Text key={company.name}>{`${company.name},`}</Text>;
                }
              })}
            </div>
          </BottomDetailMetaData>
          <BottomDetailMetaData>
            <div>
              <Label>국가:</Label>
              {production_countries.map((country, i) => {
                if (i === production_countries.length - 1) {
                  return <Text key={country.name}>{`${country.name}`}</Text>;
                } else {
                  return <Text key={country.name}>{`${country.name},`}</Text>;
                }
              })}
            </div>
          </BottomDetailMetaData>
          <BottomDetailMetaData>
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
          </BottomDetailMetaData>
          {tagline && tagline !== "" && (
            <BottomDetailMetaData>
              <div>
                <Label>태그라인:</Label>
                <Text>{tagline}</Text>
              </div>
            </BottomDetailMetaData>
          )}
        </BottomDetailMetaDataBox>
        <BottomDetailMetaData>
          <div style={{ display: "flex" }}>
            <Label>관람등급:</Label>
            {adult ? (
              <div style={{ marginLeft: "0.5rem" }}>
                <AdultIcon size="basic" />
                <span style={{ marginLeft: "1.5rem" }}>19세이상관람가</span>
              </div>
            ) : (
              <div style={{ marginLeft: "0.5rem" }}>
                <Age15 size="basic" />
                <span style={{ marginLeft: "1.5rem" }}>15세이상관람가</span>
              </div>
            )}
          </div>
        </BottomDetailMetaData>
      </BottomDescription>
    </PaddingContainer>
  );
};

export default DescriptionBox;

const PaddingContainer = styled.section`
  padding: 3.5rem 5rem;
`;

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

const Label = styled.label`
  color: ${(props) => props.theme.grey.lighter};
  margin-right: 0.5rem;
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

const BottomDescription = styled.div`
  margin-top: 8rem;
`;

const BottomTitle = styled.h3`
  ${mid2rem}
`;

const BottomDetailMetaDataBox = styled.div`
  margin-top: 2.3rem;
`;

const BottomDetailMetaData = styled.div`
  display: flex;
  margin-bottom: 0.7rem;
`;
