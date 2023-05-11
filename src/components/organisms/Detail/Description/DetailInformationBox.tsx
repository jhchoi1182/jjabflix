import React from "react";
import styled from "styled-components";
import { IContent } from "../../../../interface/Interface";
import DetailMetaDataLeft from "../../../molecules/Detail/DetailMetaDataLeft";
import DetailMetaDataRight from "../../../molecules/Detail/DetailMetaDataRight";

interface ItoBottomScrollHandler extends IContent {
  toBottomScrollHandler: () => void;
}

const DetailInformationBox: React.FC<ItoBottomScrollHandler> = ({
  vote_average,
  release_date,
  seasons,
  runtime,
  overview,
  adult,
  title,
  name,
  production_companies,
  genres,
  tagline,
  toBottomScrollHandler,
}) => {
  return (
    <FlexContainer>
      <DetailMetaDataLeft
        vote_average={vote_average}
        release_date={release_date}
        seasons={seasons}
        runtime={runtime}
        overview={overview}
        adult={adult}
        title={title}
        name={name}
      />
      <DetailMetaDataRight
        production_companies={production_companies}
        genres={genres}
        tagline={tagline}
        toBottomScrollHandler={toBottomScrollHandler}
      />
    </FlexContainer>
  );
};

export default DetailInformationBox;

const FlexContainer = styled.div`
  display: flex;
  gap: 3rem;
`;
