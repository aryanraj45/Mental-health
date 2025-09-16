"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, User, Shield, Mail, Lock } from "lucide-react";

let THREE: any; // For global three.js use

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 3D Background Effect
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.onload = () => {
      THREE = (window as any).THREE;
      init3D();
    };
    document.body.appendChild(script);

    function init3D() {
      if (!THREE || !mountRef.current) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      (mountRef.current as any).appendChild(renderer.domElement);

      const createParticleSystem = (count: number, color: number, size: number, speedFactor: number) => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 25;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
          color: color,
          size: size,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        });
        const system = new THREE.Points(geometry, material);
        (system.userData as any).speedFactor = speedFactor;
        scene.add(system);
        return system;
      };

      const particleSystem1 = createParticleSystem(5000, 0x00c5ce, 0.02, 0.05);
      const particleSystem2 = createParticleSystem(2000, 0xffffff, 0.03, 0.02);

      camera.position.z = 5;
      const clock = new THREE.Clock();
      let mouse = new THREE.Vector2();

      const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        [particleSystem1, particleSystem2].forEach(system => {
          system.rotation.y = elapsedTime * (system.userData as any).speedFactor;
          system.rotation.x = elapsedTime * (system.userData as any).speedFactor;
          system.rotation.y += (mouse.x - system.rotation.y) * 0.01;
          system.rotation.x += (mouse.y - system.rotation.x) * 0.01;
        });

        renderer.render(scene, camera);
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      const handleMouseMove3D = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove3D);
      animate();

      // Clean-up
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove3D);
        if (mountRef.current && renderer.domElement) {
          (mountRef.current as any).removeChild(renderer.domElement);
        }
        document.body.removeChild(script);
      };
    }
  }, []);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (data.success) {
        router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      if (
        (email === "student@university.edu" && password === "password123" && role === "student") ||
        (email === "admin@university.edu" && password === "password123" && role === "admin")
      ) {
        router.push(role === "admin" ? "/admin" : "/dashboard");
      } else {
        setError("Invalid credentials. Please use the demo credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .aurora-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 0.6rem;
          background: linear-gradient(45deg, #00c5ce, #00a0a8, #ffffff, #00c5ce);
          background-size: 400% 400%;
          animation: aurora 6s ease infinite;
          z-index: -1;
        }
        .input-group:focus-within .input-icon {
          color: #00c5ce;
          transform: scale(1.1);
        }
      `}</style>

      <div className="relative min-h-screen w-full text-gray-800 overflow-hidden bg-[#0a0a2a]">
        <div ref={mountRef} className="absolute inset-0 z-0 opacity-70" />

        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-xs rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/20 shadow-2xl animate-fade-in">
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Heart className="h-8 w-8 text-[#00c5ce]" />
                <span className="text-3xl font-bold tracking-wider text-white" style={{ textShadow: "0 0 10px rgba(0,197,206,0.5)" }}>
                  Sukoon
                </span>
              </div>
              <p className="text-center text-gray-300 mb-8 text-sm">
                Your personal space for peace and clarity.
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`relative flex items-center justify-center gap-2 p-3 rounded-lg z-10 transition-all duration-300 bg-black/50 text-white ${role === "student" ? "aurora-border" : ""}`}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-semibold">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`relative flex items-center justify-center gap-2 p-3 rounded-lg z-10 transition-all duration-300 bg-black/50 text-white ${role === "admin" ? "aurora-border" : ""}`}
                  >
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Admin</span>
                  </button>
                </div>

                <div className="relative input-group">
                  <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 z-10 input-icon transition-all duration-300" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="relative w-full pl-11 pr-3 py-3 border-2 border-white/20 bg-black/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c5ce] focus:border-[#00c5ce] transition-all duration-300"
                  />
                </div>

                <div className="relative input-group">
                  <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 z-10 input-icon transition-all duration-300" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="relative w-full pl-11 pr-3 py-3 border-2 border-white/20 bg-black/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c5ce] focus:border-[#00c5ce] transition-all duration-300"
                    placeholder="Password"
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-300 bg-red-800/50 p-3 rounded-lg border border-red-500/50">
                    {error}
                  </div>
                )}

                <div className="text-xs text-gray-400 bg-black/30 p-3 rounded-lg text-center">
                  <p className="font-medium mb-1 text-gray-300">Demo Credentials</p>
                  <p>Student: student@university.edu / password123</p>
                  <p>Admin: admin@university.edu / password123</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#00c5ce] to-[#008b8b] text-white font-bold py-3 px-4 rounded-lg hover:shadow-2xl hover:shadow-[#00c5ce]/40 focus:outline-none focus:ring-4 focus:ring-[#00c5ce]/50 transition-all duration-300 transform hover:scale-105 disabled:bg-[#00c5ce]/50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isLoading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <div className="text-center text-sm text-gray-400 space-y-2 mt-4">
                  <Link href="/forgot-password" className="font-semibold text-gray-400 hover:text-[#00c5ce] hover:underline">
                    Forgot Password?
                  </Link>
                  <p>
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-semibold text-[#00c5ce] hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
