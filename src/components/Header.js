import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { closeMenu, isMenu } from "../utils/toggleSlice";
import { toggleSidebar } from "../utils/helper";
import { handleSearchQuery } from "../utils/helper";
import useAutoSuggestion from "../utils/hooks/useAutoSuggestion";
import AutoCompleteBar from "./AutoCompleteBar";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const suggestions = useAutoSuggestion(searchQuery);
  const dispatch = useDispatch();

  return (
    <nav className="grid grid-flow-col bg-white w-full z-10 p-2 items-center">
      {/* Sidebar Toggle and Logo Section */}
      <div className="col-span-1 xs:col-span-2 flex items-center gap-2">
        <RxHamburgerMenu
          onClick={() => toggleSidebar(dispatch, closeMenu)}
          className="h-8 cursor-pointer hover:bg-gray-200 xs:w-8 xs:h-8 rounded-sm w-10 p-1 mx-2"
          data-testid="toggle"
        />
        <div className="flex items-center">
          <img
            src={`try.png`}
            alt="Youtubelogo"
            className="w-16 h-8 xs:w-20 xs:h-10 sm:w-24 sm:h-12 lg:w-24 lg:h-12 xl:w-24 xl:h-12"
          />
          <span className="ml-2 text-xl font-bold text-gray-800 hidden xs:block">
            AttesTube
          </span>
        </div>
      </div>

      {/* Search Bar Section */}
      <span className="col-span-11 xs:col-span-8 mx-16 flex items-center justify-center">
        <span className="relative flex flex-col w-2/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border outline-none px-6 text-md xs:h-8 h-10 border-gray-300 rounded-l-full"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e, setSearchQuery)}
            onFocus={() => setShowSuggestions(true)}
            onClick={() => dispatch(isMenu())}
          />
          {showSuggestions ? (
            <div
              onBlur={() => setShowSuggestions(false)}
              className="absolute bg-white top-16 rounded-3xl z-10 shadow-xl sm:w-[15rem] md:w-[20rem] lg:w-[28rem] xl:w-[35rem] 2xl:w-[35rem] transition duration-300"
            >
              {suggestions.length !== 0
                ? suggestions.map((query, index) => (
                    <AutoCompleteBar
                      onBlur={() => setShowSuggestions(false)}
                      key={index}
                      queryContent={query}
                      setSearchQuery={setSearchQuery}
                      setShowSuggestions={setShowSuggestions}
                    />
                  ))
                : null}
            </div>
          ) : null}
        </span>
        <Link to={`results?search=${searchQuery}`}>
          <button className="rounded-r-full p-2 xs:h-8 h-10 cursor-pointer bg-gray-100 border-2 border-gray-300 flex items-center">
            <BiSearch className="mx-2" />
          </button>
        </Link>
      </span>

      {/* User Icon Section */}
      <span className="col-span-1 xs:col-span-2 cursor-pointer flex items-center justify-center">
        <BiUser className="text-2xl" />
      </span>
    </nav>
  );
};

export default Header;
