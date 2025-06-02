// SeekerLayout.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ExpertNavbar from './ExpertNavbar';
import ExpertSidebar from './ExpertSidebar';
import ExpertMobileFooter from './ExpertMobileFooter';
const ExpertLayout = () => {
  const containerRef = useRef();
  const lastScrollTop = useRef(0); // for detecting scroll direction
  const [showFooter, setShowFooter] = useState(true); // for showing/hiding footer

    // Scroll detection logic
  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop.current) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }

    lastScrollTop.current = scrollTop;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  return (
    <div className='expert  max-w-screen-2xl mx-auto md:px-10 relative'>
      {/* Fixed navbar container */}
      <div className="fixed top-0 left-0 right-0 z-30 ">
        <div className="max-w-screen-2xl bg-background mx-auto">
          <ExpertNavbar />
        </div>  
      </div>
      
      <div className='pt-12'>
        <div className='lg:flex hidden'>
          <div className="fixed ">
            <ExpertSidebar  />
          </div>
        </div>
        
<div
  id='seeker-scroll'
  ref={containerRef} // ← Attach ref here
  className='flex-1 h-screen hidescroll md:px-10 px-0  lg:ml-68 '
>
  <div className="mb-20 px-2">
    <Outlet />
    
  </div>
   <div
        className={`md:hidden fixed bottom-0 w-full transition-transform duration-500 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <ExpertMobileFooter />
      </div>
</div>

      </div>
    </div>
  );
};

export default ExpertLayout;

// SeekerNavbar.jsx - No changes needed to this component itself
// as the fixed positioning is handled in the layout component