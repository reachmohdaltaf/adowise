import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SeekerProfileSkeleton = () => {
  return (
    <Card className="px-2 mt-1 md:mt-6 border-none gap-0">
      <h1 className="text-2xl font-semibold mb-4 px-2">Personal Information</h1>

      {/* Tips Box Skeleton */}
      <div className="flex bg-muted py-3 rounded-md px-4 gap-4 mb-6">
        <Skeleton className="w-5 h-5 rounded-full" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-full h-3" />
        </div>
      </div>

      {/* Profile Image + Button Skeleton */}
      <div className="flex gap-4 justify-start items-center mb-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="w-28 h-10 rounded-md" />
      </div>

      {/* Input Fields Skeleton */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-24 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Skeleton className="w-32 h-10 rounded-md" />
      </div>
    </Card>
  );
};

export default SeekerProfileSkeleton;
