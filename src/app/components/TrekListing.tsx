import { Link, useSearchParams } from "react-router";
import { Filter, MapPin, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../api/http";

export function TrekListing() {
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get("search")?.toLowerCase() || "";
  const typeFilter = searchParams.get("type")?.toLowerCase() || "";

  const [filters, setFilters] = useState({
    difficulty: "",
    duration: "",
    priceRange: "",
    region: "",
  });

  const [treks, setTreks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiGet<Array<any>>("/treks")
      .then((data) => {
        if (!cancelled) setTreks(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Failed to load treks");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const difficultyColors: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    moderate: "bg-yellow-100 text-yellow-700",
    challenging: "bg-red-100 text-red-700",
  };

  const filteredTreks = useMemo(() => {
    const parseDays = (duration: string) => {
      const match = duration?.match(/(\d+)/);
      return match ? Number(match[1]) : NaN;
    };

    const parseCost = (cost: string) => {
      const num = Number(String(cost ?? "").replace(/[^0-9]/g, ""));
      return Number.isFinite(num) ? num : NaN;
    };

    return treks.filter((trek) => {
      const difficulty = String(trek.difficulty ?? "").toLowerCase();
      const region = String(trek.region ?? "").toLowerCase();
      const days = parseDays(trek.duration);
      const costNum = parseCost(trek.cost);

      if (typeFilter && String(trek.type ?? "").toLowerCase() !== typeFilter) return false;
      if (searchFilter) {
        const nameMatch = String(trek.name ?? "").toLowerCase().includes(searchFilter);
        const descMatch = String(trek.description ?? "").toLowerCase().includes(searchFilter);
        if (!nameMatch && !descMatch) return false;
      }

      if (filters.difficulty && difficulty !== filters.difficulty) return false;
      if (filters.region && region !== filters.region) return false;

      if (filters.duration) {
        if (!Number.isFinite(days)) return false;
        switch (filters.duration) {
          case "1-5":
            if (!(days >= 1 && days <= 5)) return false;
            break;
          case "6-10":
            if (!(days >= 6 && days <= 10)) return false;
            break;
          case "11-15":
            if (!(days >= 11 && days <= 15)) return false;
            break;
          case "16+":
            if (!(days >= 16)) return false;
            break;
        }
      }

      if (filters.priceRange) {
        if (!Number.isFinite(costNum)) return false;
        switch (filters.priceRange) {
          case "0-800":
            if (!(costNum >= 0 && costNum <= 800)) return false;
            break;
          case "801-1200":
            if (!(costNum >= 801 && costNum <= 1200)) return false;
            break;
          case "1201+":
            if (!(costNum >= 1201)) return false;
            break;
        }
      }

      return true;
    });
  }, [filters, treks]);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-[#1B5E20] mb-2">Explore Treks</h1>
          <p className="text-[#263238]">Discover trekking routes across Nepal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#1B5E20]" />
                <h3 className="text-[#1B5E20]">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Difficulty */}
                <div>
                  <label className="block text-[#263238] mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[#263238] mb-2">Duration</label>
                  <select
                    value={filters.duration}
                    onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">All Durations</option>
                    <option value="1-5">1-5 Days</option>
                    <option value="6-10">6-10 Days</option>
                    <option value="11-15">11-15 Days</option>
                    <option value="16+">16+ Days</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-[#263238] mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">All Prices</option>
                    <option value="0-800">$0 - $800</option>
                    <option value="801-1200">$801 - $1,200</option>
                    <option value="1201+">$1,201+</option>
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-[#263238] mb-2">Region</label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">All Regions</option>
                    <option value="everest">Everest</option>
                    <option value="annapurna">Annapurna</option>
                    <option value="langtang">Langtang</option>
                    <option value="manaslu">Manaslu</option>
                    <option value="mustang">Mustang</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ difficulty: "", duration: "", priceRange: "", region: "" })}
                  className="w-full px-4 py-2 text-[#1B5E20] border border-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Trek Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-[#263238]">
                {loading ? "Loading..." : `${filteredTreks.length} treks found`}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(loading ? [] : filteredTreks).map((trek) => (
                <Link
                  key={trek.id}
                  to={`/treks/${trek.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trek.image}
                      alt={trek.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
                        difficultyColors[String(trek.difficulty ?? "").toLowerCase()] ?? ""
                      }`}
                    >
                      {trek.difficulty}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[#263238] mb-2 group-hover:text-[#1B5E20] transition-colors">{trek.name}</h3>
                    <p className="text-sm text-[#717182] mb-4 line-clamp-2">{trek.description}</p>
                    <div className="space-y-2 text-sm text-[#263238]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#2E7D32]" />
                        <span>{trek.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
                        <span>{trek.altitude}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#2E7D32]" />
                        <span>{trek.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#2E7D32]" />
                        <span className="text-[#1B5E20]">{trek.cost}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
