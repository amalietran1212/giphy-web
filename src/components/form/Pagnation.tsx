import React from "react";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  hasMore: boolean;
  isPrevDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  onNext,
  onPrev,
  hasMore,
  isPrevDisabled,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className="bg-gray-300 p-2 rounded-md"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className="bg-gray-300 p-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
