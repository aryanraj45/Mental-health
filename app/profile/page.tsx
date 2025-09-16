// app/profile/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
// Import all the icons you'll need
import { User, Edit, Brain, BookOpen, Wind, CheckCircle, Flame, Trophy, Award, Heart, Camera, Upload, X, Check, Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import Head from "next/head";
import { useAuth } from "@/contexts/auth-context";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// --- Default profile data template ---
const defaultUserProfile = {
    name: "Alex",
    profileImage: "/placeholder-user.jpg", // Default profile image
    intention: "To be present in each moment.",
    weeklyReport: {
        dateRange: "September 8 - September 14, 2025",
        moodSummary: "It looks like this was a week of upward trends for you, Alex. We noticed your mood consistently peaked in the evenings, especially on the days you practiced a Sleep Meditation. You logged 'Happy' as your most frequent mood.",
        activities: {
            meditations: { sessions: 5, minutes: 60 },
            journalEntries: 3,
            breathingExercises: 7,
            goalsAchieved: { completed: 2, total: 3 },
        },
        journalThemes: ["work", "family", "gratitude", "anxiety", "self-care"],
    },
    streaks: {
        current: 12,
        longest: 45,
        recentAchievement: "You just earned the 'Mindful Morning' badge for meditating 5 days in a row before 10 AM!",
    },
    recommendations: [
        { title: "Managing Stress Course", description: "Since anxiety was a recurring theme, you might find our 7-day course helpful.", link: "/courses/stress" },
        { title: "Rain on Leaves Soundscape", description: "You enjoyed 'Ocean Sounds'. Why not try this for your next session?", link: "/listen/rain-on-leaves" },
    ]
};

// Stars Background Component
const Stars = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random() * 0.5 + 0.5;
  const randomSize = () => Math.random() * 2 + 1;

  return (
    <div ref={ref} className="absolute inset-0 h-full w-full z-0">
      <motion.div
        style={{
          translateY: y,
        }}
        className="h-full w-full"
      >
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
      </motion.div>
    </div>
  );
};

// Elegant Shape Component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// --- This is the main component for your new page ---
export default function ProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    
    // Load profile from localStorage or use default
    const [profileData, setProfileData] = useState(() => {
        // Try to get profile from localStorage
        if (typeof window !== 'undefined') {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                return JSON.parse(savedProfile);
            }
        }
        // If not found or error, use default
        return defaultUserProfile;
    });
    
    const [profileImage, setProfileImage] = useState(profileData.profileImage);
    const [isEditingIntention, setIsEditingIntention] = useState(false);
    const [intentionText, setIntentionText] = useState(profileData.intention);
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameText, setNameText] = useState(profileData.name);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Save profile data whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userProfile', JSON.stringify(profileData));
        }
    }, [profileData]);
    
    const updateProfileData = async (field: string, value: any) => {
        setIsSaving(true);
        
        try {
            // Create an updated profile object
            const updatedProfile = {
                ...profileData,
                [field]: value
            };
            
            // Send update to API
            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Update local state
                setProfileData(updatedProfile);
                setShowSuccess(true);
                
                // Show success toast
                toast({
                    title: "Profile updated",
                    description: `Your ${field} has been updated successfully.`,
                });
                
                // Hide success message after 3 seconds
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                throw new Error(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: "Update failed",
                description: "There was a problem updating your profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleIntentionSave = () => {
        setIsEditingIntention(false);
        if (intentionText !== profileData.intention) {
            updateProfileData('intention', intentionText);
        }
    };
    
    const handleNameSave = () => {
        setIsEditingName(false);
        if (nameText !== profileData.name) {
            updateProfileData('name', nameText);
        }
    };
    
    const handleProfileImageUpdate = (image: string) => {
        setProfileImage(image);
        updateProfileData('profileImage', image);
    };
    
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay: 0.2 + i * 0.1,
            ease: "easeOut" as const,
          },
        }),
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
            <Stars />
            <Header />
            
            {/* Background Gradients & Shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05] blur-3xl" />
            <div className="absolute inset-0 overflow-hidden">
              <ElegantShape
                delay={0.3}
                width={600}
                height={140}
                rotate={12}
                gradient="from-primary/[0.15]"
                className="left-[-10%] top-[15%]"
              />
              <ElegantShape
                delay={0.5}
                width={500}
                height={120}
                rotate={-15}
                gradient="from-accent/[0.15]"
                className="right-[-5%] top-[70%]"
              />
            </div>

            {/* Success indicator */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-500/90 text-white p-3 rounded-lg shadow-lg flex items-center gap-2"
                    >
                        <Check className="h-5 w-5" />
                        <span>Profile updated successfully!</span>
                    </motion.div>
                </div>
            )}
            
            <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl space-y-8">
                <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} custom={0}>
                    <ProfileHeader 
                        name={nameText}
                        intention={intentionText}
                        profileImage={profileImage}
                        onImageUpdate={handleProfileImageUpdate}
                        isEditingIntention={isEditingIntention}
                        setIsEditingIntention={setIsEditingIntention}
                        onIntentionChange={setIntentionText}
                        onIntentionSave={handleIntentionSave}
                        isEditingName={isEditingName}
                        setIsEditingName={setIsEditingName}
                        onNameChange={setNameText}
                        onNameSave={handleNameSave}
                        isSaving={isSaving}
                    />
                </motion.div>
                
                <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} custom={1}>
                    <WeeklyReflection report={profileData.weeklyReport} />
                </motion.div>
                
                <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} custom={2}>
                    <StreaksAndMilestones streaks={profileData.streaks} />
                </motion.div>
                
                <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} custom={3}>
                    <Suggestions recommendations={profileData.recommendations} />
                </motion.div>
            </main>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

// --- All the UI components for the profile page will go below ---

const ProfileHeader = ({ 
    name, 
    intention, 
    profileImage, 
    onImageUpdate,
    isEditingIntention,
    setIsEditingIntention,
    onIntentionChange,
    onIntentionSave,
    isEditingName,
    setIsEditingName,
    onNameChange,
    onNameSave,
    isSaving
}: { 
    name: string; 
    intention: string; 
    profileImage: string;
    onImageUpdate: (image: string) => void;
    isEditingIntention: boolean;
    setIsEditingIntention: (editing: boolean) => void;
    onIntentionChange: (intention: string) => void;
    onIntentionSave: () => void;
    isEditingName: boolean;
    setIsEditingName: (editing: boolean) => void;
    onNameChange: (name: string) => void;
    onNameSave: () => void;
    isSaving: boolean;
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const intentionInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Add focus when editing is enabled
    useEffect(() => {
        if (isEditingIntention && intentionInputRef.current) {
            intentionInputRef.current.focus();
        }
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [isEditingIntention, isEditingName]);

    const validateAndProcessFile = (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (JPG, PNG, GIF, etc.)');
            return false;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return false;
        }

        // Create a preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                onImageUpdate(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
        return true;
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            validateAndProcessFile(file);
        }
        // Reset the input value so the same file can be selected again
        event.target.value = '';
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
        
        const files = Array.from(event.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        
        if (imageFile) {
            validateAndProcessFile(imageFile);
        } else if (files.length > 0) {
            alert('Please drop an image file');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        onImageUpdate("/placeholder-user.jpg");
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        saveFunction: () => void
    ) => {
        if (e.key === 'Enter') {
            saveFunction();
        } else if (e.key === 'Escape') {
            // For intention we cancel editing
            if (isEditingIntention) {
                setIsEditingIntention(false);
                onIntentionChange(intention); // Reset to original
            }
            // For name we cancel editing
            if (isEditingName) {
                setIsEditingName(false);
                onNameChange(name); // Reset to original
            }
        }
    };

    return (
        <div className="flex items-center gap-6">
            <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
            >
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 transition-all duration-200 relative ${
                    isDragging 
                        ? 'border-blue-400 scale-105 shadow-lg shadow-blue-400/25' 
                        : isHovering 
                            ? 'border-white/40' 
                            : 'border-white/20'
                }`}>
                    {profileImage ? (
                        <Image
                            src={profileImage}
                            alt={`${name}'s profile picture`}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center neon-glow-accent">
                            <User className="w-12 h-12 text-white" />
                        </div>
                    )}
                    
                    {/* Hover/Drag overlay */}
                    <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-200 ${
                        isHovering || isDragging ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <Camera className="w-6 h-6 text-white mb-1" />
                        <span className="text-xs text-white/80 text-center px-1">
                            {isDragging ? 'Drop here' : 'Change photo'}
                        </span>
                    </div>
                </div>

                {/* Image upload options - only show on hover, not when dragging */}
                {isHovering && !isDragging && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900/90 backdrop-blur border border-white/10 rounded-lg p-2 z-50 min-w-[140px] shadow-xl"
                        onClick={(e) => e.stopPropagation()} // Prevent triggering file input when clicking options
                    >
                        <button
                            onClick={triggerFileInput}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                        >
                            <Upload className="w-4 h-4" />
                            Upload Photo
                        </button>
                        {profileImage !== "/placeholder-user.jpg" && (
                            <button
                                onClick={removeImage}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Remove Photo
                            </button>
                        )}
                        <div className="px-3 py-1 text-xs text-white/50 border-t border-white/10 mt-1">
                            Drag & drop or click to upload
                        </div>
                    </motion.div>
                )}

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>
            
            <div>
                {isEditingName ? (
                    <div className="flex items-center gap-2">
                        <Input
                            ref={nameInputRef}
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, onNameSave)}
                            className="text-2xl font-bold bg-white/10 border-white/20 text-white"
                            placeholder="Your name"
                            disabled={isSaving}
                        />
                        <Button 
                            onClick={onNameSave}
                            variant="outline"
                            size="icon"
                            className="border-white/20 text-white"
                            disabled={isSaving}
                        >
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        </Button>
                    </div>
                ) : (
                    <h2 className="text-4xl font-bold text-white flex items-center gap-2">
                        Good evening, {name}.
                        <button 
                            onClick={() => setIsEditingName(true)} 
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    </h2>
                )}
                
                {isEditingIntention ? (
                    <div className="flex items-center gap-2 mt-1">
                        <Input
                            ref={intentionInputRef}
                            type="text"
                            value={intention}
                            onChange={(e) => onIntentionChange(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, onIntentionSave)}
                            className="italic bg-white/10 border-white/20 text-white"
                            placeholder="Your intention"
                            disabled={isSaving}
                        />
                        <Button 
                            onClick={onIntentionSave}
                            variant="outline"
                            size="icon"
                            className="border-white/20 text-white"
                            disabled={isSaving}
                        >
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        </Button>
                    </div>
                ) : (
                    <p className="text-white/60 text-lg mt-1 italic flex items-center gap-2">
                        "{intention}"
                        <button 
                            onClick={() => setIsEditingIntention(true)} 
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    </p>
                )}
                
                <p className="text-white/40 text-sm mt-2">
                    Click or drag an image to update your profile picture
                </p>
            </div>
        </div>
    );
};

const WeeklyReflection = ({ report }: { report: typeof defaultUserProfile.weeklyReport }) => (
    <Card className="glass-effect border-white/[0.08] backdrop-blur-lg">
        <CardHeader>
            <CardTitle className="text-2xl text-white">Your Weekly Reflection</CardTitle>
            <p className="text-white/50">{report.dateRange}</p>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <h3 className="font-semibold text-lg text-white/90 mb-3">Your Mood Journey</h3>
                <div className="w-full h-100 bg-white/5 rounded-lg border border-white/10 overflow-x-auto flex items-center">
                    <Image 
                        src="/chart.png" 
                        alt="Weekly mood flow chart" 
                        width={700}
                        height={170}
                        className="p-2"
                    />
                </div>
                <p className="text-white/70 mt-4 p-4 bg-white/5 rounded-lg border border-white/10">{report.moodSummary}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-white/90 mb-3">Your Mindful Activities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ActivityStat icon={<Brain />} label="Meditations" value={`${report.activities.meditations.sessions} sessions`} />
                    <ActivityStat icon={<BookOpen />} label="Journal Entries" value={`${report.activities.journalEntries} entries`} />
                    <ActivityStat icon={<Wind />} label="Breathing" value={`${report.activities.breathingExercises} sessions`} />
                    <ActivityStat icon={<CheckCircle />} label="Goals Achieved" value={`${report.activities.goalsAchieved.completed} of ${report.activities.goalsAchieved.total}`} />
                </div>
            </div>
            <div>
                 <h3 className="font-semibold text-lg text-white/90 mb-3">Themes From Your Journal</h3>
                 <div className="flex flex-wrap gap-2">
                    {report.journalThemes.map((theme: string) => (
                        <Badge key={theme} variant="secondary" className="bg-white/10 text-white/80 border-white/20 text-sm">#{theme}</Badge>
                    ))}
                 </div>
            </div>
        </CardContent>
    </Card>
);

const ActivityStat = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center gap-3 text-indigo-300">
            {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
            <p className="text-sm font-medium text-white/60">{label}</p>
        </div>
        <p className="text-xl font-bold text-white mt-2">{value}</p>
    </div>
);

const StreaksAndMilestones = ({ streaks }: { streaks: typeof defaultUserProfile.streaks }) => (
    <Card className="glass-effect border-white/[0.08] backdrop-blur-lg">
         <CardHeader>
            <CardTitle className="text-2xl text-white">Streaks & Milestones</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg">
                <Flame className="mx-auto h-8 w-8 text-orange-400" />
                <p className="text-3xl font-bold mt-2">{streaks.current}-Day Streak!</p>
                <p className="text-white/60">Keep the momentum going.</p>
            </div>
             <div className="p-4 bg-white/5 rounded-lg">
                <Trophy className="mx-auto h-8 w-8 text-yellow-300" />
                <p className="text-3xl font-bold mt-2">{streaks.longest} days</p>
                <p className="text-white/60">Your Longest Streak</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg col-span-1 md:col-span-3">
                <Award className="mx-auto h-8 w-8 text-teal-300" />
                <p className="font-semibold text-white/90 mt-2">{streaks.recentAchievement}</p>
            </div>
        </CardContent>
    </Card>
);

const Suggestions = ({ recommendations }: { recommendations: typeof defaultUserProfile.recommendations }) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-4">A Few Ideas for the Coming Week</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="glass-effect border-primary/30 text-white hover:text-white hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-6 py-3 rounded-full">
                <Link href="/journal">View Full Journal History</Link>
            </Button>
            <Button asChild variant="outline" className="glass-effect border-primary/30 text-white hover:text-white hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-6 py-3 rounded-full">
                <Link href="/favorites">My Favorite Meditations</Link>
            </Button>
            <Button asChild variant="outline" className="glass-effect border-primary/30 text-white hover:text-white hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-6 py-3 rounded-full">
                <Link href="/goals">Review My Goals</Link>
            </Button>
            <Button asChild variant="outline" className="glass-effect border-primary/30 text-white hover:text-white hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-6 py-3 rounded-full">
                <Link href="/settings">Settings & Preferences</Link>
            </Button>
        </div>
    </div>
);

