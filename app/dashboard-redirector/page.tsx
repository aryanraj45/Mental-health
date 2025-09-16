"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardRedirector() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    // If user is logged in, redirect based on role
    if (isLoggedIn && user) {
      if (user.role === 'admin') {
        router.push('/administrator');
      } else if (user.role === 'student') {
        router.push('/dashboard');
      } else {
        // Default fallback for unknown roles
        router.push('/dashboard');
      }
    } else {
      // If not logged in, redirect to login page
      router.push('/login');
    }
  }, [isLoggedIn, user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <p className="text-center text-xl">Redirecting you to the right place...</p>
      </div>
    </div>
  );
}
