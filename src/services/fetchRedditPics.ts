import { RedditPic } from "../types/RedditPic";

export async function fetchRedditPics(
  afterToken?: string
): Promise<{ nextToken?: string; data: RedditPic[] }> {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/pics/.json${
        afterToken ? `?after=${afterToken}` : ""
      }`
    );
    const body = await response.json();

    return {
      nextToken: body.data.after,
      data: body.data.children.map((child: any) => child.data) as RedditPic[],
    };
  } catch (error) {
    console.error(error);

    return {
      nextToken: undefined,
      data: [],
    };
  }
}
