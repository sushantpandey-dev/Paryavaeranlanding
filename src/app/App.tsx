import { AdminDashboard } from "@/app/components/admin-dashboard";
import { UserManagement } from "@/app/components/user-management";
import { LearningContentManagement } from "@/app/components/learning-content-management";

type Page = "home" | "faq" | "contact" | "login" | "signup" | "bandhu-dashboard" | "learning" | "referrals" | "tasks" | "support" | "profile" | "admin-dashboard" | "user-management" | "learning-content-management";

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

      {currentPage === "support" && <SupportTickets onNavigate={handleNavigate} />}

      {currentPage === "profile" && <ProfilePage onNavigate={handleNavigate} />}

      {currentPage === "admin-dashboard" && <AdminDashboard onNavigate={handleNavigate} />}

      {currentPage === "user-management" && <UserManagement onNavigate={handleNavigate} />}

      {currentPage === "learning-content-management" && <LearningContentManagement onNavigate={handleNavigate} />}
    </div>
  );
}