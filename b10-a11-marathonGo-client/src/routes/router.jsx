import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";
import AddMarathonPage from "../Pages/AddMarathonPage";
import MyMarathonPage from "../Pages/MyMarathonPage";
import MyApplyListPage from "../Pages/MyApplyListPage";
import AllMarathonsPage from "../Pages/AllMarathonsPage";

import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import ErrorPage from "../Pages/ErrorPage";
import MarathonDetails from "../Pages/MarathonDetails";
import RegistrationForm from "../Pages/RegistrationForm";
import UpdateMarathon from "../components/UpdateForm/UpdateMarathon";
import PrivateRouter from "./PrivateRouter";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: '/myMarathonList',
                element: <PrivateRouter> <MyMarathonPage></MyMarathonPage></PrivateRouter>
            },
            {
                path: '/registrationForm/:id',
                element: <RegistrationForm></RegistrationForm>,
                loader: async({params}) => {
                    const res = await fetch(`http://localhost:5000/marathons/${params.id}`)
                    const marathon = await res.json();
                    return marathon;
                }
            },
            {
                path: '/myApplyList',
                element: <PrivateRouter> <MyApplyListPage></MyApplyListPage> </PrivateRouter>
            },
            {
                path: '/allMarathons',
                element: <PrivateRouter> <AllMarathonsPage></AllMarathonsPage> </PrivateRouter>
            },
            {
                path: '/marathon/:id',
                element: <PrivateRouter> <MarathonDetails></MarathonDetails> </PrivateRouter> ,
                loader: async({params}) => {
                    const res = await fetch(`http://localhost:5000/marathons/${params.id}`)
                    const marathon = await res.json();
                    return marathon;
                }
            },
            {
                path: '/updateMarathon/:id',
                element: <PrivateRouter> <UpdateMarathon></UpdateMarathon> </PrivateRouter>,
                loader: async({params}) => {
                    const res = await fetch(`http://localhost:5000/marathons/${params.id}`)
                    const marathon = await res.json()
                    return marathon;
                }
            },
            {
                path: '/addMarathon',
                element: <PrivateRouter> <AddMarathonPage></AddMarathonPage> </PrivateRouter>
            },
            
            
        ],
    },

    {
        path: 'auth',
        element: <AuthLayout></AuthLayout> ,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Registration></Registration>
            },

        ]
    },

    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])


export default router;