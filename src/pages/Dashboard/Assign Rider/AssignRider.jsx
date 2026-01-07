import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AssignRider = () => {
    const {data: parcels, refetch} = useQuery({
        queryKey: ['parcel']
    })

    return (
        <div>
            
        </div>
    );
};

export default AssignRider;