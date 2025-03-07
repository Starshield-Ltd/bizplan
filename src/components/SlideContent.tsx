
import { useState, useEffect } from "react";
import { Slide } from "@/types/slide";
import SlideImage from "./SlideImage";
import { cn } from "@/lib/utils";

interface SlideContentProps {
  slide: Slide;
  isFullscreen?: boolean;
  className?: string;
}

const SlideContent = ({ slide, isFullscreen = false, className }: SlideContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay for the animation to be noticeable
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [slide.id]);

  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-500 ease-in-out",
      isFullscreen ? "p-4 md:p-8 lg:p-12" : "p-4",
      className
    )}>
      <div className={cn(
        "relative flex-1 rounded-2xl overflow-hidden bg-black",
        "transition-all duration-500 ease-in-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <SlideImage 
          src={slide.imageUrl} 
          alt={`Slide ${slide.id}: ${slide.title}`}
          className="w-full h-full object-contain"
        />
      </div>

      {!isFullscreen && (
        <div className={cn(
          "mt-4 space-y-2",
          "transition-all duration-500 ease-in-out transform delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex items-center">
            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-[#00f2ea] to-[#ff0050] text-xs font-medium text-white">
              {slide.id}
            </div>
            <h3 className="ml-2 text-lg font-medium text-white">{slide.title}</h3>
          </div>
          <p className="text-sm text-gray-400">{slide.description}</p>
        </div>
      )}
    </div>
  );
};

export default SlideContent;
