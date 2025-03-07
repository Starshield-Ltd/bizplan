
import { useState, useEffect } from "react";
import { slideData } from "@/data/slides";
import SlideContent from "@/components/SlideContent";
import SlideNavigation from "@/components/SlideNavigation";
import SlideGallery from "@/components/SlideGallery";
import PresentationMode from "@/components/PresentationMode";
import { Play, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullGallery, setShowFullGallery] = useState(false);

  useEffect(() => {
    // Simulate loading for a smoother experience
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

  const handleSlideSelect = (slideId: number) => {
    setCurrentSlide(slideId);
  };

  const togglePresentationMode = () => {
    setIsPresentationMode(!isPresentationMode);
  };

  const getCurrentSlideObject = () => {
    return slideData.slides.find(slide => slide.id === currentSlide) || slideData.slides[0];
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-12">
      {/* Header */}
      <header className="w-full glass-card backdrop-blur-md bg-white/70 border-b border-gray-200/50 sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {slideData.projectTitle}
              </h1>
              <p className="text-gray-600 text-sm">{slideData.projectSubtitle}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={togglePresentationMode}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Play size={16} className="mr-1.5" />
                Present
              </button>
              
              <button 
                onClick={() => setShowFullGallery(!showFullGallery)}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Info size={16} className="mr-1.5" />
                {showFullGallery ? "Hide Gallery" : "All Slides"}
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
            <div className="glass-card backdrop-blur-md bg-white/80 rounded-2xl overflow-hidden shadow-lg h-[500px]">
              <SlideContent slide={getCurrentSlideObject()} />
            </div>
            
            <div className="mt-6">
              <SlideNavigation
                currentSlide={currentSlide}
                totalSlides={slideData.slides.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSlideSelect={handleSlideSelect}
              />
            </div>
          </div>
          
          {/* Slide Thumbnails */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-medium mb-4">Quick Navigation</h2>
            <div className="glass-card backdrop-blur-md bg-white/80 rounded-2xl p-4 shadow-lg max-h-[500px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {slideData.slides.slice(0, showFullGallery ? undefined : 6).map(slide => (
                  <div 
                    key={slide.id}
                    className={cn(
                      "cursor-pointer rounded-xl overflow-hidden transition-all duration-200",
                      slide.id === currentSlide ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => handleSlideSelect(slide.id)}
                  >
                    <div className="aspect-[16/9] relative">
                      <img 
                        src={slide.imageUrl} 
                        alt={`Slide ${slide.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 px-2">
                        <span className="text-white text-xs">{slide.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!showFullGallery && slideData.slides.length > 6 && (
                <button
                  onClick={() => setShowFullGallery(true)}
                  className="w-full mt-3 py-2 text-sm text-center text-primary hover:underline"
                >
                  View all slides ({slideData.slides.length})
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Full Gallery */}
        {showFullGallery && (
          <div className="mt-16">
            <h2 className="text-2xl font-medium mb-6">All Presentation Slides</h2>
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
          <h2 className="text-2xl font-medium mb-4">About This Project</h2>
          <div className="glass-card backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              This comprehensive presentation explores the fundamental concepts and applications of Computer Information Systems in modern organizations. 
              From system components and development methodologies to implementation strategies and future trends, this project provides a thorough analysis 
              of how information systems drive business value and operational efficiency.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Navigate through the slides to learn about database management, security considerations, cloud computing, and more. The presentation 
              includes real-world case studies and practical insights that demonstrate the transformative impact of well-designed information systems
              on organizational performance and decision-making processes.
            </p>
          </div>
        </div>
      </main>

      {/* Presentation Mode */}
      <PresentationMode
        slides={slideData.slides}
        initialSlide={currentSlide}
        isOpen={isPresentationMode}
        onClose={() => setIsPresentationMode(false)}
      />
    </div>
  );
};

export default Index;
