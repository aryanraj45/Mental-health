"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Heart,
  Shield,
  MessageSquare,
  Navigation,
  Search,
  Filter,
  Star,
  ExternalLink,
  Zap,
  Users,
  Headphones,
  Video,
  Globe,
  Mail,
  UserCheck,
  Ambulance,
  Building,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface UrgentContact {
  id: string;
  name: string;
  number: string;
  type: "crisis" | "suicide" | "police" | "medical" | "ngo";
  available: "24/7" | "business" | "limited";
  description: string;
  languages: string[];
  verified: boolean;
  rating: number;
  responseTime: string;
}

interface NGO {
  id: string;
  name: string;
  description: string;
  phone: string;
  email?: string;
  website?: string;
  address: string;
  latitude: number;
  longitude: number;
  services: string[];
  specialization: string[];
  rating: number;
  verified: boolean;
  emergency: boolean;
  availability: string;
  languages: string[];
  distance?: number; // Optional property for calculated distance
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  urgent?: boolean;
}

// Critical emergency contacts
const urgentContacts: UrgentContact[] = [
  {
    id: "1",
    name: "National Suicide Prevention Lifeline",
    number: "988",
    type: "suicide",
    available: "24/7",
    description: "Free and confidential emotional support for people in suicidal crisis or emotional distress",
    languages: ["English", "Spanish", "Hindi"],
    verified: true,
    rating: 4.9,
    responseTime: "< 30 seconds",
  },
  {
    id: "2",
    name: "Crisis Text Line",
    number: "741741",
    type: "crisis",
    available: "24/7",
    description: "Text HOME to connect with a Crisis Counselor for immediate support",
    languages: ["English", "Spanish"],
    verified: true,
    rating: 4.8,
    responseTime: "< 5 minutes",
  },
  {
    id: "3",
    name: "Emergency Services",
    number: "911",
    type: "medical",
    available: "24/7",
    description: "Immediate emergency medical, fire, and police services",
    languages: ["English", "Spanish"],
    verified: true,
    rating: 5.0,
    responseTime: "< 10 minutes",
  },
  {
    id: "4",
    name: "NIMHANS Emergency Helpline",
    number: "080-26995000",
    type: "crisis",
    available: "24/7",
    description: "National Institute of Mental Health emergency psychiatric support",
    languages: ["English", "Hindi", "Kannada"],
    verified: true,
    rating: 4.7,
    responseTime: "< 1 minute",
  },
  {
    id: "5",
    name: "Vandrevala Foundation",
    number: "9999666555",
    type: "crisis",
    available: "24/7",
    description: "Mental health support and crisis intervention services",
    languages: ["English", "Hindi"],
    verified: true,
    rating: 4.6,
    responseTime: "< 2 minutes",
  },
];

// NGOs with enhanced information
const emergencyNGOs: NGO[] = [
  {
    id: "2",
    name: "The Live Love Laugh Foundation",
    description: "Mental health awareness and support services across India",
    phone: "+91-11-4033-1000",
    email: "connect@tlllfoundation.org",
    website: "https://www.thelivelovelaughfoundation.org",
    address: "New Delhi, Delhi 110001",
    latitude: 28.6139,
    longitude: 77.2090,
    services: ["Mental Health Support", "Therapy Sessions", "Awareness Programs"],
    specialization: ["Depression", "Anxiety", "Bipolar Disorder"],
    rating: 4.7,
    verified: true,
    emergency: false,
    availability: "Mon-Fri 9AM-6PM",
    languages: ["English", "Hindi"],
  },
  {
    id: "3",
    name: "Aasra - Crisis Helpline",
    description: "24/7 crisis helpline providing emotional support and suicide prevention",
    phone: "+91-22-2754-6669",
    email: "aasrahelpline@yahoo.com",
    website: "https://www.aasra.info",
    address: "Mumbai, Maharashtra 400001",
    latitude: 19.0760,
    longitude: 72.8777,
    services: ["Crisis Intervention", "Emotional Support", "Suicide Prevention"],
    specialization: ["Crisis Management", "Suicidal Ideation", "Emotional Trauma"],
    rating: 4.9,
    verified: true,
    emergency: true,
    availability: "24/7",
    languages: ["English", "Hindi", "Marathi", "Tamil"],
  },
  {
    id: "4",
    name: "iCall - TISS",
    description: "Psychosocial helpline by Tata Institute of Social Sciences",
    phone: "+91-22-2556-3291",
    email: "icall@tiss.edu",
    website: "https://icallhelpline.org",
    address: "Deonar, Mumbai, Maharashtra 400088",
    latitude: 19.0330,
    longitude: 72.9070,
    services: ["Counseling", "Psychosocial Support", "Mental Health Guidance"],
    specialization: ["Stress", "Relationship Issues", "Academic Pressure"],
    rating: 4.6,
    verified: true,
    emergency: false,
    availability: "Mon-Sat 8AM-10PM",
    languages: ["English", "Hindi"],
  },
  {
    id: "5",
    name: "Sangath",
    description: "Mental health research and intervention organization",
    phone: "+91-832-240-2800",
    email: "info@sangath.in",
    website: "https://www.sangath.in",
    address: "Porvorim, Goa 403521",
    latitude: 15.5167,
    longitude: 73.7667,
    services: ["Mental Health Treatment", "Research", "Community Programs"],
    specialization: ["Depression", "Anxiety", "Maternal Mental Health"],
    rating: 4.5,
    verified: true,
    emergency: false,
    availability: "Mon-Fri 9AM-5PM",
    languages: ["English", "Hindi", "Konkani"],
  },
];

export default function UrgentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [nearbyNGOs, setNearbyNGOs] = useState<NGO[]>([]);
  const [isMapView, setIsMapView] = useState(false);

  useEffect(() => {
    // Get user's location for nearby services
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          findNearbyNGOs(latitude, longitude);
        },
        (error) => {
          console.log("Location access denied:", error);
        }
      );
    }
  }, []);

  const findNearbyNGOs = (lat: number, lng: number) => {
    // Calculate distance and sort NGOs by proximity
    const ngosWithDistance = emergencyNGOs.map(ngo => {
      const distance = calculateDistance(lat, lng, ngo.latitude, ngo.longitude);
      return { ...ngo, distance };
    });
    
    const sorted = ngosWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
    
    setNearbyNGOs(sorted);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredContacts = urgentContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || contact.type === selectedType;
    return matchesSearch && matchesType;
  });

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Call Crisis Hotline",
      description: "Immediate support available 24/7",
      icon: <Phone className="h-6 w-6" />,
      action: () => window.open("tel:988"),
      color: "bg-red-500",
      urgent: true,
    },
    {
      id: "2",
      title: "Text Crisis Line",
      description: "Text HOME to 741741",
      icon: <MessageSquare className="h-6 w-6" />,
      action: () => window.open("sms:741741?body=HOME"),
      color: "bg-orange-500",
      urgent: true,
    },
    {
      id: "3",
      title: "Find Nearest Hospital",
      description: "Emergency medical services",
      icon: <Ambulance className="h-6 w-6" />,
      action: () => window.open("https://maps.google.com/search/hospital+near+me"),
      color: "bg-blue-500",
    },
    {
      id: "4",
      title: "Chat with AI",
      description: "Immediate AI-powered support",
      icon: <MessageSquare className="h-6 w-6" />,
      action: () => window.location.href = "/chat",
      color: "bg-purple-500",
    },
    {
      id: "5",
      title: "Book Emergency Session",
      description: "Get professional help now",
      icon: <Video className="h-6 w-6" />,
      action: () => window.location.href = "/book?urgent=true",
      color: "bg-green-500",
    },
    {
      id: "6",
      title: "Emergency Contacts",
      description: "Quick access to all contacts",
      icon: <Users className="h-6 w-6" />,
      action: () => document.getElementById("contacts")?.scrollIntoView(),
      color: "bg-indigo-500",
    },
  ];

  const callNumber = (number: string) => {
    window.open(`tel:${number}`);
  };

  const openDirections = (ngo: NGO) => {
    window.open(`https://maps.google.com/search/${ngo.address.replace(/\s+/g, '+')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 text-white">
      <Header />
      
      {/* Emergency Help Banner */}
      <div className="bg-red-600 text-white p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5 animate-pulse" />
          <span className="font-semibold">EMERGENCY HELP AVAILABLE 24/7</span>
          <AlertTriangle className="h-5 w-5 animate-pulse" />
        </div>
        <p className="text-sm">If you're in immediate danger, call 911 or go to your nearest emergency room</p>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <AlertTriangle className="h-12 w-12 text-red-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Emergency Help & Mental Health Support
            </h1>
            <AlertTriangle className="h-12 w-12 text-red-400 animate-pulse" />
          </motion.div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Immediate crisis support, emergency contacts, and professional help when you need it most
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`${action.color} border-0 cursor-pointer hover:shadow-xl transition-all duration-300 ${action.urgent ? 'animate-pulse' : ''}`}
                onClick={action.action}
              >
                <CardContent className="p-4 text-center text-white">
                  {action.icon}
                  <h3 className="font-semibold mt-2 text-sm">{action.title}</h3>
                  <p className="text-xs opacity-90 mt-1">{action.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Emergency Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">{urgentContacts.length}</div>
              <div className="text-sm text-white/60">Crisis Hotlines</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Building className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">{emergencyNGOs.length}</div>
              <div className="text-sm text-white/60">NGOs Available</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="text-sm text-white/60">Always Available</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <div className="text-sm text-white/60">Verified Services</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search crisis services, NGOs, or type of help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-white appearance-none cursor-pointer"
            >
              <option value="all">All Services</option>
              <option value="crisis">Crisis Support</option>
              <option value="suicide">Suicide Prevention</option>
              <option value="medical">Medical Emergency</option>
              <option value="ngo">NGO Services</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div id="contacts">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Phone className="h-6 w-6 text-red-400" />
              Crisis Hotlines
            </h2>
            
            <div className="space-y-4">
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{contact.name}</h3>
                            {contact.verified && (
                              <Badge className="bg-green-500/10 text-green-300 border-green-500/20">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge className={`${
                              contact.available === "24/7" 
                                ? "bg-green-500/10 text-green-300 border-green-500/20" 
                                : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                            }`}>
                              <Clock className="h-3 w-3 mr-1" />
                              {contact.available}
                            </Badge>
                          </div>
                          
                          <p className="text-white/70 mb-3">{contact.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              {contact.rating}
                            </div>
                            <div>Response: {contact.responseTime}</div>
                            <div>Languages: {contact.languages.join(", ")}</div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => callNumber(contact.number)}
                          className="bg-red-600 hover:bg-red-700 text-white ml-4"
                          size="lg"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {contact.number}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* NGOs and Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Building className="h-6 w-6 text-blue-400" />
                Mental Health NGOs
              </h2>
              <Button
                variant="outline"
                onClick={() => setIsMapView(!isMapView)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {isMapView ? "List View" : "Map View"}
              </Button>
            </div>

            {userLocation && nearbyNGOs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-green-400" />
                  Nearest to You
                </h3>
                <div className="space-y-3">
                  {nearbyNGOs.slice(0, 3).map((ngo) => (
                    <Card key={ngo.id} className="bg-green-500/5 border-green-500/20">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{ngo.name}</h4>
                            <p className="text-sm text-white/60">
                              {ngo.distance?.toFixed(1)} km away • {ngo.availability}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => callNumber(ngo.phone)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDirections(ngo)}
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <Navigation className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Separator className="my-6 bg-white/10" />
              </div>
            )}

{isMapView ? (
              // Map View
              <div className="space-y-6">
                {/* Interactive Google Maps */}
                <Card className="bg-white/5 border-white/10 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      Mental Health Services Near You
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Google Maps Embed */}
                      <iframe
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBjYYEiP7l0RTYZqP7Q9mJt0M0E7R0g8fU&q=mental+health+services+near+me&zoom=12`}
                        className="rounded-lg"
                      ></iframe>
                      
                      {/* Map Overlay with Emergency Locations */}
                      <div className="absolute top-4 left-4 right-4 z-10">
                        <Card className="bg-black/80 backdrop-blur-sm border-white/20">
                          <CardContent className="p-3">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <Zap className="h-4 w-4 text-red-400" />
                              Emergency Locations
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              {emergencyNGOs.filter(ngo => ngo.emergency).slice(0, 4).map((ngo) => (
                                <div key={ngo.id} className="flex items-center gap-2 text-white/80">
                                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                  <span className="truncate">{ngo.name}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Legend and Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-green-400" />
                        Map Legend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-white/80">Emergency 24/7 Services</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-white/80">Mental Health Centers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-white/80">NGOs & Support Groups</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-white/80">Crisis Helplines</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-blue-400" />
                        Quick Map Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                              const { latitude, longitude } = position.coords;
                              window.open(`https://www.google.com/maps/search/mental+health+services/@${latitude},${longitude},12z`);
                            });
                          }
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Find Nearest Services
                      </Button>
                      <Button
                        onClick={() => window.open('https://www.google.com/maps/search/emergency+mental+health+crisis+centers', '_blank')}
                        className="w-full bg-red-600 hover:bg-red-700"
                        size="sm"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Emergency Centers
                      </Button>
                      <Button
                        onClick={() => window.open('https://www.google.com/maps/search/suicide+prevention+centers', '_blank')}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Crisis Prevention
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Location Cards for Map View */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyNGOs.map((ngo, index) => (
                    <motion.div
                      key={ngo.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-3 h-3 rounded-full mt-2 ${ngo.emergency ? 'bg-red-400 animate-pulse' : 'bg-blue-400'}`}></div>
                            <div className="flex-1">
                              <h3 className="font-bold text-sm mb-1">{ngo.name}</h3>
                              <p className="text-xs text-white/60 mb-2">{ngo.address}</p>
                              <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                                <Star className="h-3 w-3 text-yellow-400" />
                                {ngo.rating}
                                <Clock className="h-3 w-3" />
                                {ngo.availability}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              onClick={() => callNumber(ngo.phone)}
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button
                              onClick={() => openDirections(ngo)}
                              size="sm"
                              variant="outline"
                              className="flex-1 border-white/20 text-white hover:bg-white/10 text-xs"
                            >
                              <Navigation className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {emergencyNGOs.map((ngo, index) => (
                  <motion.div
                    key={ngo.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg">{ngo.name}</h3>
                              {ngo.verified && (
                                <Badge className="bg-green-500/10 text-green-300 border-green-500/20">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              {ngo.emergency && (
                                <Badge className="bg-red-500/10 text-red-300 border-red-500/20">
                                  <Zap className="h-3 w-3 mr-1" />
                                  Emergency
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-white/70 mb-3">{ngo.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <p className="text-sm text-white/50">Specialization:</p>
                                <div className="flex flex-wrap gap-1">
                                  {ngo.specialization.slice(0, 3).map((spec) => (
                                    <Badge key={spec} variant="outline" className="border-white/20 text-white/70 text-xs">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm text-white/50">Services:</p>
                                <div className="flex flex-wrap gap-1">
                                  {ngo.services.slice(0, 2).map((service) => (
                                    <Badge key={service} variant="outline" className="border-white/20 text-white/70 text-xs">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400" />
                                {ngo.rating}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {ngo.availability}
                              </div>
                              <div>Languages: {ngo.languages.join(", ")}</div>
                            </div>
                            
                            <div className="flex items-center gap-1 text-sm text-white/50">
                              <MapPin className="h-4 w-4" />
                              {ngo.address}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button
                            onClick={() => callNumber(ngo.phone)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                          
                          
                          {ngo.website && (
                            <Button
                              onClick={() => window.open(ngo.website, "_blank")}
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Website
                            </Button>
                          )}
                          
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Additional Crisis Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Online Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Connect with trained counselors through secure online chat platforms
                </p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/chat?urgent=true">Start Crisis Chat</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-green-400" />
                  Emergency Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Book urgent video sessions with licensed mental health professionals
                </p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/book?type=urgent">Book Emergency Session</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-blue-400" />
                  Crisis Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Access guided meditations, breathing exercises, and coping strategies
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/resources?filter=crisis">View Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Notice */}
        <Card className="mt-8 bg-red-500/10 border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-400 mb-2">Important Safety Information</h3>
                <div className="space-y-2 text-white/80">
                  <p>• If you are in immediate physical danger, call 911 or go to your nearest emergency room</p>
                  <p>• If you are having thoughts of suicide, call the National Suicide Prevention Lifeline at 988</p>
                  <p>• All services listed here are confidential and most are available 24/7</p>
                  <p>• You are not alone - help is available and recovery is possible</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
