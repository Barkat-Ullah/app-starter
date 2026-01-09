"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import DashboardLayout from "@/components/pages/dashboard/dasboardLayout";

export default function DashboardPage() {
  const router = useRouter();
  // const { token } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/auth/signin");
  //   }
  // }, [token, router]);

  // if (!token) {
  //   return null;
  // }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <p>Your tasks and projects will appear here.</p>
    </DashboardLayout>
  );
}
