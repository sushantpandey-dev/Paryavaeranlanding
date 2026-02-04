import { useState } from "react";
import {
  Leaf,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Gift,
  Filter,
  AlertTriangle,
  UserPlus,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface ReferralManagementProps {
  onNavigate: (page: string) => void;
}

interface Referral {
  id: number;
  referrerId: number;
  referrerName: string;
  referredName: string;
  referredEmail: string;
  referredPhone: string;
  referredCity: string;
  referralType: "Bandhu" | "Lead";
  status: "Submitted" | "Under Review" | "Approved" | "Rejected" | "Rewarded";
  submissionDate: string;
  rewardAmount: number;
  rejectionReason?: string;
  isDuplicate?: boolean;
}

export function ReferralManagement({ onNavigate }: ReferralManagementProps) {
  // Mock referral data
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 1,
      referrerId: 1,
      referrerName: "Priya Sharma",
      referredName: "Aman Gupta",
      referredEmail: "aman.gupta@example.com",
      referredPhone: "+91 98765 11111",
      referredCity: "Mumbai",
      referralType: "Bandhu",
      status: "Submitted",
      submissionDate: "2025-02-04",
      rewardAmount: 500,
    },
    {
      id: 2,
      referrerId: 2,
      referrerName: "Rahul Kumar",
      referredName: "Sneha Patel",
      referredEmail: "sneha.patel@example.com",
      referredPhone: "+91 98765 22222",
      referredCity: "Delhi",
      referralType: "Lead",
      status: "Under Review",
      submissionDate: "2025-02-03",
      rewardAmount: 1000,
    },
    {
      id: 3,
      referrerId: 3,
      referrerName: "Anjali Verma",
      referredName: "Vikram Singh",
      referredEmail: "vikram.singh@example.com",
      referredPhone: "+91 98765 33333",
      referredCity: "Bangalore",
      referralType: "Bandhu",
      status: "Approved",
      submissionDate: "2025-02-02",
      rewardAmount: 500,
    },
    {
      id: 4,
      referrerId: 4,
      referrerName: "Amit Patel",
      referredName: "Pooja Reddy",
      referredEmail: "pooja.reddy@example.com",
      referredPhone: "+91 98765 44444",
      referredCity: "Hyderabad",
      referralType: "Lead",
      status: "Rewarded",
      submissionDate: "2025-01-30",
      rewardAmount: 1000,
    },
    {
      id: 5,
      referrerId: 5,
      referrerName: "Neha Desai",
      referredName: "Karan Mehta",
      referredEmail: "karan.mehta@example.com",
      referredPhone: "+91 98765 55555",
      referredCity: "Pune",
      referralType: "Bandhu",
      status: "Rejected",
      submissionDate: "2025-01-28",
      rewardAmount: 500,
      rejectionReason: "Referral does not meet eligibility criteria",
    },
    {
      id: 6,
      referrerId: 1,
      referrerName: "Priya Sharma",
      referredName: "Rohit Joshi",
      referredEmail: "rohit.joshi@example.com",
      referredPhone: "+91 98765 66666",
      referredCity: "Mumbai",
      referralType: "Bandhu",
      status: "Submitted",
      submissionDate: "2025-02-03",
      rewardAmount: 500,
    },
    {
      id: 7,
      referrerId: 6,
      referrerName: "Vikram Singh",
      referredName: "Meera Sharma",
      referredEmail: "meera.sharma@example.com",
      referredPhone: "+91 98765 77777",
      referredCity: "Chennai",
      referralType: "Lead",
      status: "Under Review",
      submissionDate: "2025-02-01",
      rewardAmount: 1000,
    },
    {
      id: 8,
      referrerId: 7,
      referrerName: "Pooja Reddy",
      referredName: "Arjun Nair",
      referredEmail: "aman.gupta@example.com",
      referredPhone: "+91 98765 88888",
      referredCity: "Kochi",
      referralType: "Bandhu",
      status: "Submitted",
      submissionDate: "2025-02-04",
      rewardAmount: 500,
      isDuplicate: true,
    },
    {
      id: 9,
      referrerId: 2,
      referrerName: "Rahul Kumar",
      referredName: "Divya Kapoor",
      referredEmail: "divya.kapoor@example.com",
      referredPhone: "+91 98765 99999",
      referredCity: "Jaipur",
      referralType: "Lead",
      status: "Approved",
      submissionDate: "2025-01-25",
      rewardAmount: 1000,
    },
    {
      id: 10,
      referrerId: 8,
      referrerName: "Sanjay Gupta",
      referredName: "Riya Agarwal",
      referredEmail: "riya.agarwal@example.com",
      referredPhone: "+91 98765 00000",
      referredCity: "Lucknow",
      referralType: "Bandhu",
      status: "Rewarded",
      submissionDate: "2025-01-20",
      rewardAmount: 500,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Calculate statistics
  const totalReferrals = referrals.length;
  const pendingReview = referrals.filter(r => r.status === "Submitted" || r.status === "Under Review").length;
  const approved = referrals.filter(r => r.status === "Approved" || r.status === "Rewarded").length;
  const rejected = referrals.filter(r => r.status === "Rejected").length;
  const totalRewards = referrals
    .filter(r => r.status === "Rewarded")
    .reduce((sum, r) => sum + r.rewardAmount, 0);

  // Filter referrals
  const filteredReferrals = referrals.filter((referral) => {
    if (statusFilter !== "All" && referral.status !== statusFilter) return false;
    if (typeFilter !== "All" && referral.referralType !== typeFilter) return false;
    if (dateFrom && referral.submissionDate < dateFrom) return false;
    if (dateTo && referral.submissionDate > dateTo) return false;
    return true;
  });

  const handleMarkUnderReview = (referralId: number) => {
    setReferrals((prev) =>
      prev.map((ref) =>
        ref.id === referralId ? { ...ref, status: "Under Review" as const } : ref
      )
    );
  };

  const handleApprove = (referralId: number) => {
    setReferrals((prev) =>
      prev.map((ref) =>
        ref.id === referralId ? { ...ref, status: "Approved" as const } : ref
      )
    );
  };

  const handleOpenRejectModal = (referral: Referral) => {
    setSelectedReferral(referral);
    setRejectionReason("");
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!selectedReferral || !rejectionReason.trim()) return;

    setReferrals((prev) =>
      prev.map((ref) =>
        ref.id === selectedReferral.id
          ? { ...ref, status: "Rejected" as const, rejectionReason }
          : ref
      )
    );
    setShowRejectModal(false);
    setSelectedReferral(null);
    setRejectionReason("");
  };

  const handleCreditReward = (referralId: number) => {
    setReferrals((prev) =>
      prev.map((ref) =>
        ref.id === referralId ? { ...ref, status: "Rewarded" as const } : ref
      )
    );
  };

  const getStatusBadge = (status: Referral["status"]) => {
    const configs = {
      Submitted: { color: "bg-blue-100 text-blue-700", icon: Clock },
      "Under Review": { color: "bg-yellow-100 text-yellow-700", icon: AlertTriangle },
      Approved: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      Rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
      Rewarded: { color: "bg-purple-100 text-purple-700", icon: Gift },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border-0 flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: Referral["referralType"]) => {
    const configs = {
      Bandhu: { color: "bg-green-50 text-green-700 border-green-200", icon: UserPlus },
      Lead: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Briefcase },
    };

    const config = configs[type];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {type}
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
              <h1 className="text-3xl font-bold">Referral Management</h1>
              <p className="text-blue-100">Review and manage referral submissions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{totalReferrals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingReview}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Rewards</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRewards.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Rewarded">Rewarded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Referral Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Bandhu">Bandhu</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referrals List */}
        <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Referrals ({filteredReferrals.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-gray-600 text-sm">ID: #{referral.id}</span>
                        {getStatusBadge(referral.status)}
                        {getTypeBadge(referral.referralType)}
                        {referral.isDuplicate && (
                          <Badge className="bg-orange-100 text-orange-700 border-0 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Duplicate Detected
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Referred Person</p>
                          <p className="font-semibold text-gray-900">{referral.referredName}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <Mail className="w-4 h-4" />
                            {referral.referredEmail}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Phone className="w-4 h-4" />
                            {referral.referredPhone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            {referral.referredCity}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Referrer</p>
                          <p className="font-semibold text-gray-900">{referral.referrerName}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <Calendar className="w-4 h-4" />
                            Submitted: {new Date(referral.submissionDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Gift className="w-4 h-4" />
                            Reward: ₹{referral.rewardAmount}
                          </div>
                          {referral.rejectionReason && (
                            <div className="mt-2 p-3 bg-red-50 rounded-lg">
                              <p className="text-sm text-red-700 font-medium">Rejection Reason:</p>
                              <p className="text-sm text-red-600 mt-1">{referral.rejectionReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {referral.status === "Submitted" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                          onClick={() => handleMarkUnderReview(referral.id)}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Mark Under Review
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                          onClick={() => handleApprove(referral.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                          onClick={() => handleOpenRejectModal(referral)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}

                    {referral.status === "Under Review" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                          onClick={() => handleApprove(referral.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                          onClick={() => handleOpenRejectModal(referral)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}

                    {referral.status === "Approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
                        onClick={() => handleCreditReward(referral.id)}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Credit Reward
                      </Button>
                    )}

                    {referral.status === "Rewarded" && (
                      <div className="flex items-center gap-2 text-sm text-purple-700 font-medium">
                        <Gift className="w-4 h-4" />
                        Reward Credited
                      </div>
                    )}

                    {referral.status === "Rejected" && (
                      <div className="flex items-center gap-2 text-sm text-red-700 font-medium">
                        <XCircle className="w-4 h-4" />
                        Referral Rejected
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredReferrals.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No referrals found matching the selected filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Reject Referral
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Enter the reason for rejecting this referral..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectModal(false);
                setRejectionReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
