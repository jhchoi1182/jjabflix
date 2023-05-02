import React from "react";
import styled from "styled-components";
import { useButtonOpacity } from "../../../utils/hooks";

const DummyItem = () => {
  const { setButtonOpacityAfterDelay, setButtonOpacityAfterDelayInvalidation } = useButtonOpacity();

  return (
    <Dummy
      onMouseEnter={() => setButtonOpacityAfterDelay(0)}
      onMouseLeave={() => setButtonOpacityAfterDelayInvalidation()}
    />
  );
};

export default DummyItem;

const Dummy = styled.div`
  width: calc(100% / 8.2);
`;
