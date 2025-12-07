import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Loader1 } from '../../../components/Loader/Loader';

const PaymentPage = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel}= useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if(isLoading){
        return <Loader1/>
    }

    return (
        <div>
            <h1>Please Pay: {parcel.parcelName}</h1>
        </div>
    );
};

export default PaymentPage;