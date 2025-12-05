import React, { use } from 'react';
import { AuthContext } from '../Auth/Contexts/Auth Context/AuthContext';

const useAuth = () => {
    const AuthInfo = use(AuthContext);
    return AuthInfo;
};

export default useAuth;