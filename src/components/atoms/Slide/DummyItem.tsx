import React from "react";
import styled from "styled-components";
import { useOpacity } from "../../../utils/hooks";

const DummyItem = () => {
  const { setOpacityAfterDelay, setOpacityAfterDelayInvalidation } = useOpacity();

  return <Dummy onMouseEnter={() => setOpacityAfterDelay(0)} onMouseLeave={() => setOpacityAfterDelayInvalidation()} />;
};

export default DummyItem;

const Dummy = styled.div`
  width: calc(100% / 8.2);
`;
