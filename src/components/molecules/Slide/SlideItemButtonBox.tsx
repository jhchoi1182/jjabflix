import React, { useState } from "react";
import styled from "styled-components";
import * as Button from "../Button/CircleButton";
import { IContent } from "../../../interface/Interface";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FavoriteAtom, detailAtom } from "../../../lib/Atoms";
import { useBookmark, useTooltip } from "../../../utils/Hooks";

interface ISlideItemButtonBox extends IContent {
  onMouseEnter?: () => void;
  skeleton?: boolean;
}

const SlideItemButtonBox: React.FC<ISlideItemButtonBox> = ({ onMouseEnter, skeleton, ...data }) => {
  const { addFavoriteContents, removeFavoriteContents } = useBookmark();
  const { isHovered, onMouseEnterHandler, onMouseLeaveHandler, renderTooltip } = useTooltip();
  const favoriteContents = useRecoilValue(FavoriteAtom);
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();
  const { id } = data;

  const isAdded = favoriteContents.some((content) => content.id === id);

  const showDetailHandler = () => {
    if (data) {
      setContentData(data);
      navigate(`/${id}`);
    }
  };

  return (
    <ButtonBox onMouseEnter={onMouseEnter}>
      <FlexLeftDiv>
        <Button.CirclePlay buttonSize="slideButton" />
        {isAdded ? (
          <Button.CircleCheck onClick={() => removeFavoriteContents(data)} buttonSize="slideButton" />
        ) : (
          <Button.CircleAdd
            onMouseEnter={() => onMouseEnterHandler({ text: "내가 찜한 콘텐츠에 추가", left: -30 })}
            onMouseLeave={onMouseLeaveHandler}
            onClick={() => addFavoriteContents(data)}
            buttonSize="slideButton"
          />
        )}
      </FlexLeftDiv>
      <FlexRightBox>
        <Button.CircleDetail onClick={showDetailHandler} buttonSize="slideButton" />
      </FlexRightBox>
      {isHovered && renderTooltip()}
    </ButtonBox>
  );
};

export default SlideItemButtonBox;

export const ButtonBox = styled.div`
  display: flex;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

export const FlexLeftDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FlexRightBox = styled.div`
  margin-left: auto;
`;
