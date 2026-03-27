import { Link } from "react-router";
import { Search, Mountain, Shield, Users, MapPin, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

export function Home() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    duration: "",
    difficulty: "",
  });

  const featuredTreks = [
    {
      id: 1,
      name: "Everest Base Camp",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      difficulty: "Moderate",
      duration: "12 Days",
      cost: "$1,200",
      altitude: "5,364m",
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      difficulty: "Challenging",
      duration: "15 Days",
      cost: "$1,400",
      altitude: "5,416m",
    },
    {
      id: 3,
      name: "Langtang Valley",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      difficulty: "Easy",
      duration: "7 Days",
      cost: "$800",
      altitude: "3,800m",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
            Find Your Journey in Nepal
          </h1>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">
            Discover authentic trekking experiences with local guides
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E7D32] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E7D32] w-5 h-5" />
                <select
                  value={searchParams.duration}
                  onChange={(e) => setSearchParams({ ...searchParams, duration: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32] appearance-none"
                >
                  <option value="">Duration</option>
                  <option value="1-5">1-5 Days</option>
                  <option value="6-10">6-10 Days</option>
                  <option value="11-15">11-15 Days</option>
                  <option value="16+">16+ Days</option>
                </select>
              </div>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E7D32] w-5 h-5" />
                <select
                  value={searchParams.difficulty}
                  onChange={(e) => setSearchParams({ ...searchParams, difficulty: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32] appearance-none"
                >
                  <option value="">Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="challenging">Challenging</option>
                </select>
              </div>
            </div>
            <Link
              to="/treks"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-all shadow-md hover:shadow-lg"
            >
              <Search className="w-5 h-5" />
              Search Treks
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Treks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-[#1B5E20] text-center mb-12">Featured Treks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTreks.map((trek) => (
            <Link
              key={trek.id}
              to={`/treks/${trek.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trek.image}
                  alt={trek.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#1B5E20]">
                  {trek.difficulty}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[#263238] mb-3 group-hover:text-[#1B5E20] transition-colors">{trek.name}</h3>
                <div className="space-y-2 text-sm text-[#263238]">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{trek.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Altitude:</span>
                    <span>{trek.altitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Starting from:</span>
                    <span className="text-[#1B5E20]">{trek.cost}</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/treks"
            className="inline-block px-8 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg"
          >
            Explore All Treks
          </Link>
        </div>
      </section>

      {/* Why Gantavya */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#1B5E20] text-center mb-12">Why Choose Gantavya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#263238] mb-3">Transparent & Fair</h3>
              <p className="text-[#263238] text-sm">
                No biased rankings. All guides are shown fairly based on your preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#263238] mb-3">Local Guides</h3>
              <p className="text-[#263238] text-sm">
                Connect with verified local guides who know the trails intimately.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#263238] mb-3">Complete Information</h3>
              <p className="text-[#263238] text-sm">
                Detailed trek routes, maps, itineraries, and pricing all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-white mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Browse available treks and connect with guides today. Your Himalayan journey awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/treks"
              className="px-8 py-3 bg-white text-[#1B5E20] rounded-xl hover:bg-[#F5F5F5] transition-colors shadow-md"
            >
              Browse Treks
            </Link>
            <Link
              to="/guide/register"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Become a Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
