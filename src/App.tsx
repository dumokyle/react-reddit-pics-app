import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { TextField, AppBar } from "@material-ui/core";

import { RedditPic } from "./types/RedditPic";

import { useFetchRedditPics } from "./hooks/useFetchRedditPics";
import { useScrollPosition } from "./hooks/useScrollPosition";

import PicsListSection from "./components/PicsListSection";
import PicModal from "./components/PicModal";

function App() {
  const { pics, loading, getPics } = useFetchRedditPics();
  const { saveScrollPosition, setScrollPosition } = useScrollPosition();

  const [query, setQuery] = useState<string>("");
  const [selectedPicIndex, setSelectedPicIndex] = useState<number>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // when making query save scroll position
    saveScrollPosition();
    setQuery(e.target.value);
  };

  useEffect(() => {
    // when query is cleared set scroll position back
    if (!query) {
      setScrollPosition();
    }
  }, [query, setScrollPosition]);

  const filteredPics = filterByTitle(pics, query);

  const onCloseModal = () => {
    setSelectedPicIndex(undefined);
  };

  const incrementSelectedPicIndex = (incrementValue: number) => {
    setSelectedPicIndex((index) => {
      const length = filteredPics.length;

      return index !== undefined
        ? (index + incrementValue + length) % length
        : 0;
    });
  };

  const selectedPic =
    selectedPicIndex !== undefined && !!filteredPics[selectedPicIndex]
      ? filteredPics[selectedPicIndex]
      : undefined;

  return (
    <>
      <AppBar variant="outlined" color="default">
        <TextFieldWrapper>
          <TextField
            onChange={onChange}
            placeholder="Search By Title"
            variant="standard"
            size="small"
            fullWidth
          />
        </TextFieldWrapper>
      </AppBar>

      <MainWrapper data-testid="App-main">
        <h1>Reddit Pics</h1>

        <PicsListSection
          pics={filteredPics}
          loading={loading}
          showLoadMore={!query}
          onLoadMoreClick={getPics}
          onPicClick={setSelectedPicIndex}
        />
      </MainWrapper>

      {selectedPic && (
        <PicModal
          pic={selectedPic}
          onCloseModal={onCloseModal}
          onArrowClick={
            filteredPics.length > 1 ? incrementSelectedPicIndex : undefined
          }
        />
      )}
    </>
  );
}

export default App;

export function filterByTitle(list: RedditPic[], query: string): RedditPic[] {
  return list.filter((item) => item.title.toLowerCase().includes(query));
}

const MainWrapper = styled.main`
  margin: auto;
  margin-top: 100px;
  max-width: 1400px;
`;

const TextFieldWrapper = styled.div`
  margin: auto;
  max-width: 800px;
  padding: 10px 0;
  width: 100%;
`;
