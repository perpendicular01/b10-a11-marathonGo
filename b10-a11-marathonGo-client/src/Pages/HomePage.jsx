import React from 'react';
import HomeBanner from '../components/HomeComponents/HomeBanner';
import HomeMission from '../components/HomeComponents/HomeMission';

const HomePage = () => {
    return (
        <div >
            <div className='mt-10'>
                <HomeBanner></HomeBanner>
            </div>
            <div className='pb-10'>
                <HomeMission></HomeMission>
            </div>
        </div>
    );
};

export default HomePage;