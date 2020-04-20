import React from "react";
import styled from "@emotion/styled";

import { RedditPic } from "../../types/RedditPic";

export interface PicListItemProps {
  pic: RedditPic;
}
function PicListItem({ pic }: PicListItemProps) {
  return (
    <PicListItemContainer>
      <img alt={pic.title} key={pic.id} src={pic.thumbnail} />
      <figcaption>{pic.title}</figcaption>
    </PicListItemContainer>
  );
}

export default PicListItem;

const PicListItemContainer = styled.figure`
  img {
    width: 100%;
  }

  figcaption {
    margin-top: 15px;
    word-break: break-word;
  }
`;
