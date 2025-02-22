import React from 'react';
import MarathonBanner from '../components/MarathonParts/MarathonBanner';
import MarathonTable from '../components/MarathonParts/MarathonTable';

const AllMarathonsPage = () => {
    return (
        <div>
            <MarathonBanner></MarathonBanner>
            <MarathonTable></MarathonTable>
        </div>
    );
};

export default AllMarathonsPage;