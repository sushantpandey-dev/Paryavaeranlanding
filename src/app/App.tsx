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

type Page = "home" | "faq" | "contact" | "login" | "signup" | "bandhu-dashboard" | "learning" | "referrals" | "tasks";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
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
    </div>
  );
}