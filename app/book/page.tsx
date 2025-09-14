"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar, Clock, User, Shield, Heart, CheckCircle, Phone, Video, MapPin,
  Star, GraduationCap, Languages, Coffee, Brain, AlertTriangle
} from "lucide-react"
import Link from "next/link"

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface Counselor {
  id: string
  name: string
  specialization: string[]
  languages: string[]
  experience: string
  avatar: string
  rating: number
  bio: string
}

const counselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: ["Anxiety", "Depression", "Stress Management"],
    languages: ["English", "Hindi", "Tamil"],
    experience: "8 years",
    avatar: "/professional-counselor-woman.jpg",
    rating: 4.9,
    bio: "Specializes in cognitive behavioral therapy and mindfulness-based interventions."
  },
  {
    id: "2",
    name: "Dr. Arjun Patel",
    specialization: ["Relationship Counseling", "Family Therapy", "Communication Skills"],
    languages: ["English", "Hindi", "Gujarati"],
    experience: "12 years",
    avatar: "/professional-counselor-man.jpg",
    rating: 4.8,
    bio: "Expert in family dynamics and relationship counseling with a holistic approach."
  },
  {
    id: "3",
    name: "Dr. Meera Singh",
    specialization: ["Trauma Recovery", "PTSD", "Grief Counseling"],
    languages: ["English", "Hindi", "Punjabi"],
    experience: "10 years",
    avatar: "/professional-counselor-woman-therapist.jpg",
    rating: 4.9,
    bio: "Trauma-informed specialist helping individuals heal from difficult experiences."
  }
]

const timeSlots: TimeSlot[] = [
  { id: "1", time: "09:00 AM", available: true },
  { id: "2", time: "10:00 AM", available: true },
  { id: "3", time: "11:00 AM", available: false },
  { id: "4", time: "02:00 PM", available: true },
  { id: "5", time: "03:00 PM", available: true },
  { id: "6", time: "04:00 PM", available: true },
  { id: "7", time: "05:00 PM", available: false },
]

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedCounselor, setSelectedCounselor] = useState<string>("")
  
  // --- THIS IS THE FIX ---
  // Default sessionType to 'video' to ensure the "Review Booking" button is enabled by default.
  const [sessionType, setSessionType] = useState<string>("video")
  
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [concerns, setConcerns] = useState<string>("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [step, setStep] = useState(1)
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false)

  const handleBooking = () => {
    console.log("Booking confirmed with details:", {
      date: selectedDate,
      time: selectedTime,
      counselor: selectedCounselor,
      sessionType,
      isAnonymous,
      concerns,
      isUrgent,
    });
    setStep(5);
  }

  const resetBooking = () => {
    setSelectedDate("");
    setSelectedTime("");
    setSelectedCounselor("");
    setSessionType("video"); // Reset to default
    setIsAnonymous(false);
    setConcerns("");
    setIsUrgent(false);
    setStep(1);
  };

  const handleCounselorSelect = (counselorId: string) => {
    setSelectedCounselor(counselorId);
    setIsCounselorModalOpen(false);
    setStep(3);
  };

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        disabled: date.getDay() === 0,
      })
    }
    return dates
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book a Counseling Session</h1>
          <p className="text-muted-foreground">
            Connect with certified mental health professionals for personalized support
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 5 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Calendar className="h-5 w-5" />
              )}
              {step === 5 ? 'Booking Confirmed!' : `Step ${step} of 4: ${
                step === 1 ? 'Choose Date & Time' :
                step === 2 ? 'Select Counselor' :
                step === 3 ? 'Session Details' :
                'Confirmation'
              }`}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Select your preferred date and time slot'}
              {step === 2 && 'Choose a counselor that matches your needs'}
              {step === 3 && 'Provide session details and preferences'}
              {step === 4 && 'Review and confirm your booking'}
              {step === 5 && 'Your session has been successfully scheduled.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Date</Label>
                  <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {generateDates().map((date) => (
                        <div key={date.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={date.value} id={date.value} disabled={date.disabled} />
                          <Label
                            htmlFor={date.value}
                            className={`text-sm ${date.disabled ? 'text-muted-foreground line-through' : ''}`}
                          >
                            {date.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Select Time</Label>
                    <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={slot.time} id={slot.id} disabled={!slot.available} />
                            <Label
                              htmlFor={slot.id}
                              className={`text-sm ${!slot.available ? 'text-muted-foreground line-through' : ''}`}
                            >
                              {slot.time} {!slot.available && '(Booked)'}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      setStep(2);
                      setIsCounselorModalOpen(true);
                    }}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Next: Choose Counselor
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Opening counselor selection...</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Session Type</Label>
                  <RadioGroup value={sessionType} onValueChange={setSessionType}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video" className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Video Call (₹1500)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="audio" id="audio" />
                        <Label htmlFor="audio" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Voice Call (₹1200)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          In-Person (₹2000)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Book anonymously (counselor won't see your name)
                  </Label>
                </div>

                <div>
                  <Label htmlFor="concerns" className="text-base font-medium mb-2 block">
                    What would you like to discuss? (Optional)
                  </Label>
                  <Textarea
                    id="concerns"
                    placeholder="Share what's on your mind to help your counselor prepare..."
                    value={concerns}
                    onChange={(e) => setConcerns(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={isUrgent}
                    onCheckedChange={(checked) => setIsUrgent(checked === true)}
                  />
                  <Label htmlFor="urgent" className="text-sm">
                    This is urgent
                  </Label>
                </div>

                {isUrgent && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      For immediate crisis support, please call our 24/7 helpline at{" "}
                      <Link href="tel:+911122334455" className="font-medium underline">
                        +91 11 2233 4455
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!sessionType}
                  >
                    Review Booking
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Counselor:</span>
                      <span>{counselors.find(c => c.id === selectedCounselor)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Type:</span>
                      <span className="capitalize">{sessionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>50 minutes</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Cost:</span>
                      <span>
                        ₹{sessionType === 'video' ? 1500 : sessionType === 'audio' ? 1200 : 2000}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>What's Next:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>You'll receive a confirmation email with all session details.</li>
                      <li>A reminder will be sent 24 hours before your appointment.</li>
                      <li>You can reschedule or cancel up to 4 hours before the session.</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button onClick={handleBooking} className="bg-primary">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-8 space-y-4 flex flex-col items-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <h2 className="text-2xl font-semibold">Booking Successful!</h2>
                  <p className="text-muted-foreground max-w-sm">
                      Your session with {counselors.find(c => c.id === selectedCounselor)?.name} is confirmed. 
                      You will receive an email confirmation shortly.
                  </p>
                  <div className="pt-4">
                      <Button onClick={resetBooking}>
                          Book Another Session
                      </Button>
                  </div>
              </div>
            )}
            
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCounselorModalOpen} onOpenChange={setIsCounselorModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Step 2 of 4: Select a Counselor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {counselors.map((counselor) => (
              <button
                key={counselor.id}
                className="w-full text-left border rounded-lg p-4 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={() => handleCounselorSelect(counselor.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{counselor.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{counselor.rating}</span>
                        <span className="text-sm text-muted-foreground">• {counselor.experience}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{counselor.bio}</p>

                  <div className="flex flex-wrap gap-1">
                    {counselor.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages className="h-4 w-4" />
                    {counselor.languages.join(', ')}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}