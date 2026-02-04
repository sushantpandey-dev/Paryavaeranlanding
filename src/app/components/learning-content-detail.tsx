import { useState } from "react";
import {
  Leaf,
  ArrowLeft,
  Video,
  FileText,
  Clock,
  Edit,
  Filter,
  MessageSquare,
  Send,
  X,
  User,
  CheckCircle,
  Clock3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface LearningContentDetailProps {
  onNavigate: (page: string, contentId?: number) => void;
  contentId: number;
}

interface LearningContent {
  id: number;
  title: string;
  description: string;
  type: "Video" | "Document";
  fileUrl: string;
  thumbnailUrl?: string;
  duration: number;
  orderSequence: number;
  isActive: boolean;
  createdDate: string;
  views: number;
  completions: number;
}

interface UserProgress {
  userId: number;
  userName: string;
  userEmail: string;
  status: "Completed" | "Pending";
  progressPercentage: number;
  timeSpent: number; // in minutes
  lastAccessed: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  authorName: string;
  authorType: "admin" | "user";
  message: string;
  timestamp: string;
}

export function LearningContentDetail({ onNavigate, contentId }: LearningContentDetailProps) {
  // Mock content data - in a real app, this would be fetched from API
  const content: LearningContent = {
    id: contentId,
    title: "Introduction to Climate Change",
    description: "Comprehensive overview of climate change causes, effects, and solutions for environmental sustainability. This module covers the scientific basis of climate change, its impacts on ecosystems and human societies, and practical steps individuals and communities can take to mitigate its effects.",
    type: "Video",
    fileUrl: "https://example.com/videos/climate-change-intro.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800",
    duration: 45,
    orderSequence: 1,
    isActive: true,
    createdDate: "2025-01-15",
    views: 1247,
    completions: 892,
  };

  const [userProgressList, setUserProgressList] = useState<UserProgress[]>([
    {
      userId: 1,
      userName: "Priya Sharma",
      userEmail: "priya.sharma@example.com",
      status: "Completed",
      progressPercentage: 100,
      timeSpent: 47,
      lastAccessed: "2025-02-03",
      comments: [
        {
          id: 1,
          authorName: "Priya Sharma",
          authorType: "user",
          message: "This was an excellent introduction! The explanations were clear and easy to understand.",
          timestamp: "2025-02-03 14:30",
        },
        {
          id: 2,
          authorName: "Admin User",
          authorType: "admin",
          message: "Great to hear you found it helpful! Feel free to share any specific topics you'd like to learn more about.",
          timestamp: "2025-02-03 15:45",
        },
      ],
    },
    {
      userId: 2,
      userName: "Rajesh Kumar",
      userEmail: "rajesh.kumar@example.com",
      status: "Completed",
      progressPercentage: 100,
      timeSpent: 52,
      lastAccessed: "2025-02-02",
      comments: [
        {
          id: 1,
          authorName: "Rajesh Kumar",
          authorType: "user",
          message: "Very informative content. Could we get more resources on renewable energy solutions?",
          timestamp: "2025-02-02 10:15",
        },
      ],
    },
    {
      userId: 3,
      userName: "Anita Patel",
      userEmail: "anita.patel@example.com",
      status: "Pending",
      progressPercentage: 65,
      timeSpent: 29,
      lastAccessed: "2025-02-04",
      comments: [],
    },
    {
      userId: 4,
      userName: "Vikram Singh",
      userEmail: "vikram.singh@example.com",
      status: "Completed",
      progressPercentage: 100,
      timeSpent: 45,
      lastAccessed: "2025-02-01",
      comments: [
        {
          id: 1,
          authorName: "Vikram Singh",
          authorType: "user",
          message: "The video quality was great. I learned a lot about climate science.",
          timestamp: "2025-02-01 18:20",
        },
        {
          id: 2,
          authorName: "Admin User",
          authorType: "admin",
          message: "Thank you for the feedback! We're glad the video quality met your expectations.",
          timestamp: "2025-02-01 19:00",
        },
        {
          id: 3,
          authorName: "Vikram Singh",
          authorType: "user",
          message: "Looking forward to the next modules!",
          timestamp: "2025-02-01 19:30",
        },
      ],
    },
    {
      userId: 5,
      userName: "Meera Reddy",
      userEmail: "meera.reddy@example.com",
      status: "Pending",
      progressPercentage: 35,
      timeSpent: 16,
      lastAccessed: "2025-01-30",
      comments: [
        {
          id: 1,
          authorName: "Admin User",
          authorType: "admin",
          message: "Hi Meera, we noticed you started this module. How is your progress going? Let us know if you need any help!",
          timestamp: "2025-02-02 11:00",
        },
      ],
    },
    {
      userId: 6,
      userName: "Arjun Nair",
      userEmail: "arjun.nair@example.com",
      status: "Completed",
      progressPercentage: 100,
      timeSpent: 48,
      lastAccessed: "2025-01-28",
      comments: [],
    },
    {
      userId: 7,
      userName: "Sneha Desai",
      userEmail: "sneha.desai@example.com",
      status: "Pending",
      progressPercentage: 80,
      timeSpent: 36,
      lastAccessed: "2025-02-04",
      comments: [
        {
          id: 1,
          authorName: "Sneha Desai",
          authorType: "user",
          message: "Almost done with this module! Really enjoying the content so far.",
          timestamp: "2025-02-04 09:45",
        },
      ],
    },
    {
      userId: 8,
      userName: "Karan Mehta",
      userEmail: "karan.mehta@example.com",
      status: "Pending",
      progressPercentage: 20,
      timeSpent: 9,
      lastAccessed: "2025-01-25",
      comments: [],
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<"All" | "Completed" | "Pending">("All");
  const [viewingCommentsFor, setViewingCommentsFor] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  // Filter users based on selected status
  const filteredUsers = userProgressList.filter((user) => {
    if (filterStatus === "All") return true;
    return user.status === filterStatus;
  });

  // Handle adding a new comment
  const handleAddComment = (userId: number) => {
    if (!newComment.trim()) return;

    const updatedProgressList = userProgressList.map((user) => {
      if (user.userId === userId) {
        const newCommentObj: Comment = {
          id: user.comments.length + 1,
          authorName: "Admin User",
          authorType: "admin",
          message: newComment,
          timestamp: new Date().toLocaleString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return {
          ...user,
          comments: [...user.comments, newCommentObj],
        };
      }
      return user;
    });

    setUserProgressList(updatedProgressList);
    setNewComment("");
  };

  // Calculate statistics
  const completedCount = userProgressList.filter((u) => u.status === "Completed").length;
  const pendingCount = userProgressList.filter((u) => u.status === "Pending").length;
  const avgProgress = Math.round(
    userProgressList.reduce((sum, u) => sum + u.progressPercentage, 0) / userProgressList.length
  );
  const avgTimeSpent = Math.round(
    userProgressList.reduce((sum, u) => sum + u.timeSpent, 0) / userProgressList.length
  );

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
                onClick={() => onNavigate("learning-content-management")}
                className="hidden sm:flex"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back to Content
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
        {/* Back Button (Mobile) */}
        <Button
          variant="outline"
          onClick={() => onNavigate("learning-content-management")}
          className="mb-6 sm:hidden"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Content
        </Button>

        {/* Content Information */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                {content.thumbnailUrl ? (
                  <img
                    src={content.thumbnailUrl}
                    alt={content.title}
                    className="w-full lg:w-80 h-64 object-cover rounded-xl shadow-md"
                  />
                ) : (
                  <div className="w-full lg:w-80 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                    {content.type === "Video" ? (
                      <Video className="size-20 text-gray-500" />
                    ) : (
                      <FileText className="size-20 text-gray-500" />
                    )}
                  </div>
                )}
              </div>

              {/* Content Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h2>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge
                        variant={content.isActive ? "default" : "secondary"}
                        className={
                          content.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {content.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          content.type === "Video"
                            ? "border-purple-300 text-purple-700"
                            : "border-amber-300 text-amber-700"
                        }
                      >
                        {content.type === "Video" ? (
                          <Video className="size-3 mr-1" />
                        ) : (
                          <FileText className="size-3 mr-1" />
                        )}
                        {content.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="size-4" />
                        {content.duration} min
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{content.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Views</p>
                    <p className="text-2xl font-bold text-blue-600">{content.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Completions</p>
                    <p className="text-2xl font-bold text-green-600">{content.completions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(content.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order</p>
                    <p className="text-lg font-semibold text-gray-900">#{content.orderSequence}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{userProgressList.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                  <User className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{completedCount}</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Avg Progress</p>
                  <p className="text-3xl font-bold text-purple-600">{avgProgress}%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                  <Clock3 className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Avg Time Spent</p>
                  <p className="text-3xl font-bold text-amber-600">{avgTimeSpent}m</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-md">
                  <Clock className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Progress Section */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <User className="size-5 text-blue-600" />
                User Progress ({filteredUsers.length})
              </CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-gray-600" />
                <Select
                  value={filterStatus}
                  onValueChange={(value: "All" | "Completed" | "Pending") => setFilterStatus(value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Users</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <User className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No users found with the selected filter</p>
                </div>
              ) : (
                filteredUsers.map((userProgress) => (
                  <div key={userProgress.userId}>
                    {/* User Progress Card */}
                    <div className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white">
                      <div className="flex flex-col lg:flex-row items-start gap-4">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                          <div className="size-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                            {userProgress.userName.charAt(0)}
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {userProgress.userName}
                              </h3>
                              <p className="text-sm text-gray-600">{userProgress.userEmail}</p>
                            </div>
                            <Badge
                              variant={userProgress.status === "Completed" ? "default" : "secondary"}
                              className={
                                userProgress.status === "Completed"
                                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                                  : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                              }
                            >
                              {userProgress.status}
                            </Badge>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Progress</span>
                              <span className="text-sm font-bold text-blue-600">
                                {userProgress.progressPercentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${userProgress.progressPercentage}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="size-4" />
                              Time spent: {userProgress.timeSpent} min
                            </div>
                            <div>Last accessed: {new Date(userProgress.lastAccessed).toLocaleDateString()}</div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="size-4" />
                              {userProgress.comments.length} comment{userProgress.comments.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full lg:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setViewingCommentsFor(
                                viewingCommentsFor === userProgress.userId ? null : userProgress.userId
                              )
                            }
                            className="w-full lg:w-auto"
                          >
                            <MessageSquare className="size-4 mr-2" />
                            {viewingCommentsFor === userProgress.userId ? "Hide" : "View"} Comments
                          </Button>
                        </div>
                      </div>

                      {/* Comments Section */}
                      {viewingCommentsFor === userProgress.userId && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageSquare className="size-5 text-blue-600" />
                            Comments & Discussion
                          </h4>

                          {/* Comments List */}
                          <div className="space-y-4 mb-4">
                            {userProgress.comments.length === 0 ? (
                              <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <MessageSquare className="size-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">No comments yet</p>
                              </div>
                            ) : (
                              userProgress.comments.map((comment) => (
                                <div
                                  key={comment.id}
                                  className={`p-4 rounded-lg ${
                                    comment.authorType === "admin"
                                      ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500"
                                      : "bg-gray-50 border-l-4 border-gray-300"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`size-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                                        comment.authorType === "admin"
                                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                                          : "bg-gradient-to-br from-gray-500 to-gray-600"
                                      }`}
                                    >
                                      {comment.authorName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="font-semibold text-gray-900">
                                          {comment.authorName}
                                        </p>
                                        {comment.authorType === "admin" && (
                                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                                            Admin
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-700 mb-1">{comment.message}</p>
                                      <p className="text-xs text-gray-500">{comment.timestamp}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Add Comment Form */}
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Add Admin Comment
                            </label>
                            <div className="flex gap-2">
                              <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Type your comment here..."
                                rows={3}
                                className="flex-1"
                              />
                            </div>
                            <div className="flex justify-end mt-3">
                              <Button
                                onClick={() => handleAddComment(userProgress.userId)}
                                disabled={!newComment.trim()}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                <Send className="size-4 mr-2" />
                                Send Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
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
