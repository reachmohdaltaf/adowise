import React from 'react';
import { Star, MessageSquare, Users, Video } from 'lucide-react';
import { TbMessageStar } from 'react-icons/tb';

const ExpertShowcaseCard = ({
  title,
  price,
  rating,
  description,
  image,
  author,
  type,
}) => {
  return (
    <div className="w-full cursor-pointer hover:shadow-md duration-300 transition  mx-auto h-full min-h-44 flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
      <div className="p-2 pb-3 flex flex-col justify-between flex-1">
        <div className="flex gap-3">
          {/* Profile Image */}
          <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full rounded-sm object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              {/* Rating and Duration */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-primary/60 expert text-foreground px-1 rounded text-sm font-medium">
                  <Star size={10} fill="currentColor" />
                  <span className="text-xs">{rating || '3.5'}</span>
                </div>
                <span className="text-gray-500 text-xs">30 mins</span>
              </div>

              {/* Title */}
            <h3 className="text-lg sm:text-sm lg:text-sm xl:text-lg h-12 font-semibold text-[#383838] leading-tight mb-2 line-clamp-2">

                {title}
              </h3>

              {/* Description */}
              <p className="text-[#383838] text-xs font-normal leading-relaxed mb-2 line-clamp-2">
                {description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-[#383838] mb-3">
                <div className="flex items-center gap-1">
                  <MessageSquare size={14} className='text-[#383838]' />
                  <span className="text-xs font-normal">251 reviews</span>
                </div>
               {type === "1:1" ? (
                <div className="flex items-center gap-1">
                  <Video size={14} className='text-[#383838]' />
                  <span className="text-xs font-normal">Schedule a 1:1</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <TbMessageStar size={14} className='text-[#383838]' />
                  <span className="text-xs font-normal">Send Dm</span>
                </div>
              )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-normal text-gray-600">
                by: <span className="text-gray-900 font-medium">{author}</span>
              </div>
              <div className="text-sm font-normal text-gray-900">₹{price}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertShowcaseCard;
