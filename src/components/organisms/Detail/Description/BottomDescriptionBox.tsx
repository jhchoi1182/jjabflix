import React, { forwardRef } from "react";
import styled from "styled-components";
import { mid2rem } from "../../../../styles/Fonts";
import { IContent } from "../../../../interface/Interface";
import { AdultIcon, Age15 } from "../../../atoms/Icons";

const BottomDescriptionBox = forwardRef<HTMLDivElement, IContent>(
  ({ title, name, adult, production_companies, production_countries, genres, tagline }, ref) => {
    return (
      <BottomDescription ref={ref}>
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
    );
  }
);

export default BottomDescriptionBox;

const Label = styled.label`
  color: ${(props) => props.theme.grey.lighter};
  margin-right: 0.5rem;
`;

const Text = styled.span`
  color: ${(props) => props.theme.white.lighter};
  margin-right: 0.5rem;
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
