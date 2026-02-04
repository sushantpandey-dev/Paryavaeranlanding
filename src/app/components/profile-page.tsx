import {
  Leaf,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  CheckCircle2,
  Users,
  Coins,
  Award,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  // Mock user data - in real app, this would come from API/state management
  const userProfile = {
    fullName: "Volunteer Bandhu",
    email: "bandhu@paryavaran.com",
    phone: "+91 98765 43210",
    address: "123 Green Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
  };

  const userStats = {
    learningCompleted: 8,
    tasksCompleted: 15,
    referrals: 5,
    totalRewards: 2450,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div
              onClick={() => onNavigate("bandhu-dashboard")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Leaf className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Paryavaran Bandhu</h1>
                <p className="text-xs text-green-600 font-medium">My Profile</p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate("bandhu-dashboard")}
              variant="outline"
              className="border-gray-300"
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-md">
              <User className="size-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900">My Profile</h2>
              <p className="text-lg text-gray-600">View your personal information and statistics</p>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Personal Information */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <User className="size-5 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <User className="size-4" />
                  Full Name
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-900 font-medium">{userProfile.fullName}</p>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Mail className="size-4" />
                  Email Address
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-900 font-medium">{userProfile.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Phone className="size-4" />
                  Phone Number
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-900 font-medium">{userProfile.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <MapPin className="size-4" />
                  Address
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-900 font-medium">{userProfile.address}</p>
                </div>
              </div>

              {/* City, State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <MapPin className="size-4" />
                    City
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-gray-900 font-medium">{userProfile.city}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <MapPin className="size-4" />
                    State
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-gray-900 font-medium">{userProfile.state}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Statistics */}
          <div className="space-y-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <TrendingUp className="size-5 text-green-600" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Learning Completed */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 p-3 rounded-lg shadow-md">
                        <BookOpen className="size-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-700">Learning Completed</p>
                        <p className="text-3xl font-bold text-blue-900">
                          {userStats.learningCompleted}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tasks Completed */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-3 rounded-lg shadow-md">
                        <CheckCircle2 className="size-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-700">Tasks Completed</p>
                        <p className="text-3xl font-bold text-green-900">
                          {userStats.tasksCompleted}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Referrals */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 p-3 rounded-lg shadow-md">
                        <Users className="size-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-700">Referrals</p>
                        <p className="text-3xl font-bold text-purple-900">
                          {userStats.referrals}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Rewards */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-500 p-3 rounded-lg shadow-md">
                        <Coins className="size-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-700">Total Rewards</p>
                        <p className="text-3xl font-bold text-amber-900">
                          ₹{userStats.totalRewards.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <Award className="size-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-50">Your Level</p>
                    <p className="text-2xl font-bold">Active Contributor</p>
                    <p className="text-sm text-green-50 mt-1">
                      Keep up the great environmental work!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
    </div>
  );
}
