import React, { useState, useEffect } from "react";

const API_KEY = "1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq";
const LIMIT = 3;

function App() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState("below");
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchImages = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/stickers/search?q=${query}&limit=${LIMIT}&offset=${offset}&rating=g&api_key=${API_KEY}`
    );
    const data = await response.json();
    setImages(data.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOffset(0);
    fetchImages();
  };

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
  };

  const handlePrev = () => {
    setOffset((prevOffset) => (prevOffset > 0 ? prevOffset - LIMIT : 0));
  };

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [offset]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="query" className="font-semibold">
              Search for Images:
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter a search term"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="text" className="font-semibold">
              Text to Display:
            </label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter text to display on/below images"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="textPosition" className="font-semibold">
              Text Position:
            </label>
            <select
              id="textPosition"
              value={textPosition}
              onChange={(e) => setTextPosition(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="top">On top of image - center top</option>
              <option value="bottom">On top of image - center bottom</option>
              <option value="below">Below image - center</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Search
          </button>
        </form>

        <div className="mt-8">
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.images.downsized_medium.url}
                      alt={query}
                      className="w-full rounded-md shadow-md"
                    />
                    {text && textPosition !== "below" && (
                      <div
                        className={`absolute w-full p-2 text-center text-white bg-black bg-opacity-50 ${
                          textPosition === "top" ? "top-0" : "bottom-0"
                        }`}
                      >
                        {text}
                      </div>
                    )}
                    {text && textPosition === "below" && (
                      <div className="mt-2 p-2 text-center text-gray-800">
                        {text}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  disabled={offset === 0}
                  className="bg-gray-300 p-2 rounded-md"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={images.length < LIMIT}
                  className="bg-gray-300 p-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
