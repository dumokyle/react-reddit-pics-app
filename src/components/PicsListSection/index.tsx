import React from "react";
import styled from "@emotion/styled";

import { RedditPic } from "../../types/RedditPic";
import PicsList from "./PicsList";
import { CircularProgress, Button } from "@material-ui/core";

export interface PicsListProps {
  pics: RedditPic[];
  loading: boolean;
  showLoadMore: boolean;
  onLoadMoreClick?: () => void;
  onPicClick: (index: number) => void;
}
function PicsListSection({
  pics,
  loading,
  showLoadMore,
  onLoadMoreClick,
  onPicClick,
}: PicsListProps) {
  return (
    <div>
      <PicsList pics={pics} onPicClick={onPicClick} />

      <PicsListBottomWrapper>
        {loading ? (
          <CircularProgress data-testid="pic-list-loading" />
        ) : (
          <>
            {pics.length === 0 && (
              <span data-testid="pic-list-empty">No Pics Found</span>
            )}

            {showLoadMore && onLoadMoreClick && (
              <Button
                variant="contained"
                onClick={onLoadMoreClick}
                data-testid="pic-list-load-more"
              >
                Load More
              </Button>
            )}
          </>
        )}
      </PicsListBottomWrapper>
    </div>
  );
}

export default PicsListSection;

const PicsListBottomWrapper = styled.div`
  margin: 30px auto;
  text-align: center;
`;
