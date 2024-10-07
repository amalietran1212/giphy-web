import React, { useState, useEffect } from "react";

// components
import SearchForm from "./form/SearchForm";
import ImageGrid from "./form/ImageGrid";
import Pagination from "./form/Pagnation";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const LIMIT = 3;

interface Image {
  id: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}

const ImageSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [textPosition, setTextPosition] = useState<"top" | "bottom" | "below">(
    "below"
  );
  const [images, setImages] = useState<Image[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const fetchImages = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/stickers/search?q=${query}&limit=${LIMIT}&offset=${offset}&rating=g&api_key=${API_KEY}`
    );
    const data = await response.json();
    setImages(data.data);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
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
  }, [offset, query]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <SearchForm
          query={query}
          setQuery={setQuery}
          text={text}
          setText={setText}
          textPosition={textPosition}
          setTextPosition={setTextPosition}
          onSearch={handleSearch}
        />
        <ImageGrid
          images={images}
          query={query}
          text={text}
          textPosition={textPosition}
        />
        <Pagination
          onNext={handleNext}
          onPrev={handlePrev}
          hasMore={images.length === LIMIT}
          isPrevDisabled={offset === 0}
        />
      </div>
    </div>
  );
};

export default ImageSearch;
