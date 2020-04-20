import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RedditPic } from "../../types/RedditPic";
import PicModal from ".";

const pic: RedditPic = {
  author: "a",
  id: "1",
  is_self: false,
  num_comments: 100,
  permalink: "a",
  thumbnail: "a",
  title: "Title 1",
  ups: 100,
  url: "imgUrl",
};
const fn = () => {};

describe("renders PicModal", () => {
  test("displays Pic properly", () => {
    const { getByTestId } = render(<PicModal pic={pic} onCloseModal={fn} />);

    const modalPic = getByTestId("modal-pic");
    expect(modalPic).toHaveAttribute("src", "imgUrl");

    const modalTitle = getByTestId("modal-title");
    expect(modalTitle.innerHTML).toBe("Title 1");

    // ... test other data points displayed
  });

  test("should not display prev and next arrows", () => {
    const fn = () => {};
    const { queryAllByTestId } = render(
      <PicModal pic={pic} onCloseModal={fn} />
    );

    const nextBtn = queryAllByTestId("modal-next-btn");
    const prevBtn = queryAllByTestId("modal-prev-btn");

    expect(nextBtn).toHaveLength(0);
    expect(prevBtn).toHaveLength(0);
  });

  test("calls onArrowClick ", () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <PicModal pic={pic} onCloseModal={fn} onArrowClick={mockFn} />
    );
    const nextBtn = getByTestId("modal-next-btn");
    fireEvent.click(nextBtn);
    expect(mockFn).toBeCalledWith(1);

    const prevBtn = getByTestId("modal-prev-btn");
    fireEvent.click(prevBtn);
    expect(mockFn).toBeCalledWith(-1);
  });

  test("calls onCloseModal ", () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <PicModal pic={pic} onCloseModal={mockFn} />
    );
    const closeBtn = getByTestId("modal-close-btn");
    fireEvent.click(closeBtn);
    expect(mockFn).toBeCalled();
  });
});
