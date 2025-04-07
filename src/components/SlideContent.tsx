import { useState, useEffect, useRef } from "react";
import { Slide } from "@/types/slide";
import SlideImage from "./SlideImage";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideContentProps {
  slide: Slide;
  isFullscreen?: boolean;
  isPresentationMode?: boolean;
  className?: string;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  onClose?: () => void;
  totalSlides?: number;
}

const SlideContent = ({
  slide,
  isFullscreen = false,
  isPresentationMode = false,
  className,
  onPrevSlide,
  onNextSlide,
  onClose,
  totalSlides
}: SlideContentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(!isPresentationMode);
  const [lastTap, setLastTap] = useState(0);

  useEffect(() => {
    // Add a small delay for the animation to be noticeable
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
      // Reset zoom and position when slide changes
      setScale(1);
      setPosition({ x: 0, y: 0 });
    };
  }, [slide.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPresentationMode && showControls) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPresentationMode, showControls]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevSlide?.();
      } else if (e.key === 'ArrowRight') {
        onNextSlide?.();
      } else if (e.key === 'Escape' && scale > 1) {
        // Reset zoom on Escape key
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevSlide, onNextSlide, scale]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(slide.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `slide-${slide.id}-${slide.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading slide:", error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleDoubleTap();
    }
    setLastTap(now);

    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setStartPosition({ x: distance, y: 0 });
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default to improve touch handling
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      const newScale = scale * (distance / startPosition.x);
      if (newScale >= 1 && newScale <= 4) {
        setScale(newScale);
        setStartPosition({ x: distance, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - startPosition.x;
      const deltaY = e.touches[0].clientY - startPosition.y;

      if (scale > 1) {
        setPosition({
          x: position.x + deltaX,
          y: position.y + deltaY
        });
        setStartPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        });
      } else if (Math.abs(deltaX) > 20) { // More sensitive swipe
        if (deltaX > 0) {
          onPrevSlide?.();
        } else {
          onNextSlide?.();
        }
        setIsDragging(false);
      }
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  const handleDoubleTap = () => {
    // Reset zoom and position on double tap
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(1.5);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        isFullscreen ? "bg-black/90 backdrop-blur-lg" : "",
        className
      )}
      onClick={isFullscreen ? onClose : undefined}
      onMouseMove={() => isPresentationMode && setShowControls(true)}
    >
      <div
        className={cn(
          "relative flex-1 max-w-7xl mx-auto",
          isFullscreen ? "p-4 md:p-8" : ""
        )}
        onClick={e => e.stopPropagation()}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative h-full rounded-2xl overflow-hidden bg-black/60",
            "transition-all duration-500 ease-in-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleTap}
        >
          <div
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: 'center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
            className="w-full h-full"
          >
            <SlideImage
              src={slide.imageUrl}
              alt={`Slide ${slide.id}: ${slide.title}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Navigation controls - only show in presentation mode or when not fullscreen */}
          {(!isFullscreen && !isPresentationMode) && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); onPrevSlide?.(); }}
                className="p-3 rounded-full bg-black/50 backdrop-blur text-white/90 hover:bg-black/70 transition-colors pointer-events-auto"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onNextSlide?.(); }}
                className="p-3 rounded-full bg-black/50 backdrop-blur text-white/90 hover:bg-black/70 transition-colors pointer-events-auto"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {/* Presentation mode controls */}
          {isPresentationMode && showControls && (
            <div className={cn(
              "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3",
              "bg-black/50 backdrop-blur-sm rounded-full transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0"
            )}>
              <button
                onClick={onPrevSlide}
                className="text-white/90 hover:text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-white/90 text-sm">{slide.id} / {totalSlides}</span>
              <button
                onClick={onNextSlide}
                className="text-white/90 hover:text-white"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
