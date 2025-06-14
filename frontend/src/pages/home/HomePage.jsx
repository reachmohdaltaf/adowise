import { Marquee } from '@/components/magicui/marquee';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
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
      <div className='pt-18 md:pt-22 h-full'>
        <section className='flex gap-6 md:gap-8 px-2 flex-col pt-8 md:pt-14 items-center '>
          <div className='flex text-center md:w-2/3 flex-col items-center'>
            <h2 className='text-[2.8rem] leading-12 md:text-6xl font-medium'>
              Instant Access to Wise <span>Minds</span>
            </h2>
            <p className='font-normal mt-2 text-destructive text-xs md:text-sm'>
              Don't navigate your journey alone – get 1:1 guidance and more from proven experts in tech, business, and beyond.
            </p>
          </div>

         <div className='flex items-center justify-center w-full px-2'>
           <div className="relative w-full md:w-1/2 px-2 transition-transform duration-400 transform scale-105 focus-within:scale-110">
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
         </div>

          {/* ✅ Top Tags Section */}
          <div className="flex flex-col items-center gap-3 w-full md:px-3">
            {/* 👇 Show only 1st row on small screens */}
            <div className="flex flex-wrap gap-2 justify-center w-full sm:w-auto md:hidden">
              {pyramidRows[0].map((tag, tagIndex) => (
                <Button
                  key={tagIndex}
                  variant="outline"
                  className="rounded-full shadow-none border bg-transparent text-xs sm:text-sm px-2 sm:px-4 py-1 whitespace-nowrap"
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

        {/* Second Section - Removed min-h-screen */}
        <section className="mt-10 md:mt-32 py-10 flex justify-center">
          <div className="flex flex-col  py-10 bg-accent w-full px-2 md:px-4 items-center">
            <h3 className="text-[2.8rem] leading-12 md:text-6xl font-medium text-center px-4">
              <span>Advice</span> That Actually Helps
            </h3>
            <p className="font-normal text-destructive text-xs md:text-sm text-center mt-4 px-6 max-w-xl">
              Whether it's interviews, burnout, or direction — find real, actionable guidance from people who've been there.
            </p>

            {/* Stats Section */}
            <div className="mt-10 bg-background rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-center  px-6 py-6">
              
              {/* Services Delivered */}
              <div className="rounded-xl px-2 md:px-8 py-6 text-center">
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

      {/* Testimonials Section */}
<section className="relative mt-14 py-10 flex flex-col items-center bg-white dark:bg-black overflow-hidden">
  <h2 className="text-[2.2rem] leading-10 md:text-6xl font-medium mb-10 text-center">
    <span>When</span> Guidance Meets Action
  </h2>

  {/* ✅ Vertical for small screens */}
<div className="block md:hidden w-full h-[200px] overflow-hidden px-4">
  <marquee
    behavior="scroll"
    direction="up"
    scrollamount="2"
    className="space-y-4"
  >
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="mb-4">
        <Card className="p-5 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <CardContent className="p-0">
            <p className="text-gray-700 dark:text-gray-300 italic mb-3 text-sm">
              {item % 2 === 0
                ? '"Helpful and insightful guidance."'
                : '"This platform gave me clarity and real direction. I\'m actually seeing progress now."'}
            </p>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {item % 2 === 0 ? 'Ali Khan' : 'John Doe'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item % 2 === 0 ? 'Student' : 'Full Stack Developer'}
            </div>
          </CardContent>
        </Card>
      </div>
    ))}
  </marquee>
</div>


  {/* ✅ 3 Marquees for large screens */}
  <div className="hidden md:flex flex-col  w-full relative">
    {[0, 1, 2].map((rowIndex) => (
      <div key={rowIndex} className="relative w-full">
        <Marquee pauseOnHover speed={50}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Card
              key={`${rowIndex}-${item}`}
              className={`p-5 rounded-2xl border-gray-200 dark:border-neutral-700 ${
                item % 2 === 0
                  ? 'min-w-[200px] max-w-xs bg-white dark:bg-neutral-800'
                  : 'min-w-[280px] max-w-sm bg-white dark:bg-neutral-900'
              }`}
            >
              <CardContent className="p-0">
                <p className="text-gray-700 dark:text-gray-300 italic mb-3 text-sm sm:text-base">
                  {item % 2 === 0
                    ? '"Helpful and insightful guidance."'
                    : '"This platform gave me clarity and real direction. I\'m actually seeing progress now."'}
                </p>
                <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {item % 2 === 0 ? 'Ali Khan' : 'John Doe'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item % 2 === 0 ? 'Student' : 'Full Stack Developer'}
                </div>
              </CardContent>
            </Card>
          ))}
        </Marquee>

        {/* Shadow overlays for each row */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />
      </div>
    ))}
  </div>
</section>



        {/* Fourth Section - Changed from h-screen to py-16 */}
        <section className="py-16 flex flex-col items-center px-4">
          <h3 className="text-4xl md:text-6xl font-bold mb-12 text-center">
            Learn from the Best in the Field
          </h3>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
  {[1, 2, 3, 4].map((mentor) => (
    <Card
      key={mentor}
      className="p-6 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-md flex flex-col items-center text-center"
    >
      {/* 👤 Profile Image */}
      <img
        src={`/mentors/mentor-${mentor}.jpg`} // <-- update path as per your project
        alt={`Mentor ${mentor}`}
        className="w-20 h-20 rounded-full object-cover mb-4"
      />

      {/* Mentor Info */}
      <h4 className="text-xl font-semibold mb-1">Mentor Name {mentor}</h4>
      <p className="text-gray-600 dark:text-gray-300 italic text-sm mb-2">
        Expert in Full Stack Development
      </p>
      <p className="text-gray-800 dark:text-gray-100 text-sm">
        Helping you master coding with practical advice and guidance.
      </p>
    </Card>
  ))}
</div>

        </section>
      </div>
    )
  }

export default HomePage