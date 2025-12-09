import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3333'
})

const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        // intercept request
        const reqInterceptor = axiosSecure.interceptors.request.use(async(config)=>{
            if(user){
                const token = await user.getIdToken();                
                config.headers.Authorization = `Bearer ${token}`

            }
            return config;
        })
        // intercepter response
        const resInterceptor = axiosSecure.interceptors.response.use((response) =>{
            return response;
        }, (error)=>{
            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 403){
                logOutUser()
                .then(res=>{
                    navigate('/auth/login');
                })
            }
            return Promise.reject(error);
        })

        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user, logOutUser, navigate])

    return axiosSecure;
};

export default useAxiosSecure;