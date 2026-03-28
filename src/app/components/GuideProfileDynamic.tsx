import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
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

export function GuideProfileDynamic() {
  const { guideId } = useParams();
  const [searchParams] = useSearchParams();

  const [guide, setGuide] = useState<any | null>(null);
  const [trek, setTrek] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"draft" | "pending">("draft");
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [selectedAccommodations, setSelectedAccommodations] = useState<Map<number, string>>(new Map());
  const [selectedStartDate, setSelectedStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));

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
                <img
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
                  onClick={() => setShowBookingModal(true)}
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
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                      d.available
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
                  onClick={() => setShowBookingModal(true)}
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

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#1B5E20] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white">Book {guide.name}</h3>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setBookingStatus("draft");
                  setBookingError(null);
                }}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {bookingStatus === "draft" && (
                <div className="space-y-6">
                  <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
                    <div className="flex gap-3">
                      <Info className="w-6 h-6 text-[#1B5E20] flex-shrink-0" />
                      <div>
                        <p className="text-[#1B5E20] font-medium mb-1">Booking Summary</p>
                        <p className="text-sm text-[#263238]">
                          This booking includes guide service, and may include accommodation and meals depending on the guide's listed inclusions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#717182]">Guide</span>
                      <span className="text-[#263238] font-medium">{guide.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-[#717182]">Rate</span>
                      <span className="text-[#263238] font-medium">${guide.pricePerDay} / day</span>
                    </div>
                    <div className="flex flex-col gap-2 py-3 border-b border-gray-100">
                      <label className="text-[#717182] text-sm">Preferred Start Date</label>
                      <input
                        type="date"
                        value={selectedStartDate}
                        onChange={(event) => setSelectedStartDate(event.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#2E7D32]"
                      />
                    </div>

                    {/* Accommodation Selection */}
                    {trek && trek.stayPlan && trek.stayPlan.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-[#263238] font-bold mb-3 flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#2E7D32]" />
                          Accommodation Preferences
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          {trek.stayPlan.slice(0, 3).map((stay: any, dayIndex: number) => (
                            <div key={dayIndex} className="border rounded-lg p-2 bg-[#F5F5F5] text-xs">
                              <p className="font-semibold text-[#263238] mb-1">Day {stay.day} - {stay.location}</p>
                              {stay.accommodations && stay.accommodations.length > 0 ? (
                                <div className="space-y-1">
                                  {stay.accommodations.slice(0, 2).map((acc: any, accIndex: number) => (
                                    <label key={accIndex} className="flex items-start gap-2 cursor-pointer hover:bg-white p-1 rounded">
                                      <input
                                        type="radio"
                                        name={`day-${dayIndex}`}
                                        checked={selectedAccommodations.get(dayIndex) === acc.name}
                                        onChange={() => {
                                          const newSelected = new Map(selectedAccommodations);
                                          newSelected.set(dayIndex, acc.name);
                                          setSelectedAccommodations(newSelected);
                                        }}
                                        className="mt-0.5"
                                      />
                                      <div className="flex-1">
                                        <p className="text-xs font-semibold text-[#263238]">
                                          {acc.name} <span className="text-[#1B5E20]">${acc.pricePerNight}</span>
                                        </p>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-[#717182]">TBD</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 border border-gray-200 rounded-xl bg-[#F5F5F5]">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-[#2E7D32]" />
                      <span className="text-[#263238] font-medium">Secure Payment via Platform</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#1B5E20]" />
                      <span className="text-[#1B5E20] font-medium bg-[#A5D6A7]/30 px-2 py-0.5 rounded text-sm">
                        Escrow Protected
                      </span>
                    </div>
                    <p className="text-xs text-[#717182] mt-2">
                      Your payment is held securely by Gantavya and is only released to the guide after the trek begins.
                    </p>
                  </div>

                  {bookingError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                      {bookingError}
                    </div>
                  )}

                  <button
                    onClick={async () => {
                      setBookingError(null);
                      if (!Number.isFinite(trekId)) {
                        setBookingError("Missing trekId. Open this guide from the trek’s guides page.");
                        return;
                      }

                      const touristId = localStorage.getItem("demoUserId") ?? "1";
                      try {
                        await apiPost("/booking-requests", {
                          touristId,
                          trekId,
                          guideId: guide.id,
                          startDate: selectedStartDate,
                          accommodationPreferences: Object.fromEntries(selectedAccommodations),
                        });
                        setBookingStatus("pending");
                      } catch (e: any) {
                        setBookingError(e?.message ?? "Booking request failed");
                      }
                    }}
                    className="w-full py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md mt-4"
                  >
                    Confirm & Request Booking
                  </button>
                </div>
              )}

              {bookingStatus === "pending" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-[#263238] mb-2">Request Sent!</h3>
                  <p className="text-[#717182] mb-6">
                    Your booking request is now <span className="text-yellow-600 font-medium">Pending</span>. {guide.name} will review it shortly.
                  </p>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-6 py-2 bg-[#F5F5F5] text-[#263238] rounded-xl hover:bg-[#E8F5E9] transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

