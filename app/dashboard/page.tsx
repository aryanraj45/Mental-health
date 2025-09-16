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

// --- Reusable UI Components & Hooks ---

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

// --- Page Data ---
const upcomingAppointments: Appointment[] = [
  { id: "1", date: "2025-09-20", time: "2:00 PM", counselor: "Dr. Priya Sharma", type: "video", status: "confirmed", bookingId: "MC-123456" },
  { id: "2", date: "2025-09-27", time: "10:00 AM", counselor: "Dr. Rajesh Kumar", type: "phone", status: "confirmed", bookingId: "MC-789012" },
]
const pastAppointments: Appointment[] = [
  { id: "3", date: "2025-09-08", time: "3:00 PM", counselor: "Dr. Anita Menon", type: "video", status: "completed", bookingId: "MC-345678" },
]

// --- Feature Components ---

const MindfulMomentCard = () => {
  const moments = [
    {
      title: "Quick Breather",
      description:
        "Take 5 deep belly breaths. Inhale for 4, hold for 4, exhale for 6.",
      icon: Zap,
    },
    {
      title: "Mindful Observation",
      description:
        "Notice 3 things you can see, 2 things you can hear, and 1 thing you can feel.",
      icon: Eye,
    },
    {
      title: "Positive Affirmation",
      description:
        "Say to yourself: 'I am capable and I am enough, just as I am.'",
      icon: Sparkles,
    },
  ];
  const [moment, setMoment] = useState(moments[0]);

  useEffect(() => {
    setMoment(moments[Math.floor(Math.random() * moments.length)]);
  }, []);

  return (
    <InteractiveGlassCard className="lg:col-span-3">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Your Mindful Moment</h3>
          <p className="text-sm text-white/60">{moment.title}</p>
        </div>
      </div>
      <p className="text-white/80 mt-4 text-lg">{moment.description}</p>
    </InteractiveGlassCard>
  );
};

// --- Main Dashboard Component ---
export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("appointments");
    // --- 2. ADD STATE TO CONTROL THE MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- 3. USE EFFECT TO OPEN THE MODAL ON PAGE LOAD ---
    useEffect(() => {
        // Open the modal 1 second after the component mounts
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 1000);

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs only once

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
            {/* --- 4. RENDER THE MODAL --- */}
            <MoodAssessmentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                // You can pass the actual user's name here
                userName="there" 
            />

            <div className="absolute inset-0">
                <ElegantShape delay={0.3} gradient="from-indigo-500/[0.15]" className="left-[-10%] top-[15%]" parallaxStrength={60} />
                <ElegantShape delay={0.5} gradient="from-rose-500/[0.15]" className="right-[-5%] top-[70%]" parallaxStrength={40} />
                <ElegantShape delay={0.4} gradient="from-violet-500/[0.15]" className="left-[5%] bottom-[5%]" parallaxStrength={80} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
                 <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Heart className="h-8 w-8 text-white" />
                        <h1 className="text-2xl font-bold text-white">MindCare</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                         <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
                            <Link href="/"><Home className="mr-2 h-4 w-4" /> Home</Link>
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
                    {/* ... (rest of your dashboard JSX is unchanged) ... */}
                     <div className="lg:col-span-3">
                         <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                           <MindfulMomentCard />
                         </motion.div>
                    </div>
                    
                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="lg:col-span-2">
                        <Tabs defaultValue="appointments" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 bg-white/[0.03] border border-white/[0.08] p-1 h-auto rounded-lg mb-8">
                                <TabsTrigger value="appointments" className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
                                    {activeTab === "appointments" && <motion.div layoutId="active-tab-dashboard" className="absolute inset-0 bg-white rounded-md shadow-lg" />}
                                    <span className="relative z-10">My Appointments</span>
                                </TabsTrigger>
                                <TabsTrigger value="history" className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
                                    {activeTab === "history" && <motion.div layoutId="active-tab-dashboard" className="absolute inset-0 bg-white rounded-md shadow-lg" />}
                                    <span className="relative z-10">Session History</span>
                                </TabsTrigger>
                            </TabsList>

              <TabsContent value="appointments" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                  >
                    <Link href="/book">Book New Session</Link>
                  </Button>
                </div>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((app) => (
                    <AppointmentCard key={app.id} appointment={app} />
                  ))
                ) : (
                  <p className="text-white/50 text-center py-8">
                    No upcoming appointments.
                  </p>
                )}
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Past Sessions</h3>
                {pastAppointments.length > 0 ? (
                  pastAppointments.map((app) => (
                    <AppointmentCard key={app.id} appointment={app} />
                  ))
                ) : (
                  <p className="text-white/50 text-center py-8">
                    No past appointments.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <InteractiveGlassCard>
              <CardTitle className="text-lg text-white mb-4">
                Quick Actions
              </CardTitle>
              <div className="space-y-3">
                <ActionButton href="/chat">Start AI Chat</ActionButton>
                <ActionButton href="/book">Book a Session</ActionButton>
                <ActionButton href="/resources">Browse Resources</ActionButton>
              </div>
            </InteractiveGlassCard>
            <InteractiveGlassCard>
              <CardTitle className="text-lg text-white mb-2">
                Emergency Support
              </CardTitle>
              <CardDescription className="text-white/50 mb-4">
                24/7 crisis support
              </CardDescription>
              <div className="space-y-2 text-sm text-white/80">
                <div>
                  <strong>NIMHANS:</strong> 080-26995000
                </div>
                <div>
                  <strong>Vandrevala:</strong> 9999666555
                </div>
              </div>
            </InteractiveGlassCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Reusable components (now typed)
const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <InteractiveGlassCard>
        <div className="flex items-start justify-between">
            <div className="space-y-3">
                <InfoItem icon={<Calendar />}>{new Date(appointment.date).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</InfoItem>
                {appointment.time && <InfoItem icon={<Clock />}>{appointment.time}</InfoItem>}
                <InfoItem icon={<User />}>{appointment.counselor}</InfoItem>
                <InfoItem icon={appointment.type === 'video' ? <Video/> : <Phone/>}>{appointment.type === 'video' ? 'Video Session' : 'Phone Session'}</InfoItem>
            </div>
            <div className="flex flex-col items-end gap-2">
                {appointment.status === 'confirmed' ? <Badge className="bg-green-500/10 text-green-300 border border-green-500/20">Confirmed</Badge> : <Badge className="bg-white/10 text-white/70 border border-white/20">Completed</Badge>}
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
      className="flex items-center justify-between w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300"
    >
      <span className="font-semibold">{children}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  </motion.div>
);

const InfoItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 text-white/80">
    <div className="bg-white/5 p-1.5 rounded-full">
      {React.cloneElement(icon as React.ReactElement, {
        className: "h-4 w-4 text-white/70",
      })}
    </div>
)