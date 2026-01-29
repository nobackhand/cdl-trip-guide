"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Toast";

export default function ShareButton() {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://cdl-trip-guide.vercel.app";
  const shareText = "Check out this trip guide for CDL Major I in Dallas! Hotels, Uber prices, food spots & schedule all in one place.";

  async function handleShare() {
    // Try native share API first (works great on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CDL Major I - Dallas Trip Guide",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to modal
        if ((err as Error).name === "AbortError") return;
      }
    }

    // Fall back to modal with copy option
    setShowModal(true);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Link copied! Share it in your group", { type: "success", duration: 3500 });
      setShowModal(false);
    } catch {
      showToast("Couldn't copy link", { type: "error" });
    }
  }

  async function copyWithMessage() {
    try {
      const fullText = `${shareText}\n\n${shareUrl}`;
      await navigator.clipboard.writeText(fullText);
      showToast("Copied with message! Paste in Facebook", { type: "success", duration: 3500 });
      setShowModal(false);
    } catch {
      showToast("Couldn't copy", { type: "error" });
    }
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="flex cursor-pointer items-center gap-1.5 rounded-sm border border-cod-lime/30 bg-cod-dark2 px-3 py-2 text-[11px] text-cod-lime transition-all hover:border-cod-lime hover:bg-cod-lime/10"
      >
        <span className="text-[14px]">📤</span>
        <span>Share Guide</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-[100] bg-black/70"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-1/2 z-[101] mx-auto max-w-[calc(100vw-2rem)] -translate-y-1/2 rounded-sm border border-cod-lime/30 bg-cod-dark2 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-white">Share This Guide</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer text-[20px] text-cod-gray hover:text-white"
                >
                  ×
                </button>
              </div>

              <p className="mb-4 text-[12px] text-cod-gray">
                Share with your CDL group so everyone has the trip info!
              </p>

              <div className="space-y-2">
                <button
                  onClick={copyWithMessage}
                  className="w-full cursor-pointer rounded-sm bg-cod-lime px-4 py-3 text-left transition-opacity hover:opacity-90"
                >
                  <div className="text-[12px] font-bold text-cod-black">📋 Copy with Message</div>
                  <div className="text-[10px] text-cod-black/70">Best for Facebook groups</div>
                </button>

                <button
                  onClick={copyLink}
                  className="w-full cursor-pointer rounded-sm border border-cod-lime/30 bg-transparent px-4 py-3 text-left transition-colors hover:bg-cod-lime/10"
                >
                  <div className="text-[12px] font-medium text-white">🔗 Copy Link Only</div>
                  <div className="text-[10px] text-cod-gray">Just the URL</div>
                </button>
              </div>

              <div className="mt-4 rounded-sm bg-cod-black/50 p-3">
                <div className="text-[9px] uppercase tracking-wider text-cod-gray">Preview</div>
                <div className="mt-1 text-[11px] text-cod-light-gray">{shareText}</div>
                <div className="mt-1 text-[10px] text-cod-lime">{shareUrl}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
