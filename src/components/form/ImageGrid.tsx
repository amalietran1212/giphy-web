import React from "react";

interface Image {
  id: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}

interface ImageGridProps {
  images: Image[];
  query: string;
  text: string;
  textPosition: "top" | "bottom" | "below";
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  query,
  text,
  textPosition,
}) => {
  return (
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
                {text && textPosition === "top" && (
                  <div className="absolute top-0 w-full p-2 text-center text-white bg-black bg-opacity-50">
                    {text}
                  </div>
                )}
                {text && textPosition === "bottom" && (
                  <div className="absolute bottom-0 w-full p-2 text-center text-white bg-black bg-opacity-50">
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
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
