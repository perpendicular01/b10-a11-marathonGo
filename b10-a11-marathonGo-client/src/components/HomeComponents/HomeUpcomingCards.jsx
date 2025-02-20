import React, { useEffect, useState } from 'react';

import UpcomingMarathonCard from '../MarathonParts/UpcomingMarathonCard';

const HomeUpcomingCards = () => {
    const [marathons, setMarathons] = useState([])

    useEffect(()=> {
        const fetchMarathons = async() => {
            const res = await fetch('http://localhost:5000/marathons');
            const data = await res.json()
            const today = new Date()

            // Filter only running campaigns
             const upcomingMarathons = data.filter(marathon => new Date(marathon.marathonStartDate) > today);
            console.log(upcomingMarathons)
             setMarathons(upcomingMarathons.slice(0, 6));
        }

        fetchMarathons();

    }, [])

    
    
    return (
        <div>

            <h2 className='text-red-950 dark:text-white mx-auto text-center text-xl md:text-2xl lg:text-3xl font-bold mb-8 mt-10 md:mb-12'> Upcoming Marathons </h2>
            

            <div className='w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-10'>
                {
                    marathons.map(marathon => (<UpcomingMarathonCard key={marathon._id} marathon={marathon} ></UpcomingMarathonCard>))
                }
            </div>
        </div>
    );
};

export default HomeUpcomingCards;