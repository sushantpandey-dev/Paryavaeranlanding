import { useState } from "react";
import { 
  BookOpen, 
  ClipboardCheck, 
  Users, 
  Coins, 
  Play, 
  MapPin, 
  UserPlus,
  TrendingUp,
  Target,
  Award,
  ArrowRight,
  Leaf
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";

interface BandhuDashboardProps {
  onNavigate: (page: string) => void;
}

export function BandhuDashboard({ onNavigate }: BandhuDashboardProps) {
  // Mock user data - in real app, this would come from API/state management
  const [userData] = useState({
    name: "Volunteer Bandhu",
    learningCompleted: 8,
    totalLearning: 12,
    tasksCompleted: 15,
    totalTasks: 20,
    referrals: 5,
    totalRewards: 2450,
  });

  // Calculate percentages
  const learningProgress = (userData.learningCompleted / userData.totalLearning) * 100;
  const taskProgress = (userData.tasksCompleted / userData.totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Leaf className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Paryavaran Bandhu</h1>
                <p className="text-xs text-green-600 font-medium">Volunteer Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-600">Bandhu</p>
              </div>
              <div className="size-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                {userData.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-lg text-gray-600">Welcome back! Here's your activity overview</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Learning Completed Card */}
          <Card 
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onNavigate("learning")}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="size-6 text-blue-600" />
                </div>
                <ArrowRight className="size-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Learning Completed</p>
                <p className="text-3xl font-bold text-gray-900">{userData.learningCompleted}</p>
                <p className="text-xs text-gray-500 mt-1">of {userData.totalLearning} modules</p>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Completed Card */}
          <Card 
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onNavigate("tasks")}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
                  <ClipboardCheck className="size-6 text-green-600" />
                </div>
                <ArrowRight className="size-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tasks Completed</p>
                <p className="text-3xl font-bold text-gray-900">{userData.tasksCompleted}</p>
                <p className="text-xs text-gray-500 mt-1">of {userData.totalTasks} available</p>
              </div>
            </CardContent>
          </Card>

          {/* Referrals Card */}
          <Card 
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
            onClick={() => onNavigate("referrals")}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Users className="size-6 text-purple-600" />
                </div>
                <ArrowRight className="size-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Referrals</p>
                <p className="text-3xl font-bold text-gray-900">{userData.referrals}</p>
                <p className="text-xs text-gray-500 mt-1">volunteers referred</p>
              </div>
            </CardContent>
          </Card>

          {/* Total Rewards Card */}
          <Card 
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white"
            onClick={() => onNavigate("rewards")}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Coins className="size-6 text-white" />
                </div>
                <ArrowRight className="size-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/90 mb-1">Total Rewards</p>
                <p className="text-3xl font-bold text-white">₹{userData.totalRewards.toLocaleString()}</p>
                <p className="text-xs text-white/80 mt-1">accumulated points</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout for Quick Actions and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Target className="size-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => onNavigate("learning")}
                  className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  size="lg"
                >
                  <Play className="size-5 mr-2" />
                  Start Learning
                </Button>
                <Button
                  onClick={() => onNavigate("tasks")}
                  className="w-full justify-start bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  size="lg"
                >
                  <MapPin className="size-5 mr-2" />
                  View Nearby Tasks
                </Button>
                <Button
                  onClick={() => onNavigate("referrals")}
                  className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  size="lg"
                >
                  <UserPlus className="size-5 mr-2" />
                  Submit Referral
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <TrendingUp className="size-5 text-green-600" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Learning Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2.5 rounded-lg">
                        <BookOpen className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Learning Progress</h4>
                        <p className="text-sm text-gray-600">
                          {userData.learningCompleted} of {userData.totalLearning} modules completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{Math.round(learningProgress)}%</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={learningProgress} 
                      className="h-3 bg-blue-100"
                    />
                    <style>{`
                      [data-slot="progress-indicator"] {
                        background: linear-gradient(to right, #3b82f6, #2563eb);
                      }
                    `}</style>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="size-4 text-blue-600" />
                    <span>{userData.totalLearning - userData.learningCompleted} modules remaining</span>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Task Completion Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2.5 rounded-lg">
                        <ClipboardCheck className="size-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Task Completion</h4>
                        <p className="text-sm text-gray-600">
                          {userData.tasksCompleted} of {userData.totalTasks} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{Math.round(taskProgress)}%</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={taskProgress} 
                      className="h-3 bg-green-100"
                    />
                    <style>{`
                      [data-slot="progress-indicator"] {
                        background: linear-gradient(to right, #22c55e, #16a34a);
                      }
                    `}</style>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="size-4 text-green-600" />
                    <span>{userData.totalTasks - userData.tasksCompleted} tasks remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed top-20 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      </main>
    </div>
  );
}