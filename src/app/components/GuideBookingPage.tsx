import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Info,
  Lock,
  MapPin,
  Shield,
  Star,
} from "lucide-react";
import { apiGet, apiPost } from "../api/http";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar as CalendarUI } from "./ui/calendar";

export function GuideBookingPage() {
  const { guideId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [guide, setGuide] = useState<any | null>(null);
  const [trek, setTrek] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isInNepal, setIsInNepal] = useState<boolean | null>(null);
  const [arrivalHotelId, setArrivalHotelId] = useState<string | null>(null);
  const [showMoreArrivalHotels, setShowMoreArrivalHotels] = useState(false);
  const [reviewHotelId, setReviewHotelId] = useState<string | null>(null);
  const [transportChoice, setTransportChoice] = useState<"shared" | "private" | null>(null);
  const [accommodationTier, setAccommodationTier] = useState<"Standard" | "Luxury" | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedStayPrice, setSelectedStayPrice] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(new Date());
  const [participants, setParticipants] = useState<number>(1);
  const [bookingStatus, setBookingStatus] = useState<"draft" | "pending">("draft");
  const [bookingError, setBookingError] = useState<string | null>(null);

  const trekIdFromQuery = searchParams.get("trekId");
  const trekId = trekIdFromQuery ? Number(trekIdFromQuery) : NaN;

  const arrivalHotels = [
    { id: "annapurna", name: "Hotel de l'Annapurna", price: "$110", description: "Boutique hotel in Thamel." },
    { id: "kantipur", name: "Kantipur Temple House", price: "$85", description: "Cozy local guesthouse near Durbar Square." },
    { id: "yeti", name: "Yeti Mountain Home", price: "$125", description: "Popular lodge with easy airport transfer." },
    { id: "himalayan", name: "Himalayan Vista Hotel", price: "$95", description: "Comfortable stay with airport pickup included." },
    { id: "manang_view", name: "Manang View Lodge", price: "$105", description: "Quiet hotel near the museum district." },
    { id: "boudha_retreat", name: "Boudha Retreat", price: "$115", description: "Peaceful stay beside Boudhanath Stupa." },
    { id: "thamel_courtyard", name: "Thamel Courtyard Inn", price: "$100", description: "Central location with friendly service." },
    { id: "patan_residence", name: "Patan Residence", price: "$110", description: "Classic courtyard hotel near Patan Darbar." },
  ];

  const hotelReviews: Record<string, { rating: number; reviewCount: number; highlight: string; recentReview: string }> = {
    annapurna: {
      rating: 4.7,
      reviewCount: 128,
      highlight: "Excellent location, easy airport pickup.",
      recentReview: "Room was cozy and the staff helped with transfer arrangements exactly as promised.",
    },
    kantipur: {
      rating: 4.5,
      reviewCount: 94,
      highlight: "Authentic local stay close to Durbar Square.",
      recentReview: "Great value for the price and a very warm welcome on arrival.",
    },
    yeti: {
      rating: 4.8,
      reviewCount: 137,
      highlight: "Popular with trekkers for quick airport transfers.",
      recentReview: "Perfect first night in Kathmandu before heading into the mountains.",
    },
    himalayan: {
      rating: 4.6,
      reviewCount: 110,
      highlight: "Reliable service with airport pickup included.",
      recentReview: "The pickup was on time and the staff made everything easy.",
    },
    manang_view: {
      rating: 4.4,
      reviewCount: 72,
      highlight: "Comfortable rooms with quiet courtyard vibes.",
      recentReview: "Nice hotel away from the noise, but still easy to reach downtown.",
    },
    boudha_retreat: {
      rating: 4.6,
      reviewCount: 85,
      highlight: "Calm atmosphere next to the stupa.",
      recentReview: "Lovely breakfast and very friendly staff after a long flight.",
    },
    thamel_courtyard: {
      rating: 4.3,
      reviewCount: 64,
      highlight: "Great value in the heart of Thamel.",
      recentReview: "Convenient location and clean rooms for a short stay.",
    },
    patan_residence: {
      rating: 4.5,
      reviewCount: 58,
      highlight: "Historic courtyard hotel with good service.",
      recentReview: "Nice stay with easy access to Patan's temples and cafes.",
    },
    everest_summit_lodge: {
      rating: 4.9,
      reviewCount: 72,
      highlight: "Luxury lodge with unforgettable mountain views.",
      recentReview: "A perfect retreat after the trek, with excellent food and service.",
    },
    yeti_mountain_home: {
      rating: 4.8,
      reviewCount: 64,
      highlight: "Warm rooms and great local staff.",
      recentReview: "The team helped with every transition and made our stay very comfortable.",
    },
    gokyo_luxury_resort: {
      rating: 4.7,
      reviewCount: 55,
      highlight: "Premium lodge in a serene high-altitude valley.",
      recentReview: "Beautiful location, great meals, and restful nights after long days on trail.",
    },
    standard_teahouse: {
      rating: 4.4,
      reviewCount: 101,
      highlight: "Reliable teahouse stays for a genuine trek experience.",
      recentReview: "Clean beds and friendly hosts made the long days much easier.",
    },
    mountain_guesthouse: {
      rating: 4.5,
      reviewCount: 88,
      highlight: "Cozy mountain guesthouses with local flavor.",
      recentReview: "Great hospitality and a warm dinner after a tough hike.",
    },
    valley_view_lodge: {
      rating: 4.6,
      reviewCount: 79,
      highlight: "Comfortable lodge stays with beautiful valley views.",
      recentReview: "Excellent value and a peaceful atmosphere at the end of each day.",
    },
  };

  const trekConfig: Record<string, { luxuryAvailable: boolean }> = {
    default: { luxuryAvailable: true },
    manaslu: { luxuryAvailable: false },
    everest: { luxuryAvailable: true },
    annapurna: { luxuryAvailable: true },
    gokyo: { luxuryAvailable: true },
  };

  const currentTrekKey = trek?.name?.toString().toLowerCase().replace(/[^a-z0-9]/g, "") ?? "default";
  const currentTrekConfig = Object.entries(trekConfig).find(([key]) => currentTrekKey.includes(key))?.[1] ?? trekConfig.default;

  const partnerReviews = [
    {
      author: "Samira",
      rating: 5,
      title: "Perfect launch for the trek",
      text: "The arrival hotel and local partner lodge made the first few days effortless. Great food and staff support.",
      date: "Mar 2026",
    },
    {
      author: "Aakash",
      rating: 4.5,
      title: "Solid value and easy transfers",
      text: "The guide team handled check-in smoothly and the partner hotel quality matched exactly what we booked.",
      date: "Feb 2026",
    },
    {
      author: "Priya",
      rating: 4.7,
      title: "Helpful staff and clean rooms",
      text: "Very happy with the stay option. The hotel was comfortable and the transport timing was reliable.",
      date: "Jan 2026",
    },
    {
      author: "Rohan",
      rating: 4.3,
      title: "Great service at the lodge",
      text: "The partner lodge was a nice surprise for the price, and the guide made sure everything stayed on schedule.",
      date: "Dec 2025",
    },
    {
      author: "Anita",
      rating: 4.8,
      title: "Excellent partner lodge experience",
      text: "Loved the local hospitality and the verified partner badge gave us confidence before booking.",
      date: "Nov 2025",
    },
  ];

  const visibleReviews = showAllReviews ? partnerReviews : partnerReviews.slice(0, 2);

  const scrollToReviews = () => {
    const target = document.getElementById("reviews-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleArrivalHotels = showMoreArrivalHotels ? arrivalHotels : arrivalHotels.slice(0, 4);

  const hotelPartners = [
    {
      id: "everest_summit_lodge",
      tier: "Luxury",
      name: "Everest Summit Lodge",
      imageURL: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      priceTag: "$240/night",
      priceValue: 240,
      location: "Lukla",
      highlight: "Best views of the Himalayan ridge.",
      availableFor: "2-4 trekkers",
    },
    {
      id: "yeti_mountain_home",
      tier: "Luxury",
      name: "Yeti Mountain Home",
      imageURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      priceTag: "$220/night",
      priceValue: 220,
      location: "Namche Bazaar",
      highlight: "Premium lodge with heated rooms.",
      availableFor: "3-5 trekkers",
    },
    {
      id: "gokyo_luxury_resort",
      tier: "Luxury",
      name: "Gokyo Luxury Resort",
      imageURL: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      priceTag: "$230/night",
      priceValue: 230,
      location: "Gokyo",
      highlight: "Exclusive rooms with mountain views.",
      availableFor: "2-3 trekkers",
    },
    {
      id: "standard_teahouse",
      tier: "Standard",
      name: "Standard Teahouse Stay",
      imageURL: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
      priceTag: "$95/night",
      priceValue: 95,
      location: "Trek Route",
      highlight: "Local teahouse with shared bathrooms.",
      availableFor: "1-2 trekkers",
    },
    {
      id: "mountain_guesthouse",
      tier: "Standard",
      name: "Mountain Guesthouse",
      imageURL: "https://images.unsplash.com/photo-1530629013299-6cb3aa37c4a9?auto=format&fit=crop&w=800&q=80",
      priceTag: "$88/night",
      priceValue: 88,
      location: "Classic Trails",
      highlight: "Authentic mountain hospitality.",
      availableFor: "2-4 trekkers",
    },
    {
      id: "valley_view_lodge",
      tier: "Standard",
      name: "Valley View Lodge",
      imageURL: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      priceTag: "$100/night",
      priceValue: 100,
      location: "Trailhead",
      highlight: "Comfortable stay on the trek route.",
      availableFor: "3-5 trekkers",
    },
  ];

  const trekDays = trek?.duration ?? 11;
  const selectedPartner = selectedPartnerId ? hotelPartners.find((hotel) => hotel.id === selectedPartnerId) : null;
  const isArrivalComplete = isInNepal === true || (isInNepal === false && arrivalHotelId !== null);
  const defaultStayRate = accommodationTier === "Luxury" ? 220 : accommodationTier === "Standard" ? 95 : 0;
  const selectedStayRate = selectedStayPrice ?? defaultStayRate;
  const transportFee = transportChoice === "shared" ? 35 : transportChoice === "private" ? 65 : 0;
  const totalPrice = accommodationTier ? selectedStayRate * trekDays + guide.pricePerDay * trekDays + transportFee : 0;
  const transportLabel = transportChoice === "shared" ? "Shared/Budget Transport" : transportChoice === "private" ? "Private/Comfort" : "";
  const arrivalHotel = arrivalHotels.find((hotel) => hotel.id === arrivalHotelId);
  const airportPickupIncluded = isInNepal === false;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      const redirectPath = `${window.location.pathname}${window.location.search}`;
      navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [navigate]);

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
        if (!cancelled) setError(e?.message ?? "Failed to load booking details");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [guideId, trekId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <p className="text-[#263238]">Loading booking page...</p>
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

  const currentStep = isInNepal === null ? 1 : !transportChoice ? 2 : !accommodationTier ? 3 : 4;

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <Link
              to={`/guides/${guide.id}${trekId ? `?trekId=${trekId}` : ""}`}
              className="inline-flex items-center gap-2 text-[#1B5E20] font-medium hover:text-[#2E7D32]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to guide profile
            </Link>
            <h1 className="text-3xl font-semibold text-[#1B5E20] mt-4">Book {guide.name}</h1>
            <p className="mt-2 text-sm text-[#717182] max-w-2xl">
              Complete your booking in three clear steps: arrival, transport, and trek stay.
            </p>
          </div>
          <div className="rounded-3xl bg-white shadow-lg p-5 w-full sm:w-auto">
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src={guide.photo}
                alt={guide.name}
                className="w-20 h-20 rounded-3xl object-cover"
              />
              <div>
                <p className="text-sm text-[#717182]">Guide</p>
                <p className="text-lg font-semibold text-[#263238]">{guide.name}</p>
                <div className="flex items-center gap-2 text-sm text-[#717182] mt-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {guide.rating} • {guide.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 1, label: "Arrival" },
              { id: 2, label: "Transport" },
              { id: 3, label: "Trek Stay" },
            ].map((step) => (
              <div
                key={step.id}
                className={`rounded-3xl p-5 text-center border ${
                  currentStep === step.id
                    ? "border-[#1B5E20] bg-[#E8F5E9] text-[#1B5E20]"
                    : step.id < currentStep
                    ? "border-[#A5D6A7] bg-[#F5F5F5] text-[#2E7D32]"
                    : "border-gray-200 bg-white text-[#717182]"
                }`}
              >
                <div className="text-lg font-semibold">{step.id}</div>
                <div className="text-sm mt-2">{step.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <main className="space-y-8">
            <div className="rounded-3xl bg-white shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-[#1B5E20] mb-4">Step 1: Where are you?</h2>
              <p className="text-sm text-[#717182] mb-6">
                Let us know whether you are currently in Nepal so we can offer the right arrival bundle.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsInNepal(false);
                    setShowMoreArrivalHotels(false);
                    setReviewHotelId(null);
                  }}
                  className={`rounded-3xl border p-6 text-left transition ${
                    isInNepal === false ? "border-[#1B5E20] bg-[#E8F5E9]" : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                  }`}
                >
                  <p className="text-lg font-semibold text-[#1B5E20]">No, I am not in Nepal</p>
                  <p className="text-sm text-[#717182] mt-2">Need arrival support? We’ll cover KTM hotel + airport pickup.</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsInNepal(true);
                    setArrivalHotelId(null);
                    setShowMoreArrivalHotels(false);
                    setReviewHotelId(null);
                  }}
                  className={`rounded-3xl border p-6 text-left transition ${
                    isInNepal === true ? "border-[#1B5E20] bg-[#E8F5E9]" : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                  }`}
                >
                  <p className="text-lg font-semibold text-[#1B5E20]">Yes, I am in Nepal</p>
                  <p className="text-sm text-[#717182] mt-2">Skip arrival and continue to transport options.</p>
                </button>
              </div>
            </div>

            {isInNepal === false && (
              <div className="rounded-3xl bg-white shadow-xl p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1B5E20]">Kathmandu Arrival Bundle</h3>
                    <p className="text-sm text-[#717182] mt-2">
                      Pick a Kathmandu hotel for arrival. We automatically include airport pickup in your itinerary.
                    </p>
                  </div>
                  <a
                    href="https://www.skyscanner.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-3xl bg-[#1B5E20] px-5 py-3 text-white shadow-md hover:bg-[#2E7D32]"
                  >
                    Book Flight to KTM
                  </a>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {visibleArrivalHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className={`rounded-[28px] border p-6 transition ${
                        arrivalHotelId === hotel.id
                          ? "border-[#1B5E20] bg-[#E8F5E9]"
                          : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-[#263238]">{hotel.name}</p>
                          <p className="text-sm text-[#717182] mt-2">{hotel.description}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#1B5E20]">{hotel.price}</span>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setArrivalHotelId(hotel.id)}
                          className="rounded-full bg-[#1B5E20] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2E7D32] transition"
                        >
                          Select stay
                        </button>
                        <button
                          type="button"
                          onClick={() => setReviewHotelId(hotel.id)}
                          className="rounded-full border border-[#CBD5E1] px-4 py-2 text-sm font-semibold text-[#374151] hover:bg-[#F3F4F6] transition"
                        >
                          See review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {arrivalHotels.length > 4 && (
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#565e71]">
                      See more Kathmandu arrival stays including hidden local guesthouses and courtyard hotels.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowMoreArrivalHotels((current) => !current)}
                      className="inline-flex items-center justify-center rounded-3xl border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#1B5E20] hover:bg-[#E8F5E9] transition"
                    >
                      {showMoreArrivalHotels ? "Hide extra options" : "See more hotels"}
                    </button>
                  </div>
                )}

                {reviewHotelId && hotelReviews[reviewHotelId] && (
                  <div className="mt-6 rounded-3xl bg-[#F8FAFC] border border-[#C7D2FE] p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-[#1B5E20]">
                          Review for {
                            arrivalHotels.find((hotel) => hotel.id === reviewHotelId)?.name ||
                            hotelPartners.find((hotel) => hotel.id === reviewHotelId)?.name ||
                            "selected hotel"
                          }
                        </p>
                        <p className="text-sm text-[#717182] mt-1">Traveler feedback on this stay option.</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-3 py-2 text-sm font-semibold text-[#1B5E20]">
                        <Star className="h-4 w-4" />
                        {hotelReviews[reviewHotelId].rating.toFixed(1)}
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-[#334155]">
                      <div className="rounded-3xl bg-white p-4 shadow-sm">
                        <p className="font-semibold text-[#263238]">{hotelReviews[reviewHotelId].highlight}</p>
                        <p className="mt-2">{hotelReviews[reviewHotelId].recentReview}</p>
                      </div>
                      <p className="text-sm text-[#717182]">
                        {hotelReviews[reviewHotelId].reviewCount} reviews · Rated {hotelReviews[reviewHotelId].rating} stars on average.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReviewHotelId(null)}
                      className="mt-4 rounded-3xl bg-white border border-[#CBD5E1] px-5 py-3 text-sm font-semibold text-[#1B5E20] hover:bg-[#F8FAFC] transition"
                    >
                      Close review
                    </button>
                  </div>
                )}

                <div className="mt-6 rounded-3xl bg-[#E8F5E9] border border-[#A5D6A7] p-6">
                  <p className="font-semibold text-[#1B5E20]">Airport pickup included</p>
                  <p className="text-sm text-[#2E7D32] mt-2">
                    Your Kathmandu hotel choice includes airport pickup automatically.
                  </p>
                </div>
              </div>
            )}

            {(isInNepal === true || isArrivalComplete) && (
              <div className="rounded-3xl bg-white shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-[#1B5E20] mb-4">Step 2: Transport</h2>
                <p className="text-sm text-[#717182] mb-6">
                  Choose how you want to get from Kathmandu to the trek start. This is the route, not the exact vehicle.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setTransportChoice("shared")}
                    className={`rounded-3xl border p-6 text-left transition ${
                      transportChoice === "shared"
                        ? "border-[#1B5E20] bg-[#E8F5E9]"
                        : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                    }`}
                  >
                    <p className="text-lg font-semibold text-[#1B5E20]">Shared / Budget Transport</p>
                    <p className="text-sm text-[#717182] mt-2">
                      Shared bus or jeep transfer to the trailhead. Budget-friendly and dependable.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransportChoice("private")}
                    className={`rounded-3xl border p-6 text-left transition ${
                      transportChoice === "private"
                        ? "border-[#1B5E20] bg-[#E8F5E9]"
                        : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                    }`}
                  >
                    <p className="text-lg font-semibold text-[#1B5E20]">Private / Comfort</p>
                    <p className="text-sm text-[#717182] mt-2">
                      Private jeep or mountain flight where available. Faster and more comfortable.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {transportChoice && (
              <div className="rounded-3xl bg-white shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-[#1B5E20] mb-4">Step 3: Trek Stay</h2>
                <p className="text-sm text-[#717182] mb-6">
                  Select one accommodation tier for the full trek. This keeps the plan simple and stress-free.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAccommodationTier("Standard");
                      setSelectedPartnerId(null);
                      setSelectedStayPrice(95);
                    }}
                    className={`rounded-3xl border p-6 text-left transition ${
                      accommodationTier === "Standard"
                        ? "border-[#1B5E20] bg-[#E8F5E9]"
                        : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                    }`}
                  >
                    <p className="text-lg font-semibold text-[#263238]">Standard Package</p>
                    <p className="text-sm text-[#717182] mt-2">
                      Best available local teahouses with shared bathrooms and an authentic trek experience.
                    </p>
                  </button>
                  <button
                    type="button"
                    disabled={!currentTrekConfig.luxuryAvailable}
                    onClick={() => {
                      if (!currentTrekConfig.luxuryAvailable) return;
                      setAccommodationTier("Luxury");
                      setSelectedPartnerId(null);
                      setSelectedStayPrice(220);
                    }}
                    className={`rounded-3xl border p-6 text-left transition ${
                      !currentTrekConfig.luxuryAvailable
                        ? "border-gray-200 bg-gray-50 text-[#94a3b8] cursor-not-allowed"
                        : accommodationTier === "Luxury"
                        ? "border-[#1B5E20] bg-[#E8F5E9]"
                        : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                    }`}
                  >
                    <p className="text-lg font-semibold text-[#263238]">Luxury Package</p>
                    <p className="text-sm text-[#717182] mt-2">
                      Premium lodges where available, with better amenities and private bathrooms.
                    </p>
                  </button>
                </div>

                {accommodationTier && (
                  <div className="mt-8 rounded-3xl bg-[#F9FAFB] p-8 border border-[#E2E8F0]">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-[#1B5E20]">Partner Discovery</h3>
                        <p className="text-sm text-[#717182] mt-2">
                          Our guides prioritize these partner lodges. Select a verified partner for the chosen tier.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#1B5E20]">
                          <button
                            type="button"
                            onClick={scrollToReviews}
                            className="font-semibold underline-offset-2 hover:underline"
                          >
                            View reviews
                          </button>
                        </div>
                        <div className="mt-4 rounded-3xl bg-[#EFF6F0] border border-[#C7E4D7] p-4 text-sm text-[#2F6F47]">
                          <p className="font-semibold">Guide Management</p>
                          <p className="mt-1 text-[#4B6B53]">Your guide handles physical check-ins and ensures your selected quality tier is honored during the trek.</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#E8F5E9] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
                        {accommodationTier} tier
                      </span>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4">
                      {hotelPartners
                        .filter((hotel) => hotel.tier === accommodationTier)
                        .map((hotel) => (
                          <div
                            key={hotel.id}
                            className={`group min-w-[280px] overflow-hidden rounded-[28px] border p-4 text-left transition ${
                              selectedPartnerId === hotel.id
                                ? "border-[#1B5E20] bg-[#E8F5E9] shadow-lg"
                                : "border-gray-200 bg-white hover:border-[#A5D6A7]"
                            }`}
                          >
                            <div className="relative mb-4 h-40 overflow-hidden rounded-3xl bg-gray-100">
                              <ImageWithFallback
                                src={hotel.imageURL}
                                alt={hotel.name}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-semibold text-[#263238]">{hotel.name}</h4>
                                <p className="text-sm text-[#717182] mt-2">{hotel.highlight}</p>
                              </div>
                              <span className="text-sm font-semibold text-[#1B5E20]">{hotel.priceTag}</span>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#616161]">
                              <span>{hotel.location}</span>
                              <span className="rounded-full bg-[#E8F5E9] px-2 py-1 text-xs font-semibold text-[#1B5E20]">
                                {hotel.availableFor}
                              </span>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPartnerId(hotel.id);
                                  setSelectedStayPrice(hotel.priceValue);
                                }}
                                className="rounded-full bg-[#1B5E20] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2E7D32] transition"
                              >
                                Select stay
                              </button>
                              <button
                                type="button"
                                onClick={() => setReviewHotelId(hotel.id)}
                                className="rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#374151] hover:bg-[#F3F4F6] transition"
                              >
                                See review
                              </button>
                            </div>
                            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#1B5E20]">
                              <span className="rounded-full bg-[#E8F5E9] px-2 py-1">Verified Partner</span>
                              {selectedPartnerId === hotel.id && (
                                <span className="rounded-full bg-[#1B5E20] px-2 py-1 text-white">Selected partner</span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {!selectedPartnerId && (
                      <div className="mt-6 rounded-3xl bg-[#FFF8E1] border border-[#FFECB3] p-4 text-sm text-[#665200]">
                        Select a partner hotel to preview the exact stay cost for this tier.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {transportChoice && accommodationTier && (
              <div className="rounded-3xl bg-white shadow-xl p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1B5E20]">Review your booking</h2>
                    <p className="text-sm text-[#717182] mt-2">
                      Confirm the summary and submit your booking request.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-[#E8F5E9] px-5 py-4">
                    <p className="text-sm text-[#717182]">Estimated total</p>
                    <p className="text-2xl font-semibold text-[#1B5E20]">
                      ${totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#263238]">
                  <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-[#F5F5F5] p-4">
                    <span>1x Guide</span>
                    <span className="font-medium">{guide.name}</span>
                  </div>
                  {airportPickupIncluded && arrivalHotel && (
                    <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-[#F5F5F5] p-4">
                      <span>1x Kathmandu hotel</span>
                      <span className="font-medium">{arrivalHotel.name}</span>
                    </div>
                  )}
                  {transportChoice && (
                    <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-[#F5F5F5] p-4">
                      <span>1x Transport</span>
                      <span className="font-medium">{transportLabel}</span>
                    </div>
                  )}
                  {accommodationTier && (
                    <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-[#F5F5F5] p-4">
                      <span>{trekDays}x Trek stay</span>
                      <span className="font-medium">{accommodationTier} Package</span>
                    </div>
                  )}
                  {selectedPartner && (
                    <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-[#F5F5F5] p-4">
                      <span>Partner hotel</span>
                      <span className="font-medium">{selectedPartner.name}</span>
                    </div>
                  )}
                  {airportPickupIncluded && (
                    <div className="rounded-3xl bg-[#E8F5E9] border border-[#A5D6A7] p-4 text-sm text-[#2E7D32]">
                      Airport pickup is automatically added.
                    </div>
                  )}
                </div>

                {bookingError && (
                  <div className="mt-6 rounded-3xl bg-red-50 border border-red-200 p-4 text-red-700">
                    {bookingError}
                  </div>
                )}

                {bookingStatus !== "pending" ? (
                  <button
                    type="button"
                    onClick={async () => {
                      setBookingError(null);
                      if (!Number.isFinite(trekId)) {
                        setBookingError("Missing trekId. Open this guide from the trek’s guides page.");
                        return;
                      }
                      if (!transportChoice || !accommodationTier || (isInNepal === false && !arrivalHotelId)) {
                        setBookingError("Please complete all steps before confirming.");
                        return;
                      }

                      const touristId = localStorage.getItem("demoUserId") ?? "1";
                      try {
                        await apiPost("/booking-requests", {
                          touristId,
                          trekId,
                          guideId: guide.id,
                          startDate: selectedStartDate ? selectedStartDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
                          participants,
                          transportPreference: transportChoice === "shared" ? "shared_budget" : "private_fast",
                          accommodationTier,
                          accommodationPartner: selectedPartner?.name,
                          arrivalHotel: arrivalHotel?.name,
                          airportPickupIncluded,
                          proposedPricePerDay: selectedStayRate + guide.pricePerDay,
                        });
                        setBookingStatus("pending");
                      } catch (e: any) {
                        setBookingError(e?.message ?? "Booking request failed");
                      }
                    }}
                    className="mt-6 w-full rounded-3xl bg-[#1B5E20] py-4 text-white text-lg font-semibold hover:bg-[#2E7D32] transition-colors"
                  >
                    Confirm & Request Booking
                  </button>
                ) : (
                  <div className="mt-6 rounded-3xl bg-[#EFF6FF] border border-[#BEE3F8] p-6 text-center">
                    <p className="text-lg font-semibold text-[#1D4ED8]">Request Sent!</p>
                    <p className="text-sm text-[#334155] mt-2">
                      Your booking request is pending review. We will notify you when the guide confirms the details.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/guides/${guide.id}${trekId ? `?trekId=${trekId}` : ""}`)}
                      className="mt-5 rounded-3xl bg-white border border-[#CBD5E1] px-6 py-3 text-sm font-semibold text-[#1B5E20] hover:bg-[#F8FAFC]"
                    >
                      Back to Guide Profile
                    </button>
                  </div>
                )}
              </div>
            )}

            <section id="reviews-section" className="rounded-3xl bg-white shadow-xl p-8 mt-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1B5E20]">Traveler reviews</h2>
                  <p className="text-sm text-[#717182] mt-2">
                    See how recent guests rated our arrival hotel and partner lodge options.
                  </p>
                </div>
                <div className="rounded-full bg-[#E8F5E9] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
                  {partnerReviews.length} reviews
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {visibleReviews.map((review) => (
                  <div key={review.author + review.date} className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-[#263238]">{review.title}</p>
                        <p className="text-sm text-[#717182] mt-1">{review.author} · {review.date}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-3 py-2 text-sm font-semibold text-[#1B5E20]">
                        <Star className="h-4 w-4" />
                        {review.rating.toFixed(1)}
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-[#334155]">{review.text}</p>
                  </div>
                ))}
              </div>
              {partnerReviews.length > 2 && (
                <button
                  type="button"
                  onClick={() => setShowAllReviews((current) => !current)}
                  className="mt-6 rounded-3xl bg-white border border-[#CBD5E1] px-5 py-3 text-sm font-semibold text-[#1B5E20] hover:bg-[#F8FAFC] transition"
                >
                  {showAllReviews ? "Show fewer reviews" : `Load more reviews (${partnerReviews.length - 2})`}
                </button>
              )}
            </section>
          </main>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white shadow-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <Lock className="w-5 h-5 text-[#2E7D32]" />
                <p className="font-semibold text-[#263238]">Secure booking</p>
              </div>
              <p className="text-sm text-[#717182]">
                Your details are held securely. Payment and personal contact are shared only after the guide accepts the booking.
              </p>
            </div>

            <div className="rounded-3xl bg-white shadow-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-5 h-5 text-[#1B5E20]" />
                <p className="font-semibold text-[#263238]">Escrow protection</p>
              </div>
              <p className="text-sm text-[#717182]">
                Funds are securely managed until the trek begins, protecting both you and the guide.
              </p>
            </div>

            <div className="rounded-3xl bg-white shadow-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <Info className="w-5 h-5 text-[#1B5E20]" />
                <p className="font-semibold text-[#263238]">How it works</p>
              </div>
              <p className="text-sm text-[#717182]">
                This booking page simplifies arrival, transport, and stay for a clean, easy flow.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
