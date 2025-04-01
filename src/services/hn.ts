import { Comment, Story } from "@/types";

export const getTopStories = async (offset: number = 0, limit: number = 10):Promise<Story[]> => {
  const topstories:number[] = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
    next: {
      revalidate: 120
    }
  }).then(res => res.json());
  

  const paginatedStories = topstories.slice(offset, offset + limit);

  return Promise.all(paginatedStories.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }
  }).then(res => res.json())))
}

export const getStory = async (id:number):Promise<Story> => {
  return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }
  })
    .then(res => res.json());
}

export const getComment = async (id:number):Promise<Comment> => {
  return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }
  })
    .then(res => res.json());
}
