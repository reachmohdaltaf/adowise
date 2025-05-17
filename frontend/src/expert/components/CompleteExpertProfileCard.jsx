import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Mail, Phone, Info, Calendar } from "lucide-react";

const CompleteExpertProfileCard = () => {
  const emailVerified = true;
  const phoneVerified = false;
  const isCalendarAdded = true;

  return (
    <Card className="md:w-1/2 w-full gap-1    rounded-2xl flex flex-col h-86">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Complete Your Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <Accordion type="multiple" className="w-full space-y-2">
          {/* Email Section */}
          <AccordionItem value="email">
            <AccordionTrigger className="flex  justify-between cursor-pointer py-2 items-center">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-left">Email</span>
                {emailVerified && <BadgeCheck className="text-green-500 rotate-0" />}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {emailVerified ? (
                <p className="text-sm text-green-600">Email already verified</p>
              ) : (
                <Button variant="outline" size="sm">
                  Verify Email
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Phone Section */}
          <AccordionItem value="phone">
            <AccordionTrigger className="flex justify-between cursor-pointer py-2 items-center">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-left">Phone Number</span>
                {phoneVerified && <BadgeCheck className="text-green-500 rotate-0" />}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {phoneVerified ? (
                <p className="text-sm text-green-600">Phone already verified</p>
              ) : (
                <Button variant="outline" size="sm">
                  Verify Phone
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* About Section */}
          <AccordionItem value="calendar">
            <AccordionTrigger className="flex justify-between cursor-pointer py-2 items-center">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 " />
                <span className="text-left">Add calendar & meeting link</span>
                {isCalendarAdded && <BadgeCheck className="text-green-500 rotate-0" />}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {isCalendarAdded ? (
                <p className="text-sm text-green-600">Meeting links added successfully</p>
              ) : (
                <Button variant="outline" size="sm">
                  Add here
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      {/* Fixed Footer Button */}
      <div className="px-6 py-4 border-t border-gray-200">
        <Button variant={''} className="w-full">Submit & Complete Profile</Button>
      </div>
    </Card>
  );
};

export default CompleteExpertProfileCard;
