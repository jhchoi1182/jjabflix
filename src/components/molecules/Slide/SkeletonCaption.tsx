import React from "react";
import { ButtonBox, FlexLeftDiv, FlexRightBox } from "./SlideItemButtonBox";
import * as Button from "../Button/CircleButton";
import { Age, HD, InfoBox, Rating } from "./SlideItemInfoBox";
import { TagBox } from "./SlideItemTagBox";

const SkeletonCaption = () => {
  return (
    <>
      <ButtonBox>
        <FlexLeftDiv>
          <Button.CirclePlay />
          <Button.CircleCheck />
        </FlexLeftDiv>
        <FlexRightBox>
          <Button.CircleDetail />
        </FlexRightBox>
      </ButtonBox>
      <InfoBox>
        <Rating>
          <p>평점</p>
        </Rating>
        <Age>15+</Age>
        <HD />
      </InfoBox>
      <TagBox>
        <li>장르</li>
      </TagBox>
    </>
  );
};

export default SkeletonCaption;
