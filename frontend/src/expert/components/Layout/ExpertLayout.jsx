// SeekerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ExpertNavbar from './ExpertNavbar';
import ExpertSidebar from './ExpertSidebar';
const ExpertLayout = () => {

  return (
    <div className='expert max-w-screen-2xl mx-auto md:px-10 relative'>
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
        
        <div id='seeker-scroll' className='flex-1 h-screen hidescroll md:px-10 px-2 py-4 md:py-1 lg:ml-68 overflow-y-auto'>
  <div className="mb-20">
    <Outlet />
    {/* <div className='fixed bottom-0 left-0 right-0'>    <SeekerMobileFooter/>
    </div> */}
  </div>
</div>

      </div>
    </div>
  );
};

export default ExpertLayout;

// SeekerNavbar.jsx - No changes needed to this component itself
// as the fixed positioning is handled in the layout component