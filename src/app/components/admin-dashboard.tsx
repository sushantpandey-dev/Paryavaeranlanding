import {
  Leaf,
  Users,
  ClipboardCheck,
  UserPlus,
  Coins,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  // Mock statistics data
  const stats = {
    totalUsers: 1247,
    activeTasks: 34,
    pendingReferrals: 18,
    totalRewardsDistributed: 125400,
  };

  // Task Status Distribution for Pie Chart
  const taskStatusData = [
    { name: "Completed", value: 156, color: "#22c55e" },
    { name: "In Progress", value: 34, color: "#3b82f6" },
    { name: "Assigned", value: 21, color: "#6b7280" },
    { name: "On Hold", value: 12, color: "#eab308" },
    { name: "Cancelled", value: 8, color: "#ef4444" },
  ];

  // Referral Status Distribution for Pie Chart
  const referralStatusData = [
    { name: "Verified", value: 89, color: "#22c55e" },
    { name: "Pending", value: 18, color: "#eab308" },
    { name: "Rejected", value: 7, color: "#ef4444" },
  ];

  // Task Progress Over Time (Bar Chart)
  const taskProgressData = [
    { month: "Oct", completed: 45, inProgress: 12 },
    { month: "Nov", completed: 52, inProgress: 18 },
    { month: "Dec", completed: 38, inProgress: 15 },
    { month: "Jan", completed: 61, inProgress: 22 },
    { month: "Feb", completed: 56, inProgress: 34 },
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      type: "task",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Task Completed",
      description: "Beach Cleanup - Juhu Beach completed by Priya Sharma",
      timestamp: "5 minutes ago",
    },
    {
      id: 2,
      type: "referral",
      icon: UserPlus,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "New Referral",
      description: "Rahul Kumar submitted referral for Anjali Verma",
      timestamp: "12 minutes ago",
    },
    {
      id: 3,
      type: "task",
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Task Progress Update",
      description: "Community Garden Development - 75% completed by Amit Patel",
      timestamp: "28 minutes ago",
    },
    {
      id: 4,
      type: "referral",
      icon: AlertCircle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      title: "Referral Pending",
      description: "Verification required for referral by Neha Desai",
      timestamp: "1 hour ago",
    },
    {
      id: 5,
      type: "task",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Task Completed",
      description: "Tree Plantation Drive completed by Vikram Singh",
      timestamp: "2 hours ago",
    },
    {
      id: 6,
      type: "task",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Task Cancelled",
      description: "E-Waste Collection Drive cancelled due to weather",
      timestamp: "3 hours ago",
    },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Count: <span className="font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-md">
                <Leaf className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Paryavaran Bandhu</h1>
                <p className="text-xs text-blue-600 font-medium">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="size-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Admin Dashboard</h2>
          </div>
          <p className="text-lg text-gray-600">
            Monitor platform activity and manage operations
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    +12% from last month
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                  <Users className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Tasks */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeTasks}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    +5 new this week
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                  <ClipboardCheck className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Referrals */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Referrals</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingReferrals}</p>
                  <p className="text-xs text-yellow-600 mt-1">Requires review</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                  <UserPlus className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Rewards Distributed */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Rewards Distributed
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{(stats.totalRewardsDistributed / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    +8% from last month
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-md">
                  <Coins className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Task Status Distribution */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="size-5 text-blue-600" />
                Task Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {taskStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: <span className="font-medium">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral Status Distribution */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="size-5 text-purple-600" />
                Referral Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={referralStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {referralStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 flex flex-col gap-2">
                {referralStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: <span className="font-medium">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Progress Over Time */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600" />
              Task Progress Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[8, 8, 0, 0]} />
                <Bar dataKey="inProgress" fill="#3b82f6" name="In Progress" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Access Section */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-blue-600" />
              Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => onNavigate("user-management")}
                className="h-auto p-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
              >
                <div className="flex flex-col items-center gap-2">
                  <Users className="size-8" />
                  <span className="font-semibold">User Management</span>
                  <span className="text-xs opacity-90">Manage Bandhu accounts</span>
                </div>
              </Button>

              <Button
                onClick={() => onNavigate("learning-content-management")}
                className="h-auto p-6 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
              >
                <div className="flex flex-col items-center gap-2">
                  <ClipboardCheck className="size-8" />
                  <span className="font-semibold">Learning Content</span>
                  <span className="text-xs opacity-90">Manage educational content</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-6 border-2 hover:bg-gray-50"
              >
                <div className="flex flex-col items-center gap-2">
                  <UserPlus className="size-8 text-purple-600" />
                  <span className="font-semibold">Referral Review</span>
                  <span className="text-xs text-gray-600">Verify referrals</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-6 border-2 hover:bg-gray-50"
              >
                <div className="flex flex-col items-center gap-2">
                  <Coins className="size-8 text-amber-600" />
                  <span className="font-semibold">Reward Config</span>
                  <span className="text-xs text-gray-600">Configure rewards</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`${activity.iconBg} p-2.5 rounded-lg flex-shrink-0`}>
                      <Icon className={`size-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
    </div>
  );
}