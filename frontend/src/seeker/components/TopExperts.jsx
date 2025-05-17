import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const experts = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: '/logo.svg',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    image: '/logo.svg',
  },
  {
    id: 4,
    name: 'Emily Rose',
    image: '/logo.svg',
  },
  {
    id: 5,
    name: 'Michael Scott',
    image: '/logo.svg',
  },
  {
    id: 6,
    name: 'Angela White',
    image: '/logo.svg',
  },
  {
    id: 7,
    name: 'David Lee',
    image: '/logo.svg',
  },
  {
    id: 8,
    name: 'Sophia Green',
    image: '/logo.svg',
  },
];

const TopExperts = () => {
  return (
    <div className="flex gap-2 hidescroll overflow-x-auto  hide-scrollbar">
      {experts.map((expert) => (
        <Card key={expert.id} className="min-w-[130px] sm:min-w-[150px] p-2">
          <CardContent className="flex flex-col items-center">
            <img
            loading='lazy'
              src={expert.image}
              alt={expert.name}
              className="h-20 w-24 rounded-full object-cover"
            />
            <p className="mt-2 text-sm font-semibold text-center">{expert.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopExperts;
