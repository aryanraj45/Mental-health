"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { 
  Phone, MessageCircle, MapPin, Clock, AlertTriangle, Heart, Search, 
  Navigation, ExternalLink, Zap, Users, Building, Globe, Share2,
  MessageSquare, Video, Mail
} from "lucide-react"
import Link from "next/link"

interface EmergencyContact {
  id: string
  name: string
  number: string
  whatsapp?: string
  description: string
  availability: string
  languages: string[]
  type: "crisis" | "counseling" | "medical" | "police"
  location?: string
  website?: string
}

interface NGO {
  id: string
  name: string
  description: string
  phone: string
  whatsapp?: string
  email?: string
  website?: string
  address: string
  city: string
  state: string
  services: string[]
  availability: string
  distance?: number
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "National Suicide Prevention Helpline (iCall)",
    number: "9152987821",
    whatsapp: "9152987821",
    description: "24/7 crisis support and suicide prevention",
    availability: "24/7",
    languages: ["Hindi", "English", "Tamil", "Marathi"],
    type: "crisis",
    website: "https://icallhelpline.org"
  },
  {
    id: "2", 
    name: "Vandrevala Foundation Helpline",
    number: "9999666555",
    whatsapp: "9999666555",
    description: "Mental health support and counseling",
    availability: "24/7",
    languages: ["Hindi", "English", "Tamil", "Telugu", "Gujarati"],
    type: "counseling",
    website: "https://vandrevalafoundation.com"
  },
  {
    id: "3",
    name: "NIMHANS Emergency",
    number: "08026995000",
    description: "National Institute of Mental Health emergency support",
    availability: "24/7",
    languages: ["English", "Hindi", "Kannada"],
    type: "medical",
    location: "Bangalore",
    website: "https://nimhans.ac.in"
  },
  {
    id: "4",
    name: "Kiran Mental Health Helpline",
    number: "18005990019",
    description: "Mental health rehabilitation helpline",
    availability: "24/7",
    languages: ["Hindi", "English"],
    type: "counseling"
  },
  {
    id: "5",
    name: "AASRA Mumbai",
    number: "9820466726",
    description: "Emotional support and crisis intervention",
    availability: "24/7",
    languages: ["Hindi", "English", "Marathi"],
    type: "crisis",
    location: "Mumbai"
  },
  {
    id: "6",
    name: "Sneha Chennai",
    number: "04424640050",
    whatsapp: "9663246464",
    description: "Suicide prevention and emotional support",
    availability: "24/7",
    languages: ["Tamil", "English"],
    type: "crisis",
    location: "Chennai"
  },
  {
    id: "7",
    name: "Police Emergency",
    number: "100",
    description: "Emergency police assistance",
    availability: "24/7",
    languages: ["Hindi", "English", "Local Languages"],
    type: "police"
  },
  {
    id: "8",
    name: "Medical Emergency",
    number: "108",
    description: "Emergency medical services",
    availability: "24/7", 
    languages: ["Hindi", "English", "Local Languages"],
    type: "medical"
  }
]

const nearbyNGOs: NGO[] = [
  {
    id: "1",
    name: "Parivarthan Counselling, Training & Research Centre",
    description: "Mental health counseling and therapy services",
    phone: "08025498892",
    whatsapp: "9880256612",
    email: "info@parivarthan.org",
    website: "https://parivarthan.org",
    address: "25/4, Diagonal Road, VV Puram",
    city: "Bangalore",
    state: "Karnataka",
    services: ["Individual Counseling", "Group Therapy", "Crisis Intervention", "Psychiatric Consultation"],
    availability: "Mon-Sat 9AM-6PM",
    distance: 2.5
  },
  {
    id: "2",
    name: "The Live Love Laugh Foundation",
    description: "Mental health awareness and support organization",
    phone: "08033884442",
    email: "contact@thelivelovelaughfoundation.org",
    website: "https://thelivelovelaughfoundation.org",
    address: "UB City Mall, 24 Vittal Mallya Road",
    city: "Bangalore",
    state: "Karnataka",
    services: ["Mental Health Education", "Support Groups", "Crisis Support", "Awareness Programs"],
    availability: "Mon-Fri 10AM-6PM",
    distance: 5.2
  },
  {
    id: "3",
    name: "Samarthanam Trust for the Disabled",
    description: "Support for individuals with disabilities and mental health issues",
    phone: "08025213939",
    whatsapp: "9845815139",
    email: "info@samarthanam.org",
    website: "https://samarthanam.org",
    address: "459, 1st Main Road, KEB Layout, Ramamurthy Nagar",
    city: "Bangalore",
    state: "Karnataka",
    services: ["Counseling Services", "Rehabilitation", "Skill Development", "Emergency Support"],
    availability: "Mon-Sat 9AM-5PM",
    distance: 7.8
  },
  {
    id: "4",
    name: "Mind Healers",
    description: "Professional mental health counseling center",
    phone: "08041510101",
    whatsapp: "9886050101",
    email: "info@mindhealers.in",
    address: "1st Floor, 123 Double Road, Shanthi Nagar",
    city: "Bangalore", 
    state: "Karnataka",
    services: ["Clinical Psychology", "Psychiatry", "Couple Counseling", "Child Psychology"],
    availability: "Mon-Sun 9AM-8PM",
    distance: 3.1
  }
]

export default function EmergencyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  useEffect(() => {
    // Get user location for nearby NGOs
    if (navigator.geolocation) {
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsLocating(false)
        },
        () => {
          setIsLocating(false)
        }
      )
    }
  }, [])

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || contact.type === selectedType
    return matchesSearch && matchesType
  })

  const handleCall = (number: string) => {
    window.open(`tel:${number}`)
  }

  const handleWhatsApp = (number: string, message: string = "Hello, I need mental health support") => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-red-900">Emergency Mental Health Support</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you're in crisis or need immediate support, help is available right now. 
            You're not alone - professional support is just a call away.
          </p>
        </div>

        {/* Crisis Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-900">
            <strong>In immediate danger?</strong> Call <strong>100</strong> (Police) or <strong>108</strong> (Emergency Services) right away.
            For mental health crisis support, call <strong>9152987821</strong> (24/7 available).
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="helplines" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="helplines">Crisis Helplines</TabsTrigger>
            <TabsTrigger value="ngos">Nearby NGOs</TabsTrigger>
            <TabsTrigger value="steps">Emergency Steps</TabsTrigger>
            <TabsTrigger value="resources">Quick Resources</TabsTrigger>
          </TabsList>

          {/* Crisis Helplines Tab */}
          <TabsContent value="helplines" className="space-y-6">
            {/* Search and Filter */}
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
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="crisis">Crisis Support</SelectItem>
                  <SelectItem value="counseling">Counseling</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="police">Emergency Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Emergency Contacts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className={`${contact.type === 'crisis' ? 'border-red-200 bg-red-50/50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        {contact.location && (
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{contact.location}</span>
                          </div>
                        )}
                      </div>
                      <Badge variant={contact.type === 'crisis' ? 'destructive' : 'secondary'}>
                        {contact.type}
                      </Badge>
                    </div>
                    <CardDescription>{contact.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.availability}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {contact.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCall(contact.number)}
                        className="flex-1"
                        variant={contact.type === 'crisis' ? 'destructive' : 'default'}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call {contact.number}
                      </Button>
                      {contact.whatsapp && (
                        <Button
                          onClick={() => handleWhatsApp(contact.whatsapp!)}
                          variant="outline"
                          className="flex-1"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                    </div>

                    {contact.website && (
                      <Button variant="ghost" size="sm" asChild className="w-full">
                        <Link href={contact.website} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
      description: "If you're having thoughts of self-harm or suicide",
      action: "Call a crisis helpline immediately - you're not alone",
      color: "bg-orange-50 border-orange-200",
    },
    {
      title: "Mental Health Crisis",
      description: "If you're experiencing severe anxiety, panic, or emotional distress",
      action: "Reach out to a counseling helpline or trusted person",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Need Someone to Talk",
      description: "If you need emotional support or someone to listen",
      action: "Contact any of the helplines below - they're here for you",
      color: "bg-green-50 border-green-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">Emergency Support</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're not alone. Help is available 24/7. Reach out when you need support.
          </p>
        </div>

        {/* Crisis Alert */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">In Immediate Crisis?</h3>
                <p className="text-red-800 mb-4">
                  If you're having thoughts of self-harm or suicide, please reach out immediately. Your life matters and
                  help is available right now.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.open("tel:9152987821")}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Crisis Helpline
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                    asChild
                  >
                    <Link href="/chat">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat with AI Support
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">When to Seek Help</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencySteps.map((step, index) => (
              <Card key={index} className={`${step.color} border-2`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription className="text-gray-700">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-gray-900">{step.action}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Helplines */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">24/7 Mental Health Helplines</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-tight">{contact.name}</CardTitle>
                    <Badge variant={contact.type === "crisis" ? "destructive" : "secondary"} className="ml-2">
                      {contact.type}
                    </Badge>
                  </div>
                  <CardDescription>{contact.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-cyan-600" />
                    <span className="font-mono text-lg font-semibold">{contact.number}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">{contact.availability}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {contact.languages.map((lang, langIndex) => (
                      <Badge key={langIndex} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full" onClick={() => window.open(`tel:${contact.number}`)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Additional Emergency Resources</CardTitle>
            <CardDescription>Other important contacts and resources for immediate help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Emergency Services
                </h4>
                <p className="text-sm text-gray-600">Police: 100</p>
                <p className="text-sm text-gray-600">Medical Emergency: 108</p>
                <p className="text-sm text-gray-600">Women's Helpline: 1091</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Campus Resources
                </h4>
                <p className="text-sm text-gray-600">Campus Security: Contact your institution</p>
                <p className="text-sm text-gray-600">Student Counseling Center</p>
                <p className="text-sm text-gray-600">Health Services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create Your Safety Plan</CardTitle>
            <CardDescription>Having a plan can help you stay safe during difficult times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Warning Signs to Watch For:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Persistent feelings of hopelessness</li>
                  <li>• Thoughts of self-harm or suicide</li>
                  <li>• Severe anxiety or panic attacks</li>
                  <li>• Inability to cope with daily activities</li>
                  <li>• Substance abuse as coping mechanism</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Coping Strategies:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Call a trusted friend or family member</li>
                  <li>• Use breathing exercises or meditation</li>
                  <li>• Go to a safe, public place</li>
                  <li>• Remove means of self-harm</li>
                  <li>• Contact a crisis helpline immediately</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-600 text-center">
                Remember: Seeking help is a sign of strength, not weakness. You deserve support and care.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
