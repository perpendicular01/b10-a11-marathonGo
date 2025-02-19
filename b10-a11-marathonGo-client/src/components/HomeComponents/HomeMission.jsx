import Lottie from 'lottie-react';
import React from 'react';
import animation from '../../assets/runn.json'
const HomeMission = () => {
    return (
        <div>
            <section className="w-[95%] bg-[#E7E8D1] md:w-[70%] lg:w-[60%] mx-auto px-20 py-10 rounded-2xl">

                <h3 className="text-xl lg:text-3xl text-blue-950 font-bold mb-4 dark:text-gray-200 text-center">
                The Impact of Marathons
                </h3>

                <div className='w-[25%] mx-auto h-[20%]'>
                    <Lottie animationData={animation} loop={true} />;
                </div>

                <p className="w-[95%] mx-auto lg:w-[90%] text-gray-800 dark:text-gray-300 text-sm lg:text-xl leading-relaxed text-center">
                    Running a marathon is more than just a race—it's a journey of determination, discipline, and community. It strengthens the body, clears the mind, and unites people with a shared goal of pushing limits and celebrating endurance.
                </p>




            </section>
        </div>
    );
};

export default HomeMission;

// sm:w-[65%] md:w-[35%] 