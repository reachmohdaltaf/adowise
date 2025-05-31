import { ConfettiButton } from '@/components/magicui/confetti'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PiStarFourFill } from "react-icons/pi";

const LeadRocketCard = () => {
  const [starPositions] = useState([
    { top: '20%', left: '20%', size: 44 },  // Big star at a fixed position
    { top: '10%', left: '90%', size: 16 },  // Small star at a fixed position
    { top: '90%', left: '90%', size: 32 },  // Big star at a fixed position
    { top: '60%', left: '10%', size: 10 },  // Big star at a fixed position
  ]);

useEffect(() => {
  const timeout = setTimeout(() => {
    const confetti = document.querySelector('.confetti-button');
    if (confetti) {
      confetti.click(); // trigger confetti after slight delay
    }
  }, 300); // wait a bit to ensure it's rendered

  return () => clearTimeout(timeout);
}, []);

  

  return (
    <Card className="expert bg-primary h-92 w-full  md:w-1/2 rounded-md text-primary-foreground p-4 flex flex-col  items-center gap-4 relative">
     <div className=''>
</div>

      <div className="w-24 h-24 aspect-square  rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-3xl font-bold shadow-inner">
        <img src="/rocket.gif" className="h-20" />
      </div>
      <h1 className="text-2xl font-semibold text-center">
        You're Ready to Lead!
      </h1>
      <p className="text-sm text-muted text-center">
        Share your expertise and make an impact. Announce your page to the world!
      </p>
     <Link className='w-full' to={'/userId'}> <Button variant="outline" className="w-full  mt-2 text-foreground font-medium rounded-lg">
        Your Page <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button></Link>
      <ConfettiButton className="confetti-button absolute top-20 z-0 opacity-0">
        🎉
      </ConfettiButton>

      {/* Render 3 fixed stars at specified positions */}
      {starPositions.map((position, index) => (
        <PiStarFourFill
          key={index}
          size={position.size}
          className="absolute"
          style={{
            top: position.top,
            left: position.left,
            transform: 'translate(-50%, -50%)', // Centers the star on its position
          }}
        />
      ))}

      <Link className="text-sm underline underline-offset-4 mt-2">
        Add your page to LinkedIn
      </Link>
    </Card>
  );
};

export default LeadRocketCard;
