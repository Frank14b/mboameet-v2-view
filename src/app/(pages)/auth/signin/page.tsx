"use client";

import LoginComponent from "@/app/components/layout/authentication/loginComponent";
import useSignIn from "@/app/hooks/pages/auth/useSignIn";

export default function SignInPage() {
  //
  const signInHook = useSignIn();
  return (
    <div className="mh-600">
      <LoginComponent signInHook={signInHook}/>
    </div>
  );
}
