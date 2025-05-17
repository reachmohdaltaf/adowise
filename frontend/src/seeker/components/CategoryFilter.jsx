import { Button } from '@/components/ui/button'
import React, { useState, useRef } from 'react'

const CategoryFilter = () => {
  const scrollContainerRef = useRef(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0); // Default selected: first category

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
  };

  const categories = [
    'All', 'Tech', 'Design', 'Marketing', 'Business', 'Product',
    'Growth', 'Sales', 'Data Science', 'AI', 'Cybersecurity', 'Blockchain',
    'Cloud', 'DevOps', 'Software Engineering', 'Web Development', 'Mobile Development',
    'Game Development', 'System Design', 'Machine Learning'
  ];

  return (
    <div className='flex gap-3  realative items-center overflow-x-scroll   hidescroll w-full' ref={scrollContainerRef}>
      {/* filter button backward scroll */}
      <Button size={'lg'} variant={'outline'} onClick={scrollLeft} className=' hidden lg:block cursor-pointer rounded-none absolute shadow-none bg-background  border-none font-bold px-2'>{"<"}</Button>

      {/* category filter buttons */}
      <div className='flex w-fit items-center justify-center  md:px-7 gap-2'>
        {categories.map((category, index) => (
          <Button
          size={'sm'}
            key={index}
            variant={'outline'}
            onClick={() => handleButtonClick(index)}
            className={selectedButtonIndex === index ? 'bg-muted hover:bg-muted hover:text-foreground-muted text-muted-foreground' : ''}>
            {category}
          </Button>
        ))}
      </div>

      {/* filter button forward scroll */}
      <Button size={'lg'} variant={'outline'} onClick={scrollRight} className=' hidden lg:block cursor-pointer font-bold absolute shadow-none bg-background  border-none right-0  px-2 rounded-none'>{">"}</Button>
    </div>
  )
}

export default CategoryFilter
