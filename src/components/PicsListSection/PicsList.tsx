import React from "react";
import styled from "@emotion/styled";

import { RedditPic } from "../../types/RedditPic";
import PicListItem from "./PicListItem";

export interface PicsListProps {
  pics: RedditPic[];
  onPicClick: (index: number) => void;
}
function PicsList({ pics, onPicClick }: PicsListProps) {
  return (
    <PicListContainer data-testid="pics-list">
      {pics.map((pic, index) => (
        <li
          onClick={() => onPicClick(index)}
          key={pic.id}
          tabIndex={0}
          data-testid="pic-list-item"
        >
          <PicListItem pic={pic} />
        </li>
      ))}
    </PicListContainer>
  );
}

export default PicsList;

const PicListContainer = styled.ul`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    background: #f0f0f0;
    flex: 0 0 18%;
    margin: 1%;
    cursor: pointer;
    transition: 0.3s ease transform;

    &:hover {
      transform: scale(1.025);
    }

    @media screen and (max-width: 1080px) {
      flex: 0 0 31%;
    }

    @media screen and (max-width: 700px) {
      flex: 0 0 48%;
    }
  }
`;
