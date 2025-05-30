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
import React, { useEffect, useState } from "react";
import { BadgeCheck, CalendarArrowUpIcon } from "lucide-react";
import { RiTimeZoneLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalendar } from "@/redux/features/calendarThunk";

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

const defaultBookingPeriods = [
  "1 week in advance",
  "2 weeks in advance",
  "3 weeks in advance",
  "4 weeks in advance",
];

const noticePeriods = ["30 mins", "8 hrs", "24 hrs", "Anytime"];

const ExpertCalendarPage = () => {
  const [rescheduleType, setRescheduleType] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [selectedBookingPeriod, setSelectedBookingPeriod] = useState("");
  const [zoomPro, setZoomPro] = useState(false);
  const [googleMeet, setGoogleMeet] = useState(false);
  const dispatch = useDispatch();
  const { calendar } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(fetchCalendar());
  }, [dispatch]);

  console.log(calendar)
  
  useEffect(() => {
    if (calendar) {
      setSelectedTimezone(calendar.timezone || "");
      setRescheduleType(calendar.reschedulePolicy || "");
      setNoticePeriod(calendar.minNoticeForReschedule || "");
      setSelectedBookingPeriod(calendar.bookingPeriod || "");
      setZoomPro(calendar.meetingLocation?.zoomPro || false);
      setGoogleMeet(calendar.meetingLocation?.googleMeet || false);
    }
  }, [calendar]);

  // Ensure bookingPeriod value from backend is included
  const bookingPeriods = selectedBookingPeriod && !defaultBookingPeriods.includes(selectedBookingPeriod)
    ? [selectedBookingPeriod, ...defaultBookingPeriods]
    : defaultBookingPeriods;

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
            <SelectContent className={"border-none"}>
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
            <DialogTrigger
              className={"w-full border-gray-200 shadow-none sm:w-[200px]"}
              asChild
            >
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

                <div>
                  <h4 className="font-medium">
                    Minimum notice before rescheduling a call
                  </h4>
                  <RadioGroup
                    value={noticePeriod}
                    onValueChange={setNoticePeriod}
                  >
                    <div className="flex flex-col gap-2">
                      {noticePeriods.map((period) => (
                        <label key={period} className="flex items-center gap-2">
                          <RadioGroupItem value={period} />
                          {period}
                        </label>
                      ))}
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
            <SelectContent className={"border-none"}>
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

        {/* Meeting Location */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl mt-10">Meeting Location</h3>
            <p className="text-destructive text-sm font-normal">
              Use your preferred video conferencing tool for 1:1 meetings
            </p>
          </div>
          <div className="flex justify-start gap-20 items-center">
            <div className="flex items-center gap-4">
              <img src="/zoom.png" className="w-6 h-6" alt="" />
              <p className="w-52">Zoom Pro</p>
            </div>
            <Switch
              className="data-[state=unchecked]:bg-gray-300"
              id="zoom"
              checked={zoomPro}
              onCheckedChange={setZoomPro}
            />
          </div>
          <div className="flex justify-start gap-20 items-center">
            <div className="flex items-center gap-4">
              <img src="/meet.svg" className="w-6 h-6" alt="" />
              <p className="w-52">Google Meet</p>
            </div>
            <Switch
              className="data-[state=unchecked]:bg-gray-300"
              id="google-meet"
              checked={googleMeet}
              onCheckedChange={setGoogleMeet}
            />
          </div>
        </div>

        {/* Calendar Integration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl mt-10">Calendar</h3>
            <p className="text-destructive text-sm font-normal">
              Use your preferred video conferencing tool for 1:1 meetings
            </p>
          </div>
          <div className="flex justify-start gap-20 items-center">
            <div className="flex items-center gap-4">
              <img
                src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_29_2x.png"
                className="w-6 h-6"
                alt=""
              />
              <p className="w-52">Google Calendar</p>
            </div>
            {calendar?.googleCalendarConnected ? (
              <BadgeCheck className="text-green-600" />
            ) : (
              <p className="text-red-600">Not Connected</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExpertCalendarPage;
