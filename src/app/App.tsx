import { useState } from "react";
import { Navigation } from "@/app/components/navigation";
import { Hero } from "@/app/components/hero";
import { Features } from "@/app/components/features";
import { HowItWorks } from "@/app/components/how-it-works";
import { ImpactStats } from "@/app/components/impact-stats";
import { RecentActivities } from "@/app/components/recent-activities";
import { EducationalResources } from "@/app/components/educational-resources";
import { Testimonials } from "@/app/components/testimonials";
import { RewardSystem } from "@/app/components/reward-system";
import { FinalCTA } from "@/app/components/final-cta";
import { Footer } from "@/app/components/footer";
import { FAQPage } from "@/app/components/faq-page";
import { ContactPage } from "@/app/components/contact-page";
import { LoginPage } from "@/app/components/login-page";
import { SignupPage } from "@/app/components/signup-page";
import { BandhuDashboard } from "@/app/components/bandhu-dashboard";
import { LearningPortal } from "@/app/components/learning-portal";
import { ReferralPortal } from "@/app/components/referral-portal";
import { TaskManagement } from "@/app/components/task-management";
import { SupportTickets } from "@/app/components/support-tickets";
import { ProfilePage } from "@/app/components/profile-page";
import { AdminDashboard } from "@/app/components/admin-dashboard";
import { UserManagement } from "@/app/components/user-management";
import { LearningContentManagement } from "@/app/components/learning-content-management";
import { LearningContentDetail } from "@/app/components/learning-content-detail";

type Page = "home" | "faq" | "contact" | "login" | "signup" | "bandhu-dashboard" | "learning" | "referrals" | "tasks" | "support" | "profile" | "admin-dashboard" | "user-management" | "learning-content-management" | "learning-content-detail";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [contentId, setContentId] = useState<number>(1);

  const handleNavigate = (page: string, id?: number) => {
    setCurrentPage(page as Page);
    if (id !== undefined) {
      setContentId(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== "login" && currentPage !== "signup" && (
        <Navigation onNavigate={handleNavigate} />
      )}

      {currentPage === "home" && (
        <>
          <Hero onNavigate={handleNavigate} />
          <Features />
          <HowItWorks />
          <ImpactStats />
          <RecentActivities />
          <EducationalResources />
          <Testimonials />
          <RewardSystem />
          <FinalCTA onNavigate={handleNavigate} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === "faq" && (
        <>
          <div className="pt-16">
            <FAQPage />
          </div>
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === "contact" && (
        <>
          <div className="pt-16">
            <ContactPage />
          </div>
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}

      {currentPage === "signup" && <SignupPage onNavigate={handleNavigate} />}

      {currentPage === "bandhu-dashboard" && <BandhuDashboard onNavigate={handleNavigate} />}

      {currentPage === "learning" && <LearningPortal onNavigate={handleNavigate} />}

      {currentPage === "referrals" && <ReferralPortal onNavigate={handleNavigate} />}

      {currentPage === "tasks" && <TaskManagement onNavigate={handleNavigate} />}

      {currentPage === "support" && <SupportTickets onNavigate={handleNavigate} />}

      {currentPage === "profile" && <ProfilePage onNavigate={handleNavigate} />}

      {currentPage === "admin-dashboard" && <AdminDashboard onNavigate={handleNavigate} />}

      {currentPage === "user-management" && <UserManagement onNavigate={handleNavigate} />}

      {currentPage === "learning-content-management" && <LearningContentManagement onNavigate={handleNavigate} />}

      {currentPage === "learning-content-detail" && <LearningContentDetail onNavigate={handleNavigate} contentId={contentId} />}
    </div>
  );
}