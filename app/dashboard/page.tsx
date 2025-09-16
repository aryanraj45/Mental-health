"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import {
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  MapPin,
  Heart,
  MessageCircle,
  ArrowRight,
  Home,
  Zap,
  Sparkles,
  Eye,
} from "lucide-react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, ReactNode } from "react";
// Assuming MoodAssessmentModal is in this path
import { MoodAssessmentModal } from "@/components/MoodAssessmentModal"; 
import Image from 'next/image';

// --- Reusable UI Components & Hooks (Unchanged) ---
function ElegantShape({
  className,
  delay = 0,
  gradient = "from-white/[0.08]",
  parallaxStrength = 50,
}: {
  className?: string;
  delay?: number;
  gradient?: string;
  parallaxStrength?: number;
}) {
  const ref = useRef(null);
  const { x, y } = useMouseParallax(ref, parallaxStrength);
  const width = Math.random() * 400 + 200;
  const height = Math.random() * 100 + 50;
  const rotate = Math.random() * 360;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate: rotate }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute", className)}
      style={{ x, y }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-md border-2 border-white/[0.1]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          )}
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      </motion.div>
    </motion.div>
  );
}

const useMouseParallax = (
  ref: React.RefObject<HTMLDivElement>,
  strength: number
) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const moveX = (clientX - innerWidth / 2) / (innerWidth / 2);
      const moveY = (clientY - innerHeight / 2) / (innerHeight / 2);
      x.set(moveX * strength);
      y.set(moveY * strength);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref, strength, x, y]);
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const springY = useSpring(y, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  return { x: springX, y: springY };
};

const InteractiveGlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg p-6 rounded-xl relative",
        className
      )}
    >
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
};

type Appointment = { 
  id: string; 
  date: string; 
  time: string; 
  counselor: string; 
  type: "video" | "phone" | "in-person"; 
  status: "confirmed" | "completed" | "pending" | "rescheduled"; 
  bookingId: string; 
  specialty?: string;
  sessionType?: string;
  duration?: string;
  notes?: string;
  location?: string;
};

const upcomingAppointments: Appointment[] = [
  { 
    id: "1", 
    date: "2025-09-18", 
    time: "2:00 PM", 
    counselor: "Dr. Priya Sharma", 
    type: "video", 
    status: "confirmed", 
    bookingId: "MC-123456",
    specialty: "Anxiety & Stress Management",
    sessionType: "Individual Therapy",
    duration: "50 minutes",
    notes: "Follow-up session to discuss coping strategies"
  },
  { 
    id: "2", 
    date: "2025-09-20", 
    time: "10:00 AM", 
    counselor: "Dr. Rajesh Kumar", 
    type: "phone", 
    status: "confirmed", 
    bookingId: "MC-789012",
    specialty: "Academic Stress & Performance",
    sessionType: "Counseling Session",
    duration: "45 minutes",
    notes: "Discussion about exam preparation strategies"
  },
  { 
    id: "3", 
    date: "2025-09-22", 
    time: "4:30 PM", 
    counselor: "Dr. Meera Joshi", 
    type: "video", 
    status: "pending", 
    bookingId: "MC-345123",
    specialty: "Depression & Mood Disorders",
    sessionType: "Therapy Session",
    duration: "60 minutes",
    notes: "Initial assessment and treatment planning"
  },
  { 
    id: "4", 
    date: "2025-09-25", 
    time: "11:30 AM", 
    counselor: "Dr. Arjun Patel", 
    type: "in-person", 
    status: "confirmed", 
    bookingId: "MC-567890",
    specialty: "Relationship & Social Anxiety",
    sessionType: "Group Therapy",
    duration: "90 minutes",
    location: "Wellness Center, Room 204",
    notes: "Social skills development group session"
  },
];

const pastAppointments: Appointment[] = [
  { 
    id: "7", 
    date: "2025-09-15", 
    time: "3:00 PM", 
    counselor: "Dr. Anita Menon", 
    type: "video", 
    status: "completed", 
    bookingId: "MC-345678",
    specialty: "General Mental Health",
    sessionType: "Initial Consultation",
    duration: "60 minutes",
    notes: "Completed initial assessment and goal setting"
  },
  { 
    id: "8", 
    date: "2025-09-12", 
    time: "11:00 AM", 
    counselor: "Dr. Vikram Singh", 
    type: "phone", 
    status: "completed", 
    bookingId: "MC-456789",
    specialty: "Academic Pressure",
    sessionType: "Crisis Counseling",
    duration: "30 minutes",
    notes: "Emergency session for exam stress management"
  },
  { 
    id: "9", 
    date: "2025-09-08", 
    time: "2:30 PM", 
    counselor: "Dr. Priya Sharma", 
    type: "video", 
    status: "completed", 
    bookingId: "MC-567123",
    specialty: "Anxiety & Stress Management",
    sessionType: "Individual Therapy",
    duration: "50 minutes",
    notes: "Practiced relaxation techniques and reviewed progress"
  },
  { 
    id: "10", 
    date: "2025-09-05", 
    time: "4:00 PM", 
    counselor: "Dr. Deepa Nair", 
    type: "in-person", 
    status: "completed", 
    bookingId: "MC-678234",
    specialty: "Self-Esteem & Confidence",
    sessionType: "Therapy Session",
    duration: "55 minutes",
    location: "Wellness Center, Room 101",
    notes: "Cognitive behavioral therapy techniques for self-confidence"
  },
  { 
    id: "11", 
    date: "2025-09-01", 
    time: "10:30 AM", 
    counselor: "Dr. Rahul Verma", 
    type: "video", 
    status: "completed", 
    bookingId: "MC-789345",
    specialty: "ADHD & Focus Issues",
    sessionType: "Assessment Session",
    duration: "75 minutes",
    notes: "Comprehensive ADHD assessment and diagnosis discussion"
  }
];
const MindfulMomentCard = () => { 
  const moments = [ 
    { 
      title: "Quick Breather", 
      description: "Take 5 deep belly breaths. Inhale for 4, hold for 4, exhale for 6. Feel your body releasing tension with each breath.", 
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10"
    }, 
    { 
      title: "Mindful Observation", 
      description: "Ground yourself using the 5-4-3-2-1 technique: Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, 1 thing you taste.", 
      icon: Eye,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10"
    }, 
    { 
      title: "Positive Affirmation", 
      description: "Say to yourself: 'I am capable and I am enough, just as I am. Every challenge I face is an opportunity to grow stronger.'", 
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10"
    },
    { 
      title: "Gratitude Moment", 
      description: "Think of three specific things you're grateful for today. Feel the warmth of appreciation fill your heart.", 
      icon: Heart,
      color: "from-rose-500 to-red-500",
      bgColor: "from-rose-500/10 to-red-500/10"
    },
    { 
      title: "Body Scan", 
      description: "Starting from your toes, slowly scan your body. Notice any tension and consciously relax each muscle group as you move upward.", 
      icon: User,
      color: "from-orange-500 to-yellow-500",
      bgColor: "from-orange-500/10 to-yellow-500/10"
    },
    { 
      title: "Present Moment", 
      description: "Pause and ask yourself: 'What am I experiencing right now?' Notice your thoughts, feelings, and sensations without judgment.", 
      icon: Clock,
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-500/10 to-purple-500/10"
    }
  ]; 
  
  const [moment, setMoment] = useState(moments[0]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => { 
    const randomIndex = Math.floor(Math.random() * moments.length);
    setMoment(moments[randomIndex]); 
    setCurrentIndex(randomIndex);
  }, []);

  const nextMoment = () => {
    const nextIndex = (currentIndex + 1) % moments.length;
    setMoment(moments[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevMoment = () => {
    const prevIndex = currentIndex === 0 ? moments.length - 1 : currentIndex - 1;
    setMoment(moments[prevIndex]);
    setCurrentIndex(prevIndex);
  };
  
  return ( 
    <InteractiveGlassCard className="lg:col-span-3 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${moment.bgColor} opacity-30`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${moment.color} shadow-lg`}>
              <moment.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">Your Mindful Moment</h3>
              <p className="text-sm text-white/60">{moment.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={prevMoment}
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 w-8 h-8 p-0"
            >
              ←
            </Button>
            <Button
              onClick={nextMoment}
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 w-8 h-8 p-0"
            >
              →
            </Button>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-white/90 text-lg leading-relaxed">{moment.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1">
            {moments.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-white/50 text-sm">
            Take a moment to practice this mindfulness exercise
          </p>
        </div>
      </div>
    </InteractiveGlassCard> 
  ); 
};

// --- Main Dashboard Component ---
export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("appointments");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- MODIFICATION 1: USEEFFECT NOW CHECKS SESSION STORAGE INSTEAD OF USING A TIMER ---
    useEffect(() => {
        // Check if the flag to show the modal exists
        const shouldShowModal = sessionStorage.getItem('showMoodModal') === 'true';

        if (shouldShowModal) {
            setIsModalOpen(true);
        }
    }, []); // Empty array ensures this runs only once when the component mounts

    // --- MODIFICATION 2: A NEW HANDLER TO CLOSE THE MODAL AND CLEAR THE FLAG ---
    const handleCloseModal = () => {
        setIsModalOpen(false);
        // This is crucial: remove the flag so it doesn't show again on refresh
        sessionStorage.removeItem('showMoodModal');
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.25, 1, 0.5, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
            {/* --- MODIFICATION 3: THE ONCLOSE PROP IS UPDATED --- */}
            <MoodAssessmentModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                userName="there" // You can replace this with the actual user's name
            />
            
            <div className="absolute inset-0">
                <ElegantShape delay={0.3} gradient="from-indigo-500/[0.15]" className="left-[-10%] top-[15%]" parallaxStrength={60} />
                <ElegantShape delay={0.5} gradient="from-rose-500/[0.15]" className="right-[-5%] top-[70%]" parallaxStrength={40} />
                <ElegantShape delay={0.4} gradient="from-violet-500/[0.15]" className="left-[5%] bottom-[5%]" parallaxStrength={80} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logoo.png"
                            alt="MindCare Logo"
                            width={150}
                            height={200}
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                         <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
                            <Link href="/"><Home className="mr-2 h-4 w-4" /> Home</Link>
                        </Button>
                        <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
                            <Link href="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link>
                        </Button>
                        <Badge className="bg-white/10 text-white/70 border border-white/20">Dashboard</Badge>
                    </div>
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
                <motion.div
                  custom={0}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-12"
                >
                  <h2 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    Welcome Back
                  </h2>
                  <p className="text-white/50 text-lg">
                    Your sanctuary for mental clarity and growth.
                  </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3">
                         <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                           <MindfulMomentCard />
                         </motion.div>
                    </div>
                    
                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="lg:col-span-2">
                        <Tabs defaultValue="appointments" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 bg-white/[0.03] border border-white/[0.08] p-1 h-auto rounded-lg mb-8">
                                <TabsTrigger value="appointments" className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
                                    {activeTab === "appointments" && <motion.div layoutId="active-tab-dashboard" className="absolute inset-0 bg-gray-500 rounded-md shadow-lg" />}
                                    <span className="relative z-10">My Appointments</span>
                                </TabsTrigger>
                                <TabsTrigger value="history" className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
                                    {activeTab === "history" && <motion.div layoutId="active-tab-dashboard" className="absolute inset-0 bg-gray-500 rounded-md shadow-lg" />}
                                    <span className="relative z-10">Session History</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="appointments" className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                  <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
                                  <Button asChild size="sm" className="bg-white text-black hover:bg-white/90 rounded-full font-semibold">
                                    <Link href="/book">Book New Session</Link>
                                  </Button>
                                </div>
                                {upcomingAppointments.length > 0 ? ( upcomingAppointments.map((app) => ( <AppointmentCard key={app.id} appointment={app} /> )) ) : ( <p className="text-white/50 text-center py-8"> No upcoming appointments. </p> )}
                            </TabsContent>
                            <TabsContent value="history" className="space-y-4">
                                <h3 className="text-xl font-semibold mb-4">Past Sessions</h3>
                                {pastAppointments.length > 0 ? ( pastAppointments.map((app) => ( <AppointmentCard key={app.id} appointment={app} /> )) ) : ( <p className="text-white/50 text-center py-8"> No past appointments. </p> )}
                            </TabsContent>
                        </Tabs>
                    </motion.div>

                    <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="space-y-6">
                        {/* Quick Actions */}
                        <InteractiveGlassCard>
                            <CardTitle className="text-lg text-white mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" />
                                Quick Actions
                            </CardTitle>
                            <div className="space-y-3">
                                <ActionButton href="/chat">
                                    <MessageCircle className="h-4 w-4" />
                                    Start AI Chat
                                </ActionButton>
                                <ActionButton href="/book">
                                    <Calendar className="h-4 w-4" />
                                    Book a Session
                                </ActionButton>
                                <ActionButton href="/resources">
                                    <Heart className="h-4 w-4" />
                                    Browse Resources
                                </ActionButton>
                                <ActionButton href="/community">
                                    <User className="h-4 w-4" />
                                    Join Community
                                </ActionButton>
                                <ActionButton href="/wellness">
                                    <Sparkles className="h-4 w-4" />
                                    Wellness Tools
                                </ActionButton>
                            </div>
                        </InteractiveGlassCard>

                        {/* Mental Health Stats */}
                        <InteractiveGlassCard>
                            <CardTitle className="text-lg text-white mb-4 flex items-center gap-2">
                                <Eye className="h-5 w-5 text-blue-400" />
                                Your Progress
                            </CardTitle>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-sm">Sessions Completed</span>
                                    <span className="text-white font-bold">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-sm">Mood Check-ins</span>
                                    <span className="text-white font-bold">28</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-sm">Wellness Streak</span>
                                    <span className="text-green-400 font-bold">7 days</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-sm">Resources Saved</span>
                                    <span className="text-white font-bold">15</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                                </div>
                                <p className="text-white/60 text-xs text-center">75% of monthly wellness goals achieved</p>
                            </div>
                        </InteractiveGlassCard>

                        {/* Emergency Support */}
                        <InteractiveGlassCard>
                            <CardTitle className="text-lg text-white mb-2 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-red-400" />
                                Emergency Support
                            </CardTitle>
                            <CardDescription className="text-white/50 mb-4">24/7 crisis support available</CardDescription>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                                    <div>
                                        <div className="text-white font-medium">NIMHANS Crisis</div>
                                        <div className="text-red-300 text-xs">National Emergency Line</div>
                                    </div>
                                    <div className="text-red-300 font-mono">080-26995000</div>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <div>
                                        <div className="text-white font-medium">Vandrevala Foundation</div>
                                        <div className="text-orange-300 text-xs">Mental Health Support</div>
                                    </div>
                                    <div className="text-orange-300 font-mono">9999666555</div>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                    <div>
                                        <div className="text-white font-medium">Crisis Text Line</div>
                                        <div className="text-purple-300 text-xs">Text "HOME" to</div>
                                    </div>
                                    <div className="text-purple-300 font-mono">741741</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                                    <Link href="/urgent">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Access Emergency Support
                                    </Link>
                                </Button>
                            </div>
                        </InteractiveGlassCard>

                        {/* Recent Activity */}
                        <InteractiveGlassCard>
                            <CardTitle className="text-lg text-white mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-green-400" />
                                Recent Activity
                            </CardTitle>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-white/80 text-sm">Completed mood check-in</p>
                                        <p className="text-white/50 text-xs">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-white/80 text-sm">Saved anxiety management resource</p>
                                        <p className="text-white/50 text-xs">Yesterday</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-white/80 text-sm">Completed session with Dr. Priya</p>
                                        <p className="text-white/50 text-xs">3 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-white/80 text-sm">Started meditation practice</p>
                                        <p className="text-white/50 text-xs">1 week ago</p>
                                    </div>
                                </div>
                            </div>
                        </InteractiveGlassCard>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

// Reusable components
const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
  <InteractiveGlassCard>
    <div className="space-y-4">
      {/* Header with counselor and status */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-white text-lg">{appointment.counselor}</h4>
            {appointment.specialty && (
              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                {appointment.specialty}
              </Badge>
            )}
          </div>
          {appointment.sessionType && (
            <p className="text-white/60 text-sm">{appointment.sessionType}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {appointment.status === 'confirmed' && (
            <Badge className="bg-green-500/10 text-green-300 border border-green-500/20">
              Confirmed
            </Badge>
          )}
          {appointment.status === 'pending' && (
            <Badge className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
              Pending
            </Badge>
          )}
          {appointment.status === 'rescheduled' && (
            <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20">
              Rescheduled
            </Badge>
          )}
          {appointment.status === 'completed' && (
            <Badge className="bg-white/10 text-white/70 border border-white/20">
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Appointment details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoItem icon={<Calendar />}>
          {new Date(appointment.date).toLocaleDateString("en-IN", { 
            weekday: "long", 
            month: "long", 
            day: "numeric",
            year: "numeric"
          })}
        </InfoItem>
        {appointment.time && (
          <InfoItem icon={<Clock />}>
            {appointment.time}
            {appointment.duration && ` (${appointment.duration})`}
          </InfoItem>
        )}
        <InfoItem icon={appointment.type === 'video' ? <Video/> : appointment.type === 'phone' ? <Phone/> : <MapPin/>}>
          {appointment.type === 'video' ? 'Video Session' : 
           appointment.type === 'phone' ? 'Phone Session' : 
           'In-Person Session'}
        </InfoItem>
        {appointment.location && (
          <InfoItem icon={<MapPin />}>
            {appointment.location}
          </InfoItem>
        )}
      </div>

      {/* Notes and booking ID */}
      {appointment.notes && (
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-white/70 text-sm">
            <span className="font-medium text-white/90">Notes: </span>
            {appointment.notes}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <span className="text-white/50 text-xs">
          Booking ID: {appointment.bookingId}
        </span>
        {appointment.status === 'confirmed' && (
          <div className="flex gap-2">
            {appointment.type === 'video' && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Video className="h-3 w-3 mr-1" />
                Join Call
              </Button>
            )}
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Reschedule
            </Button>
          </div>
        )}
      </div>
    </div>
  </InteractiveGlassCard>
);
const ActionButton = ({ 
  href, 
  children, 
}: { 
  href: string; 
  children: React.ReactNode; 
}) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
    <Link 
      href={href} 
      className="flex items-center justify-between w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        {children}
      </div>
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  </motion.div>
);
const InfoItem = ({ icon, children, }: { icon: React.ReactNode; children: React.ReactNode; }) => ( <div className="flex items-center gap-3 text-white/80"> <div className="bg-white/5 p-1.5 rounded-full"> {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 text-white/70", })} </div> <span>{children}</span> </div> );