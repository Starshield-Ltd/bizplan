import { Slide } from "@/types/slide";
import { cn } from "@/lib/utils";
import { Play, Download } from "lucide-react";

interface SlideGalleryProps {
  slideData: {
    slides: Slide[];
  };
  onSlideSelect: (slideId: number) => void;
  onDownload?: (slide: Slide) => void;
}

const SlideGallery = ({ slideData, onSlideSelect, onDownload }: SlideGalleryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {slideData.slides.map((slide) => (
        <div
          key={slide.id}
          className={cn(
            "group relative rounded-xl overflow-hidden",
            "bg-gradient-to-br from-gray-900/90 to-gray-800/90",
            "border border-gray-700/30 hover:border-gray-600/50",
            "transition-all duration-300 ease-out",
            "hover:transform hover:scale-[1.02] hover:shadow-xl"
          )}
        >
          <div className="aspect-video relative overflow-hidden">
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onSlideSelect(slide.id)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                <Play size={14} />
                Present
              </button>

              {onDownload && (
                <button
                  onClick={() => onDownload(slide)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <Download size={14} />
                  Download
                </button>
              )}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-[#00f2ea] to-[#ff0050] text-xs font-medium">
                {slide.id}
              </div>
              <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                {slide.title}
              </h3>
            </div>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {slide.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideGallery;
