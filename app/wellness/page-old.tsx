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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Heart,
  Brain,
  Moon,
  Smile,
  Frown,
  Meh,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function WellnessPage() {
  const [currentMood, setCurrentMood] = useState<number>(5);
  const [stressLevel, setStressLevel] = useState<number[]>([5]);
  const [sleepHours, setSleepHours] = useState<number[]>([7]);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedMoodIcon, setSelectedMoodIcon] = useState("neutral");

  const moodOptions = [
    {
      value: "very-sad",
      icon: Frown,
      label: "Very Sad",
      color: "text-red-500",
    },
    { value: "sad", icon: Frown, label: "Sad", color: "text-orange-500" },
    { value: "neutral", icon: Meh, label: "Neutral", color: "text-yellow-500" },
    { value: "happy", icon: Smile, label: "Happy", color: "text-green-500" },
    {
      value: "very-happy",
      icon: Smile,
      label: "Very Happy",
      color: "text-blue-500",
    },
  ];

  const handleMoodSubmit = () => {
    // Here you would save the mood data
    console.log({
      mood: selectedMoodIcon,
      stressLevel: stressLevel[0],
      sleepHours: sleepHours[0],
      journalEntry,
      timestamp: new Date(),
    });
    alert("Mood entry saved successfully!");
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
            <Brain className="h-4 w-4" />
            Wellness Tools
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Daily Wellness Check-in</h2>
          <p className="text-lg text-muted-foreground">
            Take a moment to reflect on your mental health and track your
            progress over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Wellness Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-primary" />
                  How are you feeling today?
                </CardTitle>
                <CardDescription>
                  Select the mood that best represents how you're feeling right
                  now
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedMoodIcon}
                  onValueChange={setSelectedMoodIcon}
                >
                  <div className="flex justify-between items-center">
                    {moodOptions.map((mood) => (
                      <div
                        key={mood.value}
                        className="flex flex-col items-center space-y-2"
                      >
                        <RadioGroupItem
                          value={mood.value}
                          id={mood.value}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={mood.value}
                          className={`cursor-pointer p-3 rounded-full border-2 transition-colors ${
                            selectedMoodIcon === mood.value
                              ? "border-primary bg-primary/10"
                              : "border-muted hover:border-primary/50"
                          }`}
                        >
                          <mood.icon className={`h-8 w-8 ${mood.color}`} />
                        </Label>
                        <span className="text-xs text-center">
                          {mood.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Stress Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Stress Level
                </CardTitle>
                <CardDescription>
                  Rate your current stress level from 1 (very low) to 10 (very
                  high)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={stressLevel}
                    onValueChange={setStressLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Very Low</span>
                    <span className="font-medium">
                      Current: {stressLevel[0]}
                    </span>
                    <span>Very High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Sleep Quality
                </CardTitle>
                <CardDescription>
                  How many hours did you sleep last night?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={sleepHours}
                    onValueChange={setSleepHours}
                    max={12}
                    min={3}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>3 hours</span>
                    <span className="font-medium">
                      Slept: {sleepHours[0]} hours
                    </span>
                    <span>12 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journal Entry */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Reflection</CardTitle>
                <CardDescription>
                  Write about your thoughts, feelings, or anything significant
                  from today (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind today? How are you feeling about your day?"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            <Button onClick={handleMoodSubmit} className="w-full" size="lg">
              Save Today's Check-in
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Check-ins completed</span>
                    <span>4/7</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Average mood</span>
                    <span>Good</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Smile className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      Trending positive
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sleep average</span>
                    <span>7.2 hrs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      Improving
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/chat">
                    <Brain className="h-4 w-4 mr-2" />
                    Talk to AI Support
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/resources">
                    <Heart className="h-4 w-4 mr-2" />
                    Browse Resources
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/book">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Wellness Tip */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Wellness Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Try the 5-4-3-2-1 grounding technique: Notice 5 things you can
                  see, 4 you can touch, 3 you can hear, 2 you can smell, and 1
                  you can taste.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
