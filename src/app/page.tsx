import HeroSection from "@/components/HeroSection";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import PageContent from "@/components/PageContent";
import { ToastProvider } from "@/components/Toast";

export default function Home() {
  return (
    <ToastProvider>
      <PullToRefresh>
        <main className="mx-auto max-w-[500px] px-4 pb-24">
          <HeroSection />
          <PageContent />
        </main>
      </PullToRefresh>
      <BottomNav />
    </ToastProvider>
  );
}
