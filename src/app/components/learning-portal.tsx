import { useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Clock,
  MessageSquare,
  Leaf,
  Play,
  CheckCircle2,
  PauseCircle,
  XCircle,
  Circle,
  Send,
  Reply,
  User,
  Shield,
  ChevronDown,
  ChevronUp,
  AlertCircle,
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
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface LearningPortalProps {
  onNavigate: (page: string) => void;
}

type ContentType = "Video" | "Document";
type Status = "Not Started" | "In Progress" | "On Hold" | "Completed" | "Cancelled";

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

interface LearningContent {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  duration: number; // in minutes
  status: Status;
  timeSpent: number; // in minutes
  thumbnail?: string;
  comments: Comment[];
}

export function LearningPortal({ onNavigate }: LearningPortalProps) {
  const [learningContent, setLearningContent] = useState<LearningContent[]>([
    {
      id: "1",
      title: "Introduction to Climate Change",
      description: "Learn the basics of climate change, its causes, and impacts on our planet.",
      type: "Video",
      duration: 45,
      status: "Completed",
      timeSpent: 45,
      thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
      comments: [
        {
          id: "c1",
          userId: "admin1",
          userName: "Dr. Sharma",
          userEmail: "admin@paryavaran.com",
          isAdmin: true,
          text: "Great course! Remember to check out the additional resources in the description.",
          timestamp: new Date("2026-02-01T10:30:00"),
          isRead: true,
        },
        {
          id: "c2",
          userId: "user1",
          userName: "Volunteer Bandhu",
          userEmail: "bandhu@paryavaran.com",
          isAdmin: false,
          text: "Very informative! The graphics really helped me understand the concepts.",
          timestamp: new Date("2026-02-02T14:15:00"),
          isRead: true,
        },
      ],
    },
    {
      id: "2",
      title: "Sustainable Living Practices",
      description: "Discover practical ways to reduce your carbon footprint in daily life.",
      type: "Document",
      duration: 30,
      status: "In Progress",
      timeSpent: 20,
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
      comments: [],
    },
    {
      id: "3",
      title: "Water Conservation Techniques",
      description: "Essential strategies for conserving water at home and in your community.",
      type: "Video",
      duration: 60,
      status: "In Progress",
      timeSpent: 30,
      thumbnail: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=400&h=250&fit=crop",
      comments: [
        {
          id: "c3",
          userId: "admin2",
          userName: "Admin Team",
          userEmail: "support@paryavaran.com",
          isAdmin: true,
          text: "New quiz added at the end of this module!",
          timestamp: new Date("2026-02-03T09:00:00"),
          isRead: false,
        },
      ],
    },
    {
      id: "4",
      title: "Renewable Energy Fundamentals",
      description: "Understanding solar, wind, and other renewable energy sources.",
      type: "Video",
      duration: 50,
      status: "Not Started",
      timeSpent: 0,
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
      comments: [],
    },
    {
      id: "5",
      title: "Biodiversity and Ecosystems",
      description: "Learn about the importance of biodiversity and ecosystem preservation.",
      type: "Document",
      duration: 40,
      status: "On Hold",
      timeSpent: 15,
      thumbnail: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=250&fit=crop",
      comments: [],
    },
    {
      id: "6",
      title: "Waste Management & Recycling",
      description: "Best practices for waste segregation, recycling, and composting.",
      type: "Video",
      duration: 35,
      status: "Not Started",
      timeSpent: 0,
      thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop",
      comments: [],
    },
  ]);

  // Modal states
  const [selectedContent, setSelectedContent] = useState<LearningContent | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressFormData, setProgressFormData] = useState({
    timeSpent: 0,
    status: "Not Started" as Status,
  });
  const [progressErrors, setProgressErrors] = useState<{ timeSpent?: string }>({});

  // Comments states
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Calculate progress percentage
  const calculateProgress = (content: LearningContent): number => {
    if (content.status === "Completed") return 100;
    if (content.status === "Cancelled") return 0;
    if (content.status === "Not Started") return 0;
    return Math.min(Math.round((content.timeSpent / content.duration) * 100), 100);
  };

  // Status badge configuration
  const getStatusBadge = (status: Status) => {
    const configs = {
      "Not Started": { icon: Circle, color: "bg-gray-100 text-gray-700 border-gray-300" },
      "In Progress": { icon: Play, color: "bg-blue-100 text-blue-700 border-blue-300" },
      "On Hold": { icon: PauseCircle, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      "Completed": { icon: CheckCircle2, color: "bg-green-100 text-green-700 border-green-300" },
      "Cancelled": { icon: XCircle, color: "bg-red-100 text-red-700 border-red-300" },
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

  // Type badge configuration
  const getTypeBadge = (type: ContentType) => {
    if (type === "Video") {
      return (
        <Badge className="bg-purple-100 text-purple-700 border-purple-300 border">
          <Video className="size-3" />
          Video
        </Badge>
      );
    }
    return (
      <Badge className="bg-orange-100 text-orange-700 border-orange-300 border">
        <FileText className="size-3" />
        Document
      </Badge>
    );
  };

  // Open progress modal
  const handleOpenProgressModal = (content: LearningContent) => {
    setSelectedContent(content);
    setProgressFormData({
      timeSpent: content.timeSpent,
      status: content.status,
    });
    setProgressErrors({});
    setIsProgressModalOpen(true);
  };

  // Validate and save progress
  const handleSaveProgress = () => {
    if (!selectedContent) return;

    const errors: { timeSpent?: string } = {};

    // Validation
    if (progressFormData.timeSpent < 0) {
      errors.timeSpent = "Time spent cannot be negative";
    } else if (progressFormData.timeSpent > selectedContent.duration) {
      errors.timeSpent = `Time spent cannot exceed ${selectedContent.duration} minutes`;
    } else if (progressFormData.timeSpent < selectedContent.timeSpent) {
      errors.timeSpent = `Time spent cannot decrease (current: ${selectedContent.timeSpent} min)`;
    }

    if (Object.keys(errors).length > 0) {
      setProgressErrors(errors);
      return;
    }

    // Calculate new percentage
    let newStatus = progressFormData.status;
    let newTimeSpent = progressFormData.timeSpent;

    // Auto-adjust based on status
    if (newStatus === "Completed") {
      newTimeSpent = selectedContent.duration;
    } else if (newStatus === "Cancelled" || newStatus === "Not Started") {
      newTimeSpent = 0;
    }

    // Update content
    setLearningContent((prev) =>
      prev.map((item) =>
        item.id === selectedContent.id
          ? { ...item, timeSpent: newTimeSpent, status: newStatus }
          : item
      )
    );

    setIsProgressModalOpen(false);
    setSelectedContent(null);
  };

  // Toggle comments section
  const toggleComments = (contentId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(contentId)) {
        newSet.delete(contentId);
      } else {
        newSet.add(contentId);
        // Mark comments as read
        setLearningContent((prevContent) =>
          prevContent.map((item) =>
            item.id === contentId
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
  const handleAddComment = (contentId: string) => {
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

    setLearningContent((prev) =>
      prev.map((item) =>
        item.id === contentId
          ? { ...item, comments: [...item.comments, comment] }
          : item
      )
    );

    setNewComment("");
  };

  // Add reply
  const handleAddReply = (contentId: string, parentId: string) => {
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

    setLearningContent((prev) =>
      prev.map((item) =>
        item.id === contentId
          ? { ...item, comments: [...item.comments, reply] }
          : item
      )
    );

    setReplyText("");
    setReplyingTo(null);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
                <p className="text-xs text-green-600 font-medium">Learning Portal</p>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Learning Portal</h2>
          <p className="text-lg text-gray-600">
            Expand your knowledge on environmental topics and track your progress
          </p>
        </div>

        {/* Learning Content List */}
        <div className="space-y-6">
          {learningContent.map((content) => {
            const progress = calculateProgress(content);
            const unreadCount = getUnreadCount(content.comments);
            const isCommentsExpanded = expandedComments.has(content.id);

            return (
              <Card
                key={content.id}
                className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100">
                        {content.thumbnail ? (
                          <ImageWithFallback
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
                            <BookOpen className="size-12 text-green-600" />
                          </div>
                        )}
                        {/* Type badge overlay */}
                        <div className="absolute top-2 right-2">
                          {getTypeBadge(content.type)}
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {content.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{content.description}</p>
                          <div className="flex flex-wrap items-center gap-3">
                            {getStatusBadge(content.status)}
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Clock className="size-4" />
                              <span>{content.duration} minutes</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-green-600">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-gray-200" />
                        <style>{`
                          [data-slot="progress-indicator"] {
                            background: linear-gradient(to right, #22c55e, #16a34a);
                          }
                        `}</style>
                        <p className="text-xs text-gray-500 mt-1">
                          {content.timeSpent} of {content.duration} minutes completed
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => handleOpenProgressModal(content)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                        >
                          <Play className="size-4 mr-2" />
                          Update Progress
                        </Button>
                        <Button
                          onClick={() => toggleComments(content.id)}
                          variant="outline"
                          className="border-gray-300 relative"
                        >
                          <MessageSquare className="size-4 mr-2" />
                          Comments ({content.comments.length})
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
                            Comments & Discussion
                          </h4>

                          {/* Comment List */}
                          <div className="space-y-4 mb-4">
                            {getTopLevelComments(content.comments).length === 0 ? (
                              <p className="text-gray-500 text-sm italic">
                                No comments yet. Be the first to share your thoughts!
                              </p>
                            ) : (
                              getTopLevelComments(content.comments).map((comment) => (
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
                                            onClick={() =>
                                              handleAddReply(content.id, comment.id)
                                            }
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
                                  {getReplies(content.comments, comment.id).map((reply) => (
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
                              placeholder="Share your thoughts, questions, or insights..."
                              className="mb-2"
                              rows={3}
                            />
                            <Button
                              onClick={() => handleAddComment(content.id)}
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
              Update Progress
            </DialogTitle>
          </DialogHeader>

          {selectedContent && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {selectedContent.title}
                </h4>
                <p className="text-sm text-gray-600">
                  Total Duration: {selectedContent.duration} minutes
                </p>
              </div>

              {/* Time Spent Input */}
              <div>
                <Label htmlFor="timeSpent" className="mb-2 flex items-center gap-2">
                  <Clock className="size-4 text-gray-600" />
                  Time Spent (minutes)
                </Label>
                <Input
                  id="timeSpent"
                  type="number"
                  min="0"
                  max={selectedContent.duration}
                  value={progressFormData.timeSpent}
                  onChange={(e) => {
                    setProgressFormData({
                      ...progressFormData,
                      timeSpent: parseInt(e.target.value) || 0,
                    });
                    setProgressErrors({});
                  }}
                  className={`${
                    progressErrors.timeSpent
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
                {progressErrors.timeSpent && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="size-4" />
                    {progressErrors.timeSpent}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Previous: {selectedContent.timeSpent} minutes
                </p>
              </div>

              {/* Status Dropdown */}
              <div>
                <Label htmlFor="status" className="mb-2 block">
                  Status
                </Label>
                <Select
                  value={progressFormData.status}
                  onValueChange={(value: Status) =>
                    setProgressFormData({ ...progressFormData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started (0%)</SelectItem>
                    <SelectItem value="In Progress">
                      In Progress (Based on time spent)
                    </SelectItem>
                    <SelectItem value="On Hold">
                      On Hold (Maintains current %)
                    </SelectItem>
                    <SelectItem value="Completed">Completed (100%)</SelectItem>
                    <SelectItem value="Cancelled">Cancelled (0%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Calculated Percentage Display */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 mb-2 font-medium">
                  Calculated Progress:
                </p>
                <div className="flex items-center justify-between">
                  <Progress
                    value={
                      progressFormData.status === "Completed"
                        ? 100
                        : progressFormData.status === "Cancelled" ||
                          progressFormData.status === "Not Started"
                        ? 0
                        : Math.min(
                            Math.round(
                              (progressFormData.timeSpent / selectedContent.duration) * 100
                            ),
                            100
                          )
                    }
                    className="flex-1 h-2 bg-blue-200"
                  />
                  <span className="ml-3 text-lg font-bold text-blue-700">
                    {progressFormData.status === "Completed"
                      ? 100
                      : progressFormData.status === "Cancelled" ||
                        progressFormData.status === "Not Started"
                      ? 0
                      : Math.min(
                          Math.round(
                            (progressFormData.timeSpent / selectedContent.duration) * 100
                          ),
                          100
                        )}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProgressModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProgress}
              disabled={Object.keys(progressErrors).length > 0}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <CheckCircle2 className="size-4 mr-2" />
              Save Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
    </div>
  );
}
