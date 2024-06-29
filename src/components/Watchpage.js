import { useSearchParams } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import CommentsContainer from "./CommentsContainer";
import useScrollToTop from "../utils/hooks/useScrollToTop";
import { useState, useEffect } from "react";
import { useCreateAttestation } from "./MakeAttestation";

const Watchpage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  
  useScrollToTop();
  
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [comments, setComments] = useState([]);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const { createAttestation, attestationUID, error } = useCreateAttestation();

  useEffect(() => {
    if (isLocked) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(timer);
    }
  }, [isLocked]);

  const handleSubmit = async () => {
    if (input1.trim() && input2.trim()) {
      await createAttestation(rating, input2, showCheckbox);
      if (!error) {
        if (input1.trim() && input2.trim()) {
          const newComment = {
            name: input1,
            Comment: input2,
            link: attestationUID,
            replies: [] // Initialize with an empty array for replies
          };
          setComments([...comments, newComment]);
        }
      }
      setInput1('');
      setInput2('');
      setShowCheckbox(false);
      setRating(0);
    }
  };

  if (!id) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full h-screen p-4 bg-gray-100 overflow-hidden">
      <div className="flex flex-col w-full lg:w-2/3 gap-4 h-full overflow-y-auto">
        <div className="w-full">
          <iframe
            className="w-full h-[40vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[90vh] rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            allowTransparency
            autoPlay
          ></iframe>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 border-b pb-4 mb-4">
            <BiUserCircle className="w-12 h-12 text-gray-500" />
            <div className="flex flex-col">
              <p className="text-gray-600">
                {/* {video ? numify(video[0]?.viewCount) : null} views */}
              </p>
            </div>
          </div>
          <CommentsContainer comments={comments} />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg h-full overflow-y-auto">
        <input 
          className="p-2 border border-gray-300 rounded-lg mb-2"
          type="text"
          placeholder="Name"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input 
          className="p-2 border border-gray-300 rounded-lg mb-2"
          type="text"
          placeholder="Comment"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={showCheckbox}
            onChange={() => setShowCheckbox(!showCheckbox)}
            className="mr-2"
          />
          <label className="text-gray-600">Would you like to recommend this Video ?</label>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-2">Rate this video:</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${rating >= star ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-400`}
                fill="currentColor"
                viewBox="0 0 24 24"
                onClick={() => setRating(star)}
              >
                <path d="M12 2.1l2.5 5.1 5.6.8-4 4.1.9 5.5-4.5-2.4-4.5 2.4.9-5.5-4-4.1 5.6-.8L12 2.1z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="relative group">
          <button 
            className={`w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isLocked}
            style={{ minHeight: '44px' }}  // Ensure button height remains constant
          >
            Attest
          </button>
          {isLocked && (
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-700 text-white text-xs p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ whiteSpace: 'nowrap' }}  // Prevent tooltip text from wrapping
            >
              {timeRemaining} seconds remaining
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchpage;
