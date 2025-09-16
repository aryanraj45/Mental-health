"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, User, Shield, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Font Definition from HomePage ---
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// --- Helper & Effect Components from HomePage ---

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random() * 0.5 + 0.5;
  const randomSize = () => Math.random() * 2 + 1;

  return (
    <div className="absolute inset-0 h-full w-full z-0">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          animate={{
            x: `${randomMove()}rem`,
            y: `${randomMove()}rem`,
            opacity: [randomOpacity(), randomOpacity(), randomOpacity()],
            transition: {
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "mirror",
            },
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${randomSize()}px`,
            height: `${randomSize()}px`,
          }}
        />
      ))}
    </div>
  );
};

function ElegantShape({ className, delay = 0, gradient = "from-white/[0.08]" }: { className?: string; delay?: number; gradient?: string; }) {
    const width = Math.random() * 400 + 200;
    const height = Math.random() * 100 + 50;
    const rotate = Math.random() * 360;
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: rotate - 15 }}
        animate={{ opacity: 1, scale: 1, rotate: rotate }}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className={cn("absolute", className)}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ width, height }}
          className="relative"
        >
          <div className={cn("absolute inset-0 rounded-full", "bg-gradient-to-r to-transparent", gradient, "backdrop-blur-md border border-white/[0.1]", "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]")} />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        </motion.div>
      </motion.div>
    );
}

// --- Combined Login Page Component ---
export default function LoginPage() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // --- NEW: Autofill useEffect ---
  useEffect(() => {
    if (role === "student") {
      setEmail("student@university.edu");
      setPassword("password123");
    } else if (role === "admin") {
      setEmail("admin@university.edu");
      setPassword("password123");
    }
    setError(""); // Clear error on role change
  }, [role]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Using demo credentials for frontend-only example
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (
        (email === "student@university.edu" && password === "password123" && role === "student")
      ) {
        router.push("/dashboard"); // Or your student dashboard route
      } else if (
        (email === "admin@university.edu" && password === "password123" && role === "admin")
      ) {
        router.push("/admin"); // Or your admin dashboard route
      } else {
        throw new Error("Invalid credentials");
      }
    } catch {
      setError("Invalid credentials. Please use the demo credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 * i,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <Stars />
      <ElegantShape delay={0.3} gradient="from-indigo-500/[0.15]" className="left-[-10%] top-[15%]" />
      <ElegantShape delay={0.5} gradient="from-rose-500/[0.15]" className="right-[-5%] top-[70%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="w-full max-w-md rounded-2xl bg-white/[0.03] backdrop-blur-lg border border-white/[0.08] shadow-2xl shadow-black/30 p-8 md:p-10"
        >
          <div className="text-center">
            <motion.div custom={0} variants={fadeUpVariants} className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-white" />
              <h1 className={cn("text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300", pacifico.className)}>
                Sukoon
              </h1>
            </motion.div>
            <motion.p custom={1} variants={fadeUpVariants} className="text-center text-white/50 mb-8">
              Welcome back. A safe space awaits.
            </motion.p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div custom={2} variants={fadeUpVariants} className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => setRole("student")}
                className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 w-full h-12 text-sm",
                    role === "student"
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-transparent text-white border-white/20 hover:bg-white/10"
                )}
              >
                <User className="h-5 w-5" />
                <span>Student</span>
              </Button>
              <Button
                type="button"
                onClick={() => setRole("admin")}
                className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 w-full h-12 text-sm",
                    role === "admin"
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-transparent text-white border-white/20 hover:bg-white/10"
                )}
              >
                <Shield className="h-5 w-5" />
                <span>Admin</span>
              </Button>
            </motion.div>

            <motion.div custom={3} variants={fadeUpVariants} className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 z-10" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative w-full h-14 pl-12 pr-4 border border-white/10 bg-white/5 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
              />
            </motion.div>

            <motion.div custom={4} variants={fadeUpVariants} className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 z-10" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative w-full h-14 pl-12 pr-4 border border-white/10 bg-white/5 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
                placeholder="Password"
              />
            </motion.div>

            {error && (
              <motion.div custom={5} variants={fadeUpVariants} className="text-sm text-rose-300 bg-rose-800/20 p-3 rounded-lg border border-rose-500/30">
                {error}
              </motion.div>
            )}

            {/* --- NEW: Demo Credentials Info Box --- */}
            <motion.div custom={5} variants={fadeUpVariants} className="text-xs text-center text-white/40 bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="font-medium mb-1 text-white/60">Demo Credentials</p>
                <p>Click a role above to autofill.</p>
            </motion.div>

            <motion.div custom={6} variants={fadeUpVariants}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white text-black font-bold text-base rounded-lg hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 transform hover:scale-105 disabled:bg-white/50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </motion.div>

            <motion.div custom={7} variants={fadeUpVariants} className="text-center text-sm text-white/40 space-y-2 pt-4">
              <Link href="/forgot-password" className="font-semibold text-white/60 hover:text-white hover:underline">
                Forgot Password?
              </Link>
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-white hover:underline">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}