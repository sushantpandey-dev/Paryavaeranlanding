import { useState } from "react";
import {
  Leaf,
  Gift,
  Plus,
  Minus,
  Edit2,
  Trash2,
  Save,
  X,
  UserPlus,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";

interface RewardConfigurationProps {
  onNavigate: (page: string) => void;
}

interface RewardConfig {
  id: number;
  referralType: "BANDHU" | "LEAD";
  rewardAmount: number;
  status: "Active" | "Inactive";
}

export function RewardConfiguration({ onNavigate }: RewardConfigurationProps) {
  const [configurations, setConfigurations] = useState<RewardConfig[]>([
    {
      id: 1,
      referralType: "BANDHU",
      rewardAmount: 500,
      status: "Active",
    },
    {
      id: 2,
      referralType: "LEAD",
      rewardAmount: 1000,
      status: "Active",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<number>(0);

  const handleEdit = (config: RewardConfig) => {
    setEditingId(config.id);
    setEditAmount(config.rewardAmount);
  };

  const handleSave = (id: number) => {
    setConfigurations((prev) =>
      prev.map((config) =>
        config.id === id ? { ...config, rewardAmount: editAmount } : config
      )
    );
    setEditingId(null);
    setEditAmount(0);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditAmount(0);
  };

  const handleToggleStatus = (id: number) => {
    setConfigurations((prev) =>
      prev.map((config) =>
        config.id === id
          ? {
              ...config,
              status: config.status === "Active" ? ("Inactive" as const) : ("Active" as const),
            }
          : config
      )
    );
  };

  const handleDelete = (id: number) => {
    setConfigurations((prev) => prev.filter((config) => config.id !== id));
  };

  const handleIncrement = () => {
    setEditAmount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setEditAmount((prev) => Math.max(0, prev - 1));
  };

  const getTypeBadge = (type: "BANDHU" | "LEAD") => {
    const configs = {
      BANDHU: { 
        color: "bg-green-100 text-green-700 border-green-200", 
        icon: UserPlus 
      },
      LEAD: { 
        color: "bg-blue-100 text-blue-700 border-blue-200", 
        icon: Briefcase 
      },
    };

    const config = configs[type];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.color} flex items-center gap-1 w-fit`}>
        <Icon className="w-4 h-4" />
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
              <h1 className="text-3xl font-bold">Reward Configuration</h1>
              <p className="text-blue-100">Configure reward amounts for referral types</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Reward Configurations Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              Reward Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Referral Type
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Reward Amount
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {configurations.map((config) => (
                    <tr
                      key={config.id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Referral Type */}
                      <td className="py-4 px-4">
                        {getTypeBadge(config.referralType)}
                      </td>

                      {/* Reward Amount */}
                      <td className="py-4 px-4">
                        {editingId === config.id ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleDecrement}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                              className="w-24 h-8 text-center"
                              min="0"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleIncrement}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-900">
                              ₹{config.rewardAmount}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={config.status === "Active"}
                            onCheckedChange={() => handleToggleStatus(config.id)}
                            disabled={editingId === config.id}
                          />
                          <Badge
                            className={`${
                              config.status === "Active"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            } border`}
                          >
                            {config.status}
                          </Badge>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {editingId === config.id ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleSave(config.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancel}
                                className="border-gray-300"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(config)}
                                className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(config.id)}
                                className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {configurations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No reward configurations found.</p>
                  <p className="text-sm mt-2">Add a new configuration to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserPlus className="w-5 h-5 text-green-600" />
                Bandhu Referral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Reward given when a Bandhu successfully refers another volunteer who completes registration and verification.
              </p>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Current Reward:</span>
                <span className="text-xl font-bold text-green-600">
                  ₹{configurations.find((c) => c.referralType === "BANDHU")?.rewardAmount || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Lead Referral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Reward given when a Bandhu successfully refers a business or organization lead that gets verified.
              </p>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Current Reward:</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{configurations.find((c) => c.referralType === "LEAD")?.rewardAmount || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guidelines */}
        <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Configuration Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Bandhu Referral:</strong> Typically lower reward amount for peer-to-peer volunteer referrals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Lead Referral:</strong> Higher reward amount for business/organization leads that require more effort
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  Use the toggle to activate or deactivate a reward configuration without deleting it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  Edit mode allows you to modify reward amounts using the input field or +/- buttons
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  Inactive configurations will not be applied to new referrals but existing rewards remain valid
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
