"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push("/splash");
    } else {
      router.push("/dashboard");
    }
  }, [token, router]);

  return null;
}
