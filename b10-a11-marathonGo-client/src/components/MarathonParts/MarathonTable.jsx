import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarathonContext } from '../../Contexts/MarathonProvider';
import AllMarathonCard from './AllMarathonCard';


const MarathonTable = () => {
    const { marathons, setMarathons } = useContext(MarathonContext);
    const [sortOrder, setSortOrder] = useState('desc')



    useEffect(() => {
        const fetchMarathons = async () => {
            const res = await fetch(`https://b10-a11-marathon-go-server.vercel.app/marathons?sort=${sortOrder}`);
            const data = await res.json();

            setMarathons(data);
            // console.log(data);
        }

        fetchMarathons();
    }, [sortOrder]);


    const toggleSortOrder = () => {
        setSortOrder(it => (it === 'desc' ? 'asc' : 'desc'));
    };




    return (
        <div className='w-[90%] mx-auto mt-14     '>
            <div className='flex justify-between items-center   mb-4 md:mb-8 '>
                <h3 className='font-semibold text-black text-2xl ml-1 md:ml-2  dark:text-gray-100 underline  '> All Marathons here </h3>
                <button
                    onClick={toggleSortOrder}
                    className="bg-green-900 dark:bg-green-200 dark:text-black hover:bg-green-400 hover:text-black text-base lg:text-lg transition-colors duration-200 px-6 py-1 font-medium rounded-md text-white"
                >
                    Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                </button>
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