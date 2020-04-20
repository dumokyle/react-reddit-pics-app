import React, { useState, useEffect } from "react";
import { fetchRedditPics } from "../services/fetchRedditPics";
import { RedditPic } from "../types/RedditPic";

export function useFetchRedditPics() {
  const [pics, setPics] = useState<RedditPic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const nextToken = React.useRef<string>("");

  const getPics = async () => {
    setLoading(true);

    const result = await fetchRedditPics(nextToken.current);

    nextToken.current = result.nextToken;
    setPics((pics) => {
      return [...pics, ...result.data.filter((pic) => !pic.is_self)];
    });
    setLoading(false);
  };

  useEffect(() => {
    getPics();
  }, []);

  return {
    pics,
    loading,
    getPics,
  };
}
