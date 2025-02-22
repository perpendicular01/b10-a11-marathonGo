import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

const RegisForm = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const marathon = useLoaderData()
    const { _id: id, totalRegistrationCount, userEmail, userName, marathonImage: photo, description, runningDistance, startRegistrationDate, endRegistrationDate, marathonStartDate, location, title } = marathon
    
    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Create a registration object
        const registrationData = {
            email: user.email,
            firstName,
            lastName,
            location,
            distance: runningDistance,
            contactNumber,
            additionalInfo,
            marathonId : id,
            marathonTitle: title,
            startDate: marathonStartDate,
        };

        try {
            // Save registration in the database
            const res = await fetch("http://localhost:5000/usersApplications", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(registrationData),
            });

            const data = await res.json();

            if(data.insertedId) {
                // Increment total registration count
                await fetch(`http://localhost:5000/marathons/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}), 
                });

                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                });

                // Clear form fields
                setFirstName("");
                setLastName("");
                setContactNumber("");
                setAdditionalInfo("");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
            });
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-[600px] mx-auto bg-[#E7E8D1] p-6 mt-20 mb-10 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-center text-blue-950">Marathon Registration</h3>
            
            <form onSubmit={handleRegistration} className="card-body">

                {/* Read-Only Fields */}
                <div className="form-control w-full">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Your Email</span>
                    </label>
                    <input type="email" className="input input-bordered w-full" value={user.email} readOnly />
                </div>

                <div className="flex gap-3">
                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Marathon Title</span>
                        </label>
                        <input type="text" className="input input-bordered w-full" value={title} readOnly />
                    </div>

                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Start Date</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={new Date(startRegistrationDate).toLocaleDateString()}
                            readOnly
                        />
                    </div>
                </div>

                {/* User Input Fields */}
                <div className="flex gap-3">
                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">First Name</span>
                        </label>
                        <input 
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Last Name</span>
                        </label>
                        <input 
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Contact Number</span>
                    </label>
                    <input 
                        type="tel"
                        className="input input-bordered w-full"
                        placeholder="Enter contact number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Additional Info</span>
                    </label>
                    <textarea 
                        className="input input-bordered w-full p-2"
                        placeholder="Enter additional details"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className="form-control mx-auto mt-6">
                    <button className="px-14 py-3 rounded-2xl text-white text-lg font-medium bg-[#3f5244] hover:bg-[#6a8972]">
                        Register Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisForm;
