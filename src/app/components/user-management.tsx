import { useState } from "react";
import {
  Leaf,
  Users,
  Search,
  Mail,
  Phone,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";

interface UserManagementProps {
  onNavigate: (page: string) => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  joinedDate: string;
  tasksCompleted: number;
  rewardsEarned: number;
}

export function UserManagement({ onNavigate }: UserManagementProps) {
  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      isActive: true,
      joinedDate: "2024-11-15",
      tasksCompleted: 24,
      rewardsEarned: 12500,
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul.kumar@example.com",
      phone: "+91 98765 43211",
      isActive: true,
      joinedDate: "2024-10-22",
      tasksCompleted: 18,
      rewardsEarned: 9200,
    },
    {
      id: 3,
      name: "Anjali Verma",
      email: "anjali.verma@example.com",
      phone: "+91 98765 43212",
      isActive: false,
      joinedDate: "2024-12-05",
      tasksCompleted: 5,
      rewardsEarned: 2500,
    },
    {
      id: 4,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 98765 43213",
      isActive: true,
      joinedDate: "2024-09-10",
      tasksCompleted: 32,
      rewardsEarned: 18400,
    },
    {
      id: 5,
      name: "Neha Desai",
      email: "neha.desai@example.com",
      phone: "+91 98765 43214",
      isActive: true,
      joinedDate: "2024-11-28",
      tasksCompleted: 15,
      rewardsEarned: 7800,
    },
    {
      id: 6,
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 98765 43215",
      isActive: false,
      joinedDate: "2024-08-15",
      tasksCompleted: 8,
      rewardsEarned: 4200,
    },
    {
      id: 7,
      name: "Pooja Reddy",
      email: "pooja.reddy@example.com",
      phone: "+91 98765 43216",
      isActive: true,
      joinedDate: "2024-10-05",
      tasksCompleted: 21,
      rewardsEarned: 11300,
    },
    {
      id: 8,
      name: "Arjun Menon",
      email: "arjun.menon@example.com",
      phone: "+91 98765 43217",
      isActive: true,
      joinedDate: "2024-11-12",
      tasksCompleted: 19,
      rewardsEarned: 10100,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Handle toggle user status
  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  // Filter users based on search query and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesStatus;
  });

  const activeUsersCount = users.filter((user) => user.isActive).length;
  const inactiveUsersCount = users.filter((user) => !user.isActive).length;

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
              <Button
                variant="outline"
                onClick={() => onNavigate("admin-dashboard")}
                className="hidden sm:flex"
              >
                Back to Dashboard
              </Button>
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
            <Users className="size-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">User Management</h2>
          </div>
          <p className="text-lg text-gray-600">
            Manage Bandhu user accounts and monitor user activity
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                  <Users className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">{activeUsersCount}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                  <Users className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Inactive Users</p>
                  <p className="text-3xl font-bold text-red-600">{inactiveUsersCount}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-md">
                  <Users className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className="flex items-center gap-2"
                >
                  <Filter className="size-4" />
                  All
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  onClick={() => setStatusFilter("active")}
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === "inactive" ? "default" : "outline"}
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inactive
                </Button>
              </div>

              {/* Export Button */}
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="size-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5 text-blue-600" />
              User Accounts ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No users found matching your criteria</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    {/* User Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={user.isActive ? "default" : "secondary"}
                              className={
                                user.isActive
                                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                                  : "bg-red-100 text-red-700 hover:bg-red-100"
                              }
                            >
                              {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Joined {new Date(user.joinedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-0 sm:ml-15">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="size-4 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="size-4 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>

                      <div className="flex gap-4 ml-0 sm:ml-15 text-sm">
                        <span className="text-gray-600">
                          Tasks: <span className="font-semibold text-gray-900">{user.tasksCompleted}</span>
                        </span>
                        <span className="text-gray-600">
                          Rewards: <span className="font-semibold text-gray-900">₹{user.rewardsEarned.toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {user.isActive ? "Deactivate" : "Activate"}
                        </span>
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={() => handleToggleUserStatus(user.id)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
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
