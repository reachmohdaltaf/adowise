import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-2 space-y-3">
        {/* Header Section */}
        <div className="flex gap-2">
          <Skeleton className="w-14 h-14 rounded-md" />
          <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="w-3/4 h-5" /> {/* Title line 1 */}
            <Skeleton className="w-1/2 h-4" /> {/* Title line 2 or subtext */}
            <div className="flex gap-2 items-center">
              <Skeleton className="w-10 h-4" />
              <Skeleton className="w-12 h-4" />
            </div>
          </div>
        </div>

        {/* Description */}
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />

        {/* Footer Section */}
        <div className="flex justify-between items-center">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
