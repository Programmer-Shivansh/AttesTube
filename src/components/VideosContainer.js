import useVideos from "../utils/hooks/useVideos";
import VideoCard from "./VideoCard";
import ShimmerCard from "./ShimmerCard";
import useScrollToTop from "../utils/hooks/useScrollToTop";

const VideosContainer = () => {
  useScrollToTop();
  const videos = useVideos();

  // Early return if no videos are loaded yet
  if (videos.length === 0) {
    return (
      <div className="flex flex-wrap h-screen overflow-y-scroll scrollbar-hide gap-4 p-4">
        {new Array(20).fill(" ").map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen pb-20 overflow-y-scroll scrollbar-hide overflow-x-hidden">
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 overflow-y-scroll scrollbar-hide cursor-pointer h-screen">
        {videos.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default VideosContainer;
