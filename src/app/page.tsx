import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import PageContent from "@/components/PageContent";
import { ToastProvider } from "@/components/Toast";
import { EventModeProvider } from "@/components/EventModeProvider";

export default function Home() {
  return (
    <ToastProvider>
      <EventModeProvider>
        <Header />
        <PullToRefresh>
          <main className="mx-auto max-w-[500px] px-4 pb-24">
            <PageContent />
          </main>
        </PullToRefresh>
        <BottomNav />
      </EventModeProvider>
    </ToastProvider>
  );
}
