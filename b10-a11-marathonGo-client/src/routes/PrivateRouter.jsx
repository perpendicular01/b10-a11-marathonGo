import React, {  useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/Loading';
import { AuthContext } from '../Contexts/AuthProvider';

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    const path = useLocation().pathname

    if(loading){
        return <Loading></Loading>
    }
    
    if(user){
        return children;
    }
    return (
        <div>
            <Navigate state={path} to={'/auth/login'}></Navigate>
        </div>
    );
};

export default PrivateRouter;