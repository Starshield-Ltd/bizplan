import { useState, useEffect, useRef } from "react";
import { slideData } from "@/data/slides";
import SlideContent from "@/components/SlideContent";
import SlideNavigation from "@/components/SlideNavigation";
import SlideGallery from "@/components/SlideGallery";
import PresentationMode from "@/components/PresentationMode";
import DarkModeToggle from "@/components/DarkModeToggle";
import DownloadModal from "@/components/DownloadModal";
import ImageViewer from "@/components/ImageViewer";
import { Play, Info, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadAllSlides } from "@/utils/downloadUtils";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isGalleryTransitioning, setIsGalleryTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [fullscreenSlide, setFullscreenSlide] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slideData.slides.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 30;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSlideSelect = (slideId: number) => {
    setFullscreenSlide(slideId);
    setCurrentSlide(slideId);
  };

  const handleCloseFullscreen = () => {
    setFullscreenSlide(null);
  };

  const getCurrentSlideObject = () => {
    const slideId = fullscreenSlide || currentSlide;
    return slideData.slides.find(slide => slide.id === slideId) || slideData.slides[0];
  };

  const togglePresentationMode = () => {
    setIsPresentationMode(!isPresentationMode);
  };

  const handleDownloadAllSlides = async () => {
    try {
      setIsDownloading(true);
      await downloadAllSlides(slideData.slides);
    } catch (error) {
      console.error("Failed to download slides:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShowGallery = () => {
    setShowFullGallery(true);
    setIsGalleryTransitioning(true);
    
    // Scroll to gallery with smooth animation
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsGalleryTransitioning(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 animate-pulse">Loading presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-gray-900 dark:to-black pb-12">
      {/* Header */}
      <header className="w-full glass-card backdrop-blur-md bg-black/70 dark:bg-gray-900/70 border-b border-gray-800/50 sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-red-500 via-[#ff0080] to-[#00dfff] bg-clip-text text-transparent">
                {slideData.projectTitle}
              </h1>
              <p className="text-gray-400 text-sm">{slideData.projectSubtitle}</p>
            </div>
            
            <div className="flex flex-row items-center justify-end gap-2 flex-wrap sm:flex-nowrap">
              <button 
                onClick={togglePresentationMode}
                className="flex-shrink-0 flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-colors shadow-lg"
              >
                <Play size={14} className="mr-1" />
                Present
              </button>
              
              <button 
                onClick={handleShowGallery}
                className="flex-shrink-0 flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg"
              >
                <Info size={14} className="mr-1" />
                All Slides
              </button>
              
              <button 
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex-shrink-0 flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 transition-colors shadow-lg"
              >
                <Download size={14} className="mr-1" />
                Download All
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Slide Preview */}
          <div className="lg:col-span-2">
            <div 
              className="glass-card backdrop-blur-md bg-gray-900/80 rounded-2xl overflow-hidden shadow-lg border border-gray-800/50 h-[500px] cursor-pointer"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => setFullscreenSlide(currentSlide)}
            >
              <SlideContent 
                slide={getCurrentSlideObject()} 
                onPrevSlide={handlePrevious}
                onNextSlide={handleNext}
              />
            </div>

            {/* Slide Information */}
            <div className="mt-6 glass-card backdrop-blur-md bg-gray-900/80 rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-[#00f2ea] to-[#ff0050] text-sm font-medium text-white">
                  {getCurrentSlideObject().id}
                </div>
                <h3 className="text-lg font-medium text-white">{getCurrentSlideObject().title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{getCurrentSlideObject().description}</p>
            </div>
          </div>
          
          {/* Slide Thumbnails */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-medium mb-4 text-white">Quick Navigation</h2>
            <div className="glass-card backdrop-blur-md bg-gray-900/80 rounded-2xl p-4 shadow-lg border border-gray-800/50 max-h-[500px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {slideData.slides.slice(0, showFullGallery ? undefined : 6).map(slide => (
                  <div 
                    key={slide.id}
                    className={cn(
                      "cursor-pointer rounded-xl overflow-hidden transition-all duration-200",
                      "hover:ring-2 hover:ring-[#ff0080]/50",
                      slide.id === currentSlide ? "ring-2 ring-[#ff0080]" : ""
                    )}
                    onClick={() => handleSlideSelect(slide.id)}
                  >
                    <div className="aspect-[16/9] relative group">
                      <img 
                        src={slide.imageUrl} 
                        alt={`Slide ${slide.id}`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white text-sm">View Slide</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 px-2">
                        <span className="text-white text-xs">Slide {slide.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        slides={slideData.slides}
      />

      {/* Fullscreen Slide View */}
      {fullscreenSlide !== null && (
        <SlideContent
          slide={getCurrentSlideObject()}
          isFullscreen={true}
          onPrevSlide={handlePrevious}
          onNextSlide={handleNext}
          onClose={handleCloseFullscreen}
          className="fixed inset-0 z-50"
          totalSlides={slideData.slides.length}
        />
      )}

      {/* Full Gallery */}
      {showFullGallery && (
        <div ref={galleryRef} className={cn(
          "mt-16",
          isGalleryTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
          "transition-all duration-500 ease-in-out"
        )}>
          <h2 className="text-2xl font-medium mb-6 text-white">All Presentation Slides</h2>
          <SlideGallery 
            slideData={slideData} 
            onSlideSelect={slideId => {
              handleSlideSelect(slideId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
      
      {/* Project Information */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-medium mb-4 text-white">About This Project</h2>
        <div className="glass-card backdrop-blur-md bg-gray-900/80 dark:bg-black/80 rounded-2xl p-6 shadow-lg border border-gray-800/50">
          <p className="text-gray-300 leading-relaxed mb-4">
            This comprehensive presentation explores how technological advancements have transformed the entertainment industry. 
            The project focuses on three major platforms—Netflix, TikTok, and YouTube—analyzing how they've leveraged technology 
            to revolutionize content creation, distribution, and consumption.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Navigate through the slides to learn about each platform's evolution, technological innovations, audience demographics, 
            and business strategies. The presentation highlights how technological capabilities have enabled these companies to achieve 
            international recognition and increased revenues while addressing ethical considerations around privacy and data security.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-400 text-sm">
          <p className="footer-text">
            This Online Project was made to help students like me refer from it anytime in the future and preserved well, By Hardy Yusif.
            <br />For Computer Information Systems Class at <span className="font-medium text-gray-300">College of New Caledonia</span> - Enjoy , All Rights Reserved 2025 - Presented on 8th March 2025
          </p>
        </div>
      </footer>

      {/* Presentation Mode */}
      {isPresentationMode && (
        <PresentationMode
          slides={slideData.slides}
          initialSlide={currentSlide}
          onExit={() => setIsPresentationMode(false)}
        />
      )}

      {/* Image Viewer */}
      <ImageViewer
        imageUrl={selectedImage || ''}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title={`Slide ${currentSlide}`}
      />

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </div>
  );
};

export default Index;
