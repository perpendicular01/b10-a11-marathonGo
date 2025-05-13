import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import HelmetExport, { Helmet } from "react-helmet";


const HomeLayout = () => {
    return (
        <div>
            <div className="font-poppins bg-[#FFFDF0] min-h-screen">
                <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                    <Navbar></Navbar>
                </div>
                <div className="bg-[#FFFDF0] dark:bg-gray-700">
                    <Outlet />
                </div>
                <div className=""> {/* Add padding to account for fixed navbar height */}

                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;