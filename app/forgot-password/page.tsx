"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // In a real application, you would call an API endpoint to handle password reset
      // For now, let's just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({
        text: "If your email exists in our system, you will receive a password reset link shortly.",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again later.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur border-white/10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Sukoon</span>
            </div>
            <CardTitle className="text-white">Reset Your Password</CardTitle>
            <CardDescription className="text-white/60">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {message.text && (
                <div className={`text-sm p-2 rounded ${
                  message.type === "success" 
                    ? "text-green-500 bg-green-900/20" 
                    : "text-red-500 bg-red-900/20"
                }`}>
                  {message.text}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 bg-white text-black font-bold text-base rounded-lg hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 transform hover:scale-105 disabled:bg-white/50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>

              <p className="text-center text-sm text-white/60">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
