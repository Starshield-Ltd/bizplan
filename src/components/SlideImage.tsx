
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SlideImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SlideImage = ({ src, alt, className }: SlideImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-contain transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
      )}
    </div>
  );
};

export default SlideImage;
