import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingMarathonCard = ({ marathon }) => {
  const { _id: id, title, location, marathonImage, startRegistrationDate, endRegistrationDate, marathonStartDate } = marathon
//   console.log(marathonImage)
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

        <div>
            <h2 className="text-base lg:text-lg font-medium text-gray-800 dark:text-gray-300 mt-2">
                Registration Start: <span className="font-medium text-blue-800">{new Date(startRegistrationDate).toISOString().split("T")[0]}</span>
            </h2>
            <h2 className="text-base lg:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2 ">
                Registration End: <span className="font-medium text-blue-800">{new Date(endRegistrationDate).toISOString().split("T")[0]}</span>
            </h2>

            <h2 className="text-base lg:text-lg font-medium text-red-900">
                Marathon Date: <span className="font-bold text-red-600">{new Date(marathonStartDate).toISOString().split("T")[0]}</span>
            </h2>
            
        </div>
      </div>
      

    </div>

  );
};

export default UpcomingMarathonCard;