"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/Toast";
import { HOTEL_ADDRESS } from "@/lib/constants";
import { fetchUberEstimates } from "@/lib/api";
import { UberCardSkeleton } from "@/components/ui/Skeleton";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function UberLinks() {
  const { showToast } = useToast();
  const { location, loading: geoLoading } = useGeolocation();
  const { data: estimates, isLoading } = useQuery({
    queryKey: ["uber", location?.lat ?? null, location?.lng ?? null],
    queryFn: () => fetchUberEstimates(location ?? undefined),
    enabled: !geoLoading,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  function copyAddress() {
    navigator.clipboard.writeText(HOTEL_ADDRESS).then(() => {
      showToast("Address copied! \ud83d\udccb");
    });
  }

  return (
    <section id="uber" className="my-5">
      <h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
        {"\ud83d\ude97"} Quick Uber
      </h2>
      <div className="section-divider" />

      {/* Surge indicator */}
      {estimates && estimates[0]?.surgeMultiplier > 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-2 rounded-lg animated-gradient-orange px-3 py-1.5 text-center text-[11px] font-semibold text-white"
        >
          {"\u26a1"} {estimates[0].surgeMultiplier}x surge pricing active
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {isLoading ? (
          <>
            <UberCardSkeleton />
            <UberCardSkeleton />
            <UberCardSkeleton />
          </>
        ) : estimates ? (
          estimates.map((est) => (
            <motion.a
              key={est.destination}
              href={est.deepLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.96 }}
              className="rounded-lg glass-card p-3 text-center text-white no-underline active:bg-cod-green/20"
            >
              <div className="text-[11px] font-semibold">{est.destination}</div>
              <div className="text-[18px] font-bold text-cod-lime text-glow">
                ${est.lowEstimate}-${est.highEstimate}
              </div>
              <div className="text-[9px] text-cod-gray">
                {est.distance} &bull; {est.duration}
              </div>
              {est.surgeMultiplier > 1 && (
                <div className="mt-1 text-[9px] text-cod-orange">
                  {"\u26a1"} {est.surgeMultiplier}x
                </div>
              )}
            </motion.a>
          ))
        ) : (
          // Fallback static cards
          <>
            {[
              { icon: "\ud83c\udfdf\ufe0f", dest: "Venue", cost: "~$10", time: "1.7 mi \u2022 6 min", url: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Moody%20Coliseum%2C%20Dallas%2C%20TX" },
              { icon: "\ud83c\udfb8", dest: "Deep Ellum", cost: "~$15", time: "4 mi \u2022 12 min", url: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Deep%20Ellum%2C%20Dallas%2C%20TX" },
              { icon: "\ud83c\udf56", dest: "Pecan Lodge", cost: "~$12", time: "3.5 mi \u2022 10 min", url: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Pecan%20Lodge%2C%20Dallas%2C%20TX" },
            ].map((d) => (
              <motion.a
                key={d.dest}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.96 }}
                className="rounded-lg glass-card p-3 text-center text-white no-underline active:bg-cod-green/20"
              >
                <div className="text-[11px] font-semibold">{d.icon} {d.dest}</div>
                <div className="text-[18px] font-bold text-cod-lime text-glow">{d.cost}</div>
                <div className="text-[9px] text-cod-gray">{d.time}</div>
              </motion.a>
            ))}
          </>
        )}

        <motion.button
          onClick={copyAddress}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer rounded-lg glass-card p-3 text-center text-white active:bg-cod-green/20"
        >
          <div className="text-[11px] font-semibold">{"\ud83d\udccb"} Hotel Address</div>
          <div className="text-[12px] font-bold text-cod-lime">Copy</div>
          <div className="text-[9px] text-cod-gray">Tap to copy</div>
        </motion.button>
      </div>
    </section>
  );
}
