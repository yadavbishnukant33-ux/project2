import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import {
  Star,
  Award,
  Languages,
  MapPin,
  Calendar,
  MessageCircle,
  DollarSign,
  Shield,
  Tag,
  CheckCircle,
  Info,
  Lock,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { apiGet, apiPost } from "../api/http";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar as CalendarUI } from "./ui/calendar";

export function GuideProfileDynamic() {
  const { guideId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [guide, setGuide] = useState<any | null>(null);
  const [trek, setTrek] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const trekIdFromQuery = searchParams.get("trekId");
  const trekId = trekIdFromQuery ? Number(trekIdFromQuery) : NaN;

  useEffect(() => {
    let cancelled = false;
    const id = guideId ? Number(guideId) : NaN;
    if (!Number.isFinite(id)) {
      setError("Invalid guide id");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([
      apiGet<any>(`/guides/${id}`),
      trekId && Number.isFinite(trekId) ? apiGet<any>(`/treks/${trekId}`) : Promise.resolve(null),
    ])
      .then(([guideData, trekData]) => {
        if (!cancelled) {
          setGuide(guideData);
          if (trekData) setTrek(trekData);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Failed to load profile");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [guideId, trekId]);

  const availability = guide?.availability ?? [];
  const reviews = guide?.reviews ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <p className="text-[#263238]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!guide) return null;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Cover Photo */}
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${guide.coverPhoto})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <ImageWithFallback
                  src={guide.photo}
                  alt={guide.name}
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                {guide.verified && (
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <h1 className="text-[#1B5E20] mb-2">{guide.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {guide.verified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-sm rounded-full font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Verified Guide
                      </span>
                    )}
                    {guide.licenseNumber && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF3E0] text-[#F57C00] text-sm rounded-full font-semibold">
                        <BadgeCheck className="w-4 h-4" />
                        License: {guide.licenseNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#263238] flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-lg">{guide.rating}</span>
                      <span className="text-[#717182]">({guide.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#2E7D32]" />
                      <span>{guide.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl text-[#1B5E20] mb-1">${guide.pricePerDay}/day</div>
                  {guide.negotiable ? (
                    <span className="inline-block px-3 py-1 bg-[#A5D6A7] text-[#1B5E20] text-sm rounded-full">
                      <Tag className="w-3 h-3 inline mr-1" />
                      Negotiable
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-[#F5F5F5] text-[#263238] text-sm rounded-full">
                      Fixed Price
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-[#F5F5F5] rounded-xl">
                  <div className="text-xl text-[#1B5E20]">{guide.experience}</div>
                  <div className="text-sm text-[#717182]">Experience</div>
                </div>
                <div className="text-center p-3 bg-[#F5F5F5] rounded-xl">
                  <div className="text-xl text-[#1B5E20]">{guide.totalTrips}</div>
                  <div className="text-sm text-[#717182]">Total Trips</div>
                </div>
                <div className="text-center p-3 bg-[#F5F5F5] rounded-xl">
                  <div className="text-xl text-[#1B5E20]">{guide.treks.length}</div>
                  <div className="text-sm text-[#717182]">Trek Routes</div>
                </div>
                <div className="text-center p-3 bg-[#F5F5F5] rounded-xl">
                  <div className="text-xl text-[#1B5E20]">{guide.languages.length}</div>
                  <div className="text-sm text-[#717182]">Languages</div>
                </div>
              </div>

              <div className="flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={() => {
                    const redirectPath = `/guides/${guide.id}/book${Number.isFinite(trekId) ? `?trekId=${trekId}` : ""}`;
                    const token = localStorage.getItem("authToken");
                    if (!token) {
                      navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`);
                    } else {
                      navigate(redirectPath);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md"
                >
                  Book This Guide
                </button>
                <button className="px-6 py-3 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                <Link
                  to={`/guide/dashboard?guideId=${guide.id}`}
                  className="px-6 py-3 border-2 border-[#2E7D32] text-[#2E7D32] rounded-xl hover:bg-[#E8F5E9] hover:text-[#1B5E20] transition-colors flex items-center justify-center"
                >
                  Guide Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-[#1B5E20] mb-4">About Me</h2>
              <p className="text-[#263238] leading-relaxed">{guide.bio}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-[#1B5E20] mb-4">Experience & Skills</h2>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[#263238] mb-2 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-[#2E7D32]" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-lg">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#263238] mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#2E7D32]" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(guide.certifications ?? []).map((cert: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#F5F5F5] text-[#263238] rounded-lg">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#263238] mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#2E7D32]" />
                    Specialized Treks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.treks.map((t: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#F5F5F5] text-[#263238] rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-[#1B5E20] mb-4">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2E7D32]" />
                  <span className="text-[#263238]">Guide Service</span>
                </div>
                {guide.includesAccommodation && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#2E7D32]" />
                    <span className="text-[#263238]">Accommodation</span>
                  </div>
                )}
                {guide.includesMeals && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#2E7D32]" />
                    <span className="text-[#263238]">Meals</span>
                  </div>
                )}
                {guide.porterOptional && (
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-500" />
                    <span className="text-[#263238]">Optional: Porter (Extra Cost)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-[#1B5E20] mb-6">Reviews ({guide.reviewsCount})</h2>
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-[#717182] text-sm">No reviews yet for this demo data.</p>
                ) : (
                  reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-[#263238]">{review.name}</h4>
                          <p className="text-sm text-[#717182]">
                            {review.country} • {review.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-[#263238]">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#263238]">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#2E7D32]" />
                <h3 className="text-[#1B5E20]">Availability</h3>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {(availability.length ? availability : [{ day: 1, available: true }]).map((d: any) => (
                  <div
                    key={d.day}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm ${d.available
                        ? "bg-[#E8F5E9] text-[#2E7D32] cursor-pointer hover:bg-[#A5D6A7]"
                        : "bg-[#F5F5F5] text-[#717182] line-through"
                      }`}
                  >
                    {d.day}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#E8F5E9] rounded"></div>
                  <span className="text-[#717182]">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#F5F5F5] rounded"></div>
                  <span className="text-[#717182]">Booked</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    const redirectPath = `/guides/${guide.id}/book${Number.isFinite(trekId) ? `?trekId=${trekId}` : ""}`;
                    const token = localStorage.getItem("authToken");
                    if (!token) {
                      navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`);
                    } else {
                      navigate(redirectPath);
                    }
                  }}
                  className="w-full px-4 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md"
                >
                  Send Booking Request
                </button>
              </div>

              {guide.negotiable && (
                <button className="w-full mt-3 px-4 py-3 bg-[#A5D6A7] text-[#1B5E20] rounded-xl hover:bg-[#8BC34A] transition-colors flex items-center justify-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Propose Custom Price
                </button>
              )}

              <button className="w-full mt-6 px-4 py-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

