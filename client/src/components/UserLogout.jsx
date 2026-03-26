import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        try {
            logout();
            setLoggedOut(true);

            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);
            return () => clearTimeout(timer);
        } catch (err) {
            console.error("Logout error:", err);
            setError("An error occurred while logging out. Please try again.");
        }
    }, [logout, navigate]);

    return (
        <div className="space-y-6 max-w-md mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{loggedOut ? "Logged Out" : "Logout"}</CardTitle>
                    <CardDescription>
                        {loggedOut
                            ? "You have been successfully logged out."
                            : "Logging you out..."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <p className="text-red-500 mt-4 text-center">{error}</p>
                    ) : (
                        <p className="text-green-500 mt-4 text-center">
                            You will be redirected to the login page.
                        </p>
                    )}
                    <div className="mt-4 text-center text-sm">
                        Not being redirected?{" "}
                        <a href="/login" className="underline underline-offset-4">
                            Login
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Logout;
