import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { detailAPI, posterAPI } from "../../../api/Apis";
import { bgImg } from "../../atoms/Banner";
import { useButtonOpacity } from "../../../utils/hooks";
import { flex } from "../../../styles/Css";
import * as fonts from "../../../styles/Fonts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IResult } from "../../../interface/Interface";
import Loading from "../../atoms/Loading/Loading";
import { AdultIcon } from "../../atoms/Icons";
import { IDetail } from "../../../lib/Atoms";
import SlideButtonBox from "../../atoms/Slide/SlideButtonBox";

const contentVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    zIndex: 1,
    y: -70,
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

const SlideItem: React.FC<IResult> = ({ id, title, name, backdrop_path, poster_path, media_type, category }) => {
  const { setButtonOpacity, setButtonOpacityAfterDelay, setButtonOpacityAfterDelayInvalidation } = useButtonOpacity();
  const queryClient = useQueryClient();

  const queryKey = ["detail", title || name];
  const queryFn = () => detailAPI({ id, media_type });
  const dataOption = { cacheTime: 360000, staleTime: 360000 };

  const { data, isLoading, isError } = useQuery<IDetail | undefined>(queryKey, queryFn, {
    enabled: false,
    ...dataOption,
  });

  const totalMinutes = data?.runtime ?? 0;
  const { hours, minutes } = {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };

  const onMouseEnterHandler = async () => {
    await queryClient.fetchQuery(queryKey, queryFn, dataOption);
    setButtonOpacityAfterDelay(0);
  };
  const onMouseLeaveHandler = () => {
    setButtonOpacityAfterDelayInvalidation();
    setButtonOpacity(1);
  };

  return (
    <SlideContent
      layoutId={category + id}
      variants={contentVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <SlideImage bgimg={posterAPI(backdrop_path ?? poster_path, "w500")}>
        <Title>{title ?? name}</Title>
      </SlideImage>
      <SlideCaption variants={infoVariants}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>에러</div>
        ) : (
          <React.Fragment>
            <SlideButtonBox {...(data as IDetail)} media_type={media_type} category={category} />
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
          </React.Fragment>
        )}
      </SlideCaption>
    </SlideContent>
  );
};

export default SlideItem;

const SlideContent = styled(motion.div)`
  width: calc(100% / 8.2);
  &:nth-child(2) {
    transform-origin: center left !important;
  }
  &:nth-child(7) {
    transform-origin: center right !important;
  }
`;

const SlideImage = styled(motion.div)<{ bgimg: string }>`
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
  ${fonts.mid2}
  ${fonts.Heavy}
`;

const SlideCaption = styled(motion.div)`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.black.veryDark};
  display: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: -0.1rem;
`;

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
