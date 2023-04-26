import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { useSetRecoilState } from "recoil";
import { detailAtom } from "../../../lib/Atoms";
import { bgImg } from "../../atoms/Banner";
import { useOpacity } from "../../../utils/hooks";
import { flex, SmallTitle } from "../../../styles/Css";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../interface/Interface";
import Loading from "../../atoms/Loading/Loading";

const contentVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    display: "block",
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const SlideContent: React.FC<IResult> = ({ id, title, name, backdrop_path, poster_path, media_type }) => {
  const [isHover, setIsHover] = useState(false);
  const { resetOpacityAfterDelay, resetOpacityAfterDelayInvalidation } = useOpacity({ out: 0 });
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["detail", title], () => detailAPI({ id, media_type }), {
    enabled: isHover,
    cacheTime: 360000,
    staleTime: 360000,
  });

  const onMouseEnterHandler = () => {
    setIsHover((prev) => !prev);
    resetOpacityAfterDelay();
  };
  const onMouseLeaveHandler = () => {
    resetOpacityAfterDelayInvalidation();
  };

  useEffect(() => {
    if (isHover) setIsHover(false);
  }, [isHover]);

  return (
    <Container
      layoutId={String(id)}
      variants={contentVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Banner bgimg={posterAPI(backdrop_path ?? poster_path, "w500")}>
        <Title>{title ?? name}</Title>
      </Banner>
      <ContentInfo variants={infoVariants}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>에러</div>
        ) : (
          <React.Fragment>
            <button
              onClick={() => {
                setContentData(data);
                navigate(`/${id}`);
              }}
            >
              상세보기
            </button>
          </React.Fragment>
        )}
      </ContentInfo>
    </Container>
  );
};

export default SlideContent;

const Container = styled(motion.div)`
  width: calc(100% / 8.2);
  &:nth-child(2) {
    transform-origin: center left !important;
  }
  &:nth-child(7) {
    transform-origin: center right !important;
  }
`;

const Banner = styled(motion.div)<{ bgimg: string }>`
  ${bgImg}
  height: 170px;
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title = styled(motion.p)`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${SmallTitle}
`;

const ContentInfo = styled(motion.div)`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.black.veryDark};
  display: none;
`;