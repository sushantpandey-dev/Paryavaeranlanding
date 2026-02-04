import { useState } from "react";
import {
  Leaf,
  LifeBuoy,
  Mail,
  HelpCircle,
  Filter,
  ArrowLeft,
  Send,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  MessageSquare,
  Clock,
  User,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";

interface SupportManagementProps {
  onNavigate: (page: string) => void;
}

type Tab = "tickets" | "emails" | "faqs";
type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

interface Ticket {
  id: string;
  subject: string;
  userName: string;
  userEmail: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdDate: string;
  description: string;
  unreadComments: number;
}

interface Comment {
  id: number;
  author: string;
  isAdmin: boolean;
  message: string;
  timestamp: string;
}

interface NotificationEmail {
  id: number;
  email: string;
  isActive: boolean;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  orderSequence: number;
  isActive: boolean;
}

export function SupportManagement({ onNavigate }: SupportManagementProps) {
  const [activeTab, setActiveTab] = useState<Tab>("tickets");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");

  // Tickets data
  const [tickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      subject: "Unable to submit referral",
      userName: "Amit Kumar",
      userEmail: "amit.k@example.com",
      status: "Open",
      priority: "High",
      createdDate: "2024-02-03",
      description: "I'm trying to submit a lead referral but the form keeps showing an error message.",
      unreadComments: 2,
    },
    {
      id: "TKT-002",
      subject: "Reward points not credited",
      userName: "Priya Sharma",
      userEmail: "priya.s@example.com",
      status: "In Progress",
      priority: "Medium",
      createdDate: "2024-02-02",
      description: "I completed a task 3 days ago but the reward points haven't been added to my account.",
      unreadComments: 0,
    },
    {
      id: "TKT-003",
      subject: "Cannot access learning module",
      userName: "Raj Patel",
      userEmail: "raj.p@example.com",
      status: "Resolved",
      priority: "Low",
      createdDate: "2024-02-01",
      description: "The 'Water Conservation' module is not loading when I click on it.",
      unreadComments: 0,
    },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Amit Kumar",
      isAdmin: false,
      message: "I've tried multiple times but still getting the same error.",
      timestamp: "2024-02-03 10:30 AM",
    },
    {
      id: 2,
      author: "Admin Support",
      isAdmin: true,
      message: "We're looking into this issue. Can you please share a screenshot of the error?",
      timestamp: "2024-02-03 11:15 AM",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  // Notification Emails
  const [emails, setEmails] = useState<NotificationEmail[]>([
    { id: 1, email: "admin@paryavaranbandhu.org", isActive: true },
    { id: 2, email: "support@paryavaranbandhu.org", isActive: true },
    { id: 3, email: "notifications@paryavaranbandhu.org", isActive: false },
  ]);

  const [editingEmail, setEditingEmail] = useState<number | null>(null);
  const [emailForm, setEmailForm] = useState({ email: "", isActive: true });
  const [showEmailForm, setShowEmailForm] = useState(false);

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "How do I earn reward points?",
      answer: "You can earn reward points by completing learning modules, finishing environmental tasks, and successfully referring new Bandhus or leads.",
      category: "Rewards",
      orderSequence: 1,
      isActive: true,
    },
    {
      id: 2,
      question: "What is the referral process?",
      answer: "To refer someone, go to the Referrals section, click 'Add Referral', fill in their details, and submit. Once verified by admin, you'll receive your reward points.",
      category: "Referrals",
      orderSequence: 2,
      isActive: true,
    },
    {
      id: 3,
      question: "How long does task verification take?",
      answer: "Task verification typically takes 1-2 business days. You'll receive a notification once your task submission is reviewed.",
      category: "Tasks",
      orderSequence: 3,
      isActive: true,
    },
  ]);

  const [editingFaq, setEditingFaq] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "",
    orderSequence: 0,
    isActive: true,
  });
  const [showFaqForm, setShowFaqForm] = useState(false);

  // Ticket functions
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Admin Support",
      isAdmin: true,
      message: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleUpdateTicketStatus = (status: TicketStatus) => {
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, status });
    }
  };

  const handleUpdateTicketPriority = (priority: TicketPriority) => {
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, priority });
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch = statusFilter === "All" || ticket.status === statusFilter;
    const priorityMatch = priorityFilter === "All" || ticket.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Email functions
  const handleAddEmail = () => {
    setShowEmailForm(true);
    setEditingEmail(null);
    setEmailForm({ email: "", isActive: true });
  };

  const handleEditEmail = (email: NotificationEmail) => {
    setEditingEmail(email.id);
    setEmailForm({ email: email.email, isActive: email.isActive });
    setShowEmailForm(true);
  };

  const handleSaveEmail = () => {
    if (!emailForm.email.trim()) return;

    if (editingEmail) {
      setEmails(
        emails.map((e) =>
          e.id === editingEmail ? { ...e, email: emailForm.email, isActive: emailForm.isActive } : e
        )
      );
    } else {
      const newEmail: NotificationEmail = {
        id: emails.length + 1,
        email: emailForm.email,
        isActive: emailForm.isActive,
      };
      setEmails([...emails, newEmail]);
    }

    setShowEmailForm(false);
    setEditingEmail(null);
    setEmailForm({ email: "", isActive: true });
  };

  const handleCancelEmail = () => {
    setShowEmailForm(false);
    setEditingEmail(null);
    setEmailForm({ email: "", isActive: true });
  };

  const handleToggleEmailStatus = (id: number) => {
    setEmails(emails.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e)));
  };

  const handleDeleteEmail = (id: number) => {
    setEmails(emails.filter((e) => e.id !== id));
  };

  // FAQ functions
  const handleAddFaq = () => {
    setShowFaqForm(true);
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "", category: "", orderSequence: faqs.length + 1, isActive: true });
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq.id);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      orderSequence: faq.orderSequence,
      isActive: faq.isActive,
    });
    setShowFaqForm(true);
  };

  const handleSaveFaq = () => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

    if (editingFaq) {
      setFaqs(
        faqs.map((f) =>
          f.id === editingFaq
            ? {
                ...f,
                question: faqForm.question,
                answer: faqForm.answer,
                category: faqForm.category,
                orderSequence: faqForm.orderSequence,
                isActive: faqForm.isActive,
              }
            : f
        )
      );
    } else {
      const newFaq: FAQ = {
        id: faqs.length + 1,
        ...faqForm,
      };
      setFaqs([...faqs, newFaq]);
    }

    setShowFaqForm(false);
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "", category: "", orderSequence: 0, isActive: true });
  };

  const handleCancelFaq = () => {
    setShowFaqForm(false);
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "", category: "", orderSequence: 0, isActive: true });
  };

  const handleDeleteFaq = (id: number) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const getStatusBadge = (status: TicketStatus) => {
    const colors = {
      Open: "bg-blue-100 text-blue-700 border-blue-200",
      "In Progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
      Resolved: "bg-green-100 text-green-700 border-green-200",
      Closed: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
      <Badge variant="outline" className={`${colors[status]} border`}>
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: TicketPriority) => {
    const colors = {
      Low: "bg-gray-100 text-gray-700 border-gray-200",
      Medium: "bg-blue-100 text-blue-700 border-blue-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Urgent: "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <Badge variant="outline" className={`${colors[priority]} border`}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("admin-dashboard")}
              className="hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <Leaf className="w-8 h-8" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Support Management</h1>
              <p className="text-blue-100">Manage tickets, notifications, and FAQs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => {
              setActiveTab("tickets");
              setSelectedTicket(null);
            }}
            className={`flex items-center gap-2 ${
              activeTab === "tickets"
                ? "bg-blue-600 text-white"
                : "bg-white/70 text-gray-700 hover:bg-white"
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            Tickets
          </Button>
          <Button
            onClick={() => setActiveTab("emails")}
            className={`flex items-center gap-2 ${
              activeTab === "emails"
                ? "bg-blue-600 text-white"
                : "bg-white/70 text-gray-700 hover:bg-white"
            }`}
          >
            <Mail className="w-4 h-4" />
            Notification Emails
          </Button>
          <Button
            onClick={() => setActiveTab("faqs")}
            className={`flex items-center gap-2 ${
              activeTab === "faqs"
                ? "bg-blue-600 text-white"
                : "bg-white/70 text-gray-700 hover:bg-white"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            FAQs
          </Button>
        </div>

        {/* Tickets Tab */}
        {activeTab === "tickets" && !selectedTicket && (
          <div className="space-y-6">
            {/* Filters */}
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>All</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>All</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket List */}
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-blue-600" />
                  Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-blue-600">{ticket.id}</span>
                            <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                            {ticket.unreadComments > 0 && (
                              <Badge className="bg-red-100 text-red-700 border-red-200 border">
                                {ticket.unreadComments} new
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{ticket.userName}</span>
                            <span>•</span>
                            <span>{ticket.userEmail}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {ticket.createdDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredTickets.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <LifeBuoy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No tickets found matching your filters.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ticket Detail */}
        {activeTab === "tickets" && selectedTicket && (
          <div className="space-y-6">
            {/* Back Button */}
            <Button
              onClick={() => setSelectedTicket(null)}
              variant="outline"
              className="bg-white/70"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tickets
            </Button>

            {/* Ticket Information */}
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-blue-600" />
                  Ticket Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket ID</label>
                    <p className="text-lg font-semibold text-blue-600">{selectedTicket.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                    <p className="text-gray-900">{selectedTicket.createdDate}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedTicket.subject}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                    <p className="text-gray-900">{selectedTicket.userName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                    <p className="text-gray-900">{selectedTicket.userEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleUpdateTicketStatus(e.target.value as TicketStatus)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={selectedTicket.priority}
                      onChange={(e) => handleUpdateTicketPriority(e.target.value as TicketPriority)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedTicket.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Comment Thread */}
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-lg ${
                        comment.isAdmin
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "bg-gray-50 border-l-4 border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {comment.isAdmin ? (
                          <Shield className="w-4 h-4 text-blue-600" />
                        ) : (
                          <User className="w-4 h-4 text-gray-600" />
                        )}
                        <span className="font-semibold text-gray-900">{comment.author}</span>
                        {comment.isAdmin && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 border text-xs">
                            Admin
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500 ml-auto">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{comment.message}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Comment</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your response here..."
                    className="mb-3"
                    rows={4}
                  />
                  <Button onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notification Emails Tab */}
        {activeTab === "emails" && (
          <div className="space-y-6">
            {/* Add Email Button */}
            {!showEmailForm && (
              <Button onClick={handleAddEmail} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Email
              </Button>
            )}

            {/* Email Form */}
            {showEmailForm && (
              <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    {editingEmail ? "Edit Email" : "Add Email"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={emailForm.isActive}
                      onCheckedChange={(checked) => setEmailForm({ ...emailForm, isActive: checked })}
                    />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSaveEmail} className="bg-green-600 hover:bg-green-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancelEmail} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Email List */}
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Notification Emails
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Email Address</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-right py-4 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emails.map((email) => (
                        <tr key={email.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-900">{email.email}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={email.isActive}
                                onCheckedChange={() => handleToggleEmailStatus(email.id)}
                              />
                              <Badge
                                className={`${
                                  email.isActive
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                } border`}
                              >
                                {email.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditEmail(email)}
                                className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteEmail(email.id)}
                                className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {emails.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No notification emails configured.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === "faqs" && (
          <div className="space-y-6">
            {/* Add FAQ Button */}
            {!showFaqForm && (
              <Button onClick={handleAddFaq} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            )}

            {/* FAQ Form */}
            {showFaqForm && (
              <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    {editingFaq ? "Edit FAQ" : "Add FAQ"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      placeholder="Enter the question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      placeholder="Enter the answer"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <Input
                        value={faqForm.category}
                        onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                        placeholder="e.g., Rewards, Tasks, Referrals"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Sequence</label>
                      <Input
                        type="number"
                        value={faqForm.orderSequence}
                        onChange={(e) => setFaqForm({ ...faqForm, orderSequence: Number(e.target.value) })}
                        placeholder="1"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={faqForm.isActive}
                      onCheckedChange={(checked) => setFaqForm({ ...faqForm, isActive: checked })}
                    />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSaveFaq} className="bg-green-600 hover:bg-green-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancelFaq} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FAQ List */}
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs
                    .sort((a, b) => a.orderSequence - b.orderSequence)
                    .map((faq) => (
                      <div key={faq.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {faq.category && (
                                <Badge className="bg-purple-100 text-purple-700 border-purple-200 border">
                                  {faq.category}
                                </Badge>
                              )}
                              <Badge
                                className={`${
                                  faq.isActive
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                } border`}
                              >
                                {faq.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <span className="text-sm text-gray-500">Order: {faq.orderSequence}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-2">{faq.question}</h3>
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditFaq(faq)}
                            className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}

                  {faqs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No FAQs available.</p>
                      <p className="text-sm mt-2">Add a new FAQ to get started.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
