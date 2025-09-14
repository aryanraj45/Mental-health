"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, MapPin, Clock, AlertTriangle, Heart } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Helpline",
      number: "9152987821",
      description: "24/7 crisis support and suicide prevention",
      availability: "24/7",
      languages: ["Hindi", "English"],
      type: "crisis",
    },
    {
      name: "Vandrevala Foundation Helpline",
      number: "9999666555",
      description: "Mental health support and counseling",
      availability: "24/7",
      languages: ["Hindi", "English", "Tamil", "Telugu"],
      type: "counseling",
    },
    {
      name: "AASRA Mumbai",
      number: "9820466726",
      description: "Emotional support and crisis intervention",
      availability: "24/7",
      languages: ["Hindi", "English", "Marathi"],
      type: "crisis",
    },
    {
      name: "Sneha Chennai",
      number: "04424640050",
      description: "Suicide prevention and emotional support",
      availability: "24/7",
      languages: ["Tamil", "English"],
      type: "crisis",
    },
    {
      name: "Sumaitri Delhi",
      number: "01123389090",
      description: "Emotional support for those in distress",
      availability: "24/7",
      languages: ["Hindi", "English"],
      type: "counseling",
    },
    {
      name: "Parivarthan Bangalore",
      number: "07676602602",
      description: "Mental health support and counseling",
      availability: "24/7",
      languages: ["Kannada", "English", "Hindi"],
      type: "counseling",
    },
  ]

  const emergencySteps = [
    {
      title: "Immediate Danger",
      description: "If you or someone else is in immediate physical danger",
      action: "Call 100 (Police) or 108 (Emergency Services)",
      color: "bg-red-50 border-red-200",
    },
    {
      title: "Suicidal Thoughts",
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
