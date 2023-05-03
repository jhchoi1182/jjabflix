import React from "react";
import * as fonts from "../../../styles/Fonts";
import styled from "styled-components";
import { flex } from "../../../styles/Css";
import { AdultIcon } from "../../atoms/Icons";
import { IContent } from "../../../interface/Interface";

const SlideItemInfoBox: React.FC<IContent> = ({ vote_average, adult, seasons, runtime }) => {
  const totalMinutes = runtime ?? 0;
  const { hours, minutes } = {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };

  return (
    <InfoBox>
      {vote_average !== 0 && (
        <Rating>
          <p>평점</p>
          <span>{vote_average.toFixed(1)}</span>
        </Rating>
      )}
      {adult ? <AdultIcon size={1.1} /> : <Age>15+</Age>}
      {seasons ? (
        <span>{`시즌 ${seasons?.length}개`}</span>
      ) : runtime !== 0 ? (
        <span>{`${hours}시간 ${minutes}분`}</span>
      ) : (
        ""
      )}
      <HD>HD</HD>
    </InfoBox>
  );
};

export default SlideItemInfoBox;

const InfoBox = styled.div`
  ${flex("none")}
  ${fonts.normal}
  gap: 0.6rem;
  margin-top: 1.5rem;
`;

const Rating = styled.span`
  display: flex;
  color: #45d068;
  gap: 0.3rem;
  span {
    ${fonts.Heavy}
  }
`;

const Age = styled.button`
  ${fonts.normal}
  background-color: transparent;
  color: ${(props) => props.theme.white.lighter};
  border: 0.1px solid ${(props) => props.theme.black.vertLighter};
`;

const HD = styled(Age)`
  font-size: 1rem;
`;
