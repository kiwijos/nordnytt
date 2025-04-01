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
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreStories = async () => {
    setIsLoading(true);
    try {
      const newStories = await getTopStories(offset, NUMBER_OF_STORIES_PER_LOAD);
      setStories((prev) => [...prev, ...newStories]);
      setOffset((prev) => prev + NUMBER_OF_STORIES_PER_LOAD);
    } catch (error) {
      console.error("Error loading more stories:", error);
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? "Laddar..." : "Ladda fler inlägg"}
      </button>
    </div>
  )
}
