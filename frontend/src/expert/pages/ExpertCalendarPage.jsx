import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Badge, BadgeCheck, CalendarArrowUpIcon, Gem, VideoIcon } from "lucide-react";
import { RiTimeZoneLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";

const timeZones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const bookingPeriods = [
  "1 week in advance",
  "2 weeks in advance",
  "3 weeks in advance",
  "4 weeks in advance",
];

const ExpertCalendarPage = () => {
  const [rescheduleType, setRescheduleType] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [selectedBookingPeriod, setSelectedBookingPeriod] = useState("");

  return (
    <div>
      <Card className="px-4 border-none">
        {/* Timezone Selector */}
        <div className="flex flex-col sm:flex-row justify-between sm:max-w-screen-sm items-start space-y-4 sm:space-y-0">
          <h3 className="text-sm flex font-normal items-center gap-2">
            <RiTimeZoneLine size={24} /> TimeZone :
          </h3>
          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger className="w-full border-gray-200 shadow-none sm:w-[200px] border border-gray-200 focus:ring-0">
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent className={'border-none'}>
              <SelectGroup>
                <SelectLabel>Time Zones</SelectLabel>
                {timeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Reschedule Policy Dialog */}
        <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:max-w-screen-sm">
          <p className="text-sm flex font-normal items-center gap-2">
            <CalendarArrowUpIcon /> Reschedule policy :
          </p>
          <Dialog className="">
            <DialogTrigger className={"w-full border-gray-200 shadow-none sm:w-[200px]"} asChild>
              <Button variant="outline" className="rounded-md ">
                Update Policy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reschedule Policy</DialogTitle>
                <DialogDescription>
                  Configure how your customers can reschedule their calls.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Reschedule Type */}
                <div>
                  <h4 className="font-medium">
                    How can your customers initiate a reschedule?
                  </h4>
                  <RadioGroup
                    value={rescheduleType}
                    onValueChange={setRescheduleType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="request" id="request" />
                      <label htmlFor="request">Request reschedule</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="direct" id="direct" />
                      <label htmlFor="direct">Directly reschedule</label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Notice Period */}
                <div>
                  <h4 className="font-medium">
                    Minimum notice before rescheduling a call
                  </h4>
                  <RadioGroup
                    value={noticePeriod}
                    onValueChange={setNoticePeriod}
                  >
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="30mins" /> 30 mins
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="8hrs" /> 8 hrs
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="24hrs" /> 24 hrs
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="anytime" /> Anytime
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Update Policy</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Booking Period Selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:max-w-screen-sm items-start">
          <h3 className="text-sm flex font-normal items-center gap-2">
            <FaCalendarAlt size={20} /> Booking Period :
          </h3>
          <Select
            value={selectedBookingPeriod}
            onValueChange={setSelectedBookingPeriod}
          >
            <SelectTrigger className="w-full shadow-none sm:w-[200px] border border-gray-200 focus:ring-0">
              <SelectValue placeholder="Select booking period" />
            </SelectTrigger>
            <SelectContent className={'border-none'}>
              <SelectGroup>
                <SelectLabel>Booking Periods</SelectLabel>
                {bookingPeriods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:max-w-screen-sm items-start">
          <h3 className="text-sm flex font-normal items-center gap-2">
            <FaCalendarAlt size={20} /> Notice Period :
          </h3>
          <Select
            value={selectedBookingPeriod}
            onValueChange={setSelectedBookingPeriod}
          >
            <SelectTrigger className="w-full shadow-none sm:w-[200px] border border-gray-200 focus:ring-0">
              <SelectValue placeholder="Select booking period" />
            </SelectTrigger>
            <SelectContent className={'border-none'}>
              <SelectGroup>
                <SelectLabel>Notice Periods</SelectLabel>
                {bookingPeriods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl mt-10">Meeting Location</h3>
            <p className="text-destructive text-sm font-normal">
              Use your preferred video conferencing tool for 1:1 meetings
            </p>
          </div>
          <div>
            <div className="flex justify-start gap-20 items-center">
              <div className="flex items-center gap-4">
                <img src="/zoom.png" className="w-6 h-6" alt="" />
                <p className="w-52">Zoom Pro</p>
              </div>
              <div className="flex items-center gap-4">
              <Switch className="data-[state=unchecked]:bg-gray-300"  id="zoom" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-start gap-20 items-center">
              <div className="flex items-center gap-4">
                <img src="/meet.svg" className="w-6 h-6" alt="" />
                <p className="w-52">Google Meet</p>
              </div>
              <div className="flex items-center gap-4">
                <Switch className="data-[state=unchecked]:bg-gray-300"  id="zoom" />
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl mt-10">Calendar</h3>
            <p className="text-destructive text-sm font-normal">
              Use your preferred video conferencing tool for 1:1 meetings
            </p>
          </div>
          <div>
          
          </div>
          <div>
            <div className="flex justify-start gap-20 items-center">
              <div className="flex items-center gap-4">
                <img src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_29_2x.png" className="w-6 h-6" alt="" />
                <p className="w-52">Google Calendar</p>
              </div>
              <div className="flex items-center gap-4">
               <BadgeCheck className="text-green-600"/>
              </div>
            </div>
          </div>
          
        </div>
      </Card>
    </div>
  );
};

export default ExpertCalendarPage;
