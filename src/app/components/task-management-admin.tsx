import { useState } from "react";
import {
  Leaf,
  Plus,
  MapPin,
  Navigation,
  Search,
  X,
  CheckCircle,
  Clock,
  Users,
  UserPlus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface TaskManagementAdminProps {
  onNavigate: (page: string, taskId?: number) => void;
}

interface Task {
  id: number;
  title: string;
  description: string;
  locationType: "GPS" | "City";
  latitude?: number;
  longitude?: number;
  city?: string;
  radius: number; // in km
  status: "Active" | "Completed" | "Cancelled";
  createdDate: string;
  assignedUsers: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  latitude: number;
  longitude: number;
  city: string;
}

export function TaskManagementAdmin({ onNavigate }: TaskManagementAdminProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Community Park Cleanup Drive",
      description: "Organize a cleanup drive at the local community park. Collect plastic waste, organize recycling, and plant new saplings.",
      locationType: "City",
      city: "Mumbai",
      latitude: 19.0760,
      longitude: 72.8777,
      radius: 40,
      status: "Active",
      createdDate: "2025-02-01",
      assignedUsers: 12,
    },
    {
      id: 2,
      title: "Beach Cleaning Initiative",
      description: "Clean up beach areas, remove plastic waste, and raise awareness about ocean pollution.",
      locationType: "GPS",
      latitude: 19.0896,
      longitude: 72.9114,
      radius: 30,
      status: "Active",
      createdDate: "2025-01-28",
      assignedUsers: 8,
    },
    {
      id: 3,
      title: "Tree Plantation Campaign",
      description: "Plant indigenous trees in designated areas to increase green cover and combat air pollution.",
      locationType: "City",
      city: "Delhi",
      latitude: 28.7041,
      longitude: 77.1025,
      radius: 50,
      status: "Completed",
      createdDate: "2025-01-20",
      assignedUsers: 25,
    },
    {
      id: 4,
      title: "Waste Segregation Awareness",
      description: "Educate communities about proper waste segregation techniques and set up segregation bins.",
      locationType: "GPS",
      latitude: 12.9716,
      longitude: 77.5946,
      radius: 35,
      status: "Active",
      createdDate: "2025-01-15",
      assignedUsers: 15,
    },
  ]);

  // Mock users database with locations
  const allUsers: User[] = [
    { id: 1, name: "Priya Sharma", email: "priya.sharma@example.com", latitude: 19.0760, longitude: 72.8777, city: "Mumbai" },
    { id: 2, name: "Rajesh Kumar", email: "rajesh.kumar@example.com", latitude: 19.0896, longitude: 72.9114, city: "Mumbai" },
    { id: 3, name: "Anita Patel", email: "anita.patel@example.com", latitude: 19.1136, longitude: 72.8697, city: "Mumbai" },
    { id: 4, name: "Vikram Singh", email: "vikram.singh@example.com", latitude: 28.7041, longitude: 77.1025, city: "Delhi" },
    { id: 5, name: "Meera Reddy", email: "meera.reddy@example.com", latitude: 28.6139, longitude: 77.2090, city: "Delhi" },
    { id: 6, name: "Arjun Nair", email: "arjun.nair@example.com", latitude: 12.9716, longitude: 77.5946, city: "Bangalore" },
    { id: 7, name: "Sneha Desai", email: "sneha.desai@example.com", latitude: 12.9352, longitude: 77.6245, city: "Bangalore" },
    { id: 8, name: "Karan Mehta", email: "karan.mehta@example.com", latitude: 19.0330, longitude: 72.8479, city: "Mumbai" },
    { id: 9, name: "Pooja Verma", email: "pooja.verma@example.com", latitude: 19.0728, longitude: 72.8826, city: "Mumbai" },
    { id: 10, name: "Amit Joshi", email: "amit.joshi@example.com", latitude: 28.5355, longitude: 77.3910, city: "Delhi" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    locationType: "City" as "GPS" | "City",
    latitude: "",
    longitude: "",
    city: "",
    radius: "40",
  });

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    description?: string;
    location?: string;
  }>({});

  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [nearbyUsers, setNearbyUsers] = useState<(User & { distance: number })[]>([]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  // Get current location using browser's Geolocation API
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4),
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get current location. Please enter coordinates manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fetch coordinates from city name (mock implementation)
  const handleFetchCoordinates = () => {
    if (!formData.city.trim()) {
      setFormErrors({ ...formErrors, location: "City name is required" });
      return;
    }

    // Mock city coordinates database
    const cityCoordinates: { [key: string]: { lat: number; lon: number } } = {
      mumbai: { lat: 19.0760, lon: 72.8777 },
      delhi: { lat: 28.7041, lon: 77.1025 },
      bangalore: { lat: 12.9716, lon: 77.5946 },
      chennai: { lat: 13.0827, lon: 80.2707 },
      kolkata: { lat: 22.5726, lon: 88.3639 },
      pune: { lat: 18.5204, lon: 73.8567 },
      hyderabad: { lat: 17.3850, lon: 78.4867 },
      ahmedabad: { lat: 23.0225, lon: 72.5714 },
    };

    const cityKey = formData.city.toLowerCase().trim();
    const coords = cityCoordinates[cityKey];

    if (coords) {
      setFormData({
        ...formData,
        latitude: coords.lat.toFixed(4),
        longitude: coords.lon.toFixed(4),
      });
      setFormErrors({ ...formErrors, location: undefined });
    } else {
      setFormErrors({ ...formErrors, location: "City not found. Try: Mumbai, Delhi, Bangalore, etc." });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const errors: { title?: string; description?: string; location?: string } = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.latitude || !formData.longitude) {
      errors.location = "Location is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create new task
    const newTask: Task = {
      id: tasks.length + 1,
      title: formData.title,
      description: formData.description,
      locationType: formData.locationType,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      city: formData.locationType === "City" ? formData.city : undefined,
      radius: parseInt(formData.radius) || 40,
      status: "Active",
      createdDate: new Date().toISOString().split("T")[0],
      assignedUsers: 0,
    };

    setTasks([newTask, ...tasks]);

    // Reset form
    setFormData({
      title: "",
      description: "",
      locationType: "City",
      latitude: "",
      longitude: "",
      city: "",
      radius: "40",
    });
    setFormErrors({});
    setShowCreateForm(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      locationType: "City",
      latitude: "",
      longitude: "",
      city: "",
      radius: "40",
    });
    setFormErrors({});
    setShowCreateForm(false);
  };

  // Open assign users modal
  const handleOpenAssignModal = (task: Task) => {
    setSelectedTask(task);
    
    // Calculate nearby users based on task location and radius
    if (task.latitude && task.longitude) {
      const usersWithDistance = allUsers
        .map((user) => ({
          ...user,
          distance: calculateDistance(task.latitude!, task.longitude!, user.latitude, user.longitude),
        }))
        .filter((user) => user.distance <= task.radius)
        .sort((a, b) => a.distance - b.distance);

      setNearbyUsers(usersWithDistance);
    }
    
    setSelectedUserIds([]);
    setShowAssignModal(true);
  };

  // Handle user selection
  const handleUserToggle = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Handle assign users
  const handleAssignUsers = () => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, assignedUsers: selectedUserIds.length }
            : task
        )
      );
    }
    setShowAssignModal(false);
    setSelectedTask(null);
    setSelectedUserIds([]);
  };

  // Calculate statistics
  const activeTasks = tasks.filter((t) => t.status === "Active").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const totalAssignedUsers = tasks.reduce((sum, task) => sum + task.assignedUsers, 0);

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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <MapPin className="size-8 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">Task Management</h2>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showCreateForm ? (
                <>
                  <X className="size-5 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="size-5 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </div>
          <p className="text-lg text-gray-600">
            Create and manage environmental tasks for Bandhus
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                  <MapPin className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Tasks</p>
                  <p className="text-3xl font-bold text-green-600">{activeTasks}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                  <CheckCircle className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-purple-600">{completedTasks}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                  <Clock className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Assigned Users</p>
                  <p className="text-3xl font-bold text-amber-600">{totalAssignedUsers}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-md">
                  <Users className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Task Form */}
        {showCreateForm && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-5 text-blue-600" />
                Create New Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Task Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        if (formErrors.title) setFormErrors({ ...formErrors, title: undefined });
                      }}
                      placeholder="Enter task title"
                      className={formErrors.title ? "border-red-500" : ""}
                    />
                    {formErrors.title && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        if (formErrors.description)
                          setFormErrors({ ...formErrors, description: undefined });
                      }}
                      placeholder="Enter task description"
                      rows={4}
                      className={formErrors.description ? "border-red-500" : ""}
                    />
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Location Mode */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location Mode
                    </label>
                    <Select
                      value={formData.locationType}
                      onValueChange={(value: "GPS" | "City") =>
                        setFormData({ ...formData, locationType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GPS">
                          <div className="flex items-center gap-2">
                            <Navigation className="size-4" />
                            GPS Coordinates
                          </div>
                        </SelectItem>
                        <SelectItem value="City">
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            City Name
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* GPS Mode */}
                  {formData.locationType === "GPS" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Latitude
                        </label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={formData.latitude}
                          onChange={(e) => {
                            setFormData({ ...formData, latitude: e.target.value });
                            if (formErrors.location)
                              setFormErrors({ ...formErrors, location: undefined });
                          }}
                          placeholder="19.0760"
                          className={formErrors.location ? "border-red-500" : ""}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Longitude
                        </label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={formData.longitude}
                          onChange={(e) => {
                            setFormData({ ...formData, longitude: e.target.value });
                            if (formErrors.location)
                              setFormErrors({ ...formErrors, location: undefined });
                          }}
                          placeholder="72.8777"
                          className={formErrors.location ? "border-red-500" : ""}
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleGetCurrentLocation}
                          className="w-full sm:w-auto"
                        >
                          <Navigation className="size-4 mr-2" />
                          Get My Location
                        </Button>
                      </div>
                    </>
                  )}

                  {/* City Mode */}
                  {formData.locationType === "City" && (
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City Name
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.city}
                          onChange={(e) => {
                            setFormData({ ...formData, city: e.target.value });
                            if (formErrors.location)
                              setFormErrors({ ...formErrors, location: undefined });
                          }}
                          placeholder="Enter city name (e.g., Mumbai, Delhi)"
                          className={`flex-1 ${formErrors.location ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleFetchCoordinates}
                        >
                          <Search className="size-4 mr-2" />
                          Fetch Coords
                        </Button>
                      </div>
                      {formData.latitude && formData.longitude && (
                        <p className="mt-2 text-sm text-green-600">
                          Coordinates: {formData.latitude}, {formData.longitude}
                        </p>
                      )}
                    </div>
                  )}

                  {formErrors.location && (
                    <div className="lg:col-span-2">
                      <p className="text-sm text-red-600">{formErrors.location}</p>
                    </div>
                  )}

                  {/* Radius */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Radius (km)
                    </label>
                    <Input
                      type="number"
                      value={formData.radius}
                      onChange={(e) => setFormData({ ...formData, radius: e.target.value })}
                      placeholder="40"
                      min="1"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Plus className="size-4 mr-2" />
                    Create Task
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Task List */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5 text-blue-600" />
              Tasks ({tasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tasks available</p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    <Plus className="size-4 mr-2" />
                    Create Your First Task
                  </Button>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      {/* Task Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-500">
                                Task #{task.id}
                              </span>
                              <Badge
                                variant={task.status === "Active" ? "default" : "secondary"}
                                className={
                                  task.status === "Active"
                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                    : task.status === "Completed"
                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                    : "bg-red-100 text-red-700 hover:bg-red-100"
                                }
                              >
                                {task.status}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                              {task.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {task.locationType === "City" && task.city
                              ? task.city
                              : `${task.latitude}, ${task.longitude}`}
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="size-4" />
                            Radius: {task.radius} km
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="size-4" />
                            {task.assignedUsers} assigned
                          </div>
                          <span>Created {new Date(task.createdDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 w-full lg:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full lg:w-auto"
                          onClick={() => handleOpenAssignModal(task)}
                        >
                          <UserPlus className="size-4 mr-2" />
                          Assign Users
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Assign Users Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="size-5 text-blue-600" />
              Assign Users to Task
            </DialogTitle>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-4">
              {/* Task Info */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">{selectedTask.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {selectedTask.locationType === "City" && selectedTask.city
                      ? selectedTask.city
                      : `${selectedTask.latitude}, ${selectedTask.longitude}`}
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="size-4" />
                    Radius: {selectedTask.radius} km
                  </div>
                </div>
              </div>

              {/* Nearby Users */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Nearby Users ({nearbyUsers.length})
                </h4>
                {nearbyUsers.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="size-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No users found within the specified radius</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {nearbyUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          checked={selectedUserIds.includes(user.id)}
                          onCheckedChange={() => handleUserToggle(user.id)}
                        />
                        <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-blue-600 font-medium flex-shrink-0">
                          <MapPin className="size-4" />
                          {user.distance} km
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedUserIds.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">
                    {selectedUserIds.length} user{selectedUserIds.length !== 1 ? "s" : ""} selected
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAssignModal(false);
                setSelectedTask(null);
                setSelectedUserIds([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignUsers}
              disabled={selectedUserIds.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <UserPlus className="size-4 mr-2" />
              Assign Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
    </div>
  );
}