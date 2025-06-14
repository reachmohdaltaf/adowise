import React from 'react';


const TestimonialCard = ({ name, role, message, image }) => {
  return (
    <div className="bg-background rounded-2xl shadow-md p-6 max-w-sm w-full transition hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-destructive">{role}</p>
        </div>
      </div>
      <p className="mt-4 text-">“{message}”</p>
    </div>
  );
};

export default TestimonialCard;
