import { useState, useEffect, useCallback, useRef } from "react";
import { X, Info, ArrowDown, Download } from "lucide-react";
import { Slide } from "@/types/slide";
import SlideContent from "./SlideContent";
import { cn } from "@/lib/utils";
import { downloadSlide } from "@/utils/downloadUtils";

interface PresentationModeProps {
  slides: Slide[];
  initialSlide: number;
  onExit: () => void;
}

const PresentationMode = ({ slides, initialSlide, onExit }: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [showInfo, setShowInfo] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Enter fullscreen when presentation mode is opened
  useEffect(() => {
    try {
      if (document.fullscreenElement === null && containerRef.current) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Could not enter fullscreen mode: ${err.message}`);
        });
      }
    } catch (err) {
      console.error("Fullscreen API not supported");
    }
    
    return () => {
      if (document.fullscreenElement !== null) {
        document.exitFullscreen().catch(err => {
          console.error(`Could not exit fullscreen mode: ${err.message}`);
        });
      }
    };
  }, []);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (!showInfo) {
        setShowControls(false);
      }
    }, 2000);
  }, [showInfo]);

  const handleMouseMove = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!showInfo) {
      setShowControls(false);
    }
  }, [showInfo]);

  const goToSlide = useCallback((slideNumber: number) => {
    if (slideNumber < 1 || slideNumber > slides.length || slideNumber === currentSlide) return;
    setCurrentSlide(slideNumber);
    resetControlsTimeout();
  }, [currentSlide, slides.length, resetControlsTimeout]);

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
    switch (event.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
        handleNext();
        break;
      case "Escape":
        onExit();
        break;
      case "i":
      case "I":
        setShowInfo(!showInfo);
        resetControlsTimeout();
        break;
      default:
        break;
    }
  }, [handlePrevious, handleNext, onExit, showInfo, resetControlsTimeout]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const currentSlideObj = slides.find(slide => slide.id === currentSlide) || slides[0];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slide Content */}
      <div 
        className="w-full h-full"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          resetControlsTimeout();
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
        <SlideContent 
          slide={currentSlideObj}
          isPresentationMode={true}
          totalSlides={slides.length}
          onPrevSlide={handlePrevious}
          onNextSlide={handleNext}
        />
      </div>

      {/* Corner Controls */}
      <div className={cn(
        "fixed top-4 right-4 z-[60] flex items-center gap-3",
        "transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        <button
          onClick={() => {
            setShowInfo(!showInfo);
            resetControlsTimeout();
          }}
          className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 hover:scale-110"
        >
          {showInfo ? <ArrowDown size={24} /> : <Info size={24} />}
        </button>
        <button
          onClick={async () => {
            await downloadSlide(currentSlideObj);
            resetControlsTimeout();
          }}
          className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 hover:scale-110"
        >
          <Download size={24} />
        </button>
        <button
          onClick={onExit}
          className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 hover:scale-110"
        >
          <X size={24} />
        </button>
      </div>

      {/* Bottom Controls */}
      <div 
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[60] transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="relative">
          {showInfo && (
            <div className="p-4 text-white">
              <h3 className="text-lg font-medium mb-2">{currentSlideObj.title}</h3>
              <p className="text-sm text-white/80">{currentSlideObj.description}</p>
            </div>
          )}
          <div className="flex justify-center p-4">
            <div className="flex items-center gap-2">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(slide.id)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    currentSlide === slide.id 
                      ? "w-6 bg-white" 
                      : "w-1.5 bg-white/50 hover:bg-white/70"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
