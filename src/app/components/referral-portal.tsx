import { useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  Coins,
  UserPlus,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Leaf,
  Phone,
  Mail,
  MapPin,
  FileText,
  Calendar,
  Wallet,
  Award,
  Info,
  Send,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";

interface ReferralPortalProps {
  onNavigate: (page: string) => void;
}

type ReferralType = "Bandhu" | "Lead";
type ReferralStatus = "Submitted" | "Under Review" | "Approved" | "Rejected" | "Rewarded";

interface Referral {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  type: ReferralType;
  status: ReferralStatus;
  submittedDate: Date;
  organization?: string;
  leadType?: string;
  rejectionReason?: string;
  rewardAmount?: number;
}

export function ReferralPortal({ onNavigate }: ReferralPortalProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedReferralType, setSelectedReferralType] = useState<ReferralType>("Bandhu");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    organization: "",
    leadType: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
  }>({});

  // Mock referral data
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      city: "Mumbai",
      type: "Bandhu",
      status: "Rewarded",
      submittedDate: new Date("2026-01-15"),
      rewardAmount: 500,
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43211",
      city: "Delhi",
      type: "Bandhu",
      status: "Approved",
      submittedDate: new Date("2026-01-20"),
      rewardAmount: 500,
    },
    {
      id: "3",
      name: "GreenTech Solutions",
      email: "contact@greentech.com",
      phone: "+91 98765 43212",
      city: "Bangalore",
      type: "Lead",
      status: "Under Review",
      submittedDate: new Date("2026-01-25"),
      organization: "GreenTech Solutions Pvt Ltd",
      leadType: "Corporate Partnership",
    },
    {
      id: "4",
      name: "Amit Verma",
      email: "amit.verma@email.com",
      phone: "+91 98765 43213",
      city: "Pune",
      type: "Bandhu",
      status: "Rejected",
      submittedDate: new Date("2026-01-28"),
      rejectionReason: "Duplicate entry - already registered",
    },
    {
      id: "5",
      name: "Sneha Patel",
      email: "sneha.patel@email.com",
      phone: "+91 98765 43214",
      city: "Ahmedabad",
      type: "Bandhu",
      status: "Submitted",
      submittedDate: new Date("2026-02-01"),
    },
  ]);

  // Calculate statistics
  const totalReferrals = referrals.length;
  const approvedReferrals = referrals.filter(
    (r) => r.status === "Approved" || r.status === "Rewarded"
  ).length;
  const pendingReferrals = referrals.filter(
    (r) => r.status === "Submitted" || r.status === "Under Review"
  ).length;
  const totalRewards = referrals
    .filter((r) => r.rewardAmount)
    .reduce((sum, r) => sum + (r.rewardAmount || 0), 0);

  const pendingRewards = referrals
    .filter((r) => r.status === "Approved" && r.rewardAmount)
    .reduce((sum, r) => sum + (r.rewardAmount || 0), 0);

  const approvedRewards = referrals
    .filter((r) => r.status === "Rewarded" && r.rewardAmount)
    .reduce((sum, r) => sum + (r.rewardAmount || 0), 0);

  // Status badge configuration
  const getStatusBadge = (status: ReferralStatus) => {
    const configs = {
      Submitted: { icon: Send, color: "bg-blue-100 text-blue-700 border-blue-300" },
      "Under Review": { icon: Clock, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      Approved: { icon: CheckCircle2, color: "bg-green-100 text-green-700 border-green-300" },
      Rejected: { icon: XCircle, color: "bg-red-100 text-red-700 border-red-300" },
      Rewarded: { icon: Award, color: "bg-purple-100 text-purple-700 border-purple-300" },
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
  const getTypeBadge = (type: ReferralType) => {
    if (type === "Bandhu") {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300 border">
          <Users className="size-3" />
          Bandhu
        </Badge>
      );
    }
    return (
      <Badge className="bg-orange-100 text-orange-700 border-orange-300 border">
        <Building2 className="size-3" />
        Lead
      </Badge>
    );
  };

  // Open form modal
  const handleOpenForm = (type: ReferralType) => {
    setSelectedReferralType(type);
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      organization: "",
      leadType: "",
      notes: "",
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string; city?: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      errors.phone = "Invalid phone format";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    return errors;
  };

  // Submit referral
  const handleSubmitReferral = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newReferral: Referral = {
      id: `${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      type: selectedReferralType,
      status: "Submitted",
      submittedDate: new Date(),
      ...(selectedReferralType === "Lead" && {
        organization: formData.organization,
        leadType: formData.leadType,
      }),
    };

    setReferrals([newReferral, ...referrals]);
    setIsFormModalOpen(false);
    setActiveTab("referrals");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
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
                <p className="text-xs text-green-600 font-medium">Referral Portal</p>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Referral Portal</h2>
          <p className="text-lg text-gray-600">
            Refer new volunteers and leads to earn rewards
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger value="dashboard" className="flex-1 sm:flex-none">
              <TrendingUp className="size-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex-1 sm:flex-none">
              <Users className="size-4 mr-2" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex-1 sm:flex-none">
              <Wallet className="size-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex-1 sm:flex-none">
              <Info className="size-4 mr-2" />
              Rules
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Referrals */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Users className="size-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Referrals</p>
                    <p className="text-3xl font-bold text-gray-900">{totalReferrals}</p>
                    <p className="text-xs text-gray-500 mt-1">all time</p>
                  </div>
                </CardContent>
              </Card>

              {/* Approved Referrals */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <UserCheck className="size-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Approved Referrals</p>
                    <p className="text-3xl font-bold text-gray-900">{approvedReferrals}</p>
                    <p className="text-xs text-gray-500 mt-1">verified</p>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Referrals */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-yellow-100 p-3 rounded-xl">
                      <Clock className="size-6 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Pending Referrals</p>
                    <p className="text-3xl font-bold text-gray-900">{pendingReferrals}</p>
                    <p className="text-xs text-gray-500 mt-1">under review</p>
                  </div>
                </CardContent>
              </Card>

              {/* Total Rewards */}
              <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <Coins className="size-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-1">Total Rewards</p>
                    <p className="text-3xl font-bold text-white">₹{totalRewards.toLocaleString()}</p>
                    <p className="text-xs text-white/80 mt-1">earned</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="size-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => handleOpenForm("Bandhu")}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    size="lg"
                  >
                    <UserPlus className="size-5 mr-2" />
                    Refer New Bandhu
                  </Button>
                  <Button
                    onClick={() => handleOpenForm("Lead")}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    size="lg"
                  >
                    <Building2 className="size-5 mr-2" />
                    Refer New Lead
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => handleOpenForm("Bandhu")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                <UserPlus className="size-5 mr-2" />
                Refer New Bandhu
              </Button>
              <Button
                onClick={() => handleOpenForm("Lead")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                <Building2 className="size-5 mr-2" />
                Refer New Lead
              </Button>
            </div>

            {/* Referrals List */}
            <div className="space-y-4">
              {referrals.length === 0 ? (
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Users className="size-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Referrals Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start referring volunteers and leads to earn rewards!
                    </p>
                    <Button
                      onClick={() => handleOpenForm("Bandhu")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <UserPlus className="size-5 mr-2" />
                      Make Your First Referral
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                referrals.map((referral) => (
                  <Card
                    key={referral.id}
                    className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left side - Main info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {referral.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                {getTypeBadge(referral.type)}
                                {getStatusBadge(referral.status)}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="size-4 text-gray-400" />
                              <span>{referral.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="size-4 text-gray-400" />
                              <span>{referral.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="size-4 text-gray-400" />
                              <span>{referral.city}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="size-4 text-gray-400" />
                              <span>
                                {referral.submittedDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Lead specific info */}
                          {referral.type === "Lead" && (
                            <div className="pt-2 border-t border-gray-200 space-y-1">
                              {referral.organization && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Building2 className="size-4 text-gray-400" />
                                  <span className="font-medium">Organization:</span>
                                  <span>{referral.organization}</span>
                                </div>
                              )}
                              {referral.leadType && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Briefcase className="size-4 text-gray-400" />
                                  <span className="font-medium">Lead Type:</span>
                                  <span>{referral.leadType}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Rejection reason */}
                          {referral.status === "Rejected" && referral.rejectionReason && (
                            <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-red-800">
                                    Rejection Reason
                                  </p>
                                  <p className="text-sm text-red-700 mt-1">
                                    {referral.rejectionReason}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Reward amount */}
                          {referral.rewardAmount && (
                            <div className="flex items-center gap-2 text-purple-700 font-semibold">
                              <Award className="size-5" />
                              <span>Reward: ₹{referral.rewardAmount}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            {/* Wallet Card */}
            <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wallet className="size-6" />
                  Your Reward Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Total Earned */}
                <div className="text-center py-6">
                  <p className="text-lg text-white/80 mb-2">Total Earned</p>
                  <p className="text-5xl font-bold text-white mb-2">
                    ₹{totalRewards.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/70">from {approvedReferrals} referrals</p>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="size-5 text-white/80" />
                      <span className="text-sm text-white/80">Pending Rewards</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      ₹{pendingRewards.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="size-5 text-white/80" />
                      <span className="text-sm text-white/80">Approved Rewards</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      ₹{approvedRewards.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reward History */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5 text-purple-600" />
                  Reward History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {referrals.filter((r) => r.rewardAmount).length === 0 ? (
                  <div className="text-center py-8">
                    <Award className="size-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-600">No rewards earned yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {referrals
                      .filter((r) => r.rewardAmount)
                      .map((referral) => (
                        <div
                          key={referral.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <Award className="size-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{referral.name}</p>
                              <p className="text-sm text-gray-600">
                                {referral.submittedDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600">
                              +₹{referral.rewardAmount?.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">{referral.status}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="size-5 text-blue-600" />
                  Referral Program Rules & Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <div className="space-y-6 text-gray-700">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      How It Works
                    </h3>
                    <p className="mb-3">
                      Our referral program rewards you for bringing new volunteers (Bandhus) and
                      organizational leads to the Paryavaran Bandhu platform. Share your love for
                      environmental action and earn rewards!
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Referral Types
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <Users className="size-5" />
                          Bandhu Referrals
                        </h4>
                        <p className="text-sm text-green-800">
                          Refer individual volunteers who want to participate in environmental
                          activities. Reward: ₹500 per successful registration.
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                          <Building2 className="size-5" />
                          Lead Referrals
                        </h4>
                        <p className="text-sm text-orange-800">
                          Refer organizations, schools, or corporations interested in partnering
                          with us. Reward: ₹1000-₹5000 based on partnership value.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Eligibility Criteria
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>The referred person must be a new user (not already registered)</li>
                      <li>Referred Bandhus must complete their profile and verification</li>
                      <li>Referred Leads must show genuine interest and engagement</li>
                      <li>Self-referrals and duplicate entries are not allowed</li>
                      <li>Referred person must mention your referral during registration</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Referral Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300 border">
                          <Send className="size-3" />
                          Submitted
                        </Badge>
                        <span className="text-sm">
                          - Your referral has been received and logged
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 border">
                          <Clock className="size-3" />
                          Under Review
                        </Badge>
                        <span className="text-sm">
                          - Our team is verifying the referral details
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 border-green-300 border">
                          <CheckCircle2 className="size-3" />
                          Approved
                        </Badge>
                        <span className="text-sm">
                          - Referral verified, reward pending disbursement
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-700 border-purple-300 border">
                          <Award className="size-3" />
                          Rewarded
                        </Badge>
                        <span className="text-sm">- Reward has been credited to your wallet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-700 border-red-300 border">
                          <XCircle className="size-3" />
                          Rejected
                        </Badge>
                        <span className="text-sm">
                          - Referral did not meet eligibility criteria
                        </span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Reward Disbursement
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Rewards are typically processed within 7-14 business days</li>
                      <li>You will receive a notification when rewards are approved</li>
                      <li>Rewards can be redeemed through our platform</li>
                      <li>Minimum withdrawal amount: ₹500</li>
                      <li>Tax documentation may be required for high-value rewards</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Important Notes
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>
                        Paryavaran Bandhu reserves the right to modify the referral program at any
                        time
                      </li>
                      <li>Fraudulent referrals may result in account suspension</li>
                      <li>Rewards are non-transferable between users</li>
                      <li>All referrals must comply with our Terms of Service</li>
                    </ul>
                  </section>

                  <section className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-blue-800">
                      If you have questions about the referral program or need assistance with a
                      specific referral, please contact our support team at{" "}
                      <a
                        href="mailto:referrals@paryavaran.com"
                        className="font-medium underline"
                      >
                        referrals@paryavaran.com
                      </a>
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Referral Form Modal */}
      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedReferralType === "Bandhu" ? (
                <>
                  <UserPlus className="size-5 text-green-600" />
                  Refer New Bandhu
                </>
              ) : (
                <>
                  <Building2 className="size-5 text-orange-600" />
                  Refer New Lead
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Type Selector */}
            <div>
              <Label htmlFor="referralType" className="mb-2 block">
                Referral Type
              </Label>
              <Select
                value={selectedReferralType}
                onValueChange={(value: ReferralType) => {
                  setSelectedReferralType(value);
                  setFormErrors({});
                }}
              >
                <SelectTrigger id="referralType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bandhu">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-green-600" />
                      <span>Bandhu (Volunteer)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Lead">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4 text-orange-600" />
                      <span>Lead (Organization)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setFormErrors({ ...formErrors, name: undefined });
                }}
                placeholder={
                  selectedReferralType === "Bandhu"
                    ? "Enter volunteer's full name"
                    : "Enter organization name"
                }
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setFormErrors({ ...formErrors, email: undefined });
                }}
                placeholder="Enter email address"
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="mb-2 block">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  setFormErrors({ ...formErrors, phone: undefined });
                }}
                placeholder="+91 XXXXX XXXXX"
                className={formErrors.phone ? "border-red-500" : ""}
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {formErrors.phone}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city" className="mb-2 block">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  setFormErrors({ ...formErrors, city: undefined });
                }}
                placeholder="Enter city"
                className={formErrors.city ? "border-red-500" : ""}
              />
              {formErrors.city && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {formErrors.city}
                </p>
              )}
            </div>

            {/* Lead-specific fields */}
            {selectedReferralType === "Lead" && (
              <>
                <div>
                  <Label htmlFor="organization" className="mb-2 block">
                    Organization Name
                  </Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    placeholder="Enter organization name"
                  />
                </div>

                <div>
                  <Label htmlFor="leadType" className="mb-2 block">
                    Lead Type
                  </Label>
                  <Select
                    value={formData.leadType}
                    onValueChange={(value) => setFormData({ ...formData, leadType: value })}
                  >
                    <SelectTrigger id="leadType">
                      <SelectValue placeholder="Select lead type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporate Partnership">Corporate Partnership</SelectItem>
                      <SelectItem value="Educational Institution">
                        Educational Institution
                      </SelectItem>
                      <SelectItem value="NGO Collaboration">NGO Collaboration</SelectItem>
                      <SelectItem value="Government Agency">Government Agency</SelectItem>
                      <SelectItem value="Community Group">Community Group</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="mb-2 block">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional information..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReferral}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Send className="size-4 mr-2" />
              Submit Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>
    </div>
  );
}
