import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";
import AddMarathonPage from "../Pages/AddMarathonPage";
import MyMarathonPage from "../Pages/MyMarathonPage";
import MyApplyListPage from "../Pages/MyApplyListPage";
import AllMarathonsPage from "../Pages/AllMarathonsPage";
import UpdateMarathon from "../Pages/UpdateMarathon";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import ErrorPage from "../Pages/ErrorPage";
import MarathonDetails from "../Pages/MarathonDetails";
import RegistrationForm from "../Pages/RegistrationForm";


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
                element: <MyMarathonPage></MyMarathonPage>
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
                element: <MyApplyListPage></MyApplyListPage>
            },
            {
                path: '/allMarathons',
                element: <AllMarathonsPage></AllMarathonsPage>
            },
            {
                path: '/marathon/:id',
                element: <MarathonDetails></MarathonDetails> ,
                loader: async({params}) => {
                    const res = await fetch(`http://localhost:5000/marathons/${params.id}`)
                    const marathon = await res.json();
                    return marathon;
                }
            },
            {
                path: '/updateMarathon/:id',
                element: <UpdateMarathon></UpdateMarathon>,
                // loader: async({params}) => {
                //     const res = await fetch(`https://b10-a10-crowd-funding-server.vercel.app/campaigns/${params.id}`)
                //     const campaign = await res.json()
                //     return campaign;
                // }
            },
            {
                path: '/addMarathon',
                element: <AddMarathonPage></AddMarathonPage>
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