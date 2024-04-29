"use client";

import VerifyAuthTokenComponent from "@/app/components/layout/authentication/verifyAuthTokenComponent";

export default function VerifyTokenPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <div className="mh-600">
      <VerifyAuthTokenComponent token={params.token} />
    </div>
  );
}