import React from 'react';
import banner from '../../assets/banner4.jpg'; // Replace with a suitable marathon image
import { Link } from 'react-router-dom';

const MarathonBanner = () => {
    return (
        <div className="bg-[#E7E8D1] dark:bg-gray-600  rounded-2xl w-[95%] md:w-[90%] mx-auto pt-12 lg:pt-20 pb-12 py-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                {/* Left Section */}
                <div className="text-center space-y-4 lg:w-1/2 md:w-[70%] w-[90%] mx-auto">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                        Join an Exciting Marathon Today!
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-200 md:w-[60%] text-center mx-auto">
                        Challenge yourself, push your limits, and experience the thrill of a marathon. 
                        Sign up for upcoming events, race through breathtaking routes, and become part of a vibrant running community.
                    </p>
                    <Link to="/">
                        <button className="bg-[#FFF2C2] text-black text-sm md:text-base px-3 py-1 md:px-6 md:py-2 mt-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                            Explore Marathons
                        </button>
                    </Link>
                </div>
                {/* Right Section */}
                <div className="mt-8 lg:mt-0 lg:w-1/2 mx-auto flex justify-center items-center">
                    <img
                        src={banner}
                        alt="Marathon Event"
                        className="w-full lg:w-[70%] md:h-[200px] lg:h-[300px] rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default MarathonBanner;
