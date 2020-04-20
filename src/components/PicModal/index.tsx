import React from "react";
import { Modal, Button } from "@material-ui/core";
import styled from "@emotion/styled";
import {
  ArrowForwardIos,
  ArrowBackIos,
  CloseOutlined,
} from "@material-ui/icons";

import { RedditPic } from "../../types/RedditPic";

export interface PicModalProps {
  pic: RedditPic;
  onCloseModal: () => void;
  onArrowClick?: (incrementValue: number) => void;
  getPrevImage?: () => void;
}

function PicModal({ pic, onCloseModal, onArrowClick }: PicModalProps) {
  const onNextClick = () => onArrowClick && onArrowClick(1);
  const onPrevClick = () => onArrowClick && onArrowClick(-1);
  return (
    <Modal open={true} onClose={onCloseModal} aria-labelledby="modal-title">
      <ModalContainer>
        <div className="modal-close">
          <Button
            onClick={onCloseModal}
            size="small"
            data-testid="modal-close-btn"
          >
            <CloseOutlined aria-label="Close" />
          </Button>
        </div>
        <div className="modal-pic-wrapper">
          {onArrowClick && (
            <>
              <div className="modal-nav modal-nav-prev">
                <Button onClick={onPrevClick} data-testid="modal-prev-btn">
                  <ArrowBackIos aria-label="Previous Pic" />
                </Button>
              </div>
              <div className="modal-nav modal-nav-next">
                <Button onClick={onNextClick} data-testid="modal-next-btn">
                  <ArrowForwardIos aria-label="Next Pic" />
                </Button>
              </div>
            </>
          )}
          <img
            className="modal-pic"
            alt={pic.title}
            src={pic.url}
            data-testid="modal-pic"
          />
        </div>
        <div className="modal-pic-info">
          <h2 id="modal-title" data-testid="modal-title">
            {pic.title}
          </h2>
          <p data-testid="modal-author">
            Posted By <strong>{pic.author}</strong>
          </p>
          <p data-testid="modal-comments">
            Comments: <strong>{pic.num_comments}</strong>
          </p>
          <p data-testid="modal-upvotes">
            Upvotes: <strong>{pic.ups}</strong>
          </p>
          <a
            href={`https://reddit.com${pic.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="modal-url"
          >
            View Reddit Post
          </a>
        </div>
      </ModalContainer>
    </Modal>
  );
}

export default PicModal;

const ModalContainer = styled.div`
  background: #fff;
  width: 80%;
  position: absolute;
  top: 10%;
  height: 80%;
  left: 10%;
  display: flex;

  .modal-close {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
  }

  .modal-pic-wrapper {
    padding: 15px;
    align-self: center;
    height: 100%;
    flex: 1;
    text-align: center;
    position: relative;

    .modal-nav {
      position: absolute;
      top: 50%;

      &-prev {
        left: 20px;
      }

      &-next {
        right: 20px;
      }
    }

    .modal-pic {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .modal-pic-info {
    padding: 15px;
    flex: 0 0 33%;
  }

  @media screen and (max-width: 1080px) {
    flex-wrap: wrap;
    height: 100%;
    left: 0px;
    top: 0px;
    width: 100%;

    .modal-pic-wrapper {
      flex: 0 0 100%;
      height: 50%;
    }
    .modal-pic-info {
      flex: 0 0 100%;
    }
  }
`;
