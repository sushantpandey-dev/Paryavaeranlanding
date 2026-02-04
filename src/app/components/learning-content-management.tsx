import { useState } from "react";
import {
  Leaf,
  BookOpen,
  Plus,
  Video,
  FileText,
  Clock,
  Eye,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Hash,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface LearningContentManagementProps {
  onNavigate: (page: string) => void;
}

interface LearningContent {
  id: number;
  title: string;
  description: string;
  type: "Video" | "Document";
  fileUrl: string;
  thumbnailUrl?: string;
  duration: number; // in minutes
  orderSequence: number;
  isActive: boolean;
  createdDate: string;
  views: number;
  completions: number;
}

export function LearningContentManagement({ onNavigate }: LearningContentManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [contents, setContents] = useState<LearningContent[]>([
    {
      id: 1,
      title: "Introduction to Climate Change",
      description: "Comprehensive overview of climate change causes, effects, and solutions for environmental sustainability.",
      type: "Video",
      fileUrl: "https://example.com/videos/climate-change-intro.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
      duration: 45,
      orderSequence: 1,
      isActive: true,
      createdDate: "2025-01-15",
      views: 1247,
      completions: 892,
    },
    {
      id: 2,
      title: "Waste Management Best Practices",
      description: "Learn effective waste segregation, recycling techniques, and composting methods for sustainable living.",
      type: "Document",
      fileUrl: "https://example.com/docs/waste-management.pdf",
      thumbnailUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      duration: 30,
      orderSequence: 2,
      isActive: true,
      createdDate: "2025-01-10",
      views: 2103,
      completions: 1456,
    },
    {
      id: 3,
      title: "Renewable Energy Solutions",
      description: "Explore solar, wind, and hydroelectric power systems and their implementation in daily life.",
      type: "Video",
      fileUrl: "https://example.com/videos/renewable-energy.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      duration: 60,
      orderSequence: 3,
      isActive: true,
      createdDate: "2025-01-05",
      views: 1834,
      completions: 1203,
    },
    {
      id: 4,
      title: "Water Conservation Techniques",
      description: "Practical methods for water saving, rainwater harvesting, and sustainable water usage in communities.",
      type: "Document",
      fileUrl: "https://example.com/docs/water-conservation.pdf",
      thumbnailUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
      duration: 25,
      orderSequence: 4,
      isActive: false,
      createdDate: "2024-12-28",
      views: 987,
      completions: 654,
    },
    {
      id: 5,
      title: "Urban Gardening & Green Spaces",
      description: "Create sustainable urban gardens, vertical farming, and community green space development.",
      type: "Video",
      fileUrl: "https://example.com/videos/urban-gardening.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400",
      duration: 40,
      orderSequence: 5,
      isActive: true,
      createdDate: "2024-12-20",
      views: 1521,
      completions: 1089,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Video" as "Video" | "Document",
    fileUrl: "",
    thumbnailUrl: "",
    duration: "",
    orderSequence: "",
  });

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    fileUrl?: string;
  }>({});

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: { title?: string; fileUrl?: string } = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.fileUrl.trim()) {
      errors.fileUrl = "File URL is required";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create new content
    const newContent: LearningContent = {
      id: contents.length + 1,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      fileUrl: formData.fileUrl,
      thumbnailUrl: formData.thumbnailUrl || undefined,
      duration: parseInt(formData.duration) || 0,
      orderSequence: parseInt(formData.orderSequence) || contents.length + 1,
      isActive: true,
      createdDate: new Date().toISOString().split("T")[0],
      views: 0,
      completions: 0,
    };

    setContents([newContent, ...contents]);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      type: "Video",
      fileUrl: "",
      thumbnailUrl: "",
      duration: "",
      orderSequence: "",
    });
    setFormErrors({});
    setShowAddForm(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      type: "Video",
      fileUrl: "",
      thumbnailUrl: "",
      duration: "",
      orderSequence: "",
    });
    setFormErrors({});
    setShowAddForm(false);
  };

  // Toggle content active status
  const handleToggleStatus = (contentId: number) => {
    setContents(
      contents.map((content) =>
        content.id === contentId
          ? { ...content, isActive: !content.isActive }
          : content
      )
    );
  };

  const activeContentsCount = contents.filter((c) => c.isActive).length;
  const videoContentsCount = contents.filter((c) => c.type === "Video").length;
  const documentContentsCount = contents.filter((c) => c.type === "Document").length;

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
              <BookOpen className="size-8 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">Learning Content Management</h2>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showAddForm ? (
                <>
                  <X className="size-5 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="size-5 mr-2" />
                  Add Content
                </>
              )}
            </Button>
          </div>
          <p className="text-lg text-gray-600">
            Create and manage educational content for Bandhus
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Content</p>
                  <p className="text-3xl font-bold text-gray-900">{contents.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                  <BookOpen className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Content</p>
                  <p className="text-3xl font-bold text-green-600">{activeContentsCount}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                  <BookOpen className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Videos</p>
                  <p className="text-3xl font-bold text-purple-600">{videoContentsCount}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                  <Video className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Documents</p>
                  <p className="text-3xl font-bold text-amber-600">{documentContentsCount}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-md">
                  <FileText className="size-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Content Form */}
        {showAddForm && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-5 text-blue-600" />
                Add New Learning Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        if (formErrors.title) setFormErrors({ ...formErrors, title: undefined });
                      }}
                      placeholder="Enter content title"
                      className={formErrors.title ? "border-red-500" : ""}
                    />
                    {formErrors.title && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Enter content description"
                      rows={4}
                    />
                  </div>

                  {/* Content Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content Type
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "Video" | "Document") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Video">
                          <div className="flex items-center gap-2">
                            <Video className="size-4" />
                            Video
                          </div>
                        </SelectItem>
                        <SelectItem value="Document">
                          <div className="flex items-center gap-2">
                            <FileText className="size-4" />
                            Document
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        placeholder="30"
                        className="pl-10"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* File URL */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      File URL <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        value={formData.fileUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, fileUrl: e.target.value });
                          if (formErrors.fileUrl)
                            setFormErrors({ ...formErrors, fileUrl: undefined });
                        }}
                        placeholder="https://example.com/content.pdf"
                        className={`pl-10 ${formErrors.fileUrl ? "border-red-500" : ""}`}
                      />
                    </div>
                    {formErrors.fileUrl && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.fileUrl}</p>
                    )}
                  </div>

                  {/* Thumbnail URL */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Thumbnail URL (optional)
                    </label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        value={formData.thumbnailUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, thumbnailUrl: e.target.value })
                        }
                        placeholder="https://example.com/thumbnail.jpg"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Order Sequence */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Sequence
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        type="number"
                        value={formData.orderSequence}
                        onChange={(e) =>
                          setFormData({ ...formData, orderSequence: e.target.value })
                        }
                        placeholder={`${contents.length + 1}`}
                        className="pl-10"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Content
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Content List */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-5 text-blue-600" />
              Learning Content ({contents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contents.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No learning content available</p>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Your First Content
                  </Button>
                </div>
              ) : (
                contents.map((content) => (
                  <div
                    key={content.id}
                    className="flex flex-col md:flex-row items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      {content.thumbnailUrl ? (
                        <img
                          src={content.thumbnailUrl}
                          alt={content.title}
                          className="w-full md:w-32 h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full md:w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          {content.type === "Video" ? (
                            <Video className="size-12 text-gray-500" />
                          ) : (
                            <FileText className="size-12 text-gray-500" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {content.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
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
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {content.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="size-4" />
                          {content.views.toLocaleString()} views
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUpDown className="size-4" />
                          Order: {content.orderSequence}
                        </div>
                        <span>Added {new Date(content.createdDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col items-center gap-3 w-full md:w-auto">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {content.isActive ? "Deactivate" : "Activate"}
                        </span>
                        <Switch
                          checked={content.isActive}
                          onCheckedChange={() => handleToggleStatus(content.id)}
                        />
                      </div>
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        <Eye className="size-4 mr-2" />
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
