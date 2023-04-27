import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { useSetRecoilState } from "recoil";
import { detailAtom } from "../../../lib/Atoms";
import { bgImg } from "../../atoms/Banner";
import { useOpacity } from "../../../utils/hooks";
import { flex } from "../../../styles/Css";
import * as fonts from "../../../styles/Fonts";
import { useQuery } from "@tanstack/react-query";
import { IResult } from "../../../interface/Interface";
import Loading from "../../atoms/Loading/Loading";
import * as Button from "../../molecules/Button/CircleButton";
import { AdultIcon } from "../../atoms/Icons";
import { IDetail } from "../../../lib/Atoms";

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

  const { data, isLoading, isError } = useQuery<IDetail | undefined>(
    ["detail", title || name],
    () => detailAPI({ id, media_type }),
    {
      enabled: isHover,
      cacheTime: 360000,
      staleTime: 360000,
    }
  );

  const totalMinutes = data?.runtime ?? 0;
  const { hours, minutes } = {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };

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
            <ButtonBox>
              <FlexLeftDiv>
                <Button.CirclePlay />
                <Button.CircleAdd />
              </FlexLeftDiv>
              <FlexRightBox>
                <Button.CircleDetail />
              </FlexRightBox>
            </ButtonBox>
            <InfoBox>
              {data?.vote_average !== 0 && (
                <Rating>
                  <p>평점</p>
                  <span>{data?.vote_average.toFixed(1)}</span>
                </Rating>
              )}
              {data?.adult ? <AdultIcon size={1.1} /> : <Age>15+</Age>}
              {data?.seasons ? (
                <span>{`시즌 ${data?.seasons.length}개`}</span>
              ) : data?.runtime !== 0 ? (
                <span>{`${hours}시간 ${minutes}분`}</span>
              ) : (
                ""
              )}
              <HD>HD</HD>
            </InfoBox>
            <TagBox>
              {data?.genres.map((genre, i) => (
                <li key={`genre_${i}`}>{genre.name}</li>
              ))}
            </TagBox>
            {/* <div>
              <AdultIcon size={1.1} />
            </div> */}
            {/* <button
              onClick={() => {
                setContentData(data);
                navigate(`/${id}`);
              }}
            >
              상세보기
            </button> */}
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
  ${fonts.mid1}
  ${fonts.Heavy}
`;

const ContentInfo = styled(motion.div)`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.black.veryDark};
  display: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: -0.1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const FlexLeftDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FlexRightBox = styled.div`
  margin-left: auto;
`;

const InfoBox = styled.div`
  ${flex("none")}
  ${fonts.normal}
  gap: 0.7rem;
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
  background-color: transparent;
  color: ${(props) => props.theme.white.lighter};
  border: 0.1px solid ${(props) => props.theme.black.vertLighter};
`;

const HD = styled(Age)`
  font-size: 1rem;
`;

const TagBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  ${fonts.normal}
  li {
    position: relative;
  }
  li:not(:first-child) {
    padding-left: 1rem;
  }
  li:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: ${(props) => props.theme.black.vertLighter};
    border-radius: 100%;
  }
`;
