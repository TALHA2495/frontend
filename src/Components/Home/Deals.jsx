import React, { useEffect, useState } from "react";

import watch from "../../assets/Image/tech/image 29.png";
import laptop from "../../assets/Image/tech/image 32.png";
import camera from "../../assets/Image/tech/6.png";
import headphone from "../../assets/Image/tech/8.png";
import canon from "../../assets/Image/tech/6.png";

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60); // seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert seconds → h m s
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const deals = [
    { name: "Smart watches", discount: "-25%", image: watch },
    { name: "Laptops", discount: "-15%", image: laptop },
    { name: "GoPro cameras", discount: "-40%", image: camera },
    { name: "Headphones", discount: "-25%", image: headphone },
    { name: "Canon cameras", discount: "-25%", image: canon },
  ];

  return (
    <div className="container mx-auto px-4 py-4 w-full">
      <div className="bg-white border border-gray-200 rounded-md flex flex-col lg:flex-row h-auto">
        {/* Count down side */}
        <div className="w-full lg:w-[280px] p-4 lg:p-5 border-b lg:border-b-0 lg:border-r border-gray-200 flex items-center justify-between lg:block">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Deals and offers
            </h3>
            <p className="text-gray-500 text-sm mb-0 lg:mb-4">
              Electronic equipments
            </p>
          </div>

          <div className="flex gap-1.5 md:gap-2">
            <div className="bg-gray-100 md:bg-gray-800 text-gray-600 md:text-white rounded p-1.5 md:p-2 min-w-[42px] text-center border border-gray-200 md:border-0">
              <div className="font-bold text-sm md:text-lg leading-tight">
                {String(hours).padStart(2, "0")}
              </div>

              <div className="text-[10px] md:text-xs">Hour</div>
            </div>
            <div className="bg-gray-100 md:bg-gray-800 text-gray-600 md:text-white rounded p-1.5 md:p-2 min-w-[42px] text-center border border-gray-200 md:border-0">
              <div className="font-bold text-sm md:text-lg leading-tight">
                {String(minutes).padStart(2, "0")}
              </div>

              <div className="text-[10px] md:text-xs">Min</div>
            </div>
            <div className="bg-gray-100 md:bg-gray-800 text-gray-600 md:text-white rounded p-1.5 md:p-2 min-w-[42px] text-center border border-gray-200 md:border-0">
              <div className="font-bold text-sm md:text-lg leading-tight">
                {String(seconds).padStart(2, "0")}
              </div>

              <div className="text-[10px] md:text-xs">Sec</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:flex-1 flex overflow-x-auto no-scrollbar lg:grid lg:grid-cols-5 divide-x divide-gray-200">
          {deals.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[140px] flex-shrink-0 lg:min-w-0 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="h-[100px] lg:h-[120px] w-full flex items-center justify-center mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h4 className="text-gray-900 text-sm font-medium mb-1 truncate w-full px-2">
                {item.name}
              </h4>
              <span className="bg-red-100 text-red-600 px-3 py-0.5 rounded-full text-xs font-semibold">
                {item.discount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
