"use client";

import SignInComponent from "@/app/components/layout/authentication/registerComponent";
import useSignUp from "@/app/hooks/pages/auth/useSignUp";

export default function SignUpPage() {
    //
    const signUpHook = useSignUp();

    return (
        <div className="mh-600">
            <SignInComponent signUpHook={signUpHook}/>
        </div>
    )
}