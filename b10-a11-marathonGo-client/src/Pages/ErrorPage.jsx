import React from 'react';
import error from '../assets/error.png'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>

            <h2 className='text-4xl font-bold text-center mt-24' > Error !! </h2>

            <img className="w-[300px] h-[250px] md:w-[400px] md:h-[350px] mx-auto mt-10" src={error} alt="" />
            
            <div className='text-center'>
                <Link to="/"><button className="btn px-7 py-1 mt-8 mb-4 bg-[#6C5B1D]  text-white text-base hover:bg-[#493d0f]">Go back to Home</button></Link>
            </div>
        </div>
    );
    
};

export default Error;