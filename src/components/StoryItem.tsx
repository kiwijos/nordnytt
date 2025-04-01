import { Story } from "@/types";
import Link from "next/link";

type StoryItemProps = {
  story: Story;
  index: number;
}

export default function StoryItem({ story, index }: StoryItemProps) {
  const url = story.url ? new URL(story.url) : null;

  return (
    <div className="leading-none mb-4" key={story.id}>
      <a 
        title={story.title} 
        href={story.url || `/${story.id}`} 
        target={url?.host ? "_blank" : ""} 
        className="pb-1 whitespace-nowrap text-ellipsis overflow-hidden block font-bold visited:text-slate-500"
      >
        {index+1}. {story.title}
      </a>
      <div className="text-xs text-slate-700">
        {url?.host ? `${url?.host} - ` : ''} 
        <Link href={`/${story.id}`}>
          {story.score} poäng - {story.descendants || 'Inga'} kommentarer - {Math.floor(Date.now()/1000 - story.time)} sekunder sedan
        </Link>
      </div>
    </div>
  );
}
