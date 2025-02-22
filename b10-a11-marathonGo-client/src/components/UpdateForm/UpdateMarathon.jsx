import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateMarathon = () => {
    const marathon = useLoaderData();
    const { _id: id, userName, userEmail, title, location, runningDistance, description, marathonImage, startRegistrationDate, endRegistrationDate, marathonStartDate } = marathon;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [startRegDate, setStartRegDate] = useState(new Date(startRegistrationDate));
    const [endRegDate, setEndRegDate] = useState(new Date(endRegistrationDate));
    const [marathonDate, setMarathonDate] = useState(new Date(marathonStartDate));

    const handleUpdateMarathon = async (e) => {
        e.preventDefault();
        
        const form = new FormData(e.target);
        const updatedTitle = form.get("title");
        const updatedLocation = form.get("location");
        const updatedRunningDistance = form.get("runningDistance");
        const updatedDescription = form.get("description");
        const updatedMarathonImage = form.get("marathonImage");

        if (!startRegDate || !endRegDate || !marathonDate) {
            setError("Please select all dates.");
            return;
        }

        const updatedMarathon = {
            title: updatedTitle,
            location: updatedLocation,
            runningDistance: updatedRunningDistance,
            description: updatedDescription,
            marathonImage: updatedMarathonImage,
            startRegistrationDate: startRegDate.toISOString(),
            endRegistrationDate: endRegDate.toISOString(),
            marathonStartDate: marathonDate.toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const res = await fetch(`http://localhost:5000/marathons/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMarathon),
            });
            
            const data = await res.json();
            if (res.ok) {
                Swal.fire({ title: "Marathon updated successfully!", icon: "success" });
                navigate("/allMarathons");
            } else {
                setError("Failed to update marathon. Please try again.");
            }
        } catch (error) {
            console.error("Error updating marathon:", error);
            setError("Failed to update marathon. Please try again.");
        }
    };

    

    return (
        <div className="max-w-[600px] mx-auto bg-[#E7E8D1]">
            <h3 className="pt-8 text-center font-bold text-2xl md:text-3xl text-blue-950">
                Update Marathon
            </h3>
            
            <form onSubmit={handleUpdateMarathon} className="card-body">
                <div className="flex justify-between">
                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Your Name</span>
                        </label>
                        <input name="userName" type="text" className="input input-bordered" value={userName} readOnly required />
                    </div>
                    <div className="form-control w-[49%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Your Email</span>
                        </label>
                        <input name="userEmail" type="email" className="input input-bordered" value={userEmail} readOnly required />
                    </div>
                </div>
                
                <div className="form-control w-full mt-1">
                    <label className="label mb-2">
                        <span className="label-text text-black text-lg">Marathon Image URL</span>
                    </label>
                    <input name="marathonImage" type="url" className="input input-bordered w-full" defaultValue={marathonImage} required />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Marathon Title</span>
                    </label>
                    <input name="title" type="text" className="input input-bordered w-full" defaultValue={title} required />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Location</span>
                    </label>
                    <input name="location" type="text" className="input input-bordered w-full" defaultValue={location} required />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label mb-1">
                        <span className="label-text text-black text-lg">Running Distance</span>
                    </label>
                    <select name="runningDistance" className="input input-bordered w-full" defaultValue={runningDistance} required>
                        <option value="25k">25k</option>
                        <option value="10k">10k</option>
                        <option value="3k">3k</option>
                    </select>
                </div>

                <div className="flex justify-between mt-1">
                    <div className="form-control w-[32%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Start Registration</span>
                        </label>
                        <DatePicker selected={startRegDate} onChange={setStartRegDate} className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-[32%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">End Registration</span>
                        </label>
                        <DatePicker selected={endRegDate} onChange={setEndRegDate} className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-[32%]">
                        <label className="label mb-1">
                            <span className="label-text text-black text-lg">Marathon Date</span>
                        </label>
                        <DatePicker selected={marathonDate} onChange={setMarathonDate} className="input input-bordered w-full" required />
                    </div>
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label mb-2">
                        <span className="label-text text-black text-lg">Description</span>
                    </label>
                    <textarea name="description" className="border-[1px] border-black border-opacity-15 rounded-lg p-6 w-full" defaultValue={description} required></textarea>
                </div>
                
                <div className="text-sm text-red-600 pt-3">{error}</div>
                <div className="form-control mx-auto">
                    <button className="px-14 py-3 rounded-2xl text-white text-lg font-medium bg-[#3f5244]">Update Marathon</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMarathon;