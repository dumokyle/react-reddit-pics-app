import React from "react";

export function useScrollPosition() {
  const scrollPos = React.useRef<number>();

  const saveScrollPosition = () => {
    if (!scrollPos.current) {
      scrollPos.current = document.documentElement.scrollTop;
    }
  };

  const setScrollPosition = () => {
    document.documentElement.scrollTo({ top: scrollPos.current });
    scrollPos.current = undefined;
  };

  return { saveScrollPosition, setScrollPosition };
}
