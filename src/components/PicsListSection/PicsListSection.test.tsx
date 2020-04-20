import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PicsListSection from ".";
import { RedditPic } from "../../types/RedditPic";

const pics: RedditPic[] = [
  {
    author: "a",
    id: "1",
    is_self: false,
    num_comments: 100,
    permalink: "a",
    thumbnail: "a",
    title: "Title 1",
    ups: 100,
    url: "string",
  },
  {
    author: "a",
    id: "2",
    is_self: false,
    num_comments: 100,
    permalink: "string",
    thumbnail: "string",
    title: "Title 2",
    ups: 100,
    url: "string",
  },
  {
    author: "a",
    id: "3",
    is_self: false,
    num_comments: 100,
    permalink: "string",
    thumbnail: "string",
    title: "Title 3",
    ups: 100,
    url: "string",
  },
];
const fn = () => {};

describe("renders PicsListSection", () => {
  test("displays loading", () => {
    const { getByTestId } = render(
      <PicsListSection
        pics={[]}
        showLoadMore={true}
        loading={true}
        onPicClick={fn}
        onLoadMoreClick={fn}
      />
    );
    const loadingCircle = getByTestId("pic-list-loading");
    expect(loadingCircle).toBeTruthy();
  });

  test("displays list of pics", () => {
    const { queryAllByTestId } = render(
      <PicsListSection
        pics={pics}
        showLoadMore={true}
        loading={false}
        onPicClick={fn}
        onLoadMoreClick={fn}
      />
    );
    const picListItems = queryAllByTestId("pic-list-item");
    expect(picListItems).toHaveLength(3);
  });

  test("displays No Pics Founds", () => {
    const { getByTestId } = render(
      <PicsListSection
        pics={[]}
        showLoadMore={false}
        loading={false}
        onPicClick={fn}
        onLoadMoreClick={fn}
      />
    );
    const emptyString = getByTestId("pic-list-empty");
    expect(emptyString).toBeTruthy();
  });

  test("displays Load More Button", () => {
    const { getByTestId } = render(
      <PicsListSection
        pics={[]}
        showLoadMore={true}
        loading={false}
        onPicClick={fn}
        onLoadMoreClick={fn}
      />
    );
    const loadMoreBtn = getByTestId("pic-list-load-more");
    expect(loadMoreBtn).toBeTruthy();
  });

  test("calls onLoadMoreClick", () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <PicsListSection
        pics={[]}
        showLoadMore={true}
        loading={false}
        onPicClick={fn}
        onLoadMoreClick={mockFn}
      />
    );
    const loadMoreBtn = getByTestId("pic-list-load-more");
    fireEvent.click(loadMoreBtn);
    expect(mockFn).toHaveBeenCalled();
  });

  test("calls onPicClick with correct index", () => {
    const mockFn = jest.fn();

    const { queryAllByTestId } = render(
      <PicsListSection
        pics={pics}
        showLoadMore={true}
        loading={false}
        onPicClick={mockFn}
        onLoadMoreClick={fn}
      />
    );
    const picListItems = queryAllByTestId("pic-list-item");

    fireEvent.click(picListItems[1]);
    expect(mockFn).toHaveBeenCalledWith(1);
  });
});
