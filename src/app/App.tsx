import { useState } from "react";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { HowItWorks } from "./components/how-it-works";
import { ImpactStats } from "./components/impact-stats";
import { RecentActivities } from "./components/recent-activities";
import { EducationalResources } from "./components/educational-resources";
import { Testimonials } from "./components/testimonials";
import { RewardSystem } from "./components/reward-system";
import { FinalCTA } from "./components/final-cta";
import { Footer } from "./components/footer";
import { FAQPage } from "./components/faq-page";
import { ContactPage } from "./components/contact-page";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";
import { BandhuDashboard } from "./components/bandhu-dashboard";
import { LearningPortal } from "./components/learning-portal";
import { ReferralPortal } from "./components/referral-portal";
import { TaskManagement } from "./components/task-management";
import { SupportTickets } from "./components/support-tickets";
import { ProfilePage } from "./components/profile-page";
import { AdminDashboard } from "./components/admin-dashboard";
import { UserManagement } from "./components/user-management";
import { LearningContentManagement } from "./components/learning-content-management";
import { LearningContentDetail } from "./components/learning-content-detail";
import { TaskManagementAdmin } from "./components/task-management-admin";
import { ReferralManagement } from "./components/referral-management";
import { RewardConfiguration } from "./components/reward-configuration";

type Page = "home" | "faq" | "contact" | "login" | "signup" | "bandhu-dashboard" | "learning" | "referrals" | "tasks" | "support" | "profile" | "admin-dashboard" | "user-management" | "learning-content-management" | "learning-content-detail" | "task-management-admin" | "referral-management" | "reward-configuration";

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

      {currentPage === "task-management-admin" && <TaskManagementAdmin onNavigate={handleNavigate} />}

      {currentPage === "referral-management" && <ReferralManagement onNavigate={handleNavigate} />}

      {currentPage === "reward-configuration" && <RewardConfiguration onNavigate={handleNavigate} />}
    </div>
  );
}