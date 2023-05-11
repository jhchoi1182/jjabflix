import React from "react";
import styled from "styled-components";
import { Genre, productionCompanies } from "../../../interface/Interface";
import TagLabel from "../../atoms/TagLabel";
import EllipsisBox from "../../atoms/EllipsisBox";
import TagText from "../../atoms/TagText";

interface IDetailMetaDataRight {
  production_companies: productionCompanies[];
  genres: Genre[];
  tagline?: string;
  toBottomScrollHandler: () => void;
}

const DetailMetaDataRight: React.FC<IDetailMetaDataRight> = ({
  production_companies,
  genres,
  tagline,
  toBottomScrollHandler,
}) => {
  return (
    <WidthContainer>
      <MetaTagBox>
        <TagLabel>제작사:</TagLabel>
        <EllipsisBox>
          {production_companies.map((company, i) => {
            if (i === production_companies.length - 1) {
              return <TagText key={company.name}>{`${company.name}`}</TagText>;
            } else {
              return <TagText key={company.name}>{`${company.name},`}</TagText>;
            }
          })}
        </EllipsisBox>
        <ItalicText onClick={toBottomScrollHandler}>더 보기</ItalicText>
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
    </WidthContainer>
  );
};

export default DetailMetaDataRight;

const WidthContainer = styled.div`
  width: 33%;
  margin-top: -2.5rem;
`;

const MetaTagBox = styled.div`
  display: flex;
  margin-bottom: 1.7rem;
`;

const ItalicText = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.white.lighter};
  font-style: italic;
  cursor: pointer;
`;
