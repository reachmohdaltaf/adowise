import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SeekerHomePageSkeleton = () => {
  return (
    <div className="md:py-6 px-0 gap-2 w-full flex flex-col">
      <Card className="w-full border-none shadow-none mt-5 gap-0 py-0 px-0">
        <CardHeader className="px-0">
          {/* Top Profile Section Skeleton */}
          <Card className="mb-4 p-4">
            <CardContent className="flex flex-col gap-4">
              <Skeleton className="w-32 h-6 rounded" />
              <Skeleton className="w-full h-20 rounded" />
            </CardContent>
          </Card>

          {/* Rewards Card Skeleton */}
          <Card className="h-80 w-full rounded-xl relative overflow-hidden">
            <CardContent className="flex flex-col gap-4 h-full">
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-2 rounded-full" />
              <div className="flex gap-2 mt-auto">
                <Skeleton className="w-32 h-10 rounded-md" />
              </div>
            </CardContent>
          </Card>

          {/* Bottom CTA Card */}
          <Card className="mt-3 rounded-lg w-full">
            <CardContent className="px-2 flex flex-col md:flex-row items-center md:justify-between gap-5">
              <div className="flex flex-col gap-4">
                <Skeleton className="w-64 h-6" />
                <Skeleton className="w-40 h-10" />
              </div>
              <Skeleton className="w-32 h-32 rounded-md" />
            </CardContent>
          </Card>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SeekerHomePageSkeleton;
