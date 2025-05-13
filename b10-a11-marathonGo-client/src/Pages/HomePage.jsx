import React from 'react';
import HomeBanner from '../components/HomeComponents/HomeBanner';
import HomeMission from '../components/HomeComponents/HomeMission';
import HomeMarathonCards from '../components/HomeComponents/HomeMarathonCards';
import HomeUpcomingCards from '../components/HomeComponents/HomeUpcomingCards';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomePage = () => {
    return (
        <div >
            <Helmet>
                <title> Home </title>
            </Helmet>
            
            <div className='mt-10'>
                <HomeBanner></HomeBanner>
            </div>
            <div className='pb-10'>
                <HomeMission></HomeMission>
            </div>
            <div className='pb-10'>
                <HomeMarathonCards></HomeMarathonCards>
            </div>
            <div>
                <section className="bg-[rgb(38,67,97)]">
                    <h2 className="w-[85%] md:w-[80%] lg:w-[60%] mx-auto text-white pt-6 md:pt-10 pb-4 md:pb-6 font-semibold text-sm md:text-base lg:text-2xl text-center">
                    Embark on an exhilarating journey by participating in thrilling marathons, push your limits, embrace the challenge, and become part of an unforgettable 
                    running experience that will leave you with lasting memories and a sense of accomplishment!
                    </h2>
                    <div className="pb-6 md:pb-10">
                        <Link to="/addMarathon">
                            <button className="text-black bg-[#F2EEE0] hover:bg-[#a19e94] text-sm lg:text-lg font-medium rounded-xl py-1 md:py-2 px-3 md:px-4 flex items-center justify-center mx-auto gap-1">
                                Host a Marathon
                            </button>
                        </Link>
                    </div>
                </section>
            </div>

            <div>
                <HomeUpcomingCards></HomeUpcomingCards>
            </div>

        </div>
    );
};

export default HomePage;