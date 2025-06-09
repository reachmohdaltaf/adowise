import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Calendar, Clock, User, MapPin, Phone, Mail } from "lucide-react";

const SeekerUpcomingBookingCard = ({ title, description, status, date, time, type, details }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  // Sample details data - you can pass this as props
  const bookingDetails = details || {
    consultant: "Dr. Sarah Johnson",
    location: "Virtual Meeting",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    notes: "Please prepare your questions in advance. We'll discuss your career transition goals and create an action plan.",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  };

  return (
    <Card className="py-4 gap-0 px-3 overflow-hidden transition-all duration-300 ease-in-out">
      <CardTitle className="flex items-center gap-2">
        {type === "googleMeet" ? (
          <img 
            src="https://www.gstatic.com/marketing-cms/assets/images/23/2e/f8262b124f86a3f1de3e14356cc3/google-meet.webp=s96-fcrop64=1,00000000ffffffff-rw" 
            className="w-5" 
            alt="Google Meet" 
          />
        ) : (
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">Z</span>
          </div>
        )}
        <p className="text-xs">{date}, {time}</p>
      </CardTitle>
      
      <CardContent className="px-0 flex flex-col mt-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardContent>
      
      <CardFooter className="px-0 justify-between">
        <div className="flex gap-2">
          <p className="text-sm">Status:</p>
          <span className={`text-sm font-medium ${
            status.toLowerCase() === 'confirmed' ? 'text-green-600' : 
            status.toLowerCase() === 'pending' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {status}
          </span>
        </div>
        <Button 
          size="sm" 
          className="w-20 text-sm flex items-center gap-1" 
          onClick={toggleDetails}
        >
          Details
          {isDetailsVisible ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </Button>
      </CardFooter>

      {/* Sliding Details Section */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isDetailsVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="border-t pt-4 mt-2 space-y-3 transform transition-transform duration-500 ease-in-out">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Consultant</p>
              <p className="text-sm font-medium">{bookingDetails.consultant}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm">{bookingDetails.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Contact</p>
              <p className="text-sm">{bookingDetails.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{bookingDetails.email}</p>
            </div>
          </div>

          {bookingDetails.notes && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-sm text-gray-700">{bookingDetails.notes}</p>
            </div>
          )}

          {bookingDetails.meetingLink && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.open(bookingDetails.meetingLink, '_blank')}
              >
                Join Meeting
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Demo component to show the card in action
const Demo = () => {
  const sampleBooking = {
    title: "Career Consultation Session",
    description: "30-minute consultation to discuss career transition strategies and goal setting.",
    status: "Confirmed",
    date: "June 15, 2025",
    time: "2:00 PM",
    type: "googleMeet",
    details: {
      consultant: "Dr. Sarah Johnson",
      location: "Virtual Meeting",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@example.com",
      notes: "Please prepare your questions in advance. We'll discuss your career transition goals and create an action plan.",
      meetingLink: "https://meet.google.com/abc-defg-hij"
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Booking Card Demo</h1>
        <SeekerUpcomingBookingCard {...sampleBooking} />
      </div>
    </div>
  );
};

export default Demo;