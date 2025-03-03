import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { AiOutlineHeart } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useContext } from "react";
import ThemeTooggle from "../ThemeComponent/ThemeTooggle";


const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext)
    // console.log(user)

    const path = useLocation().pathname;
    const navigate = useNavigate()
    // console.log(path)

    // signout
    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await signOutUser()
            navigate('/auth/login')
        }
        catch { /* empty */ }
    }

    // for small and middle  BEFORE LOGIN
    const links1 = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allMarathons"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                All Marathons
            </NavLink>
        </li>

    </>

    // AFTER LOGIN SM AND MD
    const links2 = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allMarathons"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                All Marathons
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/addMarathon"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                Add Marathon
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/myMarathonList"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                My Marathon List
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/myApplyList"
                className={({ isActive }) => isActive ? "font-bold " : "hover:font-semibold"}
            >
                My Apply List
            </NavLink>
        </li>

    </>

    // before login 
    const links3 = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allMarathons"
                className={({ isActive }) => isActive ? "font-bold" : "hover:font-semibold"}
            >
                All Marathons
            </NavLink>
        </li>


    </>

    // AFTER LOGIN IN 
    const links4 = (
        <>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold" : "hover:font-semibold")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allMarathons" className={({ isActive }) => (isActive ? "font-bold" : "hover:font-semibold")}>
              All Marathons
            </NavLink>
          </li>
          {/* Dashboard Dropdown */}
          <li>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="">
                <h2>Dashboard</h2>
              </div>
              <ul tabIndex={0} className="menu menu-base dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-2 shadow">
                <li>
                  <NavLink to="/addMarathon" className={({ isActive }) => (isActive ? "font-bold" : "hover:font-semibold")}>
                    Add Marathon
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myMarathonList"
                    className={({ isActive }) => (isActive ? "font-bold" : "hover:font-semibold")}
                  >
                    My Marathon List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myApplyList" className={({ isActive }) => (isActive ? "font-bold" : "hover:font-semibold")}>
                    My Apply List
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </>
      );
      

    return (
        <div className="bg-[#E28377] dark:bg-gray-900 ">
            <div className="w-[95%] lg:w-[90%] mx-auto flex justify-between items-center py-2 md:py-2 lg:py-3   text-black">
                {/* for small device only */}

                {
                    user ?
                        <div className="lg:hidden">
                            <div className="dropdown ">
                                <div tabIndex="0" role="button" className="text-3xl m-1"><IoIosMenu></IoIosMenu></div>
                                <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                    {links2}
                                </ul>
                            </div>
                        </div>

                        :

                        <div className="lg:hidden">
                            <div className="dropdown ">
                                <div tabIndex="0" role="button" className="text-3xl m-1"><IoIosMenu></IoIosMenu></div>
                                <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                    {links1}
                                </ul>
                            </div>
                        </div>
                }

                {/* <div className="lg:hidden">
                    <div className="dropdown ">
                        <div tabIndex="0" role="button" className="text-3xl m-1"><IoIosMenu></IoIosMenu></div>
                        <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                </div> */}

                {/* left */}
                <div>
                    <Link to={'/'}>
                        `       <h2 className="-mt-7 text-lg lg:text-2xl dark:text-white font-bold ">MarathonGoo</h2>
                    </Link>
                </div>
                {/* for md middle */}
                {
                    user ?
                        <div className="hidden list-none lg:flex items-center gap-5 text-sm lg:text-base dark:text-gray-300 ">
                            {links4}
                        </div>

                        :

                        <div className="hidden list-none lg:flex items-center gap-5 text-sm lg:text-base dark:text-gray-300 ">
                            {links3}
                        </div>
                }

                {/* right side */}
                {/* <div className="flex items-center gap-2 md:gap-5 ">
                    <Link to="/auth/login"><button className={`px-2 md:px-4 py-2 rounded-lg text-sm md:text-base  font-medium ${path === '/auth/login' ? "text-white bg-[#6C5B1D]" : "bg-[#FFF2C2] text-base"}`}>  Login </button></Link>
                    <Link to="/auth/register">   <button className={`px-2 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium ${path === '/auth/register' ? "text-white bg-[#6C5B1D]" : "bg-[#FFF2C2] text-base"}`}> Register </button></Link>
                </div> */}

                <div className="flex items-center gap-2 md:gap-8 ">
                    <ThemeTooggle></ThemeTooggle>
                    {
                        user ?
                            <div className="flex items-center gap-2 md:gap-4 ">
                                <div>
                                    <img className="rounded-full w-9 h-9 lg:w-10 lg:h-10" src={user.photoURL} alt="" />
                                </div>
                                <div>
                                    <Link>
                                        <button
                                            onClick={handleSignOut}
                                            className={`px-2 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium ${path === '/auth/login'
                                                ? 'text-black bg-[#A8A8A8] '
                                                : 'bg-[#183155] text-white hover:bg-[#455367]'
                                                }`}
                                        >
                                            Logout
                                        </button>
                                    </Link>
                                </div>

                            </div>
                            :
                            <div className="flex items-center gap-2 md:gap-5 ">
                                <Link to="/auth/login"><button className={`px-2 md:px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-sm md:text-base  font-medium ${path === '/auth/login' ? "text-black bg-[#A8A8A8] " : "bg-[#183155] text-white hover:bg-[#455367]"}`}>  Login </button></Link>
                                <Link to="/auth/register">   <button className={`px-2 md:px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-sm md:text-base font-medium ${path === '/auth/register' ? "text-black bg-[#A8A8A8] " : "bg-[#183155] text-white hover:bg-[#455367]"}`}> Register </button></Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;