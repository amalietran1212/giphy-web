import React from "react";

interface SearchFormProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textPosition: "top" | "bottom" | "below";
  setTextPosition: React.Dispatch<
    React.SetStateAction<"top" | "bottom" | "below">
  >;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  text,
  setText,
  textPosition,
  setTextPosition,
  onSearch,
}) => {
  return (
    <form onSubmit={onSearch} className="space-y-4">
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
          onChange={(e) =>
            setTextPosition(e.target.value as "top" | "bottom" | "below")
          }
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
  );
};

export default SearchForm;
