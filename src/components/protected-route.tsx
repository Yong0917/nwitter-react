import {auth} from "../firebase.tsx";
import {Navigate} from "react-router-dom";
import React from "react";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const user = auth.currentUser;
    if(user === null){
        return <Navigate to="/login"/>
    }
    return children;
}