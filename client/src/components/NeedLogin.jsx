import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

const NeedLogin = ({ children }) => {
    const navigate = useNavigate();
    const [notLoggedIn, setNotLoggedIn] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            setNotLoggedIn(true);
            // Redirect to login page after 3 seconds
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            // Clean up the timer 
            return () => clearTimeout(timer);
        }
    }, [navigate]);

    if (notLoggedIn) {
        return (
            <div className="space-y-6 max-w-md mx-auto p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            You must be logged in to access this page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-500 mt-4 text-center">
                            You will be redirected to the login page.
                        </p>
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
    }

    return children;
};

export default NeedLogin;
