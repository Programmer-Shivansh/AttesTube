import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/helper";
import { isMenu } from "../utils/toggleSlice";
import { numify } from "numify";
import { addVideo } from "../utils/videoSlice";

const VideoCard = ({ item }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { snippet, statistics, id } = item;
  const { thumbnails, title, channelTitle } = snippet;
  const { viewCount } = statistics;
  const idOfWeb = searchParams?.get("v");

  return (
    <div
      onClick={() => dispatch(addVideo({ title, channelTitle, viewCount }))}
      className="w-80 cursor-pointer h-max bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
    >
      <Link to={idOfWeb ? `/watch?v=${id}` : `watch?v=${id}`}>
        <img
          onClick={() => toggleSidebar(dispatch, isMenu)}
          className="w-full xs:h-36 sm:h-40 md:h-40 lg:h-40 xl:h-48 2xl:h-48 rounded-t-lg"
          src={thumbnails?.medium?.url}
          alt={title}
        />
      </Link>
      <div className="p-4">
        <p className="font-semibold font-sans h-12 my-2 overflow-hidden text-md">
          {title}
        </p>
        <p className="text-sm my-2 text-gray-600">{channelTitle}</p>
        <h2 className="text-sm my-2 text-gray-500">{numify(viewCount)} views</h2>
      </div>
    </div>
  );
};

export default VideoCard;
