import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const NeedAdmin = ({ children }) => {
    const { userId, isAdmin } = useAuth();

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default NeedAdmin;
