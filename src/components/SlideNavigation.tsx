
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (slideIndex: number) => void;
  className?: string;
}

const SlideNavigation = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onSlideSelect,
  className
}: SlideNavigationProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div className="flex items-center justify-between w-full px-2">
        <button
          onClick={onPrevious}
          disabled={currentSlide === 1}
          className={cn(
            "rounded-full p-1 transition-all duration-200",
            currentSlide === 1 
              ? "text-gray-400 cursor-not-allowed" 
              : "text-gray-800 hover:bg-gray-100"
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <span className="text-sm font-medium">
          {currentSlide} / {totalSlides}
        </span>
        
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides}
          className={cn(
            "rounded-full p-1 transition-all duration-200",
            currentSlide === totalSlides 
              ? "text-gray-400 cursor-not-allowed" 
              : "text-gray-800 hover:bg-gray-100"
          )}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="relative w-full">
        {showScrollButtons && (
          <>
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide"
          onMouseEnter={() => setShowScrollButtons(true)}
          onMouseLeave={() => setShowScrollButtons(false)}
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideSelect(index + 1)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200 flex-shrink-0",
                currentSlide === index + 1 
                  ? "w-6 bg-primary" 
                  : "w-3 bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideNavigation;
