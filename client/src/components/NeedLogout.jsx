import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

const NeedLogout = ({ children }) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            setLoggedIn(true);
            // Redirect to home after 3 seconds
            const timer = setTimeout(() => {
                navigate("/");
            }, 3000);

            // Cleanup the timer if the component unmounts early
            return () => clearTimeout(timer);
        }
    }, [navigate]);

    if (loggedIn) {
        return (
            <div className="space-y-6 max-w-md mx-auto p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Already logged in</CardTitle>
                        <CardDescription>
                            You need to log out to access this page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-500 mt-4 text-center">
                            You will be redirected to the home page.
                        </p>
                        <div className="mt-4 text-center text-sm">
                            You are not being redirected?{" "}
                            <a href="/home" className="underline underline-offset-4">
                                Home
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>

        );
    }

    return children;
};

export default NeedLogout;
