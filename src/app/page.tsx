import { getTopStories } from "@/services/hn";
import StoryItem from "@/components/StoryItem";

export default async function Home() {
  const topstories = await getTopStories();

  return (
    <main>
      { topstories.map((story, index) => (
        <StoryItem 
          key={story.id}
          story={story} 
          index={index} 
        />
      ))}
    </main>
  );
}
