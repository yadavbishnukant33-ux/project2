import { Link } from "react-router";
import { Search, Mountain, Shield, Users, MapPin, Calendar, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface Trek {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  duration: string;
  cost: string;
  altitude: string;
  type: string;
}

interface Activity {
  id: number;
  title: string;
  image: string;
  location: string;
  category: string;
  description: string;
}

export function Home() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    duration: "",
    difficulty: "",
  });

  const [shortTreks, setShortTreks] = useState<Trek[]>([]);
  const [longTreks, setLongTreks] = useState<Trek[]>([]);
  const [nearbyActivities, setNearbyActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch short and long treks
        const [shortRes, longRes, activitiesRes] = await Promise.all([
          fetch("http://localhost:8080/api/treks?type=short"),
          fetch("http://localhost:8080/api/treks?type=long"),
          fetch("http://localhost:8080/api/activities"),
        ]);

        const short = await shortRes.json();
        const long = await longRes.json();
        const activities = await activitiesRes.json();

        setShortTreks(short.slice(0, 3));
        setLongTreks(long.slice(0, 3));
        setNearbyActivities(activities.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const TrekCard = ({ trek }: { trek: Trek }) => (
    <Link
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
  );

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
            Discover authentic trekking experiences with verified local guides
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

      {/* Short Treks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#1B5E20] flex items-center gap-3">
              <Zap className="w-8 h-8" />
              Quick Getaways - Short Treks
            </h2>
            <p className="text-gray-600 mt-2">Perfect for weekend adventures and busy travelers</p>
          </div>
          <Link to="/treks?type=short" className="text-[#1B5E20] hover:text-[#2E7D32] font-semibold whitespace-nowrap">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading short treks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shortTreks.length > 0 ? shortTreks.map((trek) => (
              <TrekCard key={trek.id} trek={trek} />
            )) : (
              <p className="col-span-3 text-center text-gray-600">No short treks available</p>
            )}
          </div>
        )}
      </section>

      {/* Long Treks Section */}
      <section className="bg-[#F5F5F5] py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1B5E20] flex items-center gap-3">
                <Mountain className="w-8 h-8" />
                Epic Adventures - Long Treks
              </h2>
              <p className="text-gray-600 mt-2">Challenging routes for experienced trekkers</p>
            </div>
            <Link to="/treks?type=long" className="text-[#1B5E20] hover:text-[#2E7D32] font-semibold whitespace-nowrap">
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading long treks...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {longTreks.length > 0 ? longTreks.map((trek) => (
                <TrekCard key={trek.id} trek={trek} />
              )) : (
                <p className="col-span-3 text-center text-gray-600">No long treks available</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Nearby Activities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#1B5E20]">What's Happening Around You</h2>
            <p className="text-gray-600 mt-2">Discover activities and experiences during your trek</p>
          </div>
          <Link to="/activities" className="text-[#1B5E20] hover:text-[#2E7D32] font-semibold whitespace-nowrap">
            See All Activities →
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading activities...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nearbyActivities.length > 0 ? nearbyActivities.map((activity) => (
              <Link
                key={activity.id}
                to="/activities"
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-[#1B5E20] font-semibold">
                    {activity.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#263238] font-bold mb-2 group-hover:text-[#1B5E20] transition-colors">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 text-[#2E7D32]" />
                    {activity.location}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                  <button className="w-full mt-4 px-4 py-2 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </Link>
            )) : (
              <p className="col-span-3 text-center text-gray-600">No activities available</p>
            )}
          </div>
        )}
      </section>

      {/* Why Gantavya */}
      <section className="bg-[#F5F5F5] py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1B5E20] text-center mb-12">Why Choose Gantavya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#263238] mb-3 font-bold">Verified Guides</h3>
              <p className="text-[#263238] text-sm">
                All guides are verified with proper credentials and license numbers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#263238] mb-3 font-bold">Pre-booked Accommodations</h3>
              <p className="text-[#263238] text-sm">
                Stay in platform-verified hotels and teahouses selected for your trek.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#263238] mb-3 font-bold">Complete Information</h3>
              <p className="text-[#263238] text-sm">
                Detailed trek routes, maps, itineraries, and complete pricing clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-white mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Browse available treks and connect with verified guides today. Your Himalayan journey awaits.
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
