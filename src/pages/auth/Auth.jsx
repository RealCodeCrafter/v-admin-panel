import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
    const token = useSelector((state) => state.auth.token);
    const botBaseUrl = useSelector((state) => state.auth.botBaseUrl);
    
    // Token va botBaseUrl bo'lishi kerak
    if (!token || !botBaseUrl) {
        return <Navigate to={"/login"} replace />;
    }
    
    return <Outlet />;
};

export default Auth;