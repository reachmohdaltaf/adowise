import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

const SeekerUpcomingBookingCard = ({ title, description, status, date, time, type }) => {
    return (
      <Card className="p-1 gap-0 px-2">
        <CardTitle className="flex items-center gap-2">
         
            {type == "googleMeet" ? (
             <img src="https://www.gstatic.com/marketing-cms/assets/images/23/2e/f8262b124f86a3f1de3e14356cc3/google-meet.webp=s96-fcrop64=1,00000000ffffffff-rw"  className="w-5" alt="" />
            ) : (
              <img src="https://www.google.com/imgres?q=zoom%20icon&imgurl=https%3A%2F%2Fwww.citypng.com%2Fpublic%2Fuploads%2Fpreview%2Fdownload-round-blue-zoom-logo-icon-png-701751695039210sjnvxytv5d.png&imgrefurl=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F17192%2Fdownload-round-blue-zoom-logo-icon-png&docid=0sJmrNNUvBDaKM&tbnid=E84ePgEhgbaMZM&vet=12ahUKEwiJ_4njheSNAxVFTmwGHfL-NIUQM3oECBkQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiJ_4njheSNAxVFTmwGHfL-NIUQM3oECBkQAA"  className="w-5" alt="" />
            )}
          <p className="text-xs">{date}, {time}</p>
        </CardTitle>
        <CardContent className="px-2 flex flex-col mt-2">
          <h2>{title}</h2>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="px-2 justify-between">
          <div className="flex gap-2">
            <p>Status:</p>
            <span className="text-red-700">{status}</span>
          </div>
          <Button size="sm" className="w-20 text-sm">
            Details
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default SeekerUpcomingBookingCard;
  