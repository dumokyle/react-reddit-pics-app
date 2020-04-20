import { RedditPic } from "../types/RedditPic";

export async function fetchRedditPics(
  afterToken?: string
): Promise<{ nextToken: string; data: RedditPic[] }> {
  const response = await fetch(
    `https://www.reddit.com/r/pics/.json${afterToken && `?after=${afterToken}`}`
  );
  const body = await response.json();

  return {
    nextToken: body.data.after,
    data: body.data.children.map((child: any) => child.data) as RedditPic[],
  };
}
