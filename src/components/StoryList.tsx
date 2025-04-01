'use client'
import { Story } from "@/types"
import StoryItem from "./StoryItem"
import { useState } from "react"
import { getTopStories } from "@/services/hn"


type StoryListProps = {
  initialStories: Story[]
}

const NUMBER_OF_STORIES_PER_LOAD = 10;

export default function StoryList({ initialStories }: StoryListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_STORIES_PER_LOAD);
  const [stories, setStories] = useState<Story[]>(initialStories);

  const loadMoreStories = async () => {
    const newStories = await getTopStories(offset, NUMBER_OF_STORIES_PER_LOAD);
    setStories((prev) => [...prev, ...newStories]);
    setOffset((prev) => prev + NUMBER_OF_STORIES_PER_LOAD);
  }

  return (
    <div>
      {stories.map((story, index) => (
        <StoryItem 
          key={story.id}
          story={story} 
          index={index} 
        />
      ))}
      <button
        className="bg-slate-200 text-slate-600 p-2 text-sm rounded-md hover:bg-slate-300"
        onClick={loadMoreStories}
      >
        Ladda fler inlägg
      </button>
    </div>
  )
}
