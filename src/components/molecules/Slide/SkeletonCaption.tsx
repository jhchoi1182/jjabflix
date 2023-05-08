import React from "react";
import { ButtonBox, FlexLeftDiv, FlexRightBox } from "./SlideItemButtonBox";
import * as Button from "../Button/CircleButton";
import { InfoBox } from "./SlideItemInfoBox";
import { TagBox } from "./SlideItemTagBox";
import { Age15, HD } from "../../atoms/Icons";
import Rating from "../../atoms/Slide/Rating";

const SkeletonCaption = () => {
  return (
    <>
      <ButtonBox>
        <FlexLeftDiv>
          <Button.CirclePlay buttonSize="slideButton" />
          <Button.CircleCheck buttonSize="slideButton" />
        </FlexLeftDiv>
        <FlexRightBox>
          <Button.CircleDetail buttonSize="slideButton" />
        </FlexRightBox>
      </ButtonBox>
      <InfoBox>
        <Rating />
        <Age15 size="basic" />
        <HD size="basic" />
      </InfoBox>
      <TagBox>
        <li>장르</li>
      </TagBox>
    </>
  );
};

export default SkeletonCaption;
