"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Search,
  Navigation,
  ExternalLink,
  Zap,
  Users,
  Building,
  Globe,
  Share2,
  MessageSquare,
  Video,
  Mail,
  Loader2,
  Play,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Make sure to import your cn utility

// --- INTERFACES & DATA (Updated) ---
interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  whatsapp?: string;
  description: string;
  availability: string;
  languages: string[];
  type: "crisis" | "counseling" | "medical" | "police";
  location?: string;
  website?: string;
}

interface NGO {
  id: string;
  name: string;
  description: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  services: string[];
  availability: string;
  distance?: number;
}

interface EmergencyStep {
  title: string;
  description: string;
  action: string;
  color: string;
  textColor: string;
  links?: { text: string; url: string }[];
}

interface CopingTechnique {
  id: string;
  title: string;
  description: string;
  steps: string[];
  duration: string;
  category: "breathing" | "grounding" | "mindfulness" | "physical";
  icon: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "National Suicide Prevention Helpline (iCall)",
    number: "9152987821",
    whatsapp: "9152987821",
    description: "24/7 crisis support and suicide prevention counseling",
    availability: "24/7",
    languages: ["Hindi", "English", "Tamil", "Marathi"],
    type: "crisis",
    website: "https://icallhelpline.org",
  },
  {
    id: "2",
    name: "Vandrevala Foundation Helpline",
    number: "9999666555",
    whatsapp: "9999666555",
    description: "Free mental health support and crisis counseling",
    availability: "24/7",
    languages: ["Hindi", "English", "Tamil", "Telugu", "Gujarati"],
    type: "counseling",
    website: "https://vandrevalafoundation.com",
  },
  {
    id: "3",
    name: "NIMHANS Emergency",
    number: "08026995000",
    description:
      "National Institute of Mental Health emergency psychiatric support",
    availability: "24/7",
    languages: ["English", "Hindi", "Kannada"],
    type: "medical",
    location: "Bangalore",
    website: "https://nimhans.ac.in",
  },
  {
    id: "4",
    name: "Kiran Mental Health Helpline",
    number: "18005990019",
    description: "Mental health rehabilitation and crisis intervention",
    availability: "24/7",
    languages: ["Hindi", "English"],
    type: "counseling",
    website: "https://www.mohfw.gov.in/",
  },
  {
    id: "5",
    name: "Sneha Foundation Chennai",
    number: "04424640050",
    whatsapp: "9663523291",
    description: "Suicide prevention and emotional support",
    availability: "24/7",
    languages: ["Tamil", "English", "Hindi"],
    type: "crisis",
    website: "https://snehaindia.org",
  },
  {
    id: "6",
    name: "Aasra Mumbai",
    number: "02227546669",
    description: "Crisis intervention and suicide prevention",
    availability: "24/7",
    languages: ["Hindi", "English", "Marathi"],
    type: "crisis",
    website: "https://aasra.info",
  },
  {
    id: "7",
    name: "Sumaitri Delhi",
    number: "01123389090",
    description: "Emotional support and crisis counseling",
    availability: "24/7",
    languages: ["Hindi", "English"],
    type: "crisis",
    website: "https://sumaitri.net",
  },
  {
    id: "8",
    name: "Roshni Hyderabad",
    number: "04066202000",
    description: "Mental health support and suicide prevention",
    availability: "24/7",
    languages: ["Telugu", "Hindi", "English"],
    type: "crisis",
    website: "https://roshni.ngoindia.com",
  },
  {
    id: "9",
    name: "Sahai Bangalore",
    number: "08025497777",
    description: "Emotional support and crisis counseling",
    availability: "24/7",
    languages: ["Kannada", "English", "Hindi"],
    type: "crisis",
  },
  {
    id: "10",
    name: "Police Emergency",
    number: "100",
    description: "Emergency police assistance",
    availability: "24/7",
    languages: ["Hindi", "English", "Local Languages"],
    type: "police",
  },
  {
    id: "11",
    name: "Medical Emergency",
    number: "108",
    description: "Emergency medical services and ambulance",
    availability: "24/7",
    languages: ["Hindi", "English", "Local Languages"],
    type: "medical",
  },
  {
    id: "12",
    name: "Women Helpline",
    number: "181",
    description: "24x7 helpline for women in distress",
    availability: "24/7",
    languages: ["Hindi", "English", "Local Languages"],
    type: "crisis",
  },
];

const nearbyNGOs: NGO[] = [
  {
    id: "1",
    name: "Parivarthan Counselling, Training & Research Centre",
    description: "Professional mental health counseling and therapy services",
    phone: "08025498892",
    whatsapp: "9880256612",
    email: "info@parivarthan.org",
    website: "https://parivarthan.org",
    address: "25/4, Diagonal Road, VV Puram",
    city: "Bangalore",
    state: "Karnataka",
    services: [
      "Individual Counseling",
      "Group Therapy",
      "Crisis Intervention",
      "Family Therapy",
    ],
    availability: "Mon-Sat 9AM-6PM",
    distance: 2.5,
  },
  {
    id: "2",
    name: "The Live Love Laugh Foundation",
    description:
      "Mental health awareness and support organization founded by Deepika Padukone",
    phone: "08033884442",
    email: "contact@thelivelovelaughfoundation.org",
    website: "https://thelivelovelaughfoundation.org",
    address: "UB City Mall, 24 Vittal Mallya Road",
    city: "Bangalore",
    state: "Karnataka",
    services: [
      "Mental Health Education",
      "Support Groups",
      "Awareness Programs",
      "Online Resources",
    ],
    availability: "Mon-Fri 10AM-6PM",
    distance: 5.2,
  },
  {
    id: "3",
    name: "Samarthanam Trust for the Disabled",
    description:
      "Support for individuals with disabilities and mental health issues",
    phone: "08025213939",
    whatsapp: "9845815139",
    email: "info@samarthanam.org",
    website: "https://samarthanam.org",
    address: "459, 1st Main Road, KEB Layout, Ramamurthy Nagar",
    city: "Bangalore",
    state: "Karnataka",
    services: [
      "Counseling Services",
      "Rehabilitation",
      "Skill Development",
      "Job Training",
    ],
    availability: "Mon-Sat 9AM-5PM",
    distance: 7.8,
  },
  {
    id: "4",
    name: "Manas Foundation",
    description: "Providing mental health services and awareness programs",
    phone: "08026618269",
    email: "info@manasfoundation.com",
    website: "https://manasfoundation.com",
    address: "Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    services: [
      "Clinical Psychology",
      "Psychiatric Care",
      "Community Programs",
      "Training",
    ],
    availability: "Mon-Fri 9AM-6PM",
    distance: 4.1,
  },
  {
    id: "5",
    name: "Bangalore Baptist Hospital - Mental Health",
    description: "Comprehensive mental health care facility",
    phone: "08026780078",
    email: "info@bangalorebaptisthospital.com",
    website: "https://bangalorebaptisthospital.com",
    address: "Bellary Road",
    city: "Bangalore",
    state: "Karnataka",
    services: [
      "Inpatient Care",
      "Outpatient Services",
      "Emergency Mental Health",
      "Addiction Treatment",
    ],
    availability: "24/7",
    distance: 6.3,
  },
  {
    id: "6",
    name: "Fortis Hospital - Mental Health Department",
    description: "Advanced psychiatric and psychological services",
    phone: "08066214444",
    email: "mentalhealth@fortishealthcare.com",
    website: "https://fortishealthcare.com",
    address: "Bannerghatta Road",
    city: "Bangalore",
    state: "Karnataka",
    services: [
      "Psychiatry",
      "Clinical Psychology",
      "De-addiction",
      "Child Psychology",
    ],
    availability: "24/7",
    distance: 8.9,
  },
];

const emergencySteps = [
  {
    title: "Immediate Physical Danger",
    description:
      "If you or someone else is in immediate physical danger or having thoughts of self-harm",
    action:
      "Call 100 (Police), 108 (Emergency Services), or go to nearest hospital emergency room immediately",
    color: "bg-red-50 border-red-200",
    textColor: "text-red-900",
    links: [
      {
        text: "Find Nearest Hospital",
        url: "https://www.google.com/maps/search/hospital+near+me",
      },
      { text: "Emergency Services Guide", url: "#" },
    ],
  },
  {
    title: "Mental Health Crisis",
    description:
      "Having thoughts of suicide, self-harm, or feeling like you can't cope",
    action:
      "Call crisis helplines: 9152987821 (iCall), 9999666555 (Vandrevala Foundation), or text HELLO to 9152987821",
    color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-900",
    links: [
      { text: "Crisis Chat Support", url: "/chat" },
      { text: "Safety Planning Guide", url: "#safety-plan" },
    ],
  },
  {
    title: "Severe Anxiety or Panic Attack",
    description:
      "Experiencing overwhelming anxiety, panic attacks, or can't catch your breath",
    action:
      "Try breathing exercises, call counseling helplines, or use our AI chat for immediate coping strategies",
    color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-900",
    links: [
      { text: "Breathing Exercises", url: "/resources" },
      { text: "Panic Attack Guide", url: "#panic-guide" },
    ],
  },
  {
    title: "Need Someone to Talk",
    description:
      "Feeling overwhelmed, depressed, anxious, or just need emotional support",
    action:
      "Use our AI Chat support, join community forums, or call counseling helplines for professional support",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-900",
    links: [
      { text: "Start AI Chat", url: "/chat" },
      { text: "Join Community", url: "/community" },
      { text: "Self-Help Resources", url: "/resources" },
    ],
  },
  {
    title: "Ongoing Mental Health Support",
    description:
      "Looking for regular therapy, counseling, or professional mental health care",
    action:
      "Book appointment with mental health professionals, explore therapy options, or visit nearby mental health centers",
    color: "bg-green-50 border-green-200",
    textColor: "text-green-900",
    links: [
      { text: "Book Counselor", url: "/book" },
      { text: "Find Therapists", url: "#therapists" },
      { text: "Mental Health Centers", url: "#centers" },
    ],
  },
];

const copingTechniques: CopingTechnique[] = [
  {
    id: "1",
    title: "4-7-8 Breathing Technique",
    description:
      "A powerful breathing exercise to reduce anxiety and promote calm",
    steps: [
      "Exhale completely through your mouth",
      "Close your mouth and inhale through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale completely through your mouth for 8 counts",
      "Repeat 3-4 times",
    ],
    duration: "2-3 minutes",
    category: "breathing",
    icon: "💨",
  },
  {
    id: "2",
    title: "5-4-3-2-1 Grounding Technique",
    description: "Use your senses to ground yourself in the present moment",
    steps: [
      "Name 5 things you can see around you",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
    ],
    duration: "3-5 minutes",
    category: "grounding",
    icon: "🌱",
  },
  {
    id: "3",
    title: "Progressive Muscle Relaxation",
    description: "Tense and relax muscle groups to release physical tension",
    steps: [
      "Start with your toes - tense for 5 seconds, then relax",
      "Move to your calves - tense and relax",
      "Continue with thighs, abdomen, hands, arms, shoulders",
      "Finish with your face and head",
      "Notice the contrast between tension and relaxation",
    ],
    duration: "10-15 minutes",
    category: "physical",
    icon: "💪",
  },
  {
    id: "4",
    title: "Mindful Observation",
    description:
      "Focus your attention on a single object to calm racing thoughts",
    steps: [
      "Choose an object in your environment",
      "Observe its color, shape, texture, and details",
      "Notice how light reflects off it",
      "When your mind wanders, gently return focus to the object",
      "Continue for 5-10 minutes",
    ],
    duration: "5-10 minutes",
    category: "mindfulness",
    icon: "👁️",
  },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// --- Reusable Animated Components ---
const AnimatedCard = motion(Card);
const AnimatedButton = motion(Button);

export default function EmergencyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("helplines");
  const [isLocating, setIsLocating] = useState(false);

  // Handlers are unchanged
  const handleCall = (number: string) => window.open(`tel:${number}`);
  const handleWhatsApp = (
    number: string,
    message: string = "Hello, I need mental health support"
  ) =>
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

  const filteredContacts = emergencyContacts.filter(
    (contact) =>
      (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedType === "all" || contact.type === selectedType)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <motion.div
        className="container mx-auto px-4 py-8 pt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500 animate-pulse" />
            <h1 className="text-3xl font-bold text-foreground">
              Emergency Mental Health Support
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you're in crisis, help is available right now. You're not alone -
            support is just a call away.
          </p>
        </div>

        <div className="relative mb-8">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg blur-lg opacity-20"></div>
          <Alert className="relative border-red-500/50 bg-red-500/10 text-foreground">
            <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
            <AlertDescription className="text-foreground">
              <strong>In immediate danger?</strong> Call <strong>100</strong>{" "}
              (Police) or <strong>108</strong> (Ambulance). For urgent mental
              health support, call a 24/7 crisis line like{" "}
              <strong>9152987821</strong>.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs
          defaultValue="helplines"
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="helplines">Crisis Helplines</TabsTrigger>
            <TabsTrigger value="ngos">Nearby NGOs</TabsTrigger>
            <TabsTrigger value="steps">Emergency Steps</TabsTrigger>
            <TabsTrigger value="coping">Safety & Coping</TabsTrigger>
            <TabsTrigger value="resources">Quick Resources</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === "helplines" && (
                <TabsContent value="helplines" className="space-y-6 mt-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search helplines..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="crisis">Crisis Support</SelectItem>
                        <SelectItem value="counseling">Counseling</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="police">
                          Emergency Services
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {filteredContacts.map((contact) => (
                      <AnimatedCard
                        key={contact.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2 },
                        }}
                        className={cn(
                          "transition-all hover:shadow-lg hover:border-primary border bg-card text-card-foreground",
                          contact.type === "crisis"
                            ? "border-red-500/50 bg-red-500/10"
                            : ""
                        )}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg flex-1 text-foreground">
                              {contact.name}
                            </CardTitle>
                            <Badge
                              variant={
                                contact.type === "crisis"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {contact.type}
                            </Badge>
                          </div>
                          <CardDescription className="text-muted-foreground">
                            {contact.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {contact.availability}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {contact.languages.map((lang) => (
                              <Badge
                                key={lang}
                                variant="outline"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <AnimatedButton
                              onClick={() => handleCall(contact.number)}
                              className="flex-1"
                              variant={
                                contact.type === "crisis"
                                  ? "destructive"
                                  : "default"
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call {contact.number}
                            </AnimatedButton>
                            {contact.whatsapp && (
                              <AnimatedButton
                                onClick={() =>
                                  handleWhatsApp(contact.whatsapp!)
                                }
                                variant="outline"
                                className="flex-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                WhatsApp
                              </AnimatedButton>
                            )}
                          </div>
                          {contact.website && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="w-full"
                            >
                              <Link href={contact.website} target="_blank">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Website
                              </Link>
                            </Button>
                          )}
                        </CardContent>
                      </AnimatedCard>
                    ))}
                  </motion.div>
                </TabsContent>
              )}
              {activeTab === "ngos" && (
                <TabsContent value="ngos" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">
                      Mental Health NGOs Near You
                    </h3>
                    <Button
                      onClick={() => setIsLocating(true)}
                      variant="outline"
                      size="sm"
                      disabled={isLocating}
                    >
                      {isLocating ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Navigation className="h-4 w-4 mr-2" />
                      )}
                      {isLocating ? "Locating..." : "Find Nearby"}
                    </Button>
                  </div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {nearbyNGOs.map((ngo) => (
                      <AnimatedCard
                        key={ngo.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2 },
                        }}
                        className="transition-all hover:shadow-lg hover:border-primary border bg-card text-card-foreground"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg text-foreground">
                            {ngo.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {ngo.city}, {ngo.state}
                            {ngo.distance && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {ngo.distance} km away
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-muted-foreground">
                            {ngo.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-1">
                            {ngo.services.map((service) => (
                              <Badge
                                key={service}
                                variant="outline"
                                className="text-xs"
                              >
                                {service}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <AnimatedButton
                              onClick={() => handleCall(ngo.phone)}
                              size="sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </AnimatedButton>
                            {ngo.whatsapp && (
                              <AnimatedButton
                                onClick={() => handleWhatsApp(ngo.whatsapp!)}
                                variant="outline"
                                size="sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                WhatsApp
                              </AnimatedButton>
                            )}
                            {ngo.email && (
                              <AnimatedButton
                                onClick={() =>
                                  window.open(`mailto:${ngo.email}`)
                                }
                                variant="outline"
                                size="sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </AnimatedButton>
                            )}
                            {ngo.website && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={ngo.website} target="_blank">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Website
                                </Link>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </AnimatedCard>
                    ))}
                  </motion.div>
                </TabsContent>
              )}
              {activeTab === "steps" && (
                <TabsContent value="steps" className="space-y-6 mt-0">
                  <h3 className="text-xl font-semibold mb-6">
                    What to Do in a Mental Health Emergency
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {emergencySteps.map((step, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Card
                          className={cn(
                            "border-2 bg-card text-card-foreground",
                            step.color
                          )}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-xl shadow-md">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4
                                  className={cn(
                                    "font-semibold text-lg mb-1 text-foreground",
                                    step.textColor
                                  )}
                                >
                                  {step.title}
                                </h4>
                                <p className="text-muted-foreground mb-3">
                                  {step.description}
                                </p>
                                <p className="font-medium text-sm p-2 bg-muted/50 rounded-md mb-3 text-foreground">
                                  {step.action}
                                </p>
                                {step.links && (
                                  <div className="flex flex-wrap gap-2">
                                    {step.links.map((link, linkIndex) => (
                                      <Button
                                        key={linkIndex}
                                        variant="outline"
                                        size="sm"
                                        asChild
                                      >
                                        <Link
                                          href={link.url}
                                          className="text-xs"
                                        >
                                          <ExternalLink className="h-3 w-3 mr-1" />
                                          {link.text}
                                        </Link>
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              )}
              {activeTab === "coping" && (
                <TabsContent value="coping" className="space-y-6 mt-0">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Immediate Coping Techniques
                    </h3>
                    <p className="text-muted-foreground">
                      Quick techniques to help you feel more grounded and calm
                      in moments of distress
                    </p>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {copingTechniques.map((technique) => (
                      <AnimatedCard
                        key={technique.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        className="transition-all hover:shadow-lg hover:border-primary border bg-card text-card-foreground"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                            <span className="text-2xl">{technique.icon}</span>
                            {technique.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {technique.category}
                            </Badge>
                            <Badge variant="secondary">
                              {technique.duration}
                            </Badge>
                          </div>
                          <CardDescription className="text-muted-foreground">
                            {technique.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm text-foreground">
                              Steps:
                            </h5>
                            <ol className="space-y-1 text-sm text-muted-foreground">
                              {technique.steps.map((step, index) => (
                                <li key={index} className="flex gap-2">
                                  <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                                    {index + 1}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {step}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Guided Exercise
                          </Button>
                        </CardContent>
                      </AnimatedCard>
                    ))}
                  </motion.div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Safety Planning
                    </h4>
                    <p className="text-blue-800 text-sm mb-4">
                      Create a personal safety plan for moments when you're
                      struggling. Having a plan can help you feel more in
                      control.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button
                        asChild
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <Link href="/resources" target="_blank">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Download Safety Plan Template
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <Link href="/chat">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Create Plan with AI Support
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              )}
              {activeTab === "resources" && (
                <TabsContent value="resources" className="space-y-6 mt-0">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Quick Access Resources
                    </h3>
                    <p className="text-muted-foreground">
                      Immediate support tools and resources available right now
                    </p>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <AnimatedCard
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="transition-all hover:shadow-lg hover:border-primary"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-blue-600" />
                          AI Crisis Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          24/7 immediate support from our AI mental health
                          companion
                        </p>
                        <Button asChild className="w-full">
                          <Link href="/chat">Start Emergency Chat</Link>
                        </Button>
                      </CardContent>
                    </AnimatedCard>

                    <AnimatedCard
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="transition-all hover:shadow-lg hover:border-primary"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-green-600" />
                          Crisis Community
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect anonymously with others who understand
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/community">Join Support Groups</Link>
                        </Button>
                      </CardContent>
                    </AnimatedCard>

                    <AnimatedCard
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="transition-all hover:shadow-lg hover:border-primary"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-red-600" />
                          Self-Care Tools
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Breathing exercises, meditation, and coping strategies
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/resources">Access Wellness Tools</Link>
                        </Button>
                      </CardContent>
                    </AnimatedCard>

                    <AnimatedCard
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="transition-all hover:shadow-lg hover:border-primary"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-purple-600" />
                          Crisis Counseling
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Book immediate or emergency counseling sessions
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/book">Book Emergency Session</Link>
                        </Button>
                      </CardContent>
                    </AnimatedCard>

                    <AnimatedCard
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="transition-all hover:shadow-lg hover:border-primary"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-indigo-600" />
                          External Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          National and international mental health resources
                        </p>
                        <div className="space-y-2">
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Link
                              href="https://www.who.int/mental_disorders/suicide-prevention/en/"
                              target="_blank"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              WHO Suicide Prevention
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Link
                              href="https://www.nimh.nih.gov/health/find-help"
                              target="_blank"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              NIMH Find Help
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </AnimatedCard>

                    <AnimatedCard
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      className="transition-all hover:shadow-lg hover:border-primary"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Share2 className="h-5 w-5 text-orange-600" />
                          Share Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Help others by sharing mental health resources
                        </p>
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() =>
                              navigator.share?.({
                                title: "Mental Health Support",
                                text: "Get immediate mental health support",
                                url: window.location.href,
                              })
                            }
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share This Page
                          </Button>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Link
                              href="https://wa.me/?text=If you're struggling with mental health, help is available: "
                              target="_blank"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Share via WhatsApp
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </AnimatedCard>
                  </motion.div>

                  <div className="mt-8 p-6 bg-card rounded-lg border">
                    <h4 className="font-semibold text-foreground mb-2">
                      Remember: You Are Not Alone
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Mental health crises are temporary. With proper support
                      and treatment, things can and do get better. Reaching out
                      for help is a sign of strength, not weakness.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button asChild variant="outline">
                        <Link href="/dashboard">
                          <Heart className="h-4 w-4 mr-2" />
                          My Wellness Dashboard
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/wellness">
                          <Zap className="h-4 w-4 mr-2" />
                          Wellness Programs
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/resources">
                          <Building className="h-4 w-4 mr-2" />
                          Resource Library
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  );
}
