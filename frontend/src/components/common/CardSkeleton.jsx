import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="w-full mx-auto h-full min-h-44 flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="p-2 pb-3 flex flex-col justify-between flex-1">
        <div className="flex gap-3">
          {/* Profile Image */}
          <Skeleton className="w-14 h-14 md:w-16 md:h-16 rounded-sm" />

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              {/* Rating and Duration */}
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-10 h-4 rounded" />
                <Skeleton className="w-12 h-3 rounded" />
              </div>

              {/* Title */}
              <Skeleton className="w-full h-5 mb-1 rounded" />
              <Skeleton className="w-3/4 h-5 mb-2 rounded" />

              {/* Description */}
              <Skeleton className="w-full h-4 mb-1 rounded" />
              <Skeleton className="w-5/6 h-4 mb-2 rounded" />

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3">
                <Skeleton className="w-24 h-4 rounded" />
                <Skeleton className="w-28 h-4 rounded" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-16 h-5 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
