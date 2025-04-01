import { getTopStories } from "@/services/hn";
import StoryList from "@/components/StoryList";

export default async function Home() {
  const topstories = await getTopStories();

  return (
    <main>
      <StoryList initialStories={topstories} />
    </main>
  );
}
