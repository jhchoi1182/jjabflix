import React, { forwardRef } from "react";
import styled from "styled-components";
import { mid2rem } from "../../../../styles/Fonts";
import { IContent } from "../../../../interface/Interface";
import { AdultIcon, Age15 } from "../../../atoms/Icons";
import TagLabel from "../../../atoms/TagLabel";
import TagText from "../../../atoms/TagText";

const DetailAboutBox = forwardRef<HTMLDivElement, IContent>(
  ({ title, name, adult, production_companies, production_countries, genres, tagline }, ref) => {
    return (
      <MarginTopContainer ref={ref}>
        <Title>{`${title || name} 상세 정보`}</Title>
        <AboutContainer>
          <MetaTagBox>
            <div>
              <TagLabel>제작사:</TagLabel>
              {production_companies.map((company, i) => {
                if (i === production_companies.length - 1) {
                  return <TagText key={company.name}>{`${company.name}`}</TagText>;
                } else {
                  return <TagText key={company.name}>{`${company.name},`}</TagText>;
                }
              })}
            </div>
          </MetaTagBox>
          <MetaTagBox>
            <div>
              <TagLabel>국가:</TagLabel>
              {production_countries.map((country, i) => {
                if (i === production_countries.length - 1) {
                  return <TagText key={country.name}>{`${country.name}`}</TagText>;
                } else {
                  return <TagText key={country.name}>{`${country.name},`}</TagText>;
                }
              })}
            </div>
          </MetaTagBox>
          <MetaTagBox>
            <div>
              <TagLabel>장르:</TagLabel>
              {genres.map((genre, i) => {
                if (i === genres.length - 1) {
                  return <TagText key={genre.name}>{`${genre.name}`}</TagText>;
                } else {
                  return <TagText key={genre.name}>{`${genre.name},`}</TagText>;
                }
              })}
            </div>
          </MetaTagBox>
          {tagline && tagline !== "" && (
            <MetaTagBox>
              <div>
                <TagLabel>태그라인:</TagLabel>
                <TagText>{tagline}</TagText>
              </div>
            </MetaTagBox>
          )}
          <MetaTagBox>
            <TagLabel>관람등급:</TagLabel>
            {!adult ? (
              <FlexBox>
                <AdultIcon size="basic" />
                <span>19세이상관람가</span>
              </FlexBox>
            ) : (
              <FlexBox>
                <Age15 size="basic" />
                <span>15세이상관람가</span>
              </FlexBox>
            )}
          </MetaTagBox>
        </AboutContainer>
      </MarginTopContainer>
    );
  }
);

export default DetailAboutBox;

const MarginTopContainer = styled.div`
  margin-top: 10rem;
`;

const Title = styled.h3`
  ${mid2rem}
`;

const AboutContainer = styled.div`
  margin-top: 2.3rem;
`;

const MetaTagBox = styled.div`
  display: flex;
  margin-bottom: 0.7rem;
`;

const FlexBox = styled.div`
  display: flex;
  margin-left: 0.5rem;
  gap: 1.5rem;
`;
