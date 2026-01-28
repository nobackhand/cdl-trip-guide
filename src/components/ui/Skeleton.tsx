import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded bg-cod-dark2", className)} />
  );
}

export function UberCardSkeleton() {
  return (
    <div className="rounded-lg glass-card p-3">
      <Skeleton className="mb-2 h-4 w-20" />
      <Skeleton className="mb-1 h-8 w-16" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function WeatherCardSkeleton() {
  return (
    <div className="rounded-xl border-l-4 border-cod-green glass-card p-4 text-center">
      <Skeleton className="mx-auto mb-2 h-3 w-16" />
      <Skeleton className="mx-auto mb-2 h-12 w-20" />
      <Skeleton className="mx-auto mb-2 h-3 w-32" />
      <Skeleton className="mx-auto h-3 w-24" />
    </div>
  );
}

export function ScheduleItemSkeleton() {
  return (
    <div className="flex gap-3 py-3">
      <Skeleton className="h-4 w-16" />
      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function FoodItemSkeleton() {
  return (
    <div className="my-1.5 flex items-center gap-2.5 rounded-lg glass-card px-3 py-2.5">
      <Skeleton className="h-7 w-7 rounded" />
      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-32" />
        <Skeleton className="h-3 w-44" />
      </div>
    </div>
  );
}
