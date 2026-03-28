import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { MapPin, Zap, Users, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Activity {
  id: number;
  title: string;
  type: string;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  image: string;
  description: string;
  dateTime: string;
  priceRange: string;
  duration: string;
}

export function ActivitiesListing() {
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get("search")?.toLowerCase() || "";
  const initialCategory = searchParams.get("category")?.toLowerCase() || "";

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    fetchActivities();
  }, [selectedCategory, selectedLocation]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedLocation) params.append("location", selectedLocation);

      const response = await fetch(`http://localhost:8080/api/activities?${params}`);
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedActivities = activities.filter((activity) => {
    if (!searchFilter) return true;
    const nameMatch = String(activity.title ?? "").toLowerCase().includes(searchFilter);
    const descMatch = String(activity.description ?? "").toLowerCase().includes(searchFilter);
    return nameMatch || descMatch;
  });

  const categories = ["cultural", "adventure", "sightseeing"];
  const locations = new Set(activities.map((a) => a.location));

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "cultural":
        return "🏛️";
      case "adventure":
        return "⛰️";
      case "sightseeing":
        return "🏞️";
      default:
        return "📍";
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-[#1B1B1B]">
          What's Happening Around You
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing activities and experiences nearby
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32]"
          >
            <option value="">All Locations</option>
            {Array.from(locations).map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading activities...</p>
        </div>
      ) : displayedActivities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No activities found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#2E7D32] text-white">
                    {getCategoryIcon(activity.category)} {activity.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-[#1B1B1B] mb-2 line-clamp-2">
                  {activity.title}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#2E7D32]" />
                    {activity.location}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {activity.duration}
                    </div>
                    <div className="font-bold text-[#2E7D32]">
                      {activity.priceRange}
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1b5e20] transition-colors flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
