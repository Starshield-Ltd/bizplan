
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Info, ArrowDown, ArrowUp, Download } from "lucide-react";
import { Slide } from "@/types/slide";
import SlideContent from "./SlideContent";
import { cn } from "@/lib/utils";
import { downloadSlide } from "@/utils/downloadUtils";

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
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Enter fullscreen when presentation mode is opened
  useEffect(() => {
    if (isOpen && containerRef.current) {
      try {
        if (document.fullscreenElement === null) {
          containerRef.current.requestFullscreen().catch(err => {
            console.error(`Could not enter fullscreen mode: ${err.message}`);
          });
        }
      } catch (err) {
        console.error("Fullscreen API not supported");
      }
    }
    
    return () => {
      // Exit fullscreen when presentation mode is closed
      if (document.fullscreenElement !== null) {
        document.exitFullscreen().catch(err => {
          console.error(`Could not exit fullscreen mode: ${err.message}`);
        });
      }
    };
  }, [isOpen]);

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

  const toggleInfo = useCallback(() => {
    setShowInfo(!showInfo);
  }, [showInfo]);

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
      case "i":
      case "I":
        toggleInfo();
        break;
      default:
        break;
    }
  }, [isOpen, handlePrevious, handleNext, onClose, toggleInfo]);

  const handleDownloadCurrentSlide = async () => {
    const currentSlideObj = slides.find(slide => slide.id === currentSlide);
    if (currentSlideObj) {
      await downloadSlide(currentSlideObj);
    }
  };

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

  // Mix of Netflix red, TikTok teal/blue, and YouTube red gradients
  const brandGradient = "bg-gradient-to-r from-red-600 via-[#00f2ea] to-[#ff0050]";

  return (
    <div 
      ref={containerRef}
      className="fullscreen-slides flex items-center justify-center bg-black"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30"
      >
        <X size={24} />
      </button>

      {/* Download button for current slide */}
      <button
        onClick={handleDownloadCurrentSlide}
        className="absolute top-4 right-16 z-50 p-2 rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30"
      >
        <Download size={24} />
      </button>

      {/* Navigation buttons */}
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

      {/* Info Button */}
      <button
        onClick={toggleInfo}
        className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30"
      >
        {showInfo ? <ArrowDown size={24} /> : <Info size={24} />}
      </button>

      {/* Slide Content */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchMove={(e) => {
          touchEndX.current = e.touches[0].clientX;
        }}
        onTouchEnd={() => {
          if (touchStartX.current === null || touchEndX.current === null) return;
          
          const swipeDistance = touchEndX.current - touchStartX.current;
          const minSwipeDistance = 50;
          
          if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
              handlePrevious();
            } else {
              handleNext();
            }
          }
          
          touchStartX.current = null;
          touchEndX.current = null;
        }}
      >
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

      {/* Slide Information Panel */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-md transition-all duration-300 p-6 z-40",
          showInfo ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className={`${brandGradient} h-1 w-full mb-4 rounded-full`} />
        <h2 className="text-2xl font-bold text-white mb-2">{currentSlideObj.title}</h2>
        <p className="text-gray-300">{currentSlideObj.description}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={toggleInfo}
            className="flex items-center text-white/70 hover:text-white space-x-1 transition-colors"
          >
            <span>Close</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
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

      {/* Slide Controls */}
      <div className={`presentation-controls ${brandGradient}`}>
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
