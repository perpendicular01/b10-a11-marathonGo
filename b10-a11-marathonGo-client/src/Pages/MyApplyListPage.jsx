import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import useAxioSecure from "../hooks/useAxioSecure";
import { CiSearch } from "react-icons/ci";

const MyApplyListPage = () => {
    const [applications, setApplications] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [error, setError] = useState([])
    const [search, setSearch] = useState("")

    const axioSecure = useAxioSecure()

    // const [error, setError] = useState("");

    useEffect(() => {
        if (!user?.email) return;

        const fetchApplications = async () => {
            // const res = await fetch(`https://b10-a11-marathon-go-server.vercel.app/myApplications?email=${user.email}`);
            // const data = await res.json();
            // setApplications(data);
            axioSecure.get(`/myApplications?email=${user.email}&search=${search}`)
                .then(res => setApplications(res.data))
        };
        fetchApplications();
    }, [user, search]);

    const openUpdateModal = (application) => {
        setSelectedApplication(application);
        document.getElementById("update_modal").showModal();
    };

    const closeUpdateModal = () => {
        document.getElementById("update_modal").close();
        setSelectedApplication(null);
        setError("");
    };

    const fetchApplications = async () => {
        if (!user?.email) return;
        try {
            const res = await axioSecure.get(`/myApplications?email=${user.email}&search=${search}`);
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to fetch applications", err);
        }
    };

    const handleUpdateApplication = async (e) => {
        e.preventDefault();
        if (!selectedApplication) return;

        const form = new FormData(e.target);
        const updatedFirstName = form.get("firstName");
        const updatedLastName = form.get("lastName");
        const updatedContactNumber = form.get("contactNumber");
        const updatedAdditionalInfo = form.get("additionalInfo");

        const updatedApplication = {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            contactNumber: updatedContactNumber,
            additionalInfo: updatedAdditionalInfo,
        };

        try {
            const res1 = await fetch(
                `https://b10-a11-marathon-go-server.vercel.app/updateUsersApplication/${selectedApplication._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedApplication),
                }
            );

            if (res1.ok) {
                await fetchApplications();

                Swal.fire({
                    title: "Application updated successfully!",
                    icon: "success",
                });

                closeUpdateModal();
            } else {
                setError("Failed to update application. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to update application. Please try again.");
        }
    };



    // const handleUpdateApplication = async (e) => {
    //     e.preventDefault();
    //     if (!selectedApplication) return;

    //     const form = new FormData(e.target);
    //     const updatedFirstName = form.get("firstName");
    //     const updatedLastName = form.get("lastName");
    //     const updatedContactNumber = form.get("contactNumber");
    //     const updatedAdditionalInfo = form.get("additionalInfo");



    //     const updatedApplication = {
    //         firstName: updatedFirstName,
    //         lastName: updatedLastName,
    //         contactNumber: updatedContactNumber,
    //         additionalInfo: updatedAdditionalInfo,
    //     };

    //     try {
    //         const res1 = await fetch(`https://b10-a11-marathon-go-server.vercel.app/updateUsersApplication/${selectedApplication._id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(updatedApplication),
    //         });



    //         if (res1.ok) {
    //             Swal.fire({
    //                 title: "Application updated successfully!",
    //                 icon: "success",
    //             });




    //             closeUpdateModal();
    //         } else {
    //             setError("Failed to update application. Please try again.");
    //         }
    //     } catch (error) {
    //         setError("Failed to update application. Please try again.");
    //     }
    // };


    const handleDeleteApplication = async (id) => {

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


            const res1 = await fetch(`https://b10-a11-marathon-go-server.vercel.app/deleteApplication/${id}`, {
                method: 'DELETE',
            });

            const res2 = await fetch(`https://b10-a11-marathon-go-server.vercel.app/decrementApplicant/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });




            if (res1.ok && res2.ok) {
                

                await Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Your Application has been deleted",

                });
                await fetchApplications();




            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete the Application.",
                    icon: "error",
                });
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title> My Applications </title>

            </Helmet>

            <div className="md:flex gap-10  justify-between items-center">
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-950 underline pt-20 lg:pt-28 pb-3 md:pb-8 ml-4 lg:ml-12">
                        My Applications:
                    </h2>
                </div>

                <div className="md:pt-16 lg:pt-22 mr-20 lg:mr-32 flex items-center pb-3 md:pb-0 pl-4 md:pl-0 gap-2">
                    <div className="text-xl md:text-3xl font-extrabold">
                        <CiSearch />
                    </div>
                    <input
                        onKeyUp={(e) => setSearch(e.target.value)}
                        type="text"
                        className="w-[400px]  lg:w-[500px] py-1 md:py-2 pl-2 border border-gray-400 placeholder-gray-700 text-black"
                        placeholder="Search marathons by title"
                    />
                </div>

            </div>
            <div className="w-[90%] mx-auto mb-40">
                {/* Application Table */}
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
                            {applications.map((it, index) => (


                                <tr key={it._id} className="text-sm md:text-base text-black text-opacity-90">
                                    <th>{index + 1}</th>
                                    <td>{it.marathonTitle}</td>
                                    <td>{it.distance}</td>
                                    <td>{it.location}</td>
                                    <td>{new Date(it.startDate).toISOString().split("T")[0]}</td>
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
                                            <button onClick={() => handleDeleteApplication(it.marathonId)} className="bg-red-700 hover:bg-red-300 hover:text-black  px-3 py-1 rounded-md text-white font-medium">
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
                        <h3 className="font-bold text-lg text-center">Update Application</h3>
                        {selectedApplication && (
                            <form onSubmit={handleUpdateApplication} className="card-body">
                                <div className="flex justify-between mt-1">
                                    <div className="form-control w-[48%]">
                                        <label className="label mb-1">
                                            <span className="label-text text-black text-lg">Title</span>
                                        </label>
                                        <input
                                            name="title"
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={selectedApplication.marathonTitle}
                                            readOnly
                                            required
                                        />

                                    </div>
                                    <div className="form-control w-[48%]">
                                        <label className="label mb-1">
                                            <span className="label-text text-black text-lg">Marathon Day</span>
                                        </label>
                                        <DatePicker
                                            selected={selectedApplication.startDate}
                                            className="input input-bordered w-full"
                                            placeholderText="Select Date"
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="form-control w-full mt-1">
                                    <label className="label mb-2">
                                        <span className="label-text text-black text-lg">First Name</span>
                                    </label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedApplication.firstName}
                                        required
                                    />
                                </div>


                                <div className="form-control w-full mt-1">
                                    <label className="label mb-1">
                                        <span className="label-text text-black text-lg">Last Name</span>
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedApplication.lastName}
                                        required
                                    />
                                </div>

                                <div className="form-control w-full mt-1">
                                    <label className="label mb-1">
                                        <span className="label-text text-black text-lg">Contact Number</span>
                                    </label>
                                    <input
                                        name="contactNumber"
                                        type="number"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedApplication.contactNumber}
                                        required
                                    />
                                </div>


                                <div className="form-control w-full mt-1">
                                    <label className="label mb-1">
                                        <span className="label-text text-black text-lg">Additional Info</span>
                                    </label>
                                    <input
                                        name="additionalInfo"
                                        type="text"
                                        className="input input-bordered w-full"
                                        defaultValue={selectedApplication.additionalInfo}
                                        required
                                    />
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="px-6 py-2 rounded-xl text-white bg-blue-700">
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

export default MyApplyListPage;
