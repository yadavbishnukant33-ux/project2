import { useParams, Link } from "react-router";
import { Filter, Star, DollarSign, Languages, Award, Tag, ArrowUpDown, Shield } from "lucide-react";
import { useState } from "react";

export function GuideListing() {
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

  const guides = [
    {
      id: 1,
      name: "Pemba Sherpa",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      experience: "15 years",
      experienceLevel: "Expert",
      completedTreks: 340,
      languages: ["English", "Nepali", "Hindi"],
      rating: 4.9,
      reviews: 127,
      pricePerDay: 80,
      negotiable: false,
      includesAccommodation: true,
      includesMeals: true,
      bio: "Experienced mountain guide with deep knowledge of Everest region",
      specialization: "High altitude treks",
      certifications: ["NNMGA Certified", "Wilderness First Aid"],
    },
    {
      id: 2,
      name: "Dawa Tamang",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      experience: "12 years",
      experienceLevel: "Expert",
      completedTreks: 210,
      languages: ["English", "Nepali"],
      rating: 4.8,
      reviews: 94,
      pricePerDay: 70,
      negotiable: true,
      includesAccommodation: true,
      includesMeals: false,
      bio: "Friendly guide passionate about sharing Sherpa culture",
      specialization: "Cultural tours",
      certifications: ["NNMGA Certified"],
    },
    {
      id: 3,
      name: "Mingma Dorje",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      experience: "18 years",
      experienceLevel: "Expert",
      completedTreks: 450,
      languages: ["English", "Nepali", "Tibetan", "Mandarin"],
      rating: 5.0,
      reviews: 156,
      pricePerDay: 95,
      negotiable: false,
      includesAccommodation: true,
      includesMeals: true,
      bio: "Expert guide with summit experience on multiple 8000m peaks",
      specialization: "Technical mountaineering",
      certifications: ["IFMGA Certified", "Avalanche Training"],
    },
    {
      id: 4,
      name: "Lakpa Sherpa",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      experience: "2 years",
      experienceLevel: "Beginner",
      completedTreks: 15,
      languages: ["English", "Nepali"],
      rating: 4.7,
      reviews: 12,
      pricePerDay: 45,
      negotiable: true,
      includesAccommodation: false,
      includesMeals: false,
      bio: "Young and energetic guide with great knowledge of local flora and fauna",
      specialization: "Nature & Wildlife",
      certifications: ["NNMGA Certified"],
    },
    {
      id: 5,
      name: "Pasang Lhamu",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      experience: "5 years",
      experienceLevel: "Intermediate",
      completedTreks: 85,
      languages: ["English", "Nepali", "Japanese"],
      rating: 4.9,
      reviews: 68,
      pricePerDay: 75,
      negotiable: true,
      includesAccommodation: true,
      includesMeals: true,
      bio: "One of the few female guides in the region, known for excellent hospitality",
      specialization: "Family groups",
      certifications: ["NNMGA Certified", "First Aid"],
    },
    {
      id: 6,
      name: "Tenzing Norgay",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
      experience: "20 years",
      experienceLevel: "Expert",
      completedTreks: 500,
      languages: ["English", "Nepali", "German"],
      rating: 4.8,
      reviews: 201,
      pricePerDay: 85,
      negotiable: false,
      includesAccommodation: true,
      includesMeals: true,
      bio: "Veteran guide with extensive experience leading international groups",
      specialization: "Large group expeditions",
      certifications: ["IFMGA Certified", "Rescue Training"],
    },
  ];

  const sortedGuides = [...guides].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerDay - b.pricePerDay;
      case "price-high":
        return b.pricePerDay - a.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[#1B5E20] mb-2">Available Guides</h1>
          <p className="text-[#263238]">Connect with experienced local guides for Everest Base Camp trek</p>
          <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
            <Award className="w-5 h-5 text-[#2E7D32]" />
            <p className="text-sm text-[#1B5E20]">
              All guides are shown fairly - no biased rankings. Use filters to find the right match.
            </p>
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
                  onClick={() => setFilters({ priceMin: "", priceMax: "", minRating: "", languages: "", experience: "", negotiable: "" })}
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
              <p className="text-[#263238]">{sortedGuides.length} guides available</p>
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

            <div className="space-y-6">
              {sortedGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Guide Photo */}
                    <div className="flex-shrink-0">
                      <img
                        src={guide.photo}
                        alt={guide.name}
                        className="w-32 h-32 rounded-2xl object-cover"
                      />
                    </div>

                    {/* Guide Info */}
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
                            <span className="text-[#717182] text-sm">({guide.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-[#1B5E20] mb-1">${guide.pricePerDay}/day</div>
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
                          <span className="text-[#263238]">{guide.experience} • {guide.completedTreks} treks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Languages className="w-4 h-4 text-[#2E7D32]" />
                          <span className="text-[#263238]">{guide.languages.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 text-sm rounded-lg ${
                          guide.experienceLevel === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                          guide.experienceLevel === 'Intermediate' ? 'bg-purple-100 text-purple-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {guide.experienceLevel}
                        </span>
                        {guide.experienceLevel === 'Beginner' && (
                          <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-lg">New Guide</span>
                        )}
                        {guide.includesAccommodation && (
                          <span className="px-3 py-1 bg-[#F5F5F5] text-[#263238] text-sm rounded-lg">Includes Accommodation</span>
                        )}
                        {guide.includesMeals && (
                          <span className="px-3 py-1 bg-[#F5F5F5] text-[#263238] text-sm rounded-lg">Includes Meals</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {guide.certifications.map((cert, index) => (
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
                          to={`/guides/${guide.id}`}
                          className="flex-1 px-4 py-2 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors text-center"
                        >
                          View Profile
                        </Link>
                        <button className="flex-1 px-4 py-2 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors">
                          Book Now
                        </button>
                        {guide.negotiable && (
                          <button className="px-4 py-2 bg-[#A5D6A7] text-[#1B5E20] rounded-xl hover:bg-[#8BC34A] transition-colors">
                            Propose Price
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
