import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const BookingCardSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {/* Header with icon and date */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-32 h-4" />
      </div>
      
      {/* Title and description */}
      <div className="mt-3 space-y-2">
        <Skeleton className="w-4/5 h-6" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-40 h-4" />
        </div>
      </div>
      
      {/* Status and button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-24 h-8 rounded-md" />
      </div>
      
      {/* Details section - hidden by default but will animate when loading */}
      <div className="mt-3 space-y-3 pt-3 border-t">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-4 h-4 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="w-16 h-3" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCardSkeleton;