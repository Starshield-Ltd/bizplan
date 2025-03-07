import { cn } from "@/lib/utils";

interface DownloadSpinnerProps {
  isVisible: boolean;
  type: "zip" | "pptx";
}

const DownloadSpinner = ({ isVisible, type }: DownloadSpinnerProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={cn(
          "w-32 h-32 rounded-full absolute",
          "animate-[spin_3s_linear_infinite]",
          "bg-gradient-to-r",
          type === "zip" 
            ? "from-blue-600 via-cyan-500 to-blue-600"
            : "from-purple-600 via-pink-500 to-purple-600"
        )} />
        
        {/* Middle spinning ring */}
        <div className={cn(
          "w-24 h-24 rounded-full absolute top-4 left-4",
          "animate-[spin_2s_linear_infinite]",
          "bg-gradient-to-r",
          type === "zip"
            ? "from-cyan-500 via-blue-600 to-cyan-500"
            : "from-pink-500 via-purple-600 to-pink-500"
        )} />
        
        {/* Inner spinning ring */}
        <div className={cn(
          "w-16 h-16 rounded-full absolute top-8 left-8",
          "animate-[spin_1.5s_linear_infinite]",
          "bg-gradient-to-r",
          type === "zip"
            ? "from-blue-600 via-cyan-500 to-blue-600"
            : "from-purple-600 via-pink-500 to-purple-600"
        )} />

        {/* Center static circle with text */}
        <div className="w-12 h-12 rounded-full absolute top-10 left-10 bg-white flex items-center justify-center">
          <p className="text-xs font-medium text-gray-800">
            {type === "zip" ? "ZIP" : "PPTX"}
          </p>
        </div>
      </div>

      {/* Loading text */}
      <div className={cn(
        "absolute bottom-1/3 left-1/2 -translate-x-1/2 text-white text-center",
        "animate-pulse"
      )}>
        <p className="text-lg font-medium mb-2">Your file is downloading...</p>
        <p className="text-sm text-white/80">
          {type === "zip" 
            ? "Preparing your slides as a ZIP archive"
            : "Converting your slides to PowerPoint"
          }
        </p>
      </div>
    </div>
  );
};

export default DownloadSpinner;
