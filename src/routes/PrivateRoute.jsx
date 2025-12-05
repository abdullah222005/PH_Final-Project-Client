import React from 'react';
import useAuth from '../hooks/useAuth';
import { Loader1 } from '../components/Loader/Loader';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    if(loading){
        return <Loader1/>
    }
    
    if(!user){
        return <Navigate to='/auth/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;