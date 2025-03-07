
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Slide } from "@/types/slide";
import SlideContent from "./SlideContent";
import { cn } from "@/lib/utils";

interface PresentationModeProps {
  slides: Slide[];
  initialSlide: number;
  isOpen: boolean;
  onClose: () => void;
}

const PresentationMode = ({ slides, initialSlide, isOpen, onClose }: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const goToSlide = useCallback((slideNumber: number) => {
    if (slideNumber < 1 || slideNumber > slides.length || slideNumber === currentSlide) return;
    
    setDirection(slideNumber > currentSlide ? "next" : "prev");
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide(slideNumber);
      setIsTransitioning(false);
    }, 300);
  }, [currentSlide, slides.length]);

  const handlePrevious = useCallback(() => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, slides.length, goToSlide]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (event.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
        handleNext();
        break;
      case "Escape":
        onClose();
        break;
      default:
        break;
    }
  }, [isOpen, handlePrevious, handleNext, onClose]);

  useEffect(() => {
    setCurrentSlide(initialSlide);
  }, [initialSlide]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const currentSlideObj = slides.find(slide => slide.id === currentSlide) || slides[0];

  return (
    <div className="fullscreen-slides flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30"
      >
        <X size={24} />
      </button>

      <button
        onClick={handlePrevious}
        disabled={currentSlide === 1}
        className={cn(
          "absolute left-4 z-50 p-2 rounded-full transition-all duration-200",
          currentSlide === 1 
            ? "opacity-30 cursor-not-allowed" 
            : "opacity-70 hover:opacity-100 bg-white/20 hover:bg-white/30 backdrop-blur-md"
        )}
      >
        <ChevronLeft size={32} className="text-white" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentSlide === slides.length}
        className={cn(
          "absolute right-4 z-50 p-2 rounded-full transition-all duration-200",
          currentSlide === slides.length 
            ? "opacity-30 cursor-not-allowed" 
            : "opacity-70 hover:opacity-100 bg-white/20 hover:bg-white/30 backdrop-blur-md"
        )}
      >
        <ChevronRight size={32} className="text-white" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className={cn(
            "w-full h-full absolute transition-all duration-300",
            isTransitioning 
              ? direction === "next" ? "translate-x-full opacity-0" : "-translate-x-full opacity-0" 
              : "translate-x-0 opacity-100"
          )}
        >
          <SlideContent slide={currentSlideObj} isFullscreen={true} />
        </div>
      </div>

      <div className="slide-indicator">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className={cn(
              "indicator-dot",
              slide.id === currentSlide ? "active" : ""
            )}
            aria-label={`Go to slide ${slide.id}`}
          />
        ))}
      </div>

      <div className="presentation-controls">
        <button
          onClick={handlePrevious}
          disabled={currentSlide === 1}
          className={currentSlide === 1 ? "opacity-50 cursor-not-allowed" : ""}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="slide-number">
          {currentSlide} / {slides.length}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentSlide === slides.length}
          className={currentSlide === slides.length ? "opacity-50 cursor-not-allowed" : ""}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PresentationMode;
