"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Pacifico } from "next/font/google";
import { Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// --- Helper & Effect Components ---

const Stars = () => {
  const ref = useRef<HTMLDivElement>(null);
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

// --- Main Page Component ---
export default function HomePage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="w-full bg-[#030303] text-white relative overflow-hidden">
      <Stars />

      {/* Hero Section */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Navigation Header */}
        <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-30">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Sukoon</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                asChild
                className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background Gradients & Shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] top-[15%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] top-[70%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
            >
              <Heart className="h-5 w-5 text-white/80" />
              <span className="text-sm text-white/60 tracking-wide">
                Sukoon for Students
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  A Safe Space For
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                    pacifico.className
                  )}
                >
                  Your Mental Wellbeing
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Confidential support, AI companionship, and professional
                guidance, all designed for the modern student. You're not alone.
              </p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 text-lg font-semibold"
              >
                <Link href="/chat">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </div>

      {/* Macbook Scroll Section */}
      <div className="relative z-10 w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.8}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet-500/[0.15]"
            className="left-[5%] bottom-[10%]"
          />
          <ElegantShape
            delay={1.0}
            width={200}
            height={60}
            rotate={20}
            gradient="from-amber-500/[0.15]"
            className="right-[15%] top-[10%]"
          />
          <ElegantShape
            delay={1.2}
            width={450}
            height={100}
            rotate={-25}
            gradient="from-cyan-500/[0.15]"
            className="left-[20%] top-[5%]"
          />
          <ElegantShape
            delay={1.3}
            width={400}
            height={80}
            rotate={18}
            gradient="from-green-500/[0.15]"
            className="right-[20%] bottom-[5%]"
          />
        </div>
        <MacbookScroll
          title={
            <div className="text-center">
              <h2
                className={cn(
                  "text-3xl md:text-5xl font-bold text-white",
                  pacifico.className
                )}
              >
                See Sukoon in Action
              </h2>
              <p className="text-base md:text-lg text-white/60 mt-4">
                An interactive walkthrough of our platform's key features.
              </p>
            </div>
          }
          src={`/dashboard-video.mp4`} // <-- IMPORTANT: REPLACE WITH YOUR VIDEO IN THE /public FOLDER
        />
      </div>

      {/* About Section */}
      <div className="relative w-full py-20 md:py-32">
        {/* Neon Glow Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-2/3 bg-indigo-600/20 rounded-full blur-[150px] z-0 pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Our Mission at{" "}
              </span>
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                  pacifico.className
                )}
              >
                Sukoon
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
              We believe every student deserves a confidential space to nurture
              their mental wellbeing. Sukoon was built to break down barriers,
              offering anonymous, AI-powered support and easy access to
              professional help. Our mission is to ensure no student feels alone
              on their journey.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- Macbook Components ---

export const MacbookScroll = ({
  src,
  title,
}: {
  src?: string;
  title?: string | React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[200vh] shrink-0 scale-[0.5] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-75 md:scale-100 md:py-80"
    >
      <motion.div
        style={{ translateY: textTransform, opacity: textOpacity }}
        className="mb-20 text-center"
      >
        {title}
      </motion.div>
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{ boxShadow: "0px 2px 0px 2px #171717 inset" }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <video
          className="absolute inset-0 h-full w-full rounded-lg object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => (
  <div
    className="mx-auto my-1 h-32 w-[40%] rounded-xl"
    style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
  ></div>
);

export const Keypad = () => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1 [transform:translateZ(0)] [will-change:transform]">
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span>~</span>
          <span className="mt-1">`</span>
        </KBtn>
        <KBtn>
          <span>!</span>
          <span>1</span>
        </KBtn>
        <KBtn>
          <span>@</span>
          <span>2</span>
        </KBtn>
        <KBtn>
          <span>#</span>
          <span>3</span>
        </KBtn>
        <KBtn>
          <span>$</span>
          <span>4</span>
        </KBtn>
        <KBtn>
          <span>%</span>
          <span>5</span>
        </KBtn>
        <KBtn>
          <span>^</span>
          <span>6</span>
        </KBtn>
        <KBtn>
          <span>&</span>
          <span>7</span>
        </KBtn>
        <KBtn>
          <span>*</span>
          <span>8</span>
        </KBtn>
        <KBtn>
          <span>(</span>
          <span>9</span>
        </KBtn>
        <KBtn>
          <span>)</span>
          <span>0</span>
        </KBtn>
        <KBtn>
          <span>&mdash;</span>
          <span>_</span>
        </KBtn>
        <KBtn>
          <span>+</span>
          <span> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>Q</KBtn>
        <KBtn>W</KBtn>
        <KBtn>E</KBtn>
        <KBtn>R</KBtn>
        <KBtn>T</KBtn>
        <KBtn>Y</KBtn>
        <KBtn>U</KBtn>
        <KBtn>I</KBtn>
        <KBtn>O</KBtn>
        <KBtn>P</KBtn>
        <KBtn>
          <span>{`{`}</span>
          <span>{`[`}</span>
        </KBtn>
        <KBtn>
          <span>{`}`}</span>
          <span>{`]`}</span>
        </KBtn>
        <KBtn>
          <span>{`|`}</span>
          <span>{`\\`}</span>
        </KBtn>
      </div>
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>A</KBtn>
        <KBtn>S</KBtn>
        <KBtn>D</KBtn>
        <KBtn>F</KBtn>
        <KBtn>G</KBtn>
        <KBtn>H</KBtn>
        <KBtn>J</KBtn>
        <KBtn>K</KBtn>
        <KBtn>L</KBtn>
        <KBtn>
          <span>:</span>
          <span>;</span>
        </KBtn>
        <KBtn>
          <span>"</span>
          <span>'</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>Z</KBtn>
        <KBtn>X</KBtn>
        <KBtn>C</KBtn>
        <KBtn>V</KBtn>
        <KBtn>B</KBtn>
        <KBtn>N</KBtn>
        <KBtn>M</KBtn>
        <KBtn>
          <span>{`<`}</span>
          <span>,</span>
        </KBtn>
        <KBtn>
          <span>{`>`}</span>
          <span>.</span>
        </KBtn>
        <KBtn>
          <span>?</span>
          <span>/</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span>fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span>control</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span>option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span>command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span>command</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span>option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-[4px] p-[0.5px] [transform:translateZ(0)] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            childrenClassName,
            backlit && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => (
  <div
    className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
    style={{
      backgroundImage:
        "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    }}
  ></div>
);

export const OptionKey = ({ className }: { className?: string }) => (
  <svg
    fill="none"
    version="1.1"
    id="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={className}
  >
    <rect
      stroke="currentColor"
      strokeWidth={2}
      x="18"
      y="5"
      width="10"
      height="2"
    />
    <polygon
      stroke="currentColor"
      strokeWidth={2}
      points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
    />
    <rect id="_Transparent_Rectangle_" width="32" height="32" stroke="none" />
  </svg>
);

const AceternityLogo = () => (
  <svg
    width="66"
    height="65"
    viewBox="0 0 66 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-3 w-3 text-white"
  >
    <path
      d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
      stroke="currentColor"
      strokeWidth="15"
      strokeMiterlimit="3.86874"
      strokeLinecap="round"
    />
  </svg>
);
