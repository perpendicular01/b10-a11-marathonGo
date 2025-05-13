import React from 'react';
import MarathonBanner from '../components/MarathonParts/MarathonBanner';
import MarathonTable from '../components/MarathonParts/MarathonTable';
import { Helmet } from 'react-helmet';

const AllMarathonsPage = () => {
    return (
        <div>
            <Helmet> 
                <title> All Marathons </title>
            </Helmet>
            <MarathonBanner></MarathonBanner>
            <MarathonTable></MarathonTable>
        </div>
    );
};

export default AllMarathonsPage;