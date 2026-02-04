import { useState } from "react";
import {
  MapPin,
  Play,
  CheckCircle2,
  PauseCircle,
  XCircle,
  Circle,
  MessageSquare,
  Clock,
  Leaf,
  ChevronDown,
  ChevronUp,
  User,
  Shield,
  Reply,
  Send,
  AlertCircle,
  Navigation,
  Save,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";

interface TaskManagementProps {
  onNavigate: (page: string) => void;
}

type TaskStatus = "Assigned" | "In Progress" | "On Hold" | "Completed" | "Cancelled";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  isAdmin: boolean;
  text: string;
  timestamp: Date;
  parentId?: string;
  isRead: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  distance: number; // in km
  status: TaskStatus;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  comments: Comment[];
}

export function TaskManagement({ onNavigate }: TaskManagementProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Tree Plantation Drive at Central Park",
      description:
        "Join us in planting 100 native saplings in Central Park. Bring gardening gloves and enthusiasm! We'll provide saplings, tools, and refreshments.",
      location: "Central Park, Mumbai",
      distance: 2.5,
      status: "Completed",
      progress: 100,
      timeSpent: 180,
      comments: [
        {
          id: "c1",
          userId: "admin1",
          userName: "Coordinator Sharma",
          userEmail: "coordinator@paryavaran.com",
          isAdmin: true,
          text: "Great work everyone! We successfully planted 120 saplings today.",
          timestamp: new Date("2026-01-28T16:00:00"),
          isRead: true,
        },
        {
          id: "c2",
          userId: "user1",
          userName: "Volunteer Bandhu",
          userEmail: "bandhu@paryavaran.com",
          isAdmin: false,
          text: "It was an amazing experience! Thank you for organizing this.",
          timestamp: new Date("2026-01-28T17:30:00"),
          isRead: true,
        },
      ],
    },
    {
      id: "2",
      title: "Beach Cleanup - Juhu Beach",
      description:
        "Help us clean Juhu Beach and remove plastic waste. We aim to collect at least 500kg of garbage. Gloves and bags will be provided.",
      location: "Juhu Beach, Mumbai",
      distance: 5.8,
      status: "In Progress",
      progress: 65,
      timeSpent: 120,
      comments: [
        {
          id: "c3",
          userId: "admin2",
          userName: "Admin Team",
          userEmail: "support@paryavaran.com",
          isAdmin: true,
          text: "Update: We've collected 350kg so far! Keep up the great work.",
          timestamp: new Date("2026-02-03T11:30:00"),
          isRead: false,
        },
      ],
    },
    {
      id: "3",
      title: "Community Garden Development",
      description:
        "Help establish a community vegetable garden in Andheri. Tasks include soil preparation, bed creation, and initial planting of seasonal vegetables.",
      location: "Andheri West, Mumbai",
      distance: 3.2,
      status: "In Progress",
      progress: 40,
      timeSpent: 90,
      comments: [],
    },
    {
      id: "4",
      title: "E-Waste Collection Drive",
      description:
        "Organize and assist in collecting e-waste from residential areas. Help sort and categorize electronic items for proper recycling.",
      location: "Bandra Complex, Mumbai",
      distance: 4.1,
      status: "Assigned",
      progress: 0,
      timeSpent: 0,
      comments: [
        {
          id: "c4",
          userId: "admin1",
          userName: "Coordinator Patel",
          userEmail: "patel@paryavaran.com",
          isAdmin: true,
          text: "This task will start on Feb 10th. Please confirm your availability.",
          timestamp: new Date("2026-02-01T09:00:00"),
          isRead: true,
        },
      ],
    },
    {
      id: "5",
      title: "Water Conservation Awareness Campaign",
      description:
        "Conduct door-to-door awareness campaign about water conservation techniques. Distribute pamphlets and educate residents.",
      location: "Powai, Mumbai",
      distance: 7.3,
      status: "On Hold",
      progress: 25,
      timeSpent: 60,
      comments: [],
    },
    {
      id: "6",
      title: "School Environmental Workshop",
      description:
        "Conduct interactive workshop for school children about climate change, recycling, and environmental protection.",
      location: "Green Valley School, Mumbai",
      distance: 6.5,
      status: "Assigned",
      progress: 0,
      timeSpent: 0,
      comments: [],
    },
  ]);

  // Modal states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressFormData, setProgressFormData] = useState({
    progress: 0,
    status: "Assigned" as TaskStatus,
    comments: "",
    timeSpent: 0,
  });
  const [progressErrors, setProgressErrors] = useState<{ 
    progress?: string;
    timeSpent?: string;
  }>({});

  // Comments states
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Status badge configuration
  const getStatusBadge = (status: TaskStatus) => {
    const configs = {
      Assigned: { icon: Circle, color: "bg-gray-100 text-gray-700 border-gray-300" },
      "In Progress": { icon: Play, color: "bg-blue-100 text-blue-700 border-blue-300" },
      "On Hold": { icon: PauseCircle, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      Completed: { icon: CheckCircle2, color: "bg-green-100 text-green-700 border-green-300" },
      Cancelled: { icon: XCircle, color: "bg-red-100 text-red-700 border-red-300" },
    };
    const config = configs[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} border`}>
        <Icon className="size-3" />
        {status}
      </Badge>
    );
  };

  // Open progress modal
  const handleOpenProgressModal = (task: Task) => {
    setSelectedTask(task);
    setProgressFormData({
      progress: task.progress,
      status: task.status,
      comments: "",
      timeSpent: task.timeSpent,
    });
    setProgressErrors({});
    setIsProgressModalOpen(true);
  };

  // Validate and save progress
  const handleSaveProgress = () => {
    if (!selectedTask) return;

    const errors: { progress?: string; timeSpent?: string } = {};

    // Validation
    if (progressFormData.progress < 0 || progressFormData.progress > 100) {
      errors.progress = "Progress must be between 0 and 100";
    }

    if (progressFormData.timeSpent < 0) {
      errors.timeSpent = "Time spent cannot be negative";
    } else if (progressFormData.timeSpent < selectedTask.timeSpent) {
      errors.timeSpent = `Time spent cannot decrease (current: ${selectedTask.timeSpent} min)`;
    }

    if (Object.keys(errors).length > 0) {
      setProgressErrors(errors);
      return;
    }

    // Auto-adjust based on status
    let finalProgress = progressFormData.progress;
    if (progressFormData.status === "Completed") {
      finalProgress = 100;
    } else if (progressFormData.status === "Cancelled" || progressFormData.status === "Assigned") {
      finalProgress = 0;
    }

    // Update task
    setTasks((prev) =>
      prev.map((item) =>
        item.id === selectedTask.id
          ? {
              ...item,
              progress: finalProgress,
              status: progressFormData.status,
              timeSpent: progressFormData.timeSpent,
            }
          : item
      )
    );

    // Add progress comment if provided
    if (progressFormData.comments.trim()) {
      const comment: Comment = {
        id: `c${Date.now()}`,
        userId: "user1",
        userName: "Volunteer Bandhu",
        userEmail: "bandhu@paryavaran.com",
        isAdmin: false,
        text: progressFormData.comments,
        timestamp: new Date(),
        isRead: true,
      };

      setTasks((prev) =>
        prev.map((item) =>
          item.id === selectedTask.id
            ? { ...item, comments: [...item.comments, comment] }
            : item
        )
      );
    }

    setIsProgressModalOpen(false);
    setSelectedTask(null);
  };

  // Toggle comments section
  const toggleComments = (taskId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
        // Mark comments as read
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item.id === taskId
              ? {
                  ...item,
                  comments: item.comments.map((comment) => ({
                    ...comment,
                    isRead: true,
                  })),
                }
              : item
          )
        );
      }
      return newSet;
    });
  };

  // Add comment
  const handleAddComment = (taskId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: "user1",
      userName: "Volunteer Bandhu",
      userEmail: "bandhu@paryavaran.com",
      isAdmin: false,
      text: newComment,
      timestamp: new Date(),
      isRead: true,
    };

    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, comments: [...item.comments, comment] } : item
      )
    );

    setNewComment("");
  };

  // Add reply
  const handleAddReply = (taskId: string, parentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `c${Date.now()}`,
      userId: "user1",
      userName: "Volunteer Bandhu",
      userEmail: "bandhu@paryavaran.com",
      isAdmin: false,
      text: replyText,
      timestamp: new Date(),
      parentId,
      isRead: true,
    };

    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, comments: [...item.comments, reply] } : item
      )
    );

    setReplyText("");
    setReplyingTo(null);
  };

  // Update status directly from dropdown
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === taskId) {
          let finalProgress = item.progress;
          if (newStatus === "Completed") {
            finalProgress = 100;
          } else if (newStatus === "Cancelled" || newStatus === "Assigned") {
            finalProgress = 0;
          }
          return { ...item, status: newStatus, progress: finalProgress };
        }
        return item;
      })
    );
  };

  // Get unread comment count
  const getUnreadCount = (comments: Comment[]): number => {
    return comments.filter((c) => !c.isRead).length;
  };

  // Get top-level comments
  const getTopLevelComments = (comments: Comment[]): Comment[] => {
    return comments.filter((c) => !c.parentId);
  };

  // Get replies for a comment
  const getReplies = (comments: Comment[], parentId: string): Comment[] => {
    return comments.filter((c) => c.parentId === parentId);
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
                <p className="text-xs text-green-600 font-medium">Task Management</p>
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
            <Navigation className="size-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Nearby Tasks</h2>
          </div>
          <p className="text-lg text-gray-600">
            Environmental tasks in your area - make an impact today!
          </p>
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          {tasks.map((task) => {
            const unreadCount = getUnreadCount(task.comments);
            const isCommentsExpanded = expandedComments.has(task.id);

            return (
              <Card
                key={task.id}
                className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{task.description}</p>

                        {/* Location and Distance */}
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="size-4 text-green-600" />
                            <span className="text-sm font-medium">{task.location}</span>
                          </div>
                          <Badge className="bg-teal-100 text-teal-700 border-teal-300 border">
                            <Navigation className="size-3" />
                            {task.distance} km away
                          </Badge>
                          {getStatusBadge(task.status)}
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Clock className="size-4" />
                            <span>{task.timeSpent} min spent</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-green-600">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2 bg-gray-200" />
                      <style>{`
                        [data-slot="progress-indicator"] {
                          background: linear-gradient(to right, #22c55e, #16a34a);
                        }
                      `}</style>
                    </div>

                    {/* Status Dropdown and Action Buttons */}
                    <div className="flex flex-wrap gap-3 items-center">
                      <div className="flex-1 min-w-[200px] max-w-xs">
                        <Select
                          value={task.status}
                          onValueChange={(value: TaskStatus) =>
                            handleStatusChange(task.id, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Assigned">Assigned</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={() => handleOpenProgressModal(task)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      >
                        <Play className="size-4 mr-2" />
                        Update Progress
                      </Button>
                      <Button
                        onClick={() => toggleComments(task.id)}
                        variant="outline"
                        className="border-gray-300 relative"
                      >
                        <MessageSquare className="size-4 mr-2" />
                        Comments ({task.comments.length})
                        {unreadCount > 0 && (
                          <Badge className="ml-2 bg-red-500 text-white border-0 px-1.5 py-0 h-5 min-w-5">
                            {unreadCount}
                          </Badge>
                        )}
                        {isCommentsExpanded ? (
                          <ChevronUp className="size-4 ml-2" />
                        ) : (
                          <ChevronDown className="size-4 ml-2" />
                        )}
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {isCommentsExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Comments & Updates
                        </h4>

                        {/* Comment List */}
                        <div className="space-y-4 mb-4">
                          {getTopLevelComments(task.comments).length === 0 ? (
                            <p className="text-gray-500 text-sm italic">
                              No comments yet. Share your progress or ask questions!
                            </p>
                          ) : (
                            getTopLevelComments(task.comments).map((comment) => (
                              <div key={comment.id}>
                                {/* Main Comment */}
                                <div
                                  className={`p-4 rounded-lg ${
                                    comment.isAdmin
                                      ? "bg-blue-50 border-l-4 border-blue-500"
                                      : "bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        comment.isAdmin
                                          ? "bg-blue-600 text-white"
                                          : "bg-green-600 text-white"
                                      }`}
                                    >
                                      {comment.isAdmin ? (
                                        <Shield className="size-5" />
                                      ) : (
                                        <User className="size-5" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-900">
                                          {comment.userName}
                                        </span>
                                        {comment.isAdmin && (
                                          <Badge className="bg-blue-600 text-white border-0 text-xs">
                                            Admin
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600 mb-1">
                                        {comment.userEmail}
                                      </p>
                                      <p className="text-gray-800 mb-2">{comment.text}</p>
                                      <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>
                                          {comment.timestamp.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </span>
                                        <button
                                          onClick={() => setReplyingTo(comment.id)}
                                          className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                                        >
                                          <Reply className="size-3" />
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Reply Form */}
                                  {replyingTo === comment.id && (
                                    <div className="mt-3 ml-13 pl-4 border-l-2 border-gray-300">
                                      <Textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write your reply..."
                                        className="mb-2"
                                        rows={2}
                                      />
                                      <div className="flex gap-2">
                                        <Button
                                          size="sm"
                                          onClick={() => handleAddReply(task.id, comment.id)}
                                          disabled={!replyText.trim()}
                                          className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                          <Send className="size-3 mr-1" />
                                          Send Reply
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setReplyingTo(null);
                                            setReplyText("");
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Replies */}
                                {getReplies(task.comments, comment.id).map((reply) => (
                                  <div key={reply.id} className="ml-13 mt-2">
                                    <div className="p-4 rounded-lg bg-gray-50 border-l-2 border-gray-300">
                                      <div className="flex items-start gap-3">
                                        <div className="size-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                                          <User className="size-4" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-gray-900 text-sm">
                                              {reply.userName}
                                            </span>
                                          </div>
                                          <p className="text-gray-800 text-sm mb-1">
                                            {reply.text}
                                          </p>
                                          <span className="text-xs text-gray-500">
                                            {reply.timestamp.toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))
                          )}
                        </div>

                        {/* Add Comment Form */}
                        <div className="mt-4">
                          <Label className="mb-2 block">Add a comment</Label>
                          <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share updates, ask questions, or provide feedback..."
                            className="mb-2"
                            rows={3}
                          />
                          <Button
                            onClick={() => handleAddComment(task.id)}
                            disabled={!newComment.trim()}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Send className="size-4 mr-2" />
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Update Progress Modal */}
      <Dialog open={isProgressModalOpen} onOpenChange={setIsProgressModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="size-5 text-blue-600" />
              Update Task Progress
            </DialogTitle>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">{selectedTask.title}</h4>
                <p className="text-sm text-gray-600">{selectedTask.location}</p>
              </div>

              {/* Progress Percentage Input */}
              <div>
                <Label htmlFor="progressPercent" className="mb-2 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gray-600" />
                  Progress Percentage (0-100)
                </Label>
                <Input
                  id="progressPercent"
                  type="number"
                  min="0"
                  max="100"
                  value={progressFormData.progress}
                  onChange={(e) => {
                    setProgressFormData({
                      ...progressFormData,
                      progress: parseInt(e.target.value) || 0,
                    });
                    setProgressErrors({ ...progressErrors, progress: undefined });
                  }}
                  className={`${
                    progressErrors.progress ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {progressErrors.progress && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {progressErrors.progress}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Current: {selectedTask.progress}%
                </p>
              </div>

              {/* Time Spent Input */}
              <div>
                <Label htmlFor="timeSpentTask" className="mb-2 flex items-center gap-2">
                  <Clock className="size-4 text-gray-600" />
                  Total Time Spent (minutes)
                </Label>
                <Input
                  id="timeSpentTask"
                  type="number"
                  min="0"
                  value={progressFormData.timeSpent}
                  onChange={(e) => {
                    setProgressFormData({
                      ...progressFormData,
                      timeSpent: parseInt(e.target.value) || 0,
                    });
                    setProgressErrors({ ...progressErrors, timeSpent: undefined });
                  }}
                  className={`${
                    progressErrors.timeSpent ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {progressErrors.timeSpent && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {progressErrors.timeSpent}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Previous: {selectedTask.timeSpent} minutes
                </p>
              </div>

              {/* Status Dropdown */}
              <div>
                <Label htmlFor="taskStatus" className="mb-2 block">
                  Status
                </Label>
                <Select
                  value={progressFormData.status}
                  onValueChange={(value: TaskStatus) =>
                    setProgressFormData({ ...progressFormData, status: value })
                  }
                >
                  <SelectTrigger id="taskStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed (100%)</SelectItem>
                    <SelectItem value="Cancelled">Cancelled (0%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Progress Comments */}
              <div>
                <Label htmlFor="progressComments" className="mb-2 flex items-center gap-2">
                  <FileText className="size-4 text-gray-600" />
                  Progress Notes (Optional)
                </Label>
                <Textarea
                  id="progressComments"
                  value={progressFormData.comments}
                  onChange={(e) =>
                    setProgressFormData({
                      ...progressFormData,
                      comments: e.target.value,
                    })
                  }
                  placeholder="Describe what you accomplished, challenges faced, or next steps..."
                  rows={3}
                />
              </div>

              {/* Visual Progress Display */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 mb-2 font-medium">Preview:</p>
                <div className="flex items-center justify-between">
                  <Progress
                    value={
                      progressFormData.status === "Completed"
                        ? 100
                        : progressFormData.status === "Cancelled" ||
                          progressFormData.status === "Assigned"
                        ? 0
                        : progressFormData.progress
                    }
                    className="flex-1 h-2 bg-blue-200"
                  />
                  <span className="ml-3 text-lg font-bold text-blue-700">
                    {progressFormData.status === "Completed"
                      ? 100
                      : progressFormData.status === "Cancelled" ||
                        progressFormData.status === "Assigned"
                      ? 0
                      : progressFormData.progress}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProgressModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveProgress}
              disabled={Object.keys(progressErrors).length > 0}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="size-4 mr-2" />
              Save Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
    </div>
  );
}
