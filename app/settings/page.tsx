"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import {
  Settings,
  User,
  Bell,
  Shield,
  Moon,
  Sun,
  Globe,
  Heart,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  Trash2,
  Download,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SettingsData {
  profile: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    emergencyContact: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    reminderNotifications: boolean;
    appointmentReminders: boolean;
    moodCheckIns: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analyticsOptIn: boolean;
    profileVisibility: "public" | "private" | "friends";
    sessionRecording: boolean;
  };
  preferences: {
    theme: "light" | "dark" | "auto";
    language: string;
    timezone: string;
    dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
    autoSave: boolean;
  };
  wellness: {
    dailyMoodReminder: boolean;
    meditationReminders: boolean;
    sleepReminders: boolean;
    exerciseReminders: boolean;
    hydrationReminders: boolean;
    breakReminders: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1995-06-15",
      emergencyContact: "+91 98765 43211",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      reminderNotifications: true,
      appointmentReminders: true,
      moodCheckIns: true,
    },
    privacy: {
      dataSharing: false,
      analyticsOptIn: true,
      profileVisibility: "private",
      sessionRecording: false,
    },
    preferences: {
      theme: "dark",
      language: "English",
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      autoSave: true,
    },
    wellness: {
      dailyMoodReminder: true,
      meditationReminders: true,
      sleepReminders: true,
      exerciseReminders: false,
      hydrationReminders: true,
      breakReminders: true,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const updateProfile = (field: string, value: string) => {
    setSettings({
      ...settings,
      profile: { ...settings.profile, [field]: value },
    });
  };

  const updateNotifications = (field: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [field]: value },
    });
  };

  const updatePrivacy = (field: string, value: boolean | string) => {
    setSettings({
      ...settings,
      privacy: { ...settings.privacy, [field]: value },
    });
  };

  const updatePreferences = (field: string, value: string | boolean) => {
    setSettings({
      ...settings,
      preferences: { ...settings.preferences, [field]: value },
    });
  };

  const updateWellness = (field: string, value: boolean) => {
    setSettings({
      ...settings,
      wellness: { ...settings.wellness, [field]: value },
    });
  };

  const saveSettings = () => {
    // Here you would typically save to your backend
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  const exportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mindcare-settings.json";
    link.click();
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "wellness", label: "Wellness", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Settings className="h-8 w-8 text-blue-400" />
                Settings & Preferences
              </h1>
              <p className="text-white/60 mt-1">
                Customize your MindCare experience
              </p>
            </div>
          </div>
          
          <Button
            onClick={saveSettings}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? "bg-blue-600 text-white"
                            : "hover:bg-white/10 text-white/70"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Section */}
              {activeSection === "profile" && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={settings.profile.name}
                          onChange={(e) => updateProfile("name", e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => updateProfile("email", e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input
                          value={settings.profile.phone}
                          onChange={(e) => updateProfile("phone", e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date of Birth</label>
                        <Input
                          type="date"
                          value={settings.profile.dateOfBirth}
                          onChange={(e) => updateProfile("dateOfBirth", e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                      <Input
                        value={settings.profile.emergencyContact}
                        onChange={(e) => updateProfile("emergencyContact", e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Emergency contact phone number"
                      />
                    </div>
                    
                    <Separator className="my-6 bg-white/10" />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">New Password</label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              className="bg-white/5 border-white/10 text-white pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Confirm Password</label>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">General Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-white/60">Receive notifications via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.notifications.emailNotifications}
                          onCheckedChange={(checked) => updateNotifications("emailNotifications", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-green-400" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-white/60">Receive push notifications on your device</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.notifications.pushNotifications}
                          onCheckedChange={(checked) => updateNotifications("pushNotifications", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-yellow-400" />
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-white/60">Receive notifications via SMS</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.notifications.smsNotifications}
                          onCheckedChange={(checked) => updateNotifications("smsNotifications", checked)}
                        />
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Specific Reminders</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointment Reminders</p>
                          <p className="text-sm text-white/60">Get reminded about upcoming sessions</p>
                        </div>
                        <Switch
                          checked={settings.notifications.appointmentReminders}
                          onCheckedChange={(checked) => updateNotifications("appointmentReminders", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mood Check-ins</p>
                          <p className="text-sm text-white/60">Daily reminders to log your mood</p>
                        </div>
                        <Switch
                          checked={settings.notifications.moodCheckIns}
                          onCheckedChange={(checked) => updateNotifications("moodCheckIns", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Privacy Section */}
              {activeSection === "privacy" && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Sharing</p>
                          <p className="text-sm text-white/60">Allow sharing anonymized data for research</p>
                        </div>
                        <Switch
                          checked={settings.privacy.dataSharing}
                          onCheckedChange={(checked) => updatePrivacy("dataSharing", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Analytics</p>
                          <p className="text-sm text-white/60">Help improve the app with usage analytics</p>
                        </div>
                        <Switch
                          checked={settings.privacy.analyticsOptIn}
                          onCheckedChange={(checked) => updatePrivacy("analyticsOptIn", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Recording</p>
                          <p className="text-sm text-white/60">Allow recording of therapy sessions for review</p>
                        </div>
                        <Switch
                          checked={settings.privacy.sessionRecording}
                          onCheckedChange={(checked) => updatePrivacy("sessionRecording", checked)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => updatePrivacy("profileVisibility", e.target.value)}
                          className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data Management</h3>
                      <div className="flex gap-4">
                        <Button
                          onClick={exportData}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preferences Section */}
              {activeSection === "preferences" && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      App Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Theme</label>
                        <select
                          value={settings.preferences.theme}
                          onChange={(e) => updatePreferences("theme", e.target.value)}
                          className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <select
                          value={settings.preferences.language}
                          onChange={(e) => updatePreferences("language", e.target.value)}
                          className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Timezone</label>
                        <select
                          value={settings.preferences.timezone}
                          onChange={(e) => updatePreferences("timezone", e.target.value)}
                          className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata</option>
                          <option value="America/New_York">America/New_York</option>
                          <option value="Europe/London">Europe/London</option>
                          <option value="Asia/Tokyo">Asia/Tokyo</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Date Format</label>
                        <select
                          value={settings.preferences.dateFormat}
                          onChange={(e) => updatePreferences("dateFormat", e.target.value)}
                          className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-save</p>
                        <p className="text-sm text-white/60">Automatically save your progress</p>
                      </div>
                      <Switch
                        checked={settings.preferences.autoSave}
                        onCheckedChange={(checked) => updatePreferences("autoSave", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Wellness Section */}
              {activeSection === "wellness" && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Wellness Reminders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Daily Mood Reminder</p>
                        <p className="text-sm text-white/60">Daily prompts to track your mood</p>
                      </div>
                      <Switch
                        checked={settings.wellness.dailyMoodReminder}
                        onCheckedChange={(checked) => updateWellness("dailyMoodReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Meditation Reminders</p>
                        <p className="text-sm text-white/60">Reminders for meditation sessions</p>
                      </div>
                      <Switch
                        checked={settings.wellness.meditationReminders}
                        onCheckedChange={(checked) => updateWellness("meditationReminders", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sleep Reminders</p>
                        <p className="text-sm text-white/60">Reminders to maintain sleep schedule</p>
                      </div>
                      <Switch
                        checked={settings.wellness.sleepReminders}
                        onCheckedChange={(checked) => updateWellness("sleepReminders", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Exercise Reminders</p>
                        <p className="text-sm text-white/60">Reminders for physical activity</p>
                      </div>
                      <Switch
                        checked={settings.wellness.exerciseReminders}
                        onCheckedChange={(checked) => updateWellness("exerciseReminders", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Hydration Reminders</p>
                        <p className="text-sm text-white/60">Reminders to stay hydrated</p>
                      </div>
                      <Switch
                        checked={settings.wellness.hydrationReminders}
                        onCheckedChange={(checked) => updateWellness("hydrationReminders", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Break Reminders</p>
                        <p className="text-sm text-white/60">Reminders to take regular breaks</p>
                      </div>
                      <Switch
                        checked={settings.wellness.breakReminders}
                        onCheckedChange={(checked) => updateWellness("breakReminders", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
