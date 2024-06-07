"use client";

import ChangePasswordComponent from "@/app/components/layout/authentication/ChangePasswordComponent";

export default function ChangePasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <div className="mh-600">
      <ChangePasswordComponent token={params.token} />
    </div>
  );
}