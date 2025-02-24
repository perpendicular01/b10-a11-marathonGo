import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Contexts/AuthProvider";

const AddMarathonForm = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [startRegDate, setStartRegDate] = useState(null);
    const [endRegDate, setEndRegDate] = useState(null);
    const [marathonDate, setMarathonDate] = useState(null);
    
    const handleAddMarathon = async (e) => {
        e.preventDefault();

        // get the form data
        const form = new FormData(e.target);
        const title = form.get("title");
        const location = form.get("location");
        const runningDistance = form.get("runningDistance");
        const description = form.get("description");
        const marathonImage = form.get("marathonImage");

        if (!startRegDate || !endRegDate || !marathonDate) {
            setError("Please select all dates.");
            return;
        }

        const marathon = {
            userName: user?.displayName,
            userEmail: user?.email,
            title,
            startRegistrationDate: startRegDate.toISOString(),
            endRegistrationDate: endRegDate.toISOString(),
            marathonStartDate: marathonDate.toISOString(),
            location,
            runningDistance,
            description,
            marathonImage,
            createdAt: new Date().toISOString(),
            totalRegistrationCount: 0,
        };

        try {
            const res = await fetch("http://localhost:5000/marathons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(marathon)
            });

            const data = await res.json();
            if (data.insertedId) {
                Swal.fire({
                    title: "Marathon added successfully!",
                    icon: "success",
                    customClass: {
                        popup: "small-modal"
                    }
                });

                e.target.reset();
                navigate("/allMarathons");
            }
        } catch (error) {
            console.error("Error adding marathon:", error);
            setError("Failed to add marathon. Please try again.");
        }
    };

    return (
        <div className="max-w-[600px] mx-auto bg-[#E7E8D1] ">
            <div className="flex items-center justify-center gap-3">
                <h3 className="pt-8 text-center font-bold text-2xl md:text-3xl text-blue-950">
                    Add New Marathon
                </h3>
                {/* <div className="w-24 h-24 mt-20">
                    <Lottie animationData={animation} loop={true} />
                </div> */}
            </div>

            <form onSubmit={handleAddMarathon} className="card-body ">
                {/* User Info (Read-Only) */}
                <div className="flex justify-between">
                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Your Name</span>
                        </label>
                        <input
                            name="userName"
                            type="text"
                            className="input input-bordered"
                            value={user?.displayName}
                            readOnly
                            required
                        />
                    </div>
                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Your Email</span>
                        </label>
                        <input
                            name="userEmail"
                            type="email"
                            className="input input-bordered"
                            value={user?.email}
                            readOnly
                            required
                        />
                    </div>
                </div>

                {/* Marathon Image */}
                <div className="form-control w-full mt-1">
                    <label className="label mb-2">
                        <span className="label-text text-black text-lg">Marathon Image URL</span>
                    </label>
                    <input
                        name="marathonImage"
                        type="url"
                        placeholder="Enter image URL"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Marathon Title */}
                <div className="form-control w-full mt-1">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Marathon Title</span>
                    </label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Enter marathon title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Location */}
                <div className="form-control w-full mt-1">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Location</span>
                    </label>
                    <input
                        name="location"
                        type="text"
                        placeholder="Enter location"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Running Distance Dropdown */}
                <div className="form-control w-full mt-1">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Running Distance</span>
                    </label>
                    <select name="runningDistance" className="input input-bordered w-full" required>
                        <option disabled value="">Select Distance</option>
                        <option value="25k">25k</option>
                        <option value="10k">10k</option>
                        <option value="3k">3k</option>
                    </select>
                </div>

                {/* Date Pickers */}
                <div className="flex justify-between mt-1">
                    <div className="form-control w-[32%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Start Registration</span>
                        </label>
                        <DatePicker
                            selected={startRegDate}
                            onChange={(date) => setStartRegDate(date)}
                            className="input input-bordered w-full"
                            placeholderText="Select Date"
                            required
                        />
                    </div>
                    <div className="form-control w-[32%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">End Registration</span>
                        </label>
                        <DatePicker
                            selected={endRegDate}
                            onChange={(date) => setEndRegDate(date)}
                            className="input input-bordered w-full"
                            placeholderText="Select Date"
                            required
                        />
                    </div>
                    <div className="form-control w-[32%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Marathon Date</span>
                        </label>
                        <DatePicker
                            selected={marathonDate}
                            onChange={(date) => setMarathonDate(date)}
                            className="input input-bordered w-full"
                            placeholderText="Select Date"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="form-control w-full mt-1">
                    <label className="label mb-2">
                        <span className="label-text text-black text-lg">Description</span>
                    </label>
                    <textarea
                        name="description"
                        className="border-[1px] border-black border-opacity-15 rounded-lg p-6 w-full"
                        placeholder="Enter marathon description"
                        required
                    ></textarea>
                </div>

                {/* Error Message */}
                <div className="text-sm text-red-600 pt-3">{error}</div>

                {/* Submit Button */}
                <div className="form-control  mx-auto">
                    <button className="px-14 py-3 rounded-2xl text-white text-lg font-medium bg-[#3f5244]">
                        Add Marathon
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMarathonForm;
