import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarathonContext } from '../../Contexts/MarathonProvider';
import AllMarathonCard from './AllMarathonCard';


const MarathonTable = () => {
    const { marathons, setMarathons } = useContext(MarathonContext);
    const [sortOrder, setSortOrder] = useState("");


    useEffect(() => {
        const fetchMarathons = async () => {
            const res = await fetch('http://localhost:5000/marathons');
            const data = await res.json();

            setMarathons(data);
            // console.log(data);
        }

        fetchMarathons();
    }, []);


    const handleSortMarathons = () => {
        const sortedMarathons = [...marathons].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.runningDistance - b.runningDistance; // Ascending order
            }
            else {
                return b.runningDistance - a.runningDistance; // Descending order
            }
        });

        setMarathons(sortedMarathons);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    };


    return (
        <div className='w-[90%] mx-auto mt-14     '>
            <div className='flex justify-between items-center   mb-4 md:mb-8 '>
                <h3 className='font-semibold text-black text-2xl ml-1 md:ml-2  dark:text-gray-100 underline  '> All Marathons here </h3>
                <button onClick={handleSortMarathons} className="bg-green-900 dark:bg-green-200 dark:text-black hover:bg-green-400 hover:text-black text-base lg:text-lg transition-colors duration-200 px-6 py-1 font-medium rounded-md text-white"> Sort  </button>
            </div>

            <div className='w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-10'>
                {
                    marathons.map(marathon => (<AllMarathonCard key={marathon._id} marathon={marathon} ></AllMarathonCard>))
                }
            </div>
            

        </div>
    );
};

export default MarathonTable;