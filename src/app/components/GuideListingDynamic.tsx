import { useParams, Link } from "react-router";
import {
  Filter,
  Star,
  Languages,
  Award,
  Tag,
  ArrowUpDown,
  Shield,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../api/http";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function GuideListingDynamic() {
  const { trekId } = useParams();

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    minRating: "",
    languages: "",
    experience: "",
    negotiable: "",
  });

  const [sortBy, setSortBy] = useState("default");
  const [guides, setGuides] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = trekId ? Number(trekId) : NaN;
    if (!Number.isFinite(id)) {
      setError("Invalid trek id");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    apiGet<Array<any>>(`/treks/${id}/guides`)
      .then((data) => {
        if (!cancelled) setGuides(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Failed to load guides");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [trekId]);

  const parseYears = (experience: string) => {
    const match = experience?.match(/(\d+)/);
    return match ? Number(match[1]) : NaN;
  };

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const price = Number(guide.pricePerDay);
      const rating = Number(guide.rating);
      const years = parseYears(String(guide.experience ?? ""));

      if (filters.priceMin && (!Number.isFinite(price) || price < Number(filters.priceMin))) return false;
      if (filters.priceMax && (!Number.isFinite(price) || price > Number(filters.priceMax))) return false;
      if (filters.minRating && (!Number.isFinite(rating) || rating < Number(filters.minRating))) return false;

      if (filters.languages) {
        const lang = String(filters.languages).toLowerCase();
        const hasLang = (guide.languages ?? []).some((l: string) => String(l).toLowerCase() === lang);
        if (!hasLang) return false;
      }

      if (filters.experience) {
        const required = Number(String(filters.experience).replace(/[^\d]/g, ""));
        if (!Number.isFinite(years)) return false;
        if (filters.experience.includes("+") && years < required) return false;
      }

      if (filters.negotiable) {
        const isNeg = Boolean(guide.negotiable);
        if (filters.negotiable === "negotiable" && !isNeg) return false;
        if (filters.negotiable === "fixed" && isNeg) return false;
      }

      return true;
    });
  }, [filters, guides]);

  const sortedGuides = useMemo(() => {
    return [...filteredGuides].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerDay - b.pricePerDay;
        case "price-high":
          return b.pricePerDay - a.pricePerDay;
        case "rating":
          return b.rating - a.rating;
        case "experience": {
          const yearsA = parseYears(String(a.experience ?? ""));
          const yearsB = parseYears(String(b.experience ?? ""));
          if (!Number.isFinite(yearsA) || !Number.isFinite(yearsB)) return 0;
          return yearsB - yearsA;
        }
        default:
          return 0;
      }
    });
  }, [filteredGuides, sortBy]);

  const getExperienceLevel = (guide: any) => {
    const years = parseYears(String(guide.experience ?? ""));
    if (!Number.isFinite(years)) return "Expert";
    if (years <= 3) return "Beginner";
    if (years <= 7) return "Intermediate";
    return "Expert";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[#1B5E20] mb-2">Available Guides</h1>
          <p className="text-[#263238]">Connect with experienced local guides for your trek</p>
          <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
            <Shield className="w-5 h-5 text-[#2E7D32]" />
            <p className="text-sm text-[#1B5E20]">Verified guides with transparent profiles and fair matching</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#1B5E20]" />
                <h3 className="text-[#1B5E20]">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-[#263238] mb-2">Price per Day ($)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      className="w-1/2 px-3 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                      className="w-1/2 px-3 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-[#263238] mb-2">Minimum Rating</label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.7">4.7+ Stars</option>
                    <option value="4.9">4.9+ Stars</option>
                  </select>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-[#263238] mb-2">Languages</label>
                  <select
                    value={filters.languages}
                    onChange={(e) => setFilters({ ...filters, languages: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">Any Language</option>
                    <option value="english">English</option>
                    <option value="japanese">Japanese</option>
                    <option value="mandarin">Mandarin</option>
                    <option value="german">German</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-[#263238] mb-2">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">Any Experience</option>
                    <option value="5+">5+ Years</option>
                    <option value="10+">10+ Years</option>
                    <option value="15+">15+ Years</option>
                  </select>
                </div>

                {/* Negotiable */}
                <div>
                  <label className="block text-[#263238] mb-2">Pricing Type</label>
                  <select
                    value={filters.negotiable}
                    onChange={(e) => setFilters({ ...filters, negotiable: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="">All</option>
                    <option value="negotiable">Negotiable</option>
                    <option value="fixed">Fixed Price</option>
                  </select>
                </div>

                <button
                  onClick={() =>
                    setFilters({
                      priceMin: "",
                      priceMax: "",
                      minRating: "",
                      languages: "",
                      experience: "",
                      negotiable: "",
                    })
                  }
                  className="w-full px-4 py-2 text-[#1B5E20] border border-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Guides List */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-[#263238]">
                {loading ? "Loading..." : `${sortedGuides.length} guides available`}
              </p>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#717182]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="experience">Experience: Most First</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {(loading ? [] : sortedGuides).map((guide) => {
                const level = getExperienceLevel(guide);
                const levelClass =
                  level === "Beginner"
                    ? "bg-blue-100 text-blue-800"
                    : level === "Intermediate"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-amber-100 text-amber-800";

                return (
                  <div
                    key={guide.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={guide.photo}
                          alt={guide.name}
                          className="w-32 h-32 rounded-2xl object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-[#1B5E20]">{guide.name}</h3>
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32] text-xs rounded-full">
                                <Shield className="w-3 h-3" />
                                <span>Verified</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-[#263238]">{guide.rating}</span>
                              </div>
                              <span className="text-[#717182] text-sm">({guide.reviewsCount} reviews)</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl text-[#1B5E20] mb-1">
                              ${guide.pricePerDay}/day
                            </div>
                            {guide.negotiable ? (
                              <span className="inline-block px-3 py-1 bg-[#A5D6A7] text-[#1B5E20] text-sm rounded-full whitespace-nowrap">
                                <Tag className="w-3 h-3 inline mr-1" />
                                Negotiable
                              </span>
                            ) : (
                              <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full whitespace-nowrap">
                                Fixed Price
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-[#263238] mb-4">{guide.bio}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-[#2E7D32]" />
                            <span className="text-[#263238]">
                              {guide.experience} • {guide.totalTrips} treks
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Languages className="w-4 h-4 text-[#2E7D32]" />
                            <span className="text-[#263238]">{guide.languages.join(", ")}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-3 py-1 text-sm rounded-lg ${levelClass}`}>{level}</span>
                          {level === "Beginner" && (
                            <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-lg">
                              New Guide
                            </span>
                          )}
                          {guide.includesAccommodation && (
                            <span className="px-3 py-1 bg-[#F5F5F5] text-[#263238] text-sm rounded-lg">
                              Includes Accommodation
                            </span>
                          )}
                          {guide.includesMeals && (
                            <span className="px-3 py-1 bg-[#F5F5F5] text-[#263238] text-sm rounded-lg">
                              Includes Meals
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {(guide.certifications ?? []).map((cert: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[#F5F5F5] text-[#263238] text-sm rounded-lg border border-gray-200"
                            >
                              {cert}
                            </span>
                          ))}
                          <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-sm rounded-lg border border-[#A5D6A7]">
                            {guide.specialization}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <Link
                            to={`/guides/${guide.id}?trekId=${trekId}`}
                            className="flex-1 px-4 py-2 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors text-center"
                          >
                            View Profile
                          </Link>
                          <Link
                            to={`/guides/${guide.id}?trekId=${trekId || ''}&book=true`}
                            className="flex-1 px-4 py-2 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors flex items-center justify-center font-bold"
                          >
                            Book Now
                          </Link>
                          {guide.negotiable && (
                            <button className="px-4 py-2 bg-[#A5D6A7] text-[#1B5E20] rounded-xl hover:bg-[#8BC34A] transition-colors">
                              Propose Price
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

