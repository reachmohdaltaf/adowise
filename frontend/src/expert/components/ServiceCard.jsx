import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2, Edit2, Eye, EyeIcon, Share2, Trash2, VideoIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { TbMessageStar } from "react-icons/tb";


const ServiceCard = ({ service }) => {
  return (
    <Card
      className={
        "gap-0 shadow-sm cursor-pointer hover:bg-gradient-to-tr duration-200 hover:from-muted hover:to-background hover:shadow-sm transition px-6 py-4"
      }
    >
      <CardTitle className={"px-0"}>
        
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
          <p className="">{service.title}</p>
            <div className="flex items-center justify-start gap-2">
          
            <p className="text-xs text-destructive border-r-1 w-10">₹ {service.amount}</p>
            {service.type === "1:1" && (
          <div className="text-xs  text-destructive">
           {service.duration} (mins)
          </div>
        )}
            </div>
          </div>
          <div className="flex gap-1 items-center text-destructive">
            <Eye size={16} />{" "}
            <span className="text-sm text-destructive">Public</span>
          </div>
          
        </div>
      </CardTitle>
    <CardContent className="px-0 py-2">
  <CardDescription className="text-destructive line-clamp-2 font-normal w-full break-words">
    {service.description || "No description"}
  </CardDescription>

  <div className="flex  flex-wrap  gap-2 mt-2">
    {service.tags?.slice(0, 3).map((tag, index) => (
      <Button
      variant={"outline"}
        key={index}
        disabled
        className=" text-sm  h-6 disabled:opacity-80 border-1 text-foreground px-2 py-1 rounded-full"
      >
        {tag}
      </Button>
    ))}
  </div>
</CardContent>

      <CardFooter className={"px-0 gap-1 pt-2 mb-0 pb-0 items-end  justify-between"}>
      <div className="flex gap-3 justify-baseline items-center">
      {service.type === "1:1" ? <VideoIcon className="" size={20} /> : <TbMessageStar size={20} />}
      <p className="text-destructive text-xs">
    Posted {formatDistanceToNow(new Date(service.createdAt), { addSuffix: true })}
  </p>
</div>

        <div className="flex gap-1">
          <Button className={"bg-muted"} variant={"ghost"}>
            <BarChart2 />
          </Button>
          <Link to={`/expert/dashboard/services/update/${service._id}`}>

          <Button className={"bg-muted"} variant={"ghost"}>
            <Edit2 />
          </Button>          </Link>

          <Button className={"bg-muted"} variant={"ghost"}>
            <Share2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
