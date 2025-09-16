"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function ModernCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient = false,
}: ModernCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        "card-modern",
        glow && "neon-glow",
        gradient && "bg-gradient-to-br from-card to-card/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className, ...props }: ModernCardProps) {
  return (
    <ModernCard className={cn("glass-effect", className)} {...props}>
      {children}
    </ModernCard>
  );
}

export function NeonCard({ children, className, ...props }: ModernCardProps) {
  return (
    <ModernCard className={cn("neon-glow", className)} glow={true} {...props}>
      {children}
    </ModernCard>
  );
}
