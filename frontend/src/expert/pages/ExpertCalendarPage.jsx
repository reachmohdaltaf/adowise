
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalendar, updateCalendar } from "@/redux/features/calendarThunk";
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
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, CalendarArrowUpIcon, Loader2 } from "lucide-react";
import { RiTimeZoneLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";

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
  const dispatch = useDispatch();
  const { calendar, loading, error } = useSelector((state) => state.calendar);

  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [rescheduleType, setRescheduleType] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [selectedBookingPeriod, setSelectedBookingPeriod] = useState("");
  const [zoomPro, setZoomPro] = useState(false);
  const [googleMeet, setGoogleMeet] = useState(false);

  useEffect(() => {
    dispatch(fetchCalendar());
  }, [dispatch]);

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

  const bookingPeriods =
    selectedBookingPeriod &&
    !defaultBookingPeriods.includes(selectedBookingPeriod)
      ? [selectedBookingPeriod, ...defaultBookingPeriods]
      : defaultBookingPeriods;

  const handleSubmit = () => {
    const formData = {
      timezone: selectedTimezone,
      reschedulePolicy: rescheduleType,
      minNoticeForReschedule: noticePeriod,
      bookingPeriod: selectedBookingPeriod,
      meetingLocation: {
        zoomPro,
        googleMeet,
      },
    };

    dispatch(updateCalendar(formData));
  };

  return (
    <div>
      <Card className="px-4 border-none">
        {/* Timezone Selector */}
        <div className="flex flex-col sm:flex-row justify-between sm:max-w-screen-sm items-start space-y-4 sm:space-y-0">
          <h3 className="text-sm flex font-normal items-center gap-2">
            <RiTimeZoneLine size={24} /> TimeZone :
          </h3>
          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger className="w-full sm:w-[200px] border border-gray-200 focus:ring-0 shadow-none">
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent className="border-none">
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

        {/* Reschedule Policy */}
        <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:max-w-screen-sm ">
          <p className="text-sm flex font-normal items-center gap-2">
            <CalendarArrowUpIcon /> Reschedule policy :
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-[200px] rounded-md shadow-none border border-gray-200"
              >
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
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Policy"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Booking Period */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:max-w-screen-sm items-start ">
          <h3 className="text-sm flex font-normal items-center gap-2">
            <FaCalendarAlt size={20} /> Booking Period :
          </h3>
          <Select
            value={selectedBookingPeriod}
            onValueChange={setSelectedBookingPeriod}
          >
            <SelectTrigger className="w-full sm:w-[200px] border border-gray-200 focus:ring-0 shadow-none">
              <SelectValue placeholder="Select booking period" />
            </SelectTrigger>
            <SelectContent className="border-none">
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
        <div className="flex flex-col gap-4 mt-10">
          <div>
            <h3 className="text-2xl">Meeting Location</h3>
            <p className="text-destructive text-sm font-normal">
              Use your preferred video conferencing tool for 1:1 meetings
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/zoom.png" className="w-6 h-6" alt="Zoom" />
              <p className="w-auto sm:w-52">Zoom Pro</p>
            </div>
            <Switch
              id="zoom"
              checked={zoomPro}
              onCheckedChange={setZoomPro}
              className="data-[state=unchecked]:bg-gray-300"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/meet.svg" className="w-6 h-6" alt="Google Meet" />
              <p className="w-auto sm:w-52">Google Meet</p>
            </div>
            <Switch
              id="google-meet"
              checked={googleMeet}
              onCheckedChange={setGoogleMeet}
              className="data-[state=unchecked]:bg-gray-300"
            />
          </div>
        </div>

        {/* Google Calendar Integration */}
        <div className="flex flex-col gap-4 mt-10">
          <div>
            <h3 className="text-2xl">Calendar</h3>
            <p className="text-destructive text-sm font-normal">
              Connect your calendar for automatic event syncing.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_29_2x.png"
                className="w-6 h-6"
                alt="Google Calendar"
              />
              <p className="w-auto sm:w-52">Google Calendar</p>
            </div>
            {calendar?.googleCalendarConnected ? (
              <BadgeCheck className="text-green-600" />
            ) : (
              <p className="text-red-600">Not Connected</p>
            )}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-10 flex justify-end">
          <Button onClick={handleSubmit} disabled={loading} className="relative flex items-center justify-center">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ExpertCalendarPage;
