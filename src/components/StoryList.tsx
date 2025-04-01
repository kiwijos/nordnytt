'use client'
import { Story } from "@/types"
import StoryItem from "./StoryItem"
import { useEffect, useState } from "react"
import { getTopStories } from "@/services/hn"
import { useInView } from 'react-intersection-observer'

type StoryListProps = {
  initialStories: Story[]
}

const NUMBER_OF_STORIES_PER_LOAD = 10;

export default function StoryList({ initialStories }: StoryListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_STORIES_PER_LOAD);
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [hasMoreStories, setHasMoreStories] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView()

  const loadMoreStories = async () => {
    if (isLoading || !hasMoreStories) return;

    setIsLoading(true);
    try {
      const newStories = await getTopStories(offset, NUMBER_OF_STORIES_PER_LOAD);
      
      if (newStories.length < NUMBER_OF_STORIES_PER_LOAD) {
        setHasMoreStories(false);
      }

      setStories((prev) => [...prev, ...newStories]);
      setOffset((prev) => prev + NUMBER_OF_STORIES_PER_LOAD);
    } catch (error) {
      console.error("Error loading more stories:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreStories();
    }
  }, [inView])

  return (
    <div>
      {stories.map((story, index) => (
        <StoryItem 
          key={story.id}
          story={story} 
          index={index} 
        />
      ))}
      <div ref={ref}>
        {!hasMoreStories 
          ? "Inga fler inlägg att visa." 
          : "Laddar fler inlägg..."}
      </div>
    </div>
  )
}
