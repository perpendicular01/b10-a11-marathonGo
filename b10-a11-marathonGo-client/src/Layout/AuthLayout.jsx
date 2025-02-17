import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const AuthLayout = () => {
    return (
        <div className="font-poppins bg-[#FFFDF0] min-h-screen">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Navbar></Navbar>
            </div>
            <div className="pt-20 bg-[#F8FAFC] pb-12 lg:pb-24"> {/* Add padding to account for fixed navbar height */}
                <Outlet />
                
            </div>
            <div className="">
                 <Footer></Footer>
            </div>
        </div>
    );
};

export default AuthLayout;