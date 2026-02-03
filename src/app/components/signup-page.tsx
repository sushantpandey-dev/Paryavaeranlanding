import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Home,
  Map,
  Navigation,
  Leaf,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

// Indian states for autocomplete
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
  });

  const [coordinates, setCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePincode = (pincode: string) => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };

  const handleStateInput = (value: string) => {
    setFormData({ ...formData, state: value });
    if (value.trim()) {
      const filtered = INDIAN_STATES.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowStateDropdown(true);
    } else {
      setShowStateDropdown(false);
    }
  };

  const selectState = (state: string) => {
    setFormData({ ...formData, state });
    setShowStateDropdown(false);
  };

  const handlePincodeBlur = async () => {
    if (validatePincode(formData.pincode)) {
      // Mock API call to fetch location from pincode
      // In real app, use a postal code API
      setIsFetchingLocation(true);
      setTimeout(() => {
        // Mock data
        setFormData({
          ...formData,
          city: "Sample City",
          state: "Maharashtra",
        });
        setCoordinates({
          latitude: 19.076,
          longitude: 72.8777,
        });
        setIsFetchingLocation(false);
      }, 1000);
    }
  };

  const fetchCoordsFromCity = async () => {
    if (!formData.city.trim()) {
      setErrors({ ...errors, city: "Please enter a city name first" });
      return;
    }

    setIsFetchingLocation(true);
    // Mock API call to geocode city
    setTimeout(() => {
      // Mock coordinates
      setCoordinates({
        latitude: 19.076 + Math.random() * 0.1,
        longitude: 72.8777 + Math.random() * 0.1,
      });
      setIsFetchingLocation(false);
    }, 1000);
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsFetchingLocation(false);
        },
        (error) => {
          alert("Unable to get location. Please check your browser permissions.");
          setIsFetchingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    // Validate all fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!validatePincode(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (coordinates.latitude === null || coordinates.longitude === null) {
      newErrors.coordinates = "Please capture your location coordinates";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `Account created successfully!\nWelcome ${formData.firstName} ${formData.lastName}!\nRedirecting to Bandhu Dashboard...`
      );
      // In real app: redirect to dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-3 mb-6 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Leaf className="size-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Paryavaran Bandhu
                </h1>
                <p className="text-xs text-green-600 font-medium">
                  Environmental Volunteer Platform
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-900">
                Create your account
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of Bandhus making a difference
              </p>
            </div>
          </div>

          {/* General Error */}
          {errors.coordinates && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 flex items-start gap-3 animate-in slide-in-from-top">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">
                  Location Required
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {errors.coordinates}
                </p>
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: undefined });
                      }
                    }}
                    placeholder="First name"
                    className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: undefined });
                      }
                    }}
                    placeholder="Last name"
                    className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  placeholder="you@example.com"
                  className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) {
                      setErrors({ ...errors, password: undefined });
                    }
                  }}
                  placeholder="Minimum 6 characters"
                  className={`pl-12 pr-12 h-12 text-base border-2 rounded-xl transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setFormData({ ...formData, phone: value });
                    if (errors.phone) {
                      setErrors({ ...errors, phone: undefined });
                    }
                  }}
                  placeholder="10-digit mobile number"
                  className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Location Section Header */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <MapPin className="size-5 text-green-600" />
                Location Information
              </h3>
            </div>

            {/* City with Fetch Coords Button */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                City
              </label>
              <div className="flex gap-2">
                <div className="relative group flex-1">
                  <Map className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      if (errors.city) {
                        setErrors({ ...errors, city: undefined });
                      }
                    }}
                    placeholder="Your city"
                    className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                      errors.city
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                </div>
                <Button
                  type="button"
                  onClick={fetchCoordsFromCity}
                  disabled={isFetchingLocation}
                  className="bg-green-600 hover:bg-green-700 text-white h-12 px-6 rounded-xl whitespace-nowrap"
                >
                  {isFetchingLocation ? "Fetching..." : "Fetch Coords"}
                </Button>
              </div>
              {errors.city && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {errors.city}
                </p>
              )}
            </div>

            {/* State and Pincode */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  State
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors z-10" />
                  <Input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => {
                      handleStateInput(e.target.value);
                      if (errors.state) {
                        setErrors({ ...errors, state: undefined });
                      }
                    }}
                    onFocus={() => {
                      if (formData.state) {
                        const filtered = INDIAN_STATES.filter((state) =>
                          state.toLowerCase().includes(formData.state.toLowerCase())
                        );
                        setFilteredStates(filtered);
                        setShowStateDropdown(true);
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowStateDropdown(false), 200);
                    }}
                    placeholder="Select state"
                    className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                      errors.state
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {showStateDropdown && filteredStates.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {filteredStates.map((state) => (
                        <button
                          key={state}
                          type="button"
                          onClick={() => selectState(state)}
                          className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors text-sm"
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.state && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {errors.state}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Pincode
                </label>
                <div className="relative group">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <Input
                    id="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setFormData({ ...formData, pincode: value });
                      if (errors.pincode) {
                        setErrors({ ...errors, pincode: undefined });
                      }
                    }}
                    onBlur={handlePincodeBlur}
                    placeholder="6-digit pincode"
                    className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                      errors.pincode
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                </div>
                {errors.pincode && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Address
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  if (errors.address) {
                    setErrors({ ...errors, address: undefined });
                  }
                }}
                placeholder="Enter your full address"
                rows={3}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl transition-all resize-none focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                }`}
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {errors.address}
                </p>
              )}
            </div>

            {/* GPS Location Capture */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="size-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">
                    Capture Location
                  </h4>
                </div>
                {coordinates.latitude && coordinates.longitude && (
                  <CheckCircle2 className="size-5 text-green-600" />
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">
                We need your location to connect you with nearby environmental
                tasks and activities. Choose any option below:
              </p>

              <Button
                type="button"
                onClick={getCurrentLocation}
                disabled={isFetchingLocation}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl flex items-center justify-center gap-2 mb-4"
              >
                <Navigation className="size-5" />
                {isFetchingLocation
                  ? "Getting Location..."
                  : "Get My Location (GPS)"}
              </Button>

              {coordinates.latitude && coordinates.longitude && (
                <div className="bg-white border border-green-300 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700">
                      Latitude:
                    </span>
                    <span className="text-gray-900 font-mono">
                      {coordinates.latitude.toFixed(6)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700">
                      Longitude:
                    </span>
                    <span className="text-gray-900 font-mono">
                      {coordinates.longitude.toFixed(6)}
                    </span>
                  </div>
                  <p className="text-xs text-green-700 flex items-center gap-1.5 mt-2">
                    <CheckCircle2 className="size-4" />
                    Location captured successfully!
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-3">
                💡 <strong>Tip:</strong> You can also enter your pincode to
                auto-fill location, or click "Fetch Coords" next to the city
                field.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-green-600 hover:text-green-700 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Info */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758599668360-48ba8ba71b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwcGxhbnRpbmclMjB2b2x1bnRlZXJzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MDAwOTQxNnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tree planting volunteers"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">
                Start Your Journey Today
              </span>
            </div>

            <h2 className="text-5xl font-bold leading-tight">
              Become a Paryavaran Bandhu
            </h2>

            <p className="text-xl text-green-50 leading-relaxed">
              Join our community of environmental champions dedicated to creating
              a sustainable future for our planet.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Quick & Easy Registration
                  </h3>
                  <p className="text-green-50">
                    Complete setup in just 2 minutes and start making an impact
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Location-Based Tasks
                  </h3>
                  <p className="text-green-50">
                    Get matched with environmental activities near you
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Track Your Impact
                  </h3>
                  <p className="text-green-50">
                    Monitor your contributions and earn recognition
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-4xl font-bold mb-1">12.5K+</div>
                <div className="text-green-100 text-sm">Active Bandhus</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">500+</div>
                <div className="text-green-100 text-sm">Tasks Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">98%</div>
                <div className="text-green-100 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
