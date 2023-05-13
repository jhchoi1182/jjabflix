import React, { useState } from "react";
import { motion } from "framer-motion";
import { IContent } from "../../../interface/Interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { detailAPI } from "../../../api/Apis";
import { ButtonBox, ImageBanner, InfoBox, SkeletonCaption, TagBox } from "../../molecules/Item";
import { ItemCaptionWrapper, nthChild } from "../../atoms/Layout";
import styled from "styled-components";
import { captionVariants, contentVariants } from "../../atoms/Variants/Variants";

const DataFetcherItem: React.FC<IContent> = ({ ...content }) => {
  const { id, title, name, backdrop_path, poster_path, media_type } = content;
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();

  const queryKey = ["detail", title || name];
  const queryFn = () => detailAPI({ id, media_type });
  const dataOption = { cacheTime: 360000, staleTime: 360000 };

  const { data, isError } = useQuery<IContent | undefined>(queryKey, queryFn, {
    enabled: false,
    ...dataOption,
  });

  /** searchAPI에 없는 데이터 추가 요청 */
  const BannerMouseEnterHandler = async () => {
    await queryClient.fetchQuery(queryKey, queryFn, dataOption);
    setIsHovered(true);
  };

  return (
    <HoverBigScaleContainer
      layoutId={"search" + id}
      variants={contentVariants}
      whileHover={isHovered ? "hover" : "normal"}
      initial="normal"
      transition={{ type: "tween" }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageBanner
        onMouseEnter={BannerMouseEnterHandler}
        backdrop={backdrop_path}
        poster={poster_path}
        title={title}
        name={name}
      />
      <ItemCaptionWrapper variants={captionVariants}>
        {isError ? (
          <div>에러</div>
        ) : data ? (
          <React.Fragment>
            <ButtonBox {...data} />
            <InfoBox {...data} />
            {data.genres && <TagBox genres={data.genres} oneLine />}
          </React.Fragment>
        ) : (
          <SkeletonCaption />
        )}
      </ItemCaptionWrapper>
    </HoverBigScaleContainer>
  );
};

export default DataFetcherItem;

const HoverBigScaleContainer = styled(motion.div)`
  margin-bottom: -129px;
  ${nthChild}
`;
