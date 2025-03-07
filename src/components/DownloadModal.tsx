import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slide } from "@/types/slide";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import pptxgen from "pptxgenjs";
import DownloadSpinner from "./DownloadSpinner";
import { useState } from "react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
}

const DownloadModal = ({ isOpen, onClose, slides }: DownloadModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState<"zip" | "pptx" | null>(null);

  const downloadAsZip = async () => {
    try {
      setDownloadType("zip");
      setIsDownloading(true);
      
      const zip = new JSZip();
      
      // Add each slide to the zip
      for (const slide of slides) {
        const response = await fetch(slide.imageUrl);
        const blob = await response.blob();
        const fileName = `slide-${slide.id}-${slide.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        zip.file(fileName, blob);
      }
      
      // Generate and download the zip
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "presentation-slides.zip");
      
      // Keep spinner visible for a moment after download starts
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadType(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error creating zip:", error);
      setIsDownloading(false);
      setDownloadType(null);
    }
  };

  const downloadAsPPTX = async () => {
    try {
      setDownloadType("pptx");
      setIsDownloading(true);
      
      const pptx = new pptxgen();
      
      // Add each slide to the presentation
      for (const slide of slides) {
        const response = await fetch(slide.imageUrl);
        const blob = await response.blob();
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        const slideObj = pptx.addSlide();
        slideObj.addImage({
          data: base64 as string,
          x: 0,
          y: 0,
          w: "100%",
          h: "100%",
        });
      }
      
      // Save the presentation
      await pptx.writeFile("presentation-slides.pptx");
      
      // Keep spinner visible for a moment after download starts
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadType(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error creating PPTX:", error);
      setIsDownloading(false);
      setDownloadType(null);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Download Slides</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={isDownloading}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={downloadAsZip}
              disabled={isDownloading}
              className={cn(
                "w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium",
                "hover:from-blue-700 hover:to-cyan-600 transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "relative overflow-hidden group"
              )}
            >
              <span className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600",
                "bg-[length:200%_100%]",
                "animate-shimmer opacity-0 group-hover:opacity-20"
              )} />
              Download as ZIP
            </button>
            
            <button
              onClick={downloadAsPPTX}
              disabled={isDownloading}
              className={cn(
                "w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium",
                "hover:from-purple-700 hover:to-pink-600 transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "relative overflow-hidden group"
              )}
            >
              <span className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600",
                "bg-[length:200%_100%]",
                "animate-shimmer opacity-0 group-hover:opacity-20"
              )} />
              Download as PowerPoint
            </button>
          </div>
        </div>
      </div>

      <DownloadSpinner 
        isVisible={isDownloading} 
        type={downloadType || "zip"} 
      />
    </>
  );
};

export default DownloadModal;
