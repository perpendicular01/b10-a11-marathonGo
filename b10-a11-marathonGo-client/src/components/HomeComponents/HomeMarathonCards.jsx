import React, { useEffect, useState } from 'react';
import MarathonCard from '../MarathonParts/MarathonCard';

const HomeMarathonCards = () => {
    const [marathons, setMarathons] = useState([])

    useEffect(()=> {
        const fetchMarathons = async() => {
            const res = await fetch('https://b10-a11-marathon-go-server.vercel.app/marathons/highlighted');
            const data = await res.json()
            
            
    
            setMarathons(data);
            // console.log(data)
        }

        fetchMarathons();

    }, [])

    
    
    return (
        <div>

            <h2 className='text-red-950 dark:text-white mx-auto text-center text-xl md:text-2xl lg:text-3xl font-bold mb-8 mt-10 md:mb-12'> Highlighted Marathons </h2>
            

            <div className='w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-10'>
                {
                    marathons.map(marathon => (<MarathonCard key={marathon._id} marathon={marathon} ></MarathonCard>))
                }
            </div>
        </div>
    );
};

export default HomeMarathonCards;