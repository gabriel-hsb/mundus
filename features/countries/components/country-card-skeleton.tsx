import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function CountryCardSkeleton() {
  return (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-md shadow-sm">
      <div className="h-[10rem] w-full overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-4 px-4 py-4">
        <div>
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}
