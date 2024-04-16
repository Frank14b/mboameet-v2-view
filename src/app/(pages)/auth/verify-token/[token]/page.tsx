"use client";

import VerifyAuthTokenComponent from "@/app/components/layout/authentication/verifyAuthToken";

export default function VerifyTokenPage({ params }: {params: { token: string }}) {
    return (
        <div className="container mh-600 h-svh">
            <VerifyAuthTokenComponent token={params.token} />
        </div>
    )
}