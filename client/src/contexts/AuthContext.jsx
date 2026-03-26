import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole"));

    const login = (id, role) => {
        sessionStorage.setItem("userId", id);
        sessionStorage.setItem("userRole", role || "user");
        setUserId(id);
        setUserRole(role || "user");
    };

    const logout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userRole");
        setUserId(null);
        setUserRole(null);
    };

    const isAdmin = userRole === "admin";

    return (
        <AuthContext.Provider value={{ userId, userRole, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
