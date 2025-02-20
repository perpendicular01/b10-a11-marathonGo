import React from 'react';
import { Link } from 'react-router-dom';

const MarathonCard = ({ marathon }) => {
  const { _id: id, title, location, marathonImage } = marathon
  // console.log(marathonImage)
  return (
    <div className="max-w-sm rounded-2xl shadow-lg bg-[#A7BEAE] dark:bg-gray-800 p-4 flex flex-col justify-between">
      <div>
        <img
          src={marathonImage}
          className="w-[97%] h-48 mx-auto rounded-xl object-cover"
        />
        <div className="mt-4 space-y-2 ">
          <h2 className="text-xl font-bold text-black dark:text-gray-300">{title}</h2>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-300">
            Location: <span className="text-red-950 font-bold dark:text-gray-300">{location}</span>
          </h2>
          
        </div>
      </div>
      <Link to={`/marathon/${id}`}>
        <button className="mt-4 w-full bg-[#FFF2C2] text-black font-medium py-2 px-4 rounded-lg hover:bg-yellow-200 transition duration-300">
          See Details 
        </button>
      </Link>

    </div>

  );
};

export default MarathonCard;