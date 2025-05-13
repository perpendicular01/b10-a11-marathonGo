import React from 'react';
import RegisForm from '../components/Forms/RegisForm';
import { Helmet } from 'react-helmet';

const RegistrationForm = () => {
    return (
        <div>
            <Helmet> 
                <title> Marathon RegistrationForm</title>
            </Helmet>
            <RegisForm></RegisForm>
        </div>
    );
};

export default RegistrationForm;