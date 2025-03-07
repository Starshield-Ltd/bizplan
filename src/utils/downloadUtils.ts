
import { Slide } from "@/types/slide";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// Function to download a single slide
export const downloadSlide = async (slide: Slide) => {
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
    throw error;
  }
};

// Function to download all slides as a ZIP archive
export const downloadAllSlides = async (slides: Slide[]) => {
  try {
    const zip = new JSZip();
    const slidesFolder = zip.folder("slides");
    
    if (!slidesFolder) {
      throw new Error("Failed to create slides folder in zip");
    }
    
    // Create array of promises for all fetch operations
    const fetchPromises = slides.map(async (slide) => {
      try {
        const response = await fetch(slide.imageUrl);
        const blob = await response.blob();
        
        // Add file to the zip with a descriptive name
        slidesFolder.file(
          `slide-${slide.id.toString().padStart(2, '0')}-${slide.title.replace(/\s+/g, '-').toLowerCase()}.jpg`, 
          blob
        );
        
        return true;
      } catch (error) {
        console.error(`Error fetching slide ${slide.id}:`, error);
        return false;
      }
    });
    
    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });
    
    // Save and download the zip file
    saveAs(content, "presentation-slides.zip");
  } catch (error) {
    console.error("Error creating zip file:", error);
    throw error;
  }
};
