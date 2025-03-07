
import { useState, useRef, useEffect } from "react";
import { SlideData } from "@/types/slide";
import SlideCard from "./SlideCard";
import { cn } from "@/lib/utils";

interface SlideGalleryProps {
  slideData: SlideData;
  onSlideSelect: (slideId: number) => void;
  className?: string;
}

const SlideGallery = ({ slideData, onSlideSelect, className }: SlideGalleryProps) => {
  const [isInView, setIsInView] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={galleryRef}
      className={cn("w-full", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {slideData.slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={cn(
              "animate-enter",
              isInView ? "opacity-100" : "opacity-0",
              `delay-${(index % 5) * 100}`
            )}
          >
            <SlideCard
              slide={slide}
              onClick={() => onSlideSelect(slide.id)}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideGallery;
