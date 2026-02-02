import { Gift, Users, Share2, Trophy, Zap, Star } from "lucide-react";

export function RewardSystem() {
  const rewards = [
    {
      icon: Trophy,
      title: "Achievement Badges",
      description: "Unlock unique badges for completing milestones",
      examples: ["Tree Planter", "Beach Guardian", "Climate Champion"],
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Zap,
      title: "Points & Levels",
      description: "Earn points for every action and level up",
      examples: ["Bronze", "Silver", "Gold", "Platinum"],
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: Gift,
      title: "Exclusive Rewards",
      description: "Redeem points for eco-friendly products",
      examples: ["Gift Cards", "Merchandise", "Vouchers"],
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Share2,
      title: "Referral Bonuses",
      description: "Get rewarded for bringing friends onboard",
      examples: ["100 pts per referral", "Bonus badges", "Special perks"],
      color: "from-pink-400 to-red-500",
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 15420, badge: "🏆" },
    { rank: 2, name: "Rahul Verma", points: 14850, badge: "🥈" },
    { rank: 3, name: "Anita Desai", points: 13990, badge: "🥉" },
    { rank: 4, name: "Vikram Patel", points: 12740, badge: "⭐" },
    { rank: 5, name: "Sneha Reddy", points: 11920, badge: "⭐" },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Rewards & Recognition
          </h2>
          <p className="text-lg text-green-50">
            Your environmental actions deserve recognition. Earn rewards while making a difference.
          </p>
        </div>

        {/* Reward Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <div className={`bg-gradient-to-br ${reward.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="size-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                <p className="text-green-50 text-sm mb-4">{reward.description}</p>
                <div className="space-y-1">
                  {reward.examples.map((example, i) => (
                    <div key={i} className="text-xs text-green-100 flex items-center gap-2">
                      <Star className="size-3" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard & Referral Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="size-6" />
                Top Bandhus
              </h3>
              <span className="text-sm text-green-100">This Month</span>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{user.badge}</span>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-xs text-green-100">Rank #{user.rank}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-green-100">points</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-green-100">
                You're ranked #247 out of 12,500 Bandhus
              </p>
            </div>
          </div>

          {/* Referral Program */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <Users className="size-6" />
              <h3 className="text-2xl font-bold">Referral Program</h3>
            </div>
            <p className="text-green-50 mb-6">
              Invite your friends and family to join Paryavaran Bandhu. Both you and your referral get rewarded!
            </p>
            
            <div className="bg-white/20 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">100</div>
                  <div className="text-sm text-green-100">Points per referral</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">🎁</div>
                  <div className="text-sm text-green-100">Bonus rewards</div>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="text-center mb-2">
                  <span className="text-sm text-green-100">Your Referral Code</span>
                </div>
                <div className="bg-white/30 rounded-lg p-3 text-center font-mono font-bold text-lg">
                  BANDHU2026
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-semibold">Share your code</div>
                  <div className="text-sm text-green-100">Send it via social media or email</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-semibold">Friend signs up</div>
                  <div className="text-sm text-green-100">They use your code during registration</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-semibold">Both get rewarded</div>
                  <div className="text-sm text-green-100">Instant points added to both accounts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-white mb-2">
            Start earning rewards today!
          </p>
          <p className="text-sm text-green-100">
            Complete your first task and receive 50 bonus points
          </p>
        </div>
      </div>
    </section>
  );
}
