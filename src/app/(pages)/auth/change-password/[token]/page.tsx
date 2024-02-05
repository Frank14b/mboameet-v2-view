"use client";

import ChangePasswordComponent from "@/app/components/layout/authentication/changePassword";
// import { useEffect } from "react";


export default function ChangePasswordPage({ params }: {params: { token: string }}) {
    return (
        <div className="container mh-600 h-svh">
            <ChangePasswordComponent token={params.token} />
        </div>
    )
}