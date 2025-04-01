'use client'
import { Story } from "@/types"
import StoryItem from "./StoryItem"
import { useState } from "react"


type StoryListProps = {
  initialStories: Story[]
}

export default function StoryList({ initialStories }: StoryListProps) {

  const [stories, setStories] = useState<Story[]>(initialStories);

  return (
    <div>
      {stories.map((story, index) => (
        <StoryItem 
          key={story.id}
          story={story} 
          index={index} 
        />
      ))}
    </div>
  )
}
