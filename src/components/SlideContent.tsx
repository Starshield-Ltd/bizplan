
import { useState, useEffect, useRef } from "react";
import { Slide } from "@/types/slide";
import SlideImage from "./SlideImage";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

interface SlideContentProps {
  slide: Slide;
  isFullscreen?: boolean;
  className?: string;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
}

const SlideContent = ({ slide, isFullscreen = false, className, onPrevSlide, onNextSlide }: SlideContentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
  const [lastTap, setLastTap] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap detected
      handleDoubleTap();
    }
    setLastTap(now);

    if (e.touches.length === 2) {
      // Store the initial distance between two fingers
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setStartPosition({ x: distance, y: 0 });
    } else if (e.touches.length === 1) {
      // Enable panning when zoomed in or handle swipe navigation
      setIsDragging(true);
      setStartPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Calculate new distance between fingers
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      // Calculate new scale based on change in distance
      const newScale = scale * (distance / startPosition.x);
      
      // Limit scale to reasonable values
      if (newScale >= 1 && newScale <= 3) {
        setScale(newScale);
        setStartPosition({ x: distance, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - startPosition.x;
      
      if (scale > 1) {
        // Handle panning when zoomed in
        setPosition({
          x: e.touches[0].clientX - startPosition.x,
          y: e.touches[0].clientY - startPosition.y
        });
      } else if (Math.abs(deltaX) > 50) {
        // Handle swipe navigation when not zoomed
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
    <div className={cn(
      "flex flex-col h-full transition-all duration-500 ease-in-out",
      isFullscreen ? "p-4 md:p-8 lg:p-12" : "p-4",
      className
    )}>
      <div 
        ref={containerRef}
        className={cn(
          "relative flex-1 rounded-2xl overflow-hidden bg-black",
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
        
        {/* Mobile-optimized controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent">
          <button
            onClick={(e) => { e.stopPropagation(); onPrevSlide?.(); }}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <button 
            onClick={handleDownload}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label={`Download slide ${slide.id}`}
          >
            <Download size={24} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onNextSlide?.(); }}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
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
