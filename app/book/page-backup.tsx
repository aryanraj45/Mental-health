"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "lucide-react";
import Link from "next/link";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Counselor {
  id: string;
  name: string;
  specialization: string[];
  languages: string[];
  experience: string;
  avatar: string;
}

const counselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: ["Anxiety", "Depression", "Academic Stress"],
    languages: ["English", "Hindi", "Tamil"],
    experience: "8 years",
    avatar: "/professional-counselor-woman.jpg",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: [
      "Relationship Issues",
      "Social Anxiety",
      "Career Counseling",
    ],
    languages: ["English", "Hindi", "Bengali"],
    experience: "12 years",
    avatar: "/professional-counselor-man.jpg",
  },
  {
    id: "3",
    name: "Dr. Anita Menon",
    specialization: ["Trauma", "PTSD", "Eating Disorders"],
    languages: ["English", "Malayalam", "Kannada"],
    experience: "10 years",
    avatar: "/professional-counselor-woman-therapist.jpg",
  },
];

const timeSlots: TimeSlot[] = [
  { id: "1", time: "09:00 AM", available: true },
  { id: "2", time: "10:00 AM", available: true },
  { id: "3", time: "11:00 AM", available: false },
  { id: "4", time: "02:00 PM", available: true },
  { id: "5", time: "03:00 PM", available: true },
  { id: "6", time: "04:00 PM", available: true },
  { id: "7", time: "05:00 PM", available: false },
];

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
    // Here you would typically send the booking data to your backend
    console.log({
      date: selectedDate,
      time: selectedTime,
      counselor: selectedCounselor,
      sessionType,
      isAnonymous,
      concerns,
      isUrgent,
    });
    setStep(4); // Move to confirmation step
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        disabled: date.getDay() === 0, // Disable Sundays
      });
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
          </Link>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Book Session
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Privacy Notice */}
        <Alert className="mb-6 border-primary/50 bg-primary/10">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Your Privacy Matters:</strong> All sessions are
            confidential. You can choose to book anonymously, and your personal
            information is protected according to our privacy policy.
          </AlertDescription>
        </Alert>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > stepNumber ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Select Date & Time
              </CardTitle>
              <CardDescription>
                Choose when you'd like to have your session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Select Date</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {generateDates().map((date) => (
                    <Button
                      key={date.value}
                      variant={
                        selectedDate === date.value ? "default" : "outline"
                      }
                      className="h-auto p-3 text-left"
                      disabled={date.disabled}
                      onClick={() => setSelectedDate(date.value)}
                    >
                      <div>
                        <div className="font-medium">{date.label}</div>
                        {date.disabled && (
                          <div className="text-xs text-muted-foreground">
                            Closed
                          </div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <Label className="text-base font-medium">Select Time</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={
                          selectedTime === slot.id ? "default" : "outline"
                        }
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.id)}
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                >
                  Next: Choose Counselor
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Counselor Selection */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Choose Your Counselor
              </CardTitle>
              <CardDescription>
                Select a counselor based on their specialization and language
                preference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={selectedCounselor}
                onValueChange={setSelectedCounselor}
              >
                {counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className="flex items-start space-x-3 p-4 border rounded-lg"
                  >
                    <RadioGroupItem
                      value={counselor.id}
                      id={counselor.id}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <img
                          src={counselor.avatar || "/placeholder.svg"}
                          alt={counselor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{counselor.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {counselor.experience} experience
                          </p>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">
                                Specializations:{" "}
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {counselor.specialization.map((spec) => (
                                  <Badge
                                    key={spec}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">
                                Languages:{" "}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {counselor.languages.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Book anonymously (counselor won't see your name until the
                  session)
                </Label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedCounselor}
                >
                  Next: Session Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Session Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Provide additional information to help us prepare for your
                session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Session Type</Label>
                <RadioGroup
                  value={sessionType}
                  onValueChange={setSessionType}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Call (Recommended)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Call
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-person" id="in-person" />
                    <Label
                      htmlFor="in-person"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      In-Person (Campus Counseling Center)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="concerns" className="text-base font-medium">
                  What would you like to discuss? (Optional)
                </Label>
                <Textarea
                  id="concerns"
                  placeholder="Share what's on your mind or what you'd like to focus on during the session..."
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This information helps your counselor prepare, but you can
                  discuss anything during the session.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={isUrgent}
                  onCheckedChange={setIsUrgent}
                />
                <Label htmlFor="urgent" className="text-sm">
                  This is urgent - I need support as soon as possible
                </Label>
              </div>

              {isUrgent && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertDescription>
                    For immediate crisis support, please call: NIMHANS
                    (080-26995000), Vandrevala Foundation (9999666555), or visit
                    your nearest emergency room.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleBooking} disabled={!sessionType}>
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Session Booked Successfully!</CardTitle>
              <CardDescription>
                Your appointment has been confirmed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Date & Time:</span>
                  <span>
                    {new Date(selectedDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {timeSlots.find((slot) => slot.id === selectedTime)?.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Counselor:</span>
                  <span>
                    {counselors.find((c) => c.id === selectedCounselor)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Session Type:</span>
                  <span className="capitalize">
                    {sessionType?.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Booking ID:</span>
                  <span className="font-mono">
                    MC-{Date.now().toString().slice(-6)}
                  </span>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>What's Next:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>
                      You'll receive a confirmation email with session details
                    </li>
                    <li>
                      A reminder will be sent 24 hours before your appointment
                    </li>
                    <li>
                      For video calls, you'll receive a secure meeting link
                    </li>
                    <li>
                      You can reschedule or cancel up to 4 hours before the
                      session
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link href="/dashboard">View My Appointments</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="flex-1 bg-transparent"
                >
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
