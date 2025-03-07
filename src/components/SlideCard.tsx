
import { useState } from "react";
import { Slide } from "@/types/slide";
import SlideImage from "./SlideImage";
import { cn } from "@/lib/utils";

interface SlideCardProps {
  slide: Slide;
  onClick: () => void;
  className?: string;
}

const SlideCard = ({ slide, onClick, className }: SlideCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-2xl",
        "transition-all duration-300 ease-in-out transform",
        "hover:shadow-xl hover:-translate-y-1",
        isHovered ? "ring-2 ring-primary/50" : "ring-0",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 rounded-2xl">
        <SlideImage 
          src={slide.imageUrl} 
          alt={`Slide ${slide.id}: ${slide.title}`}
          className="w-full h-full"
        />
        
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}/>
        
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 text-white",
          "transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0",
          "transition-all duration-300 ease-out"
        )}>
          <div className="flex items-center mb-1">
            <div className="h-5 w-5 flex items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
              {slide.id}
            </div>
            <h3 className="ml-2 text-sm font-medium truncate">{slide.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
