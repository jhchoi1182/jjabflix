import { forwardRef } from "react";
import styled from "styled-components";
import { font } from "../../../../styles/Fonts";
import { IContent } from "../../../../interface/Interface";
import { AdultIcon, Age15 } from "../../../atoms/Icons";
import { TagLabel, TagText } from "../../../atoms/Meta";

const DetailAboutBox = forwardRef<HTMLDivElement, IContent>(
  ({ title, name, adult, production_companies, production_countries, genres, tagline }, ref) => {
    return (
      <MarginTopContainer ref={ref}>
        <Title>{`${title || name} 상세 정보`}</Title>
        <AboutContainer>
          {production_companies.length !== 0 && (
            <MetaTagBox>
              <div>
                <TagLabel>제작사:</TagLabel>
                {production_companies.map((company) => {
                  return <TagText key={company.name}>{`${company.name}`}</TagText>;
                })}
              </div>
            </MetaTagBox>
          )}
          {production_countries.length !== 0 && (
            <MetaTagBox>
              <div>
                <TagLabel>국가:</TagLabel>
                {production_countries.map((country) => {
                  return <TagText key={country.name}>{`${country.name},`}</TagText>;
                })}
              </div>
            </MetaTagBox>
          )}
          {genres.length !== 0 && (
            <MetaTagBox>
              <div>
                <TagLabel>장르:</TagLabel>
                {genres.map((genre) => {
                  return <TagText key={genre.name}>{`${genre.name},`}</TagText>;
                })}
              </div>
            </MetaTagBox>
          )}
          {tagline && tagline.trim() !== "" && (
            <MetaTagBox>
              <div>
                <TagLabel>태그라인:</TagLabel>
                <TagText>{tagline}</TagText>
              </div>
            </MetaTagBox>
          )}
          <MetaTagBox>
            <TagLabel>관람등급:</TagLabel>
            {adult ? (
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
  ${font.S_title}
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
