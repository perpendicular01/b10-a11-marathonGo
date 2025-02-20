import React from 'react';
import HomeBanner from '../components/HomeComponents/HomeBanner';
import HomeMission from '../components/HomeComponents/HomeMission';
import HomeMarathonCards from '../components/HomeComponents/HomeMarathonCards';

const HomePage = () => {
    return (
        <div >
            <div className='mt-10'>
                <HomeBanner></HomeBanner>
            </div>
            <div className='pb-10'>
                <HomeMission></HomeMission>
            </div>
            <div>
                <HomeMarathonCards></HomeMarathonCards>
            </div>
        </div>
    );
};

export default HomePage;