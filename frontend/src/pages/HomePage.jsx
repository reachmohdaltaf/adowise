import { NumberTicker } from '@/components/magicui/number-ticker';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendHorizonal } from 'lucide-react'
import React from 'react'

 const allTags = [
    "Frontend", "AI", "Marketing", "Career", "Design", "Startup",
    "DevOps", "Finance", "Leadership", "NoCode", "Web3",
    "Product", "UI/UX", "ML", "Cloud", "JavaScript", "Python"
  ];

  const buildPyramid = (tags) => {
    let result = [];
    let rowCount = 8;
    let index = 0;

    while (index < tags.length && rowCount > 0) {
      const row = tags.slice(index, index + rowCount);
      result.push(row);
      index += rowCount;
      rowCount--;
    }

    return result;
  };
  const pyramidRows = buildPyramid(allTags);

  const HomePage = () => {
    return (
      <div className='pt-20  h-full'>
        <section className='flex gap-6 md:gap-8 px-2 flex-col pt-8 md:pt-14 items-center '>
          <div className='flex text-center md:w-2/3 flex-col items-center'>
            <h2 className='text-4xl md:text-6xl font-medium'>
              Instant Access to Wise <span>Minds</span>.
            </h2>
            <p className='font-normal text-destructive text-xs md:text-sm'>
              Don't navigate your journey alone – get 1:1 guidance and more from proven experts in tech, business, and beyond.
            </p>
          </div>

          <div className="relative  w-full  md:w-1/2 px-2  transition-transform duration-400 transform scale-105 focus-within:scale-110">
            <Input
              type="text"
              placeholder="Findby skill, name, or interest..."
              className="pr-12 h-12 rounded-full shadow-none "
            />
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-2 h-auto"
              type="submit"
              variant={'colored'}
            >
              <SendHorizonal size={20} />
            </Button>
          </div>

      {/* ✅ Top Tags Section */}
<div className="flex flex-col items-center gap-3 w-full md:px-3">
  {/* 👇 Show only 1st row on small screens */}
  <div className="flex flex-wrap gap-2 justify-center w-full sm:w-auto md:hidden">
    {pyramidRows[0].map((tag, tagIndex) => (
      <Button
        key={tagIndex}
        variant="outline"
        className="rounded-full shadow-none border bg-transparent text-xs sm:text-sm px-3 sm:px-4 py-1 whitespace-nowrap"
      >
        {tag}
      </Button>
    ))}
  </div>

  {/* 👇 Show 1st + 2nd row on medium and up */}
  <div className="hidden md:flex flex-col gap-3 items-center">
    {pyramidRows.slice(0, 2).map((row, rowIndex) => (
      <div key={rowIndex} className="flex flex-wrap gap-2 justify-center w-full sm:w-auto">
        {row.map((tag, tagIndex) => (
          <Button
            key={tagIndex}
            variant="outline"
            className="rounded-full shadow-none border bg-transparent text-sm px-4 py-1 whitespace-nowrap"
          >
            {tag}
          </Button>
        ))}
      </div>
    ))}
  </div>
</div>



        </section>
    <section className="mt-10 py-10 min-h-screen flex justify-center">
  <div className="flex flex-col pt-10 bg-accent w-full px-4 items-center">
    <h3 className="text-4xl md:text-6xl font-medium text-center px-4">
      Advice That Actually Helps
    </h3>
    <p className="font-normal text-destructive text-xs md:text-sm text-center mt-4 px-6 max-w-xl">
      Whether it’s interviews, burnout, or direction — find real, actionable guidance from people who’ve been there.
    </p>

    {/* Stats Section */}
    <div className="mt-10 bg-background rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-center px-4 py-6">
      
      {/* Services Delivered */}
      <div className="rounded-xl px-8 py-6 text-center">
        <h4 className="text-4xl md:text-5xl font-normal">
          <NumberTicker value={100} />k+
        </h4>
        <p className="text-sm md:text-base text-gray-600 mt-2">Expert Services Delivered</p>
      </div>

      {/* Testimonials */}
      <div className="rounded-xl px-8 py-6 text-center">
        <h4 className="text-4xl md:text-5xl font-normal">
          <NumberTicker value={90} />k+
        </h4>
        <p className="text-sm md:text-base text-gray-600 mt-2">Genuine Testimonials</p>
      </div>

      {/* Trusted By */}
      <div className="rounded-xl px-8 py-6 text-center">
        <h4 className="text-4xl md:text-5xl font-normal">
          <NumberTicker value={20} />k+
        </h4>
        <p className="text-sm md:text-base text-gray-600 mt-2">Trusted by Users Worldwide</p>
      </div>
    </div>

    {/* CTA Button */}
    <div className="mt-6">
      <Button variant="colored" className="py-6 px-8 rounded-md text-base">
        Start Your Journey
      </Button>
    </div>
  </div>
</section>



      </div>
    )
  }

export default HomePage
