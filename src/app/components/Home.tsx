import { Link, useNavigate } from "react-router";
import { Search, Mountain, Shield, Users, MapPin, Calendar, TrendingUp, Zap, ChevronRight, Landmark } from "lucide-react";
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
  const [allTreks, setAllTreks] = useState<Trek[]>([]);
  const [nearbyActivities, setNearbyActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allTreksRes, activitiesRes] = await Promise.all([
          fetch("http://localhost:8080/api/treks"),
          fetch("http://localhost:8080/api/activities"),
        ]);

        const treks: Trek[] = await allTreksRes.json();
        const activities: Activity[] = await activitiesRes.json();

        setAllTreks(treks);
        setNearbyActivities(activities.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const shortTreksPreview = allTreks.filter((trek) => trek.type === "short").slice(0, 2);
  const longTreksPreview = allTreks.filter((trek) => trek.type === "long").slice(0, 2);

  const heritageCards = [
    {
      title: "Kathmandu",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200",
      tours: 12,
      description: "Explore ancient temples, vibrant markets, and UNESCO World Heritage sites",
      highlights: ["Durbar Square", "Swayambhunath", "Pashupatinath"],
      guides: 24,
    },
    {
      title: "Pokhara",
      image: "https://images.unsplash.com/photo-1604429868516-63a4109a2a9a?w=1200",
      tours: 9,
      description: "Discover lakeside culture, mountain views, and adventure activities",
      highlights: ["Phewa Lake", "Peace Pagoda", "Old Bazaar"],
      guides: 18,
    },
    {
      title: "Bhaktapur",
      image: "https://images.unsplash.com/photo-1605587572728-7b2c0f1d4b47?w=1200",
      tours: 8,
      description: "Step back in time through medieval architecture and traditional crafts",
      highlights: ["Nyatapola", "Pottery Square", "55-Window Palace"],
      guides: 15,
    },
  ];

  // Helper removed as we navigate now
  const TrekCard = ({ trek }: { trek: Trek }) => (
    <Link
      to={`/treks/${trek.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={trek.image}
          alt={trek.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#1B5E20] uppercase">
          {trek.type === "long" ? "Long Trek" : "Short Trek"}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-[#1B5E20]">
          {trek.cost}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-[#263238] font-bold mb-2 group-hover:text-[#1B5E20] transition-colors line-clamp-2">
          {trek.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {trek.type === "long"
            ? "Multi-day adventure for experienced trekkers seeking the Himalayas"
            : "Short and scenic routes perfect for quick escapes and first-timers"}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-gray-700 font-semibold">
            {trek.altitude}
          </span>
          <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-gray-700 font-semibold">
            {trek.duration}
          </span>
          <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-gray-700 font-semibold">
            {trek.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#2E7D32]" />
            Nepal
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2E7D32]" />
            {trek.type === "long" ? "12 guides" : "8 guides"}
          </span>
        </div>

        <button className="w-full px-4 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors font-bold">
          Book a Guide
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
          backgroundImage: "url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl text-white mb-4 drop-shadow-lg">
            Discover Nepal's Hidden Gems
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-md max-w-3xl mx-auto">
            From ancient temples to scenic trails - explore authentic experiences with verified local guides
          </p>

          {/* Search Box (matches screenshot style) */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 md:p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search treks, heritage sites, or activities..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
              <Link
                to={searchQuery.trim() ? `/treks?search=${encodeURIComponent(searchQuery.trim())}` : "/treks"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors font-bold"
              >
                <Search className="w-5 h-5" />
                Search
              </Link>
            </div>

            {/* Top tabs (add Long Treks here) */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              {[
                { id: "short" as const, label: "Short Treks", icon: Zap, target: "/treks?type=short" },
                { id: "long" as const, label: "Long Treks", icon: Mountain, target: "/treks?type=long" },
                { id: "heritage" as const, label: "Heritage Tours", icon: Landmark, target: "/activities?category=cultural" },
                { id: "happening" as const, label: "What's Happening Now", icon: TrendingUp, target: "/activities?status=happening" },
              ].map(({ id, label, icon: Icon, target }) => (
                <button
                  key={id}
                  onClick={() => navigate(target)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-colors inline-flex items-center gap-2 bg-white text-[#1B5E20] border border-[#E5E7EB] hover:bg-[#F5F5F5]`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explore by Experience Type */}
      <section id="explore-by-type" className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B5E20] mb-2">Explore by Experience Type</h2>
            <p className="text-gray-600">
              Choose from short treks, long treks, heritage tours, and authentic local experiences
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#1B5E20] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shortTreksPreview[0] ? <TrekCard trek={shortTreksPreview[0]} /> : <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">No short treks</div>}
              {longTreksPreview[0] ? <TrekCard trek={longTreksPreview[0]} /> : <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">No long treks</div>}
              <Link
                to="/treks?type=heritage"
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1573455494057-1266d2a4b3f5?w=1200"
                    alt="Heritage Tour"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#1B5E20] uppercase">
                    Heritage Tour
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-[#1B5E20]">
                    $30
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#263238] font-bold mb-2 group-hover:text-[#1B5E20] transition-colors line-clamp-2">
                    Kathmandu Durbar Square Walk
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    Explore ancient palaces, temples, and living goddess Kumari's house
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-gray-700 font-semibold">UNESCO Site</span>
                    <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-gray-700 font-semibold">Royal Palace</span>
                    <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-gray-700 font-semibold">Living Goddess</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#2E7D32]" />
                      Kathmandu
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#2E7D32]" />
                      12 guides
                    </span>
                  </div>
                  <button className="w-full px-4 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors font-bold">
                    Book a Guide
                  </button>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Get to Know Local Heritage */}
      <section id="local-heritage" className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#263238] mb-2">Get to Know Local Heritage</h2>
            <p className="text-gray-600">Immerse yourself in Nepal's rich cultural heritage with expert local guides who bring history to life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {heritageCards.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-[#263238]">
                    {c.tours} Tours
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#263238] mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{c.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                    {c.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#1B5E20]"></span>
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#2E7D32]" />
                      {c.guides} Local Guides
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-[#263238] hover:bg-[#F5F5F5] transition-colors">
                      Learn More
                    </button>
                    <Link
                      to="/guide/list"
                      className="flex-1 px-4 py-3 bg-[#1B5E20] text-white rounded-xl font-bold hover:bg-[#2E7D32] transition-colors text-center"
                    >
                      Book Guide
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/guide/list"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl font-bold hover:bg-[#1B5E20] hover:text-white transition-colors"
            >
              Explore More Local Guides <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What's Happening Now */}
      <section id="happening-now" className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#263238] mb-2">What's Happening Now</h2>
            <p className="text-gray-600">Join live activities and upcoming experiences in real-time</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#1B5E20] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {nearbyActivities.length > 0 ? (
                nearbyActivities.map((activity, idx) => {
                  const status =
                    idx === 0 ? { label: "Live Now", color: "bg-red-600" } :
                    idx === 1 ? { label: "Upcoming", color: "bg-blue-600" } :
                    { label: "Starting Soon", color: "bg-orange-500" };

                  return (
                    <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                      <div className="relative h-56 overflow-hidden bg-gray-200">
                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                        <div className={`absolute top-4 left-4 px-3 py-1 ${status.color} text-white rounded-full text-xs font-bold`}>
                          {status.label}
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-purple-700 uppercase">
                          {activity.category || "Cultural"}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#263238] mb-2">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                        <div className="space-y-2 text-sm text-gray-600 mb-6">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#2E7D32]" />
                            <span>{activity.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#2E7D32]" />
                            <span>{idx === 0 ? "Happening now" : idx === 1 ? "Starting tomorrow" : "In 2 hours"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#2E7D32]" />
                            <span>{idx === 0 ? "150 participants" : idx === 1 ? "12 participants" : "8 participants"}</span>
                          </div>
                        </div>
                        <Link
                          to="/activities"
                          className="block w-full px-4 py-3 bg-[#1B5E20] text-white rounded-xl font-bold text-center hover:bg-[#2E7D32] transition-colors"
                        >
                          {idx === 0 ? "Join Now" : "Book Spot"}
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="col-span-3 text-center text-gray-600">No activities available</p>
              )}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl font-bold hover:bg-[#1B5E20] hover:text-white transition-colors"
            >
              Explore More Activities <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Gantavya (4 items like screenshot) */}
      <section className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#263238] mb-2">Why Choose Gantavya</h2>
            <p className="text-gray-600">Your trusted platform for authentic Nepali experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                icon: Shield,
                title: "Verified Guides",
                description: "All guides are verified with proper credentials and licenses",
              },
              {
                icon: Users,
                title: "Local Experts",
                description: "Experience authentic culture with knowledgeable local guides",
              },
              {
                icon: Mountain,
                title: "Diverse Experiences",
                description: "From short treks to heritage tours, find your perfect adventure",
              },
              {
                icon: TrendingUp,
                title: "Best Value",
                description: "Fair pricing with transparent costs and no hidden fees",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 bg-[#E8F5E9] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-[#1B5E20]" />
                </div>
                <h3 className="text-[#263238] font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
