import { Link } from "react-router";
import { Mountain, Home, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] to-[#F5F5F5] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="w-24 h-24 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Mountain className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-[#1B5E20] mb-4 text-6xl">404</h1>
        <h2 className="text-[#263238] mb-4">Lost in the Mountains?</h2>
        <p className="text-[#717182] mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off the trail. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/treks"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors"
          >
            <Search className="w-5 h-5" />
            Explore Treks
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl shadow-md inline-block">
          <p className="text-sm text-[#717182]">
            Need help?{" "}
            <Link to="/help" className="text-[#2E7D32] hover:text-[#1B5E20] underline">
              Visit our help center
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
