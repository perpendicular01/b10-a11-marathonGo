import React from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import images
import slider3 from '../../assets/banner1.webp';
import slider2 from '../../assets/banner2.jpeg';
import slider1 from '../../assets/banner3.webp';
import slider4 from '../../assets/banner4.jpg';
import slider5 from '../../assets/banner5.jpg';

const slides = [
    {
        id: "slide1",
        image: slider1,
        title: "Join the Race, Embrace the Challenge!",
        subtitle: "Sign up for exciting marathons, track your progress, and experience the thrill of the run. Every step counts!",
        buttonText: "View Upcoming Marathons",
    },
    {
        id: "slide2",
        image: slider2,
        title: "Run for a Cause, Make a Difference!",
        subtitle: "Participate in marathons that support meaningful causes. Your steps can change lives!",
        buttonText: "Join a Race",
    },
    {
        id: "slide3",
        image: slider3,
        title: "Track, Train, Triumph!",
        subtitle: "Monitor your progress, challenge yourself, and achieve your personal best. The finish line awaits!",
        buttonText: "Start Training",
    },
    
    {
        id: "slide4",
        image: slider4,
        title: "From Start to Finish, We Run Together",
        subtitle: "Be part of a supportive community of runners. Track your progress, compete with friends, and celebrate every finish line!",
        buttonText: "Explore Marathons",
    },

    {
        id: "slide5",
        image: slider5,
        title: "Every Step Counts",
        subtitle: "Whether you're a seasoned runner or a first-time participant, our marathons offer the perfect opportunity to push your limits and make memories.",
        buttonText: "Run the next",
    },

];

const HomeBanner = () => {
    return (
        <div className="w-full py-12">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={2} // Starts from the 3rd slide
                loop = {true}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                className="w-full pb-12"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="w-[80%] max-w-[300px] md:max-w-[500px] lg:max-w-[700px]">
                        <div
                            className="h-[400px] flex items-center justify-center text-center p-5 rounded-xl bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
                            }}
                        >
                            <div className="max-w-[600px] text-white">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{slide.title}</h3>
                                <p className="text-sm w-[90%] mx-auto  lg:text-lg opacity-90 mt-2 mb-2">{slide.subtitle}</p>
                                <Link to='/allMarathons'>
                                    <button className="mt-4 bg-white text-black mx-auto  text-sm lg:text-base rounded-lg py-1 px-3 flex items-center gap-2 shadow-md hover:bg-gray-200">
                                        <MdOutlineExplore /> {slide.buttonText}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeBanner;
