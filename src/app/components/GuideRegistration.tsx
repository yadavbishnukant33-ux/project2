import { useState } from "react";
import { Mountain, Upload, CheckCircle, ShieldAlert } from "lucide-react";

export function GuideRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    govIdUploaded: false,
    photoUploaded: false,
    phoneVerified: false,
    experience: "",
    languages: [] as string[],
    pricePerDay: "",
    negotiable: false,
    bio: "",
    specialization: "",
    certifications: [] as string[],
    selectedTreks: [] as string[],
  });

  const steps = ["Personal", "Verification", "Experience", "Pricing", "Treks", "Review"];

  const availableTreks = [
    "Everest Base Camp",
    "Annapurna Circuit",
    "Langtang Valley",
    "Manaslu Circuit",
    "Ghorepani Poon Hill",
    "Upper Mustang",
    "Gokyo Lakes",
    "Three Passes Trek",
  ];

  const availableLanguages = ["English", "Nepali", "Hindi", "Mandarin", "Japanese", "German", "French", "Spanish"];

  const handleLanguageToggle = (lang: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.includes(lang)
        ? formData.languages.filter((l) => l !== lang)
        : [...formData.languages, lang],
    });
  };

  const handleTrekToggle = (trek: string) => {
    setFormData({
      ...formData,
      selectedTreks: formData.selectedTreks.includes(trek)
        ? formData.selectedTreks.filter((t) => t !== trek)
        : [...formData.selectedTreks, trek],
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mountain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[#1B5E20] mb-2">Become a Guide</h1>
          <p className="text-[#263238]">Join Gantavya and connect with trekkers from around the world</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index + 1 <= currentStep
                        ? "bg-[#1B5E20] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index + 1 < currentStep ? <CheckCircle className="w-6 h-6" /> : index + 1}
                  </div>
                  <span className="text-xs text-[#263238] text-center hidden sm:block">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      index + 1 < currentStep ? "bg-[#1B5E20]" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-[#1B5E20] mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#263238] mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-[#263238] mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[#263238] mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder="+977 ..."
                  />
                </div>
                <div>
                  <label className="block text-[#263238] mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder="e.g., Namche Bazaar"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verification */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-yellow-600" />
                <h2 className="text-[#1B5E20]">Mandatory Verification</h2>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 mb-6">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ Strict Requirement: Unverified guides CANNOT accept bookings. You must complete these steps to receive a Verified badge and activate your profile.
                </p>
              </div>

              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-[#263238] font-medium">Profile Photo *</h4>
                      <p className="text-sm text-[#717182]">Clear photo of your face</p>
                    </div>
                    {formData.photoUploaded ? (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Uploaded</span>
                    ) : (
                      <button 
                        onClick={() => setFormData({...formData, photoUploaded: true})}
                        className="px-4 py-2 bg-[#F5F5F5] text-[#263238] rounded-lg hover:bg-[#E8F5E9] transition-colors text-sm"
                      >
                        Upload Photo
                      </button>
                    )}
                  </div>
                </div>

                {/* Government ID */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-[#263238] font-medium">Government ID *</h4>
                      <p className="text-sm text-[#717182]">Citizenship card or Passport</p>
                    </div>
                    {formData.govIdUploaded ? (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Uploaded</span>
                    ) : (
                      <button 
                        onClick={() => setFormData({...formData, govIdUploaded: true})}
                        className="px-4 py-2 bg-[#F5F5F5] text-[#263238] rounded-lg hover:bg-[#E8F5E9] transition-colors text-sm"
                      >
                        Upload ID
                      </button>
                    )}
                  </div>
                </div>

                {/* Phone Verification */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-[#263238] font-medium">Phone Verification *</h4>
                      <p className="text-sm text-[#717182]">Verify via SMS OTP</p>
                    </div>
                    {formData.phoneVerified ? (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Verified</span>
                    ) : (
                      <button 
                        onClick={() => setFormData({...formData, phoneVerified: true})}
                        className="px-4 py-2 bg-[#F5F5F5] text-[#263238] rounded-lg hover:bg-[#E8F5E9] transition-colors text-sm"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-[#1B5E20] mb-6">Experience & Languages</h2>
              <div>
                <label className="block text-[#263238] mb-2">Years of Experience *</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  <option value="">Select experience</option>
                  <option value="1-3">1-3 years</option>
                  <option value="4-7">4-7 years</option>
                  <option value="8-12">8-12 years</option>
                  <option value="13+">13+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-[#263238] mb-2">Languages You Speak *</label>
                <div className="flex flex-wrap gap-2">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageToggle(lang)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        formData.languages.includes(lang)
                          ? "bg-[#1B5E20] text-white"
                          : "bg-[#F5F5F5] text-[#263238] hover:bg-[#E8F5E9]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[#263238] mb-2">Bio *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="Tell trekkers about yourself..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-[#1B5E20] mb-6">Pricing</h2>
              <div>
                <label className="block text-[#263238] mb-2">Price per Day (USD) *</label>
                <input
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="e.g., 80"
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl">
                <input
                  type="checkbox"
                  id="negotiable"
                  checked={formData.negotiable}
                  onChange={(e) => setFormData({ ...formData, negotiable: e.target.checked })}
                  className="w-5 h-5 text-[#1B5E20] rounded focus:ring-[#2E7D32]"
                />
                <label htmlFor="negotiable" className="text-[#263238] cursor-pointer">
                  My price is negotiable
                </label>
              </div>
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
                <p className="text-sm text-[#1B5E20]">
                  💡 Tip: Offering negotiable pricing can help you connect with more trekkers while maintaining control over your rates.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Treks & Skills */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-[#1B5E20] mb-6">Treks & Skills</h2>
              <div>
                <label className="block text-[#263238] mb-2">Select Treks You Guide *</label>
                <p className="text-sm text-[#717182] mb-3">Choose all treks you can guide</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableTreks.map((trek) => (
                    <label
                      key={trek}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                        formData.selectedTreks.includes(trek)
                          ? "bg-[#E8F5E9] border-2 border-[#2E7D32]"
                          : "bg-[#F5F5F5] border-2 border-transparent hover:bg-[#E8F5E9]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedTreks.includes(trek)}
                        onChange={() => handleTrekToggle(trek)}
                        className="w-5 h-5 text-[#1B5E20] rounded focus:ring-[#2E7D32]"
                      />
                      <span className="text-[#263238]">{trek}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[#263238] mb-2">Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="e.g., High altitude treks, Cultural tours"
                />
              </div>
              <div>
                <label className="block text-[#263238] mb-2">Upload Certifications (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#2E7D32] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-[#717182] mx-auto mb-3" />
                  <p className="text-[#263238] mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-[#717182]">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-[#1B5E20] mb-6">Review Your Information</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <h4 className="text-[#1B5E20] mb-2">Personal Information</h4>
                  <p className="text-[#263238]">Name: {formData.fullName}</p>
                  <p className="text-[#263238]">Email: {formData.email}</p>
                  <p className="text-[#263238]">Location: {formData.location}</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <h4 className="text-[#1B5E20] mb-2">Verification Status</h4>
                  <div className="flex gap-4">
                    <span className={`text-sm ${formData.photoUploaded ? 'text-green-600' : 'text-red-500'}`}>Photo: {formData.photoUploaded ? 'Uploaded' : 'Missing'}</span>
                    <span className={`text-sm ${formData.govIdUploaded ? 'text-green-600' : 'text-red-500'}`}>ID: {formData.govIdUploaded ? 'Uploaded' : 'Missing'}</span>
                    <span className={`text-sm ${formData.phoneVerified ? 'text-green-600' : 'text-red-500'}`}>Phone: {formData.phoneVerified ? 'Verified' : 'Missing'}</span>
                  </div>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <h4 className="text-[#1B5E20] mb-2">Experience</h4>
                  <p className="text-[#263238]">Years: {formData.experience}</p>
                  <p className="text-[#263238]">Languages: {formData.languages.join(", ")}</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <h4 className="text-[#1B5E20] mb-2">Pricing</h4>
                  <p className="text-[#263238]">${formData.pricePerDay}/day {formData.negotiable && "(Negotiable)"}</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <h4 className="text-[#1B5E20] mb-2">Treks</h4>
                  <p className="text-[#263238]">{formData.selectedTreks.join(", ")}</p>
                </div>
              </div>
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
                <p className="text-sm text-[#1B5E20]">
                  ✓ Your application will be reviewed within 2-3 business days. You'll receive an email once verified.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 text-[#1B5E20] border-2 border-[#1B5E20] rounded-xl hover:bg-[#1B5E20] hover:text-white transition-colors"
              >
                Previous
              </button>
            )}
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="ml-auto px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors"
              >
                Next
              </button>
            ) : (
              <button 
                disabled={!formData.govIdUploaded || !formData.photoUploaded || !formData.phoneVerified}
                className="ml-auto px-8 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
