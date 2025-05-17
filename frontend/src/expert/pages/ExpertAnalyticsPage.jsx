import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, StarIcon, TimerIcon } from "lucide-react";
import React from "react";
import Chart from "../components/Chart";

const ExpertAnalyticsPage = () => {
  return (
    <div className="py-6 px-4 space-y-6">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-gray-500">Total Sessions</h3>
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600" />
              <span className="font-semibold text-2xl">25</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-gray-500">Total Duration</h3>
            <div className="flex items-center gap-2">
              <TimerIcon className="text-green-600" />
              <span className="font-semibold text-2xl">15 hrs</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-gray-500">Total Earnings</h3>
            <div className="flex items-center gap-2">
              <DollarSign className="text-yellow-500" />
              <span className="font-semibold text-2xl">$500</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-gray-500">Average Rating</h3>
            <div className="flex items-center gap-2">
              <StarIcon className="text-orange-400" />
              <span className="font-semibold text-2xl">4.8</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="mb-2 font-medium text-lg">Session Trends</h4>
            <Chart />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="mb-2 font-medium text-lg">Earning Trends</h4>
            <Chart />
          </CardContent>
        </Card>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h4 className="font-medium text-lg">Top Reviews</h4>
          <div className="space-y-3">
            <div className="border p-3 rounded-md">
              <p className="text-sm">"Very helpful session! Cleared all my doubts."</p>
              <p className="text-xs text-gray-500 mt-1">— John Doe</p>
            </div>
            <div className="border p-3 rounded-md">
              <p className="text-sm">"Excellent mentor with deep knowledge."</p>
              <p className="text-xs text-gray-500 mt-1">— Jane Smith</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertAnalyticsPage;
