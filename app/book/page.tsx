"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  User,
  Shield,
  Heart,
  CheckCircle,
  Phone,
  Video,
  MapPin,
  Star,
  GraduationCap,
  Languages,
  Coffee,
  Brain,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Reusable UI Components & Hooks ---

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
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

// --- Page Specific Data & Components ---

const counselors = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: ["Anxiety", "Depression", "Stress"],
    languages: ["English", "Hindi"],
    experience: "8 years",
    avatar: "https://placehold.co/128x128/e2e8f0/64748b?text=PS",
    rating: 4.9,
    bio: "Specializes in cognitive behavioral therapy and mindfulness.",
  },
  {
    id: "2",
    name: "Dr. Arjun Patel",
    specialization: ["Relationships", "Family Therapy"],
    languages: ["English", "Gujarati"],
    experience: "12 years",
    avatar: "https://placehold.co/128x128/e2e8f0/64748b?text=AP",
    rating: 4.8,
    bio: "Expert in family dynamics and relationship counseling.",
  },
  {
    id: "3",
    name: "Dr. Meera Singh",
    specialization: ["Trauma", "PTSD", "Grief"],
    languages: ["English", "Punjabi"],
    experience: "10 years",
    avatar: "https://placehold.co/128x128/e2e8f0/64748b?text=MS",
    rating: 4.9,
    bio: "Trauma-informed specialist helping individuals heal.",
  },
];

const timeSlots = [
  { id: "t1", time: "09:00 AM", available: true },
  { id: "t2", time: "10:00 AM", available: true },
  { id: "t3", time: "11:00 AM", available: false },
  { id: "t4", time: "02:00 PM", available: true },
  { id: "t5", time: "03:00 PM", available: true },
  { id: "t6", time: "04:00 PM", available: true },
];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Time", "Counselor", "Details", "Confirm"];
  return (
    <div className="flex justify-center items-center gap-2 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: currentStep === index + 1 ? 1.1 : 1,
                backgroundColor:
                  currentStep >= index + 1
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(255, 255, 255, 0.1)",
                color: currentStep >= index + 1 ? "#030303" : "#fff",
              }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              {index + 1}
            </motion.div>
            <span
              className={cn(
                "font-semibold",
                currentStep >= index + 1 ? "text-white" : "text-white/40"
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-px bg-white/20" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedCounselor, setSelectedCounselor] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [concerns, setConcerns] = useState<string>("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    console.log({
      date: selectedDate,
      time: selectedTime,
      counselor: selectedCounselor,
      sessionType,
      isAnonymous,
      concerns,
      isUrgent,
    });
    setStep(5); // Move to final confirmation screen
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        }),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        disabled: date.getDay() === 0, // Disable Sundays
      });
    }
    return dates;
  };

  const motionVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  };

  const selectedCounselorData = counselors.find(
    (c) => c.id === selectedCounselor
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0">
        <ElegantShape
          delay={0.3}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] top-[15%]"
          parallaxStrength={60}
        />
        <ElegantShape
          delay={0.5}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] top-[70%]"
          parallaxStrength={40}
        />
        <ElegantShape
          delay={0.4}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] bottom-[5%]"
          parallaxStrength={80}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-2"
          >
            Book a Session
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white/50 text-lg"
          >
            Your path to clarity starts here. Choose a time that works for you.
          </motion.p>
        </div>

        <InteractiveGlassCard className="max-w-3xl mx-auto !p-8">
          <StepIndicator currentStep={step} />
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...motionVariants} className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Select Date
                  </Label>
                  <RadioGroup
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                    className="grid grid-cols-4 md:grid-cols-7 gap-3"
                  >
                    {generateDates().map((date) => (
                      <div key={date.value}>
                        <RadioGroupItem
                          value={date.value}
                          id={date.value}
                          disabled={date.disabled}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={date.value}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300",
                            date.disabled
                              ? "border-white/10 bg-white/5 text-white/30 line-through"
                              : "border-white/20 bg-white/10 hover:bg-white/20",
                            selectedDate === date.value &&
                              "border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-500/20"
                          )}
                        >
                          <span className="font-bold text-lg">
                            {date.label}
                          </span>
                          <span className="text-xs text-white/60">
                            {date.month}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <Label className="text-base font-medium block">
                      Select Time
                    </Label>
                    <RadioGroup
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                      className="grid grid-cols-3 md:grid-cols-4 gap-3"
                    >
                      {timeSlots.map((slot) => (
                        <div key={slot.id}>
                          <RadioGroupItem
                            value={slot.time}
                            id={slot.id}
                            disabled={!slot.available}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={slot.id}
                            className={cn(
                              "flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer transition-all duration-300",
                              !slot.available
                                ? "border-white/10 bg-white/5 text-white/30 line-through"
                                : "border-white/20 bg-white/10 hover:bg-white/20",
                              selectedTime === slot.time &&
                                "border-cyan-400 bg-cyan-400/20 shadow-md shadow-cyan-500/20"
                            )}
                          >
                            {slot.time}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </motion.div>
                )}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" {...motionVariants} className="space-y-6">
                <RadioGroup
                  value={selectedCounselor}
                  onValueChange={setSelectedCounselor}
                  className="space-y-4"
                >
                  {counselors.map((c) => (
                    <div key={c.id}>
                      <RadioGroupItem
                        value={c.id}
                        id={c.id}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={c.id}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                          selectedCounselor === c.id
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-white/20 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-white">
                              {c.name}
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />{" "}
                              {c.rating}
                            </div>
                          </div>
                          <p className="text-white/60 text-sm mb-2">{c.bio}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {c.specialization.map((s) => (
                              <Badge
                                key={s}
                                className="bg-white/10 border-none text-white/80"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedCounselor}
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" {...motionVariants} className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Session Type
                  </Label>
                  <RadioGroup
                    value={sessionType}
                    onValueChange={setSessionType}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <GlassRadioOption
                      value="video"
                      icon={<Video />}
                      label="Video Call"
                      price="₹1500"
                      selected={sessionType}
                    />
                    <GlassRadioOption
                      value="audio"
                      icon={<Phone />}
                      label="Voice Call"
                      price="₹1200"
                      selected={sessionType}
                    />
                    <GlassRadioOption
                      value="in-person"
                      icon={<MapPin />}
                      label="In-Person"
                      price="₹2000"
                      selected={sessionType}
                    />
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) =>
                      setIsAnonymous(checked === true)
                    }
                    className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Book anonymously
                  </Label>
                </div>
                <div>
                  <Label
                    htmlFor="concerns"
                    className="text-base font-medium mb-2 block"
                  >
                    What would you like to discuss? (Optional)
                  </Label>
                  <Textarea
                    id="concerns"
                    placeholder="Share what's on your mind..."
                    value={concerns}
                    onChange={(e) => setConcerns(e.target.value)}
                    className="min-h-[100px] bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:ring-cyan-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={isUrgent}
                    onCheckedChange={(checked) => setIsUrgent(checked === true)}
                    className="border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <Label htmlFor="urgent" className="text-sm">
                    This is urgent
                  </Label>
                </div>
                {isUrgent && (
                  <Alert className="bg-amber-500/10 border-amber-500/20 text-amber-200">
                    <AlertTriangle className="h-4 w-4 !text-amber-400" />
                    <AlertDescription>
                      For immediate crisis support, please call a helpline.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!sessionType}
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                  >
                    Review Booking <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            {step === 4 && selectedCounselorData && (
              <motion.div key="step4" {...motionVariants} className="space-y-6">
                <h3 className="text-2xl font-bold text-center">
                  Confirm Your Session
                </h3>
                <div className="grid md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-lg border border-white/10">
                  <div className="space-y-4">
                    <SummaryItem
                      label="Counselor"
                      value={selectedCounselorData.name}
                    />
                    <SummaryItem
                      label="Date"
                      value={new Date(selectedDate).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    />
                    <SummaryItem label="Time" value={selectedTime} />
                    <SummaryItem
                      label="Type"
                      value={
                        <span className="capitalize flex items-center gap-2">
                          {sessionType} Session{" "}
                          {sessionType === "video" ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <Phone className="h-4 w-4" />
                          )}
                        </span>
                      }
                    />
                  </div>
                  <div className="space-y-4 text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                    <p className="text-white/60">Total Cost</p>
                    <p className="text-4xl font-bold text-cyan-400">
                      ₹
                      {sessionType === "video"
                        ? 1500
                        : sessionType === "audio"
                        ? 1200
                        : 2000}
                    </p>
                    <p className="text-xs text-white/40">
                      Includes all taxes and fees. Payable after confirmation.
                    </p>
                  </div>
                </div>
                <div className="bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 p-4 rounded-lg text-sm space-y-2">
                  <p className="font-bold">What's Next?</p>
                  <ul className="list-disc list-inside text-xs">
                    <li>
                      You'll receive a confirmation email with all details.
                    </li>
                    <li>
                      A reminder will be sent 24 hours before your session.
                    </li>
                    <li>
                      You can reschedule or cancel up to 4 hours in advance.
                    </li>
                  </ul>
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    size="lg"
                    className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full font-bold shadow-lg shadow-cyan-500/20"
                  >
                    Confirm & Book <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            {step === 5 && (
              <motion.div
                key="step5"
                {...motionVariants}
                className="text-center py-12"
              >
                <CheckCircle className="w-24 h-24 text-cyan-400 mx-auto mb-6 animate-pulse" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                  Your session is scheduled. A confirmation email is on its way.
                  We're looking forward to supporting you.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                >
                  <a href="/dashboard">Back to Dashboard</a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </InteractiveGlassCard>
      </main>
    </div>
  );
}

const GlassRadioOption = ({
  value,
  icon,
  label,
  price,
  selected,
}: {
  value: string;
  icon: ReactNode;
  label: string;
  price: string;
  selected: string;
}) => (
  <div>
    <RadioGroupItem value={value} id={value} className="sr-only" />
    <Label
      htmlFor={value}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
        selected === value
          ? "border-cyan-400 bg-cyan-400/10"
          : "border-white/20 bg-white/5 hover:bg-white/10"
      )}
    >
      {icon}
      <span className="font-semibold mt-2">{label}</span>
      <span className="text-xs text-white/60">{price}</span>
    </Label>
  </div>
);

const SummaryItem = ({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-white/60">{label}:</span>
    <span className="font-bold text-white">{value}</span>
  </div>
);
