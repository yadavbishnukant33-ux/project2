import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  Users,
  Settings,
  MessageCircle,
  CheckCircle,
  XCircle,
  Edit,
} from "lucide-react";
import { apiGet, apiPost } from "../api/http";

type BookingStatus = "pending" | "confirmed" | "rejected";

type BookingRequest = {
  id: string;
  touristId: string;
  trek: string;
  duration: string;
  trekId: number;
  guideId: number;
  status: BookingStatus;
  proposedPricePerDay: number;
  createdAt: string;
};

export function GuideDashboardDynamic() {
  const [searchParams] = useSearchParams();
  const guideIdRaw = searchParams.get("guideId");
  const guideId = guideIdRaw ? Number(guideIdRaw) : 1;

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);

  useEffect(() => {
    if (!Number.isFinite(guideId)) {
      setError("Invalid guideId");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    apiGet<BookingRequest[]>(`/guide/${guideId}/booking-requests`)
      .then((data) => {
        setBookingRequests(data);
      })
      .catch((e) => {
        setError(e?.message ?? "Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, [guideId]);

  const stats = useMemo(() => {
    const pending = bookingRequests.filter((r) => r.status === "pending").length;
    const confirmed = bookingRequests.filter((r) => r.status === "confirmed");
    const earnings = confirmed.reduce((sum, r) => sum + Number(r.proposedPricePerDay || 0), 0);
    const avgRating = 4.9;
    return {
      totalBookings: bookingRequests.length,
      pendingRequests: pending,
      totalEarnings: earnings,
      avgRating,
    };
  }, [bookingRequests]);

  const actOnBooking = async (bookingId: string, decision: "accept" | "decline") => {
    try {
      await apiPost(`/booking-requests/${bookingId}/decision`, { decision });
      const data = await apiGet<BookingRequest[]>(`/guide/${guideId}/booking-requests`);
      setBookingRequests(data);
    } catch (e: any) {
      setError(e?.message ?? "Decision failed");
    }
  };

  const myTreks = ["Everest Base Camp", "Gokyo Lakes", "Three Passes Trek", "Island Peak Climbing"];

  if (!Number.isFinite(guideId)) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          Invalid guideId
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-[#1B5E20] mb-2">Guide Dashboard</h1>
          <p className="text-[#263238]">
            Manage your bookings for guideId <span className="font-medium">{guideId}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8 text-[#2E7D32]" />
              <span className="text-sm text-[#717182]">Total</span>
            </div>
            <div className="text-3xl text-[#1B5E20] mb-1">{stats.totalBookings}</div>
            <div className="text-sm text-[#263238]">Bookings</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <span className="text-sm text-[#717182]">Pending</span>
            </div>
            <div className="text-3xl text-[#1B5E20] mb-1">{stats.pendingRequests}</div>
            <div className="text-sm text-[#263238]">Requests</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-[#2E7D32]" />
              <span className="text-sm text-[#717182]">Earnings</span>
            </div>
            <div className="text-3xl text-[#1B5E20] mb-1">${stats.totalEarnings}</div>
            <div className="text-sm text-[#263238]">Confirmed bookings</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-[#717182]">Rating</span>
            </div>
            <div className="text-3xl text-[#1B5E20] mb-1">{stats.avgRating}</div>
            <div className="text-sm text-[#263238]">Average</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Booking Requests", icon: Users },
                { id: "treks", label: "My Treks", icon: Calendar },
                { id: "availability", label: "Availability", icon: Clock },
                { id: "profile", label: "Profile Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#1B5E20] text-[#1B5E20]"
                      : "text-[#717182] hover:text-[#2E7D32]"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            {activeTab === "overview" && (
              <div>
                {loading ? (
                  <div className="text-[#717182]">Loading booking requests...</div>
                ) : bookingRequests.length === 0 ? (
                  <div className="text-[#717182]">No booking requests yet for this guide.</div>
                ) : (
                  <div className="space-y-4">
                    {bookingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-[#1B5E20]">Trekker {request.touristId}</h3>
                              {request.status === "pending" && (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                                  Pending
                                </span>
                              )}
                              {request.status === "confirmed" && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                  Confirmed
                                </span>
                              )}
                              {request.status === "rejected" && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                                  Rejected
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm text-[#263238]">
                              <div>
                                <span className="text-[#717182]">Trek:</span> {request.trek}
                              </div>
                              <div>
                                <span className="text-[#717182]">Duration:</span> {request.duration}
                              </div>
                              <div>
                                <span className="text-[#717182]">Price:</span> ${request.proposedPricePerDay}/day
                              </div>
                              <div>
                                <span className="text-[#717182]">Requested:</span>{" "}
                                {new Date(request.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          {request.status === "pending" && (
                            <div className="flex gap-3 flex-wrap justify-end">
                              <button
                                onClick={() => actOnBooking(request.id, "accept")}
                                className="px-4 py-2 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Accept
                              </button>
                              <button
                                onClick={() => actOnBooking(request.id, "decline")}
                                className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Decline
                              </button>
                              <button
                                className="px-4 py-2 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors flex items-center gap-2"
                                onClick={() => {}}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          {request.status !== "pending" && (
                            <div className="flex justify-end w-full md:w-auto">
                              <button
                                className="px-4 py-2 border-2 border-[#1B5E20] text-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors flex items-center gap-2"
                                onClick={() => {}}
                              >
                                <MessageCircle className="w-4 h-4" />
                                Message
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "treks" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#1B5E20]">Treks You Guide</h3>
                  <button className="px-4 py-2 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors">
                    Add New Trek
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myTreks.map((trek, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-[#F5F5F5] transition-colors"
                    >
                      <span className="text-[#263238]">{trek}</span>
                      <button className="text-[#1B5E20] hover:text-[#2E7D32]">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "availability" && (
              <div>
                <h3 className="text-[#1B5E20] mb-4">Manage Availability</h3>
                <p className="text-[#717182] mb-6">Mark days as blocked to prevent new booking requests.</p>
                <div className="grid grid-cols-7 gap-2 max-w-2xl">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-[#263238] py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <button
                      key={i}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${
                        i % 7 === 0 || i === 15 || i === 16
                          ? "bg-red-50 text-red-500 line-through"
                          : "bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#A5D6A7]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-[#1B5E20] mb-4">Edit Profile</h3>
                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-gray-200 mb-6">
                  <h4 className="text-[#263238] font-medium mb-3">Included Services</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-[#1B5E20] rounded focus:ring-[#2E7D32]" />
                      <span className="text-[#263238]">Includes Accommodation</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-[#1B5E20] rounded focus:ring-[#2E7D32]" />
                      <span className="text-[#263238]">Includes Meals</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-[#1B5E20] rounded focus:ring-[#2E7D32]" />
                      <span className="text-[#263238]">Optional Porter Service (Extra Cost)</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#263238] mb-2">Price per Day ($)</label>
                    <input
                      type="number"
                      defaultValue="80"
                      className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#263238] mb-2">Pricing Type</label>
                    <select className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]">
                      <option>Fixed Price</option>
                      <option>Negotiable</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#263238] mb-2">Bio</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    defaultValue="I am a professional mountain guide..."
                  />
                </div>

                <div>
                  <label className="block text-[#263238] mb-2">Specialization</label>
                  <input
                    type="text"
                    defaultValue="High altitude treks"
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <button className="px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

