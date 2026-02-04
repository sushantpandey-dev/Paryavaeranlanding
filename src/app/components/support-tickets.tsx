import { useState } from "react";
import {
  Leaf,
  Plus,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  XCircle,
  ArrowLeft,
  User,
  Shield,
  Send,
  FileText,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

interface SupportTicketsProps {
  onNavigate: (page: string) => void;
}

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  isAdmin: boolean;
  text: string;
  timestamp: Date;
}

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdBy: {
    name: string;
    email: string;
  };
  createdDate: Date;
  comments: Comment[];
}

export function SupportTickets({ onNavigate }: SupportTicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      subject: "Unable to update profile information",
      description:
        "I'm trying to update my phone number and address in my profile, but the changes are not being saved. I've tried multiple times over the past two days.",
      status: "Resolved",
      priority: "Medium",
      createdBy: {
        name: "Volunteer Bandhu",
        email: "bandhu@paryavaran.com",
      },
      createdDate: new Date("2026-01-25T10:30:00"),
      comments: [
        {
          id: "c1",
          userId: "admin1",
          userName: "Support Team",
          userEmail: "support@paryavaran.com",
          isAdmin: true,
          text: "Thank you for reporting this. We've identified the issue and deployed a fix. Please try updating your profile again.",
          timestamp: new Date("2026-01-25T14:20:00"),
        },
        {
          id: "c2",
          userId: "user1",
          userName: "Volunteer Bandhu",
          userEmail: "bandhu@paryavaran.com",
          isAdmin: false,
          text: "It's working now! Thank you for the quick fix.",
          timestamp: new Date("2026-01-25T15:45:00"),
        },
      ],
    },
    {
      id: "TKT-002",
      subject: "Task completion not reflecting in dashboard",
      description:
        "I completed the Beach Cleanup task yesterday, but it's still showing as 'In Progress' in my dashboard. The points haven't been credited either.",
      status: "In Progress",
      priority: "High",
      createdBy: {
        name: "Volunteer Bandhu",
        email: "bandhu@paryavaran.com",
      },
      createdDate: new Date("2026-02-01T09:15:00"),
      comments: [
        {
          id: "c3",
          userId: "admin2",
          userName: "Technical Support",
          userEmail: "tech@paryavaran.com",
          isAdmin: true,
          text: "We're investigating this issue. Can you please provide the exact task ID or name?",
          timestamp: new Date("2026-02-01T11:30:00"),
        },
        {
          id: "c4",
          userId: "user1",
          userName: "Volunteer Bandhu",
          userEmail: "bandhu@paryavaran.com",
          isAdmin: false,
          text: "The task was 'Beach Cleanup - Juhu Beach' with ID: TASK-JB-2026-45",
          timestamp: new Date("2026-02-01T12:00:00"),
        },
        {
          id: "c5",
          userId: "admin2",
          userName: "Technical Support",
          userEmail: "tech@paryavaran.com",
          isAdmin: true,
          text: "Thank you! We're syncing the task completion data now. This should be resolved within the next few hours.",
          timestamp: new Date("2026-02-01T13:15:00"),
        },
      ],
    },
    {
      id: "TKT-003",
      subject: "Referral link not working",
      description:
        "My referral link isn't tracking new sign-ups. I've shared it with 3 friends who registered, but they don't show up in my referrals list.",
      status: "Open",
      priority: "Medium",
      createdBy: {
        name: "Volunteer Bandhu",
        email: "bandhu@paryavaran.com",
      },
      createdDate: new Date("2026-02-03T16:20:00"),
      comments: [],
    },
    {
      id: "TKT-004",
      subject: "Question about reward redemption",
      description:
        "I have 500 points and want to know how I can redeem them. Is there a minimum threshold? What are the available reward options?",
      status: "Closed",
      priority: "Low",
      createdBy: {
        name: "Volunteer Bandhu",
        email: "bandhu@paryavaran.com",
      },
      createdDate: new Date("2026-01-20T11:00:00"),
      comments: [
        {
          id: "c6",
          userId: "admin3",
          userName: "Coordinator Team",
          userEmail: "coordinator@paryavaran.com",
          isAdmin: true,
          text: "You can redeem points starting from 100 points. Please visit the Referral Portal > Rewards tab to see all available options including gift cards, certificates, and environmental merchandise.",
          timestamp: new Date("2026-01-20T14:30:00"),
        },
        {
          id: "c7",
          userId: "user1",
          userName: "Volunteer Bandhu",
          userEmail: "bandhu@paryavaran.com",
          isAdmin: false,
          text: "Perfect, thank you! Found it.",
          timestamp: new Date("2026-01-20T15:00:00"),
        },
      ],
    },
  ]);

  // View states
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Create ticket modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    subject: "",
    description: "",
  });
  const [createFormErrors, setCreateFormErrors] = useState<{
    subject?: string;
    description?: string;
  }>({});

  // Comment state
  const [newComment, setNewComment] = useState("");

  // Status badge configuration
  const getStatusBadge = (status: TicketStatus) => {
    const configs = {
      Open: { icon: Circle, color: "bg-blue-100 text-blue-700 border-blue-300" },
      "In Progress": { icon: Clock, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      Resolved: { icon: CheckCircle2, color: "bg-green-100 text-green-700 border-green-300" },
      Closed: { icon: XCircle, color: "bg-gray-100 text-gray-700 border-gray-300" },
    };
    const config = configs[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} border`}>
        <Icon className="size-3 mr-1" />
        {status}
      </Badge>
    );
  };

  // Priority badge configuration
  const getPriorityBadge = (priority: TicketPriority) => {
    const configs = {
      Low: { color: "bg-gray-100 text-gray-700 border-gray-300" },
      Medium: { color: "bg-blue-100 text-blue-700 border-blue-300" },
      High: { color: "bg-orange-100 text-orange-700 border-orange-300" },
      Urgent: { color: "bg-red-100 text-red-700 border-red-300" },
    };
    const config = configs[priority];
    return (
      <Badge className={`${config.color} border`}>
        <AlertCircle className="size-3 mr-1" />
        {priority}
      </Badge>
    );
  };

  // Open ticket detail
  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCurrentView("detail");
    setNewComment("");
  };

  // Back to list
  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedTicket(null);
    setNewComment("");
  };

  // Create ticket
  const handleCreateTicket = () => {
    const errors: { subject?: string; description?: string } = {};

    if (!createFormData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (createFormData.subject.length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    }

    if (!createFormData.description.trim()) {
      errors.description = "Description is required";
    } else if (createFormData.description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }

    if (Object.keys(errors).length > 0) {
      setCreateFormErrors(errors);
      return;
    }

    // Create new ticket
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: createFormData.subject,
      description: createFormData.description,
      status: "Open",
      priority: "Medium",
      createdBy: {
        name: "Volunteer Bandhu",
        email: "bandhu@paryavaran.com",
      },
      createdDate: new Date(),
      comments: [],
    };

    setTickets([newTicket, ...tickets]);
    setIsCreateModalOpen(false);
    setCreateFormData({ subject: "", description: "" });
    setCreateFormErrors({});
  };

  // Add comment to ticket
  const handleAddComment = () => {
    if (!selectedTicket || !newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: "user1",
      userName: "Volunteer Bandhu",
      userEmail: "bandhu@paryavaran.com",
      isAdmin: false,
      text: newComment,
      timestamp: new Date(),
    };

    const updatedTicket = {
      ...selectedTicket,
      comments: [...selectedTicket.comments, comment],
    };

    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket))
    );

    setSelectedTicket(updatedTicket);
    setNewComment("");
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
                <p className="text-xs text-green-600 font-medium">Support Tickets</p>
              </div>
            </div>
            {currentView === "list" ? (
              <Button
                onClick={() => onNavigate("bandhu-dashboard")}
                variant="outline"
                className="border-gray-300"
              >
                ← Back to Dashboard
              </Button>
            ) : (
              <Button
                onClick={handleBackToList}
                variant="outline"
                className="border-gray-300"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back to Tickets
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "list" ? (
          <>
            {/* Page Heading */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="size-8 text-green-600" />
                  <h2 className="text-4xl font-bold text-gray-900">Support Tickets</h2>
                </div>
                <p className="text-lg text-gray-600">
                  Get help with any issues or questions you have
                </p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                <Plus className="size-4 mr-2" />
                Create New Ticket
              </Button>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {tickets.length === 0 ? (
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="size-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No tickets yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create your first support ticket to get help from our team
                    </p>
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Plus className="size-4 mr-2" />
                      Create New Ticket
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                tickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleViewTicket(ticket)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-500">
                                  {ticket.id}
                                </span>
                                {getStatusBadge(ticket.status)}
                                {getPriorityBadge(ticket.priority)}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {ticket.subject}
                              </h3>
                              <p className="text-gray-600 line-clamp-2">
                                {ticket.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="size-4" />
                              <span>
                                {ticket.createdDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MessageSquare className="size-4" />
                              <span>{ticket.comments.length} comments</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        ) : (
          selectedTicket && (
            <>
              {/* Ticket Detail View */}
              <div className="space-y-6">
                {/* Ticket Information Card */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            {selectedTicket.id}
                          </span>
                          {getStatusBadge(selectedTicket.status)}
                          {getPriorityBadge(selectedTicket.priority)}
                        </div>
                        <CardTitle className="text-2xl">{selectedTicket.subject}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Created By Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Created by</p>
                          <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                              <User className="size-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedTicket.createdBy.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedTicket.createdBy.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Created on</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="size-5 text-gray-400" />
                            <p className="font-medium text-gray-900">
                              {selectedTicket.createdDate.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <FileText className="size-5 text-gray-600" />
                        Description
                      </h4>
                      <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
                        {selectedTicket.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments Section */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="size-5 text-green-600" />
                      Comments & Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Comments List */}
                    <div className="space-y-4">
                      {selectedTicket.comments.length === 0 ? (
                        <p className="text-gray-500 text-center py-8 italic">
                          No comments yet. Add a comment to start the conversation.
                        </p>
                      ) : (
                        selectedTicket.comments.map((comment) => (
                          <div
                            key={comment.id}
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
                                      Support Team
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {comment.userEmail}
                                </p>
                                <p className="text-gray-800 mb-2">{comment.text}</p>
                                <span className="text-xs text-gray-500">
                                  {comment.timestamp.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Form */}
                    <div className="border-t border-gray-200 pt-6">
                      <Label className="mb-2 block font-semibold">Add a comment</Label>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Type your question, update, or response..."
                        className="mb-3"
                        rows={4}
                      />
                      <Button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Send className="size-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )
        )}
      </main>

      {/* Create Ticket Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="size-5 text-green-600" />
              Create New Support Ticket
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Subject Input */}
            <div>
              <Label htmlFor="ticketSubject" className="mb-2 block">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ticketSubject"
                value={createFormData.subject}
                onChange={(e) => {
                  setCreateFormData({ ...createFormData, subject: e.target.value });
                  setCreateFormErrors({ ...createFormErrors, subject: undefined });
                }}
                placeholder="Brief summary of your issue..."
                className={createFormErrors.subject ? "border-red-500" : ""}
              />
              {createFormErrors.subject && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {createFormErrors.subject}
                </p>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <Label htmlFor="ticketDescription" className="mb-2 block">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="ticketDescription"
                value={createFormData.description}
                onChange={(e) => {
                  setCreateFormData({ ...createFormData, description: e.target.value });
                  setCreateFormErrors({ ...createFormErrors, description: undefined });
                }}
                placeholder="Provide detailed information about your issue or question..."
                rows={6}
                className={createFormErrors.description ? "border-red-500" : ""}
              />
              {createFormErrors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="size-4" />
                  {createFormErrors.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Minimum 20 characters. Be as specific as possible.
              </p>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Your ticket will be:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Created with "Open" status</li>
                    <li>Assigned Medium priority by default</li>
                    <li>Reviewed by our support team within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false);
                setCreateFormData({ subject: "", description: "" });
                setCreateFormErrors({});
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTicket}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="size-4 mr-2" />
              Submit Ticket
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
