import { useRef, useEffect, useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Graph() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  // Handle scroll shadows
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
  };

  // Check for overflow on mount and resize
  useEffect(() => {
    const checkForOverflow = () => {
      if (!scrollContainerRef.current) return;
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightShadow(scrollWidth > clientWidth);
    };

    checkForOverflow();
    window.addEventListener("resize", checkForOverflow);
    return () => window.removeEventListener("resize", checkForOverflow);
  }, []);
  return (
    <div className="relative w-full">
      {/* Left shadow indicator */}
      {showLeftShadow && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Right shadow indicator */}
      {showRightShadow && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}

      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto scrollbar-thin"
        onScroll={handleScroll}
      >
        {/* Y-axis labels */}
        <div className="grid grid-cols-1 grid-rows-5 gap-2 relative text-xs sticky left-0 bg-background z-10">
          <div className="w-10 aspect-square flex items-center justify-center">
            200
          </div>
          <div className="w-10 aspect-square flex items-center justify-center">
            100
          </div>
          <div className="w-10 aspect-square flex items-center justify-center">
            50
          </div>
          <div className="w-10 aspect-square flex items-center justify-center">
            0
          </div>
        </div>

        <div className="ml-10 flex w-full gap-2">
          {/* Month columns */}
          {months.map((month, index) => (
            <div
              key={index}
              className="grid grid-cols-2 grid-rows-5 gap-2 relative min-w-[84px]"
            >
              <div className="w-10 aspect-square border rounded-md"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-200"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-100"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-200"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-400"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-400"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-400"></div>
              <div className="w-10 aspect-square border rounded-md bg-blue-400"></div>
              <p className="text-xs text-center col-span-2">{month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Graph;
