import styled from "styled-components";
import { Genre, productionCompanies } from "../../../interface/Interface";
import { TagLabel, TagText } from "../../atoms/Meta";
import { EllipsisBox } from "../../atoms/Layout";
import { theme } from "../../../styles/theme";

interface IDetailMetaDataRight {
  production_companies: productionCompanies[];
  genres: Genre[];
  tagline?: string;
  toBottomScrollHandler: () => void;
}

const DetailMetaDataRight = ({
  production_companies,
  genres,
  tagline,
  toBottomScrollHandler,
}: IDetailMetaDataRight) => {
  return (
    <WidthContainer>
      {production_companies.length !== 0 && (
        <MetaTagBox>
          <TagLabel>제작사:</TagLabel>
          <EllipsisBox>
            {production_companies.map((company) => {
              return <TagText key={company.name}>{`${company.name}`}</TagText>;
            })}
          </EllipsisBox>
          <ItalicText onClick={toBottomScrollHandler}>더 보기</ItalicText>
        </MetaTagBox>
      )}
      {genres.length !== 0 && (
        <MetaTagBox>
          <div>
            <TagLabel>장르:</TagLabel>
            {genres.map((genre) => {
              return <TagText key={genre.name}>{`${genre.name}`}</TagText>;
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
  @media (max-width: 940px) {
    display: block;
  }
`;

const ItalicText = styled.span`
  margin-left: 0.5rem;
  color: ${theme.white.lighter};
  font-style: italic;
  cursor: pointer;
`;
