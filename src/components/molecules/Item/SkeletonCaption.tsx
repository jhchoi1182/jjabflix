import React from "react";
import * as Button from "../Button/CircleButton";
import { Age15, HD } from "../../atoms/Icons";
import styled from "styled-components";
import {
  FlexDivLeft,
  FlexDivRight,
  FlexPaddingContainer,
  Information,
  Tag,
} from "../../atoms/Layout/ItemLayout/ItemCaptionLayouts";
import { Rating } from "../../atoms/Meta";

const SkeletonCaption = () => {
  return (
    <>
      <ButtonBox>
        <FlexDivLeft>
          <Button.CirclePlay buttonSize="slideButton" />
          <Button.CircleCheck buttonSize="slideButton" />
        </FlexDivLeft>
        <FlexDivRight>
          <Button.CircleDetail buttonSize="slideButton" />
        </FlexDivRight>
      </ButtonBox>
      <Information>
        <Rating />
        <Age15 size="basic" />
        <HD size="basic" />
      </Information>
      <Tag>
        <li>장르</li>
      </Tag>
    </>
  );
};

export default SkeletonCaption;

const ButtonBox = styled(FlexPaddingContainer)``;
