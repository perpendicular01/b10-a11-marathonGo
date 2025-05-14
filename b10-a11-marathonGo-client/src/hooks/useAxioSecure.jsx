import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const axioInstance = axios.create({
    baseURL: "https://b10-a11-marathon-go-server.vercel.app",
    withCredentials: true
})

const useAxioSecure = () => {
    const {signOutUser} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axioInstance.interceptors.response.use(
            response => response,
            error => {
                console.log('error caught in interceptor', error);
    
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log('have to sign out');
                    signOutUser()
                        .then(() => {
                            console.log('logged out user');
                            navigate('/auth/login');
                        })
                        .catch(err => {
                            console.log('Sign out error:', err);
                        });
                }
    
                return Promise.reject(error);
            }
        );
    
        // Optional: remove interceptor when component unmounts
        return () => {
            axioInstance.interceptors.response.eject(interceptor);
        };
    }, [navigate, signOutUser]);
    

    return axioInstance;

};

export default useAxioSecure;