import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdSupervisorAccount } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthProvider";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
    if (remainingTime <= 0) {
        return <div className="timer text-red-600 font-bold">Marathon Started!</div>;
    }

    const days = Math.floor(remainingTime / (60 * 60 * 24));
    const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((remainingTime % (60 * 60)) / 60);

    return (
        <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">Time Left</div>
            <div className="text-sm font-bold">
                {days}d : {hours}h : {minutes}m
            </div>
        </div>
    );
};

const MarathonDetails = () => {
    const { user } = useContext(AuthContext);
    const [active, setActive] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const marathon = useLoaderData();
    const {
        _id: id,
        totalRegistrationCount,
        userEmail,
        userName,
        marathonImage: photo,
        description,
        runningDistance,
        startRegistrationDate,
        endRegistrationDate,
        marathonStartDate,
        location,
        title,
    } = marathon;


    useEffect(() => {
        if (!user?.email) return;

        const checkRegistration = async () => {
            try {
                const res = await fetch(`http://localhost:5000/checkRegistration?email=${user.email}&marathonId=${id}`);
                const data = await res.json();
                setIsRegistered(data.isRegistered);  // Expecting API to return `{ isRegistered: true/false }`
                console.log(isRegistered)
            } catch (error) {
                console.error("Error checking registration:", error);
            }
        };

        checkRegistration();
    }, [user, id]);


    useEffect(() => {
        const now = Date.now();
        const marathonDate = new Date(marathonStartDate).getTime();
        const timeLeft = (marathonDate - now) / 1000;

        if (timeLeft > 0) {
            setRemainingTime(timeLeft);
        } else {
            setRemainingTime(0);
        }
    }, [marathonStartDate]);

    useEffect(() => {
        const currDate = new Date();
        const startDate = new Date(startRegistrationDate);
        const endDate = new Date(endRegistrationDate);

        if (endDate > currDate && startDate < currDate) {
            setActive("OnGoing");
        } else if (startDate > currDate) {
            setActive("Upcoming");
        } else {
            setActive("Closed");
        }
    }, [startRegistrationDate, endRegistrationDate]);

    return (
        <div className="md:w-[95%] lg:w-[72%] mx-auto pt-32 pb-12 p-6">
            <div className="w-[100%] mx-auto flex flex-col md:flex-row gap-15 lg:gap-4">
                {/* Left Section */}
                <div className="w-[85%] mx-auto md:mx-0 md:w-[35%]">

                    <img
                        src={photo}
                        alt={title}
                        className="w-[300px] lg:w-[350px] h-[200px] lg:h-[250px] rounded-xl shadow-sm"
                    />
                    <div className="mt-5">

                        <h2 className="text-lg lg:text-xl font-semibold text-gray-700">Added By:</h2>
                        <h2 className="text-base lg:text-lg text-gray-800 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <FaUser /> <span className="font-semibold">Username:</span>
                            </div>
                            <div>{userName}</div>
                        </h2>
                        <h2 className="text-base lg:text-lg text-gray-800 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <MdEmail /> <span className="font-semibold">Email:</span>
                            </div>
                            <div>{userEmail}</div>
                        </h2>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-[65%] ml-5">
                    <div className="md:flex md:justify-between md:items-center mb-3">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-950">{title}</h2>
                        <button
                            className={`px-3 py-1 rounded-full text-sm font-medium mt-3 md:mt-0 ${active === "OnGoing"
                                ? "bg-green-100 border-green-950 border-[1px] text-green-700"
                                : "bg-red-100 border-red-950 border-[1px] text-red-700"
                                }`}
                        >
                            {active}
                        </button>
                    </div>
                    <h2 className="text-base lg:text-lg font-bold text-gray-800">
                        Location: <span className="font-medium">{location}</span>
                    </h2>
                    <p className="w-[80%] text-base text-gray-700 my-3">{description}</p>
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">
                        Running Distance:{" "}
                        <span className="font-bold text-xl text-red-600">{runningDistance}</span>
                    </h2>

                    <h2 className="mt-4 text-base lg:text-lg font-semibold text-gray-800 underline">
                        Registration Dates (mm-dd-yyyy):
                    </h2>

                    <div className="flex gap-5 items-center">
                        <h2 className="text-base lg:text-lg font-medium text-gray-800 mt-2">
                            Start Date:{" "}
                            <span className="font-medium text-blue-800">
                                {new Date(startRegistrationDate).toLocaleDateString()}
                            </span>
                        </h2>

                        <h2 className="text-base lg:text-lg font-medium text-gray-800 mt-2">
                            End Date:{" "}
                            <span className="font-medium text-blue-800">
                                {new Date(endRegistrationDate).toLocaleDateString()}
                            </span>
                        </h2>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-base lg:text-lg text-gray-800 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <MdSupervisorAccount className="text-2xl" /> <span className="font-semibold">Total Applicants :</span>
                            </div>
                            <div className="text-xl"> {totalRegistrationCount}</div>
                        </h2>
                    </div>

                    <Link to={`/registrationForm/${id}`}>
                        <button
                            disabled={active !== "OnGoing" || isRegistered}
                            className={`mt-4 lg:mt-6 bg-[#FFF2C2] text-black font-semibold px-6 md:px-4 lg:px-6 py-2 md:py-1 lg:py-2 rounded-lg shadow-md transition-all ${active !== "OnGoing" || isRegistered
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-yellow-300"
                                }`}
                        >
                            {isRegistered ? "Already Registered" : "Register Now"}
                        </button>
                    </Link>


                    {/* Countdown Timer */}
                    <div className="flex justify-end -mt-10">
                        {remainingTime > 0 ? (
                            <CountdownCircleTimer
                                isPlaying
                                duration={remainingTime}
                                size={140}
                                strokeWidth={8}
                                colors={["#004777", "#F7B801", "#A30000"]}
                                colorsTime={[remainingTime * 0.5, remainingTime * 0.2, 0]}
                                onComplete={() => [false, 0]}
                            >
                                {renderTime}
                            </CountdownCircleTimer>
                        ) : (
                            <div className="text-red-600 font-bold text-sm">Event Started!</div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarathonDetails;
