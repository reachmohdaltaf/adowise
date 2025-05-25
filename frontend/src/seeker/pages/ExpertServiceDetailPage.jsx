import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, ArrowUp, Timer } from "lucide-react";

const ExpertServiceDetails = () => {
  const { username, id } = useParams();
  const dispatch = useDispatch();
  const { service, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServiceById(id));
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div>Error: {error.message || "Failed to load service"}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="px-4 text-forground md:px-10 py-6 bg-primary min-h-screen flex gap-4 items-start justify-center">
      <Button
        variant={"outline"}
        className={"py-6 absolute left-6 md:left-10  md:top-12"}
      >
        <ArrowUp /> Visit Page
      </Button>
      <div className=" mt-20 flex items-start gap-3 justify-between w-full md:w-2/3 h-full">
        <Card className="w-full gap-0 py-0 rounded-4xl h-fit text-start">
          <CardHeader className="px-6 flex justify-between py-6 rounded-t-4xl bg-muted h-fit">
            <div className="px-2 ">
              <h1 className=" text-2xl md:text-2xl font-bold">
                {service.title}
              </h1>
              <p className="text-sm text-destructive">@{username}</p>
              <p className="text-2xl md:text-2xl flex justify-between mt-3">
                ₹{service.amount}
                <span className="text-destructive flex items-center font-normal  text-sm md:text-lg gap-1">
                  <Timer /> {service.duration} mins meeting
                </span>
              </p>
            </div>
          <div className="flex items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center bg-muted">
              <img
                src="https://dummyimage.com/600x400/000/fff"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </CardHeader>

          <CardContent className="space-y-4 text-start items-start p-6">
            <div className="text-lg md:text-lg font-normal text-destructive">
              {service.description.split("\n").map((line, index) => (
                <p key={index} className="mb-2 font-normal">
                  {line}
                </p>
              ))}
            </div>
            {/* tags */}
            <div>
              <div className="flex gap-2 mt-4">
                {Array.isArray(service.tags) &&
                  service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm py-2 px-4 rounded-full bg-muted"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
            <Button className="w-full shimmer-button py-6 mt-10">
              See Availability 
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertServiceDetails;
