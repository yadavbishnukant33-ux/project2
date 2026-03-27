import { useParams, Link } from "react-router";
import { MapPin, Calendar, TrendingUp, DollarSign, Users, Mountain, Info, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { apiGet } from "../api/http";

export function TrekDetail() {
  const { trekId } = useParams();
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(null);
  const [mapZoom, setMapZoom] = useState(1);

  const [trek, setTrek] = useState<any | null>(null);
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
    apiGet<any>(`/treks/${id}`)
      .then((data) => {
        if (!cancelled) setTrek(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Failed to load trek");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [trekId]);

  const checkpoints = trek?.checkpoints ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#263238]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!trek) {
    return null;
  }

  const getCheckpointColor = (type: string) => {
    switch (type) {
      case "start": return "#1B5E20";
      case "destination": return "#d4183d";
      case "monastery": return "#9C27B0";
      case "village": return "#2E7D32";
      default: return "#2E7D32";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${trek.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white mb-4">{trek.name}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>{trek.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{trek.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain className="w-5 h-5" />
                <span>{trek.altitude}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Trek Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-[#1B5E20] mb-4">Overview</h2>
              <p className="text-[#263238] mb-6">{trek.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-[#717182]">Duration</span>
                  <span className="text-[#263238]">{trek.duration}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-[#717182]">Difficulty</span>
                  <span className="text-[#263238]">{trek.difficulty}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-[#717182]">Max Altitude</span>
                  <span className="text-[#263238]">{trek.altitude}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-[#717182]">Best Season</span>
                  <span className="text-[#263238]">{trek.bestSeason}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#717182]">Cost</span>
                  <span className="text-[#1B5E20]">{trek.cost}</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[#1B5E20] mb-4">Highlights</h3>
              <ul className="space-y-2">
                {trek.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#263238]">
                    <Mountain className="w-5 h-5 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[#1B5E20] mb-4">Day-by-Day Itinerary</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {trek.itinerary.map((day) => (
                  <div key={day.day} className="border-l-2 border-[#A5D6A7] pl-4 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-white bg-[#2E7D32] px-2 py-0.5 rounded-full">Day {day.day}</span>
                      <h4 className="text-[#263238]">{day.title}</h4>
                    </div>
                    <p className="text-sm text-[#717182]">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Guide CTA */}
            <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6" />
                <h3 className="text-white">Need a Guide?</h3>
              </div>
              <p className="text-white/90 mb-4">
                Connect with experienced local guides for this trek. All guides are fairly listed - no bias.
              </p>
              <Link
                to={`/treks/${trekId}/guides`}
                className="block w-full text-center px-6 py-3 bg-white text-[#1B5E20] rounded-xl hover:bg-[#F5F5F5] transition-colors shadow-md"
              >
                See Available Guides
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive Map */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="bg-[#1B5E20] text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    <h3 className="text-white">Trek Route Map</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/treks/${trekId}/guides`}
                      className="px-4 py-1.5 bg-white text-[#1B5E20] text-sm font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors shadow-sm whitespace-nowrap"
                    >
                      👉 See Guides
                    </Link>
                    <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                      <button
                        onClick={() => setMapZoom(Math.max(0.5, mapZoom - 0.1))}
                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm">{Math.round(mapZoom * 100)}%</span>
                      <button
                        onClick={() => setMapZoom(Math.min(2, mapZoom + 0.1))}
                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Map Canvas */}
                <div className="relative bg-gradient-to-br from-[#F5F5F5] to-[#E8F5E9] p-8 h-[600px] overflow-hidden">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{ transform: `scale(${mapZoom})` }}
                  >
                    {/* Route Path */}
                    {checkpoints.length > 1 && (
                      <path
                        d={`M ${checkpoints.map((cp) => `${cp.x},${cp.y}`).join(" L ")}`}
                        stroke="#2E7D32"
                        strokeWidth="0.8"
                        fill="none"
                        strokeDasharray="2,1"
                        className="drop-shadow-md animate-[pulse_2s_ease-in-out_infinite]"
                      />
                    )}

                    {/* Checkpoints */}
                    {checkpoints.map((checkpoint, index) => (
                      <g key={checkpoint.id}>
                        {/* Checkpoint Marker */}
                        <circle
                          cx={checkpoint.x}
                          cy={checkpoint.y}
                          r={checkpoint.type === "destination" ? "2.5" : checkpoint.type === "start" ? "2.5" : "2"}
                          fill={getCheckpointColor(checkpoint.type)}
                          stroke="white"
                          strokeWidth="0.3"
                          className="cursor-pointer hover:opacity-80 transition-opacity drop-shadow-lg"
                          onClick={() => setSelectedCheckpoint(checkpoint.id)}
                        />

                        {/* Checkpoint Label */}
                        <text
                          x={checkpoint.x}
                          y={checkpoint.y - 3}
                          fontSize="2.5"
                          fill="#263238"
                          textAnchor="middle"
                          className="pointer-events-none font-medium"
                        >
                          {checkpoint.name}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Checkpoint Info Popup */}
                  {selectedCheckpoint && (
                    <div className="absolute top-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 animate-in fade-in slide-in-from-top-2">
                      {checkpoints.filter((cp) => cp.id === selectedCheckpoint).map((cp) => (
                        <div key={cp.id}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-[#1B5E20]">{cp.name}</h4>
                              <p className="text-sm text-[#717182]">{cp.altitude}</p>
                            </div>
                            <button
                              onClick={() => setSelectedCheckpoint(null)}
                              className="text-[#717182] hover:text-[#263238]"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-sm text-[#263238]">{cp.info}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="bg-[#F5F5F5] px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center gap-6 flex-wrap text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#1B5E20]"></div>
                      <span className="text-[#263238]">Start</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#2E7D32]"></div>
                      <span className="text-[#263238]">Village</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#9C27B0]"></div>
                      <span className="text-[#263238]">Monastery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#d4183d]"></div>
                      <span className="text-[#263238]">Destination</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#2E7D32]" />
                      <span className="text-[#717182]">Click markers for info</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
