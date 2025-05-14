import React from 'react';
import AddMarathonForm from '../components/Forms/AddMarathonForm';
import { Helmet } from 'react-helmet';


const AddMarathonPage = () => {
    return (
        <div>
            <Helmet> 
                <title> add marathons </title>
            </Helmet>
            <div className='pt-24 pb-10'>
                <AddMarathonForm></AddMarathonForm>

            </div>
        </div>
    );
};

export default AddMarathonPage;