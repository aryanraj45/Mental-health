"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "neon" | "glow" | "glass";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function FloatingButton({
  children,
  className,
  variant = "neon",
  size = "md",
  onClick,
}: FloatingButtonProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300";

  const variants = {
    neon: "btn-neon animate-float",
    glow: "neon-glow bg-primary text-primary-foreground hover:scale-105",
    glass: "glass-effect border-primary/30 hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Button
        onClick={onClick}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
      >
        {children}
      </Button>
    </motion.div>
  );
}

export function NeonButton(props: Omit<FloatingButtonProps, "variant">) {
  return <FloatingButton {...props} variant="neon" />;
}

export function GlowButton(props: Omit<FloatingButtonProps, "variant">) {
  return <FloatingButton {...props} variant="glow" />;
}

export function GlassButton(props: Omit<FloatingButtonProps, "variant">) {
  return <FloatingButton {...props} variant="glass" />;
}
