import { Story } from "@/types"
import StoryItem from "./StoryItem"

type StoryListProps = {
  initialStories: Story[]
}

export default function StoryList({ initialStories }: StoryListProps) {
  return (
    <div>
      {initialStories.map((story, index) => (
        <StoryItem 
          key={story.id}
          story={story} 
          index={index} 
        />
      ))}
    </div>
  )
}
