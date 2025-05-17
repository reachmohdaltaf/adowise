import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExpertCompletedBookingCard = ({ type, date, time, title, description, status }) => {
  return (
    <Card className="p-1 gap-0 px-2">
      <CardTitle className="flex items-center gap-2">
        <Button
          size="sm"
          className="w-20 text-xs cursor-text hover:bg-transparent"
          variant="ghost"
        >
          {type}
        </Button>
        <p className="text-xs">{date} {time}</p>
      </CardTitle>
      <CardContent className="px-2 flex flex-col mt-2">
        <h2>{title}</h2>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="px-2 justify-between">
        <div className="flex gap-2">
          <p>Status:</p>
          <span className="text-green-700">{status}</span>
        </div>
        <Button size="sm" className="w-20 text-sm">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpertCompletedBookingCard;
