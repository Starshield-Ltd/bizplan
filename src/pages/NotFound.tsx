
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="glass-card backdrop-blur-md bg-white/80 rounded-2xl p-8 max-w-md w-full shadow-lg text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! This slide doesn't exist.</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Presentation
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
