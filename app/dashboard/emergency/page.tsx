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
  }
]

const emergencySteps = [
  {
    title: "Immediate Danger",
    description: "If you or someone else is in immediate physical danger",
    action: "Call 100 (Police) or 108 (Emergency Services)",
    color: "bg-red-50 border-red-200",
  },
  {
    title: "Mental Health Crisis",
    description: "Having thoughts of self-harm or suicide",
    action: "Call 9152987821 (iCall) or 9999666555 (Vandrevala Foundation)",
    color: "bg-orange-50 border-orange-200",
  },
  {
    title: "Need Someone to Talk",
    description: "Feeling overwhelmed, anxious, or depressed",
    action: "Use our AI Chat support or call counseling helplines",
    color: "bg-blue-50 border-blue-200",
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

          {/* Nearby NGOs Tab */}
          <TabsContent value="ngos" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Mental Health NGOs Near You</h3>
              <Button
                onClick={() => setIsLocating(true)}
                variant="outline"
                size="sm"
                disabled={isLocating}
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isLocating ? 'Locating...' : 'Find Nearby'}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {nearbyNGOs.map((ngo) => (
                <Card key={ngo.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{ngo.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ngo.city}, {ngo.state}</span>
                          {ngo.distance && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {ngo.distance} km away
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription>{ngo.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Address:</strong> {ngo.address}</p>
                      <p><strong>Availability:</strong> {ngo.availability}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {ngo.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleCall(ngo.phone)}
                        variant="default"
                        size="sm"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      {ngo.whatsapp && (
                        <Button
                          onClick={() => handleWhatsApp(ngo.whatsapp!)}
                          variant="outline"
                          size="sm"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                      {ngo.email && (
                        <Button
                          onClick={() => window.open(`mailto:${ngo.email}`)}
                          variant="outline"
                          size="sm"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
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
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Steps Tab */}
          <TabsContent value="steps" className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">What to Do in a Mental Health Emergency</h3>
            
            <div className="space-y-4">
              {emergencySteps.map((step, index) => (
                <Card key={index} className={step.color}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                        <p className="text-muted-foreground mb-3">{step.description}</p>
                        <p className="font-medium">{step.action}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3">Remember:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Mental health emergencies are real medical emergencies</li>
                  <li>It's okay to call for help - you're not being dramatic</li>
                  <li>Stay with the person if someone else is in crisis</li>
                  <li>Remove any means of self-harm if possible</li>
                  <li>Listen without judgment and encourage professional help</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    AI Chat Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get immediate support from our AI mental health companion
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/chat">Start Chat</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with others who understand what you're going through
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/community">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Self-Care Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Breathing exercises, meditation, and coping strategies
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/resources">View Resources</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-purple-600" />
                    Professional Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a session with licensed mental health professionals
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/book">Book Session</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-orange-600" />
                    Share This Page
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Help others by sharing emergency resources
                  </p>
                  <Button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Emergency Mental Health Support',
                          text: 'Mental health emergency resources and support',
                          url: window.location.href
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                      }
                    }}
                    variant="outline" 
                    className="w-full"
                  >
                    Share Resources
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Crisis Text Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Text "HOME" to 741741 for crisis support via text message
                  </p>
                  <Button
                    onClick={() => window.open('sms:741741?body=HOME')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Text for Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
