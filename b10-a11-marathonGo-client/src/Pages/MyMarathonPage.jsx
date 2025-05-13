import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyMarathonPage = () => {
    const [marathons, setMarathons] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedMarathon, setSelectedMarathon] = useState(null);
    const [image, setImage] = useState([])
    const [startRegDate, setStartRegDate] = useState(new Date());
    const [endRegDate, setEndRegDate] = useState(new Date());
    const [marathonDate, setMarathonDate] = useState(new Date());
    const [error, setError] = useState([])

    // const [error, setError] = useState("");

    useEffect(() => {
        if (!user?.email) return;

        const fetchMarathons = async () => {
            const res = await fetch(`http://localhost:5000/myMarathons?email=${user.email}`);
            const data = await res.json();
            setMarathons(data);
        };
        fetchMarathons();
    }, [user]);

    const openUpdateModal = (marathon) => {
        setSelectedMarathon(marathon);
        setStartRegDate(new Date(marathon.startRegistrationDate));
        setEndRegDate(new Date(marathon.endRegistrationDate));
        setMarathonDate(new Date(marathon.marathonStartDate));
        setImage(marathon.marathonImage)

        document.getElementById("update_modal").showModal();
    };

    const closeUpdateModal = () => {
        document.getElementById("update_modal").close();
        setSelectedMarathon(null);
        setStartRegDate(new Date());
        setEndRegDate(new Date());
        setMarathonDate(new Date());
        setImage("");
        setError("");
    };


    const handleUpdateMarathon = async (e) => {
        e.preventDefault();
        if (!selectedMarathon) return;
    
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
        };
    
        try {
            const res1 = await fetch(`http://localhost:5000/marathons/${selectedMarathon._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMarathon),
            });
    
            const res2 = await fetch(`http://localhost:5000/updateUsersMarathon/${selectedMarathon._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMarathon),
            });
    
            if (res1.ok && res2.ok) {
                Swal.fire({
                    title: "Marathon updated successfully!",
                    icon: "success",
                });
    
                setMarathons(
                    marathons.map((m) =>
                        m._id === selectedMarathon._id ? { ...m, ...updatedMarathon } : m
                    )
                );
    
                closeUpdateModal();
            } else {
                setError("Failed to update marathon. Please try again.");
            }
        } catch (error) {
            setError("Failed to update marathon. Please try again.");
        }
    };
    

    const handleDeleteMarathon = async (id) => {

        const alert = await Swal.fire({
            title: "Are you sure?",
            text: "You can not be able to restore this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "delete it"
        });

        if (alert.isConfirmed) {
            

            const res1 = await fetch(`http://localhost:5000/deleteMarathons/${id}`, {
                method: 'DELETE',
            });


            const res2 = await fetch(`http://localhost:5000/deleteApplication/${id}`, {
                method: 'DELETE',
            })

            if (res1.ok && res2.ok) {
                setMarathons(marathons.filter(it => it._id !== id));
                await Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Your Marathon has been deleted",
    
                });
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete the Marathon.",
                    icon: "error",
                });
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title> My Marathons </title>
            </Helmet>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-950 underline pt-20 lg:pt-28 pb-8 ml-4 lg:ml-12">
                My Marathons:
            </h2>
            <div className="w-[90%] mx-auto mb-40">
                {/* Marathon Table */}
                <div className="overflow-x-auto bg-white text-black">
                    <table className="table">
                        <thead>
                            <tr className="text-black text-opacity-85 text-base lg:text-lg">
                                <th></th>
                                <th>Title</th>
                                <th>Distance</th>
                                <th>Location</th>
                                <th>Marathon Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {marathons.map((it, index) => (
                                <tr key={it._id} className="text-sm md:text-base text-black text-opacity-90">
                                    <th>{index + 1}</th>
                                    <td>{it.title}</td>
                                    <td>{it.runningDistance}</td>
                                    <td>{it.location}</td>
                                    <td>{new Date(it.marathonStartDate).toISOString().split("T")[0]}</td>
                                    <td>
                                        <button
                                            className="bg-blue-700 hover:bg-blue-300 hover:text-black px-3 py-1 rounded-md text-white font-medium"
                                            onClick={() => openUpdateModal(it)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <Link>
                                            <button onClick={() => handleDeleteMarathon(it._id)} className="bg-red-700 hover:bg-red-300 hover:text-black  px-3 py-1 rounded-md text-white font-medium">
                                                delete
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Update Modal */}
                <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Update Marathon</h3>
                        {selectedMarathon && (
                            <form onSubmit={handleUpdateMarathon} className="card-body">
                                <div className="form-control w-full mt-1">
                                    <label className="label mb-2">
                                        <span className="label-text text-black text-lg">Marathon Title</span>
                                    </label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedMarathon.title}
                                        required
                                    />
                                </div>

                                <div className="form-control w-full mt-1">
                                    <label className="label mb-1">
                                        <span className="label-text text-black text-lg">Photo Url</span>
                                    </label>
                                    <input
                                        name="marathonImage"
                                        type="text"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedMarathon.marathonImage}
                                        required
                                    />
                                </div>

                                <div className="form-control w-full mt-1">
                                    <label className="label mb-1">
                                        <span className="label-text text-black text-lg">Location</span>
                                    </label>
                                    <input
                                        name="location"
                                        type="text"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedMarathon.location}
                                        required
                                    />
                                </div>

                                <div className="form-control w-full mt-1">
                                    <label className="label mb-1">
                                        <span className="label-text text-black text-lg">Running Distance</span>
                                    </label>
                                    <select name="runningDistance" className="input input-bordered w-full" defaultValue={selectedMarathon.runningDistance} required>
                                        <option value="25k">25k</option>
                                        <option value="10k">10k</option>
                                        <option value="3k">3k</option>
                                    </select>
                                </div>

                                <div className="flex justify-between mt-1">
                                    <div className="form-control w-[32%]">
                                        <label className="label mb-1">
                                            <span className="label-text text-black text-lg">Start Reg.</span>
                                        </label>
                                        <DatePicker
                                            selected={startRegDate}
                                            onChange={setStartRegDate}
                                            className="input input-bordered w-full"
                                            placeholderText="Select Date"
                                            required
                                        />
                                    </div>
                                    <div className="form-control w-[32%]">
                                        <label className="label mb-1">
                                            <span className="label-text text-black text-lg">End Reg.</span>
                                        </label>
                                        <DatePicker
                                            selected={endRegDate}
                                            onChange={setEndRegDate}
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
                                            onChange={setMarathonDate}
                                            className="input input-bordered w-full"
                                            placeholderText="Select Date"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control w-full mt-1">
                                    <label className="label mb-2">
                                        <span className="label-text text-black text-lg">Description</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        className="border-[1px] border-black border-opacity-15 rounded-lg p-6 w-full"
                                        placeholder="Enter marathon description"
                                        defaultValue={selectedMarathon.description}
                                        required
                                    ></textarea>
                                </div>

                                <div className="modal-action">
                                    <button type="submit"  className="px-6 py-2 rounded-xl text-white bg-blue-700">
                                        Update
                                    </button>
                                    <button className="btn" onClick={closeUpdateModal}>
                                        Close
                                    </button>

                                </div>
                            </form>
                        )}
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyMarathonPage;
