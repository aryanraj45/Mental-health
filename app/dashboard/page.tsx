"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Video, Phone, MapPin, Heart, MessageCircle, AlertTriangle, FileText, Users, Bot } from "lucide-react"
import Link from "next/link"


const upcomingAppointments = [
  {
    id: "1",
    date: "2025-09-18",
    time: "2:00 PM",
    counselor: "Dr. Priya Sharma",
    type: "video",
    status: "confirmed",
    bookingId: "MC-123456",
  },
  {
    id: "2",
    date: "2025-09-25",
    time: "10:00 AM",
    counselor: "Dr. Rajesh Kumar",
    type: "phone",
    status: "confirmed",
    bookingId: "MC-789012",
  },
]

const pastAppointments = [
    {
    id: "3",
    date: "2025-09-08",
    time: "3:00 PM",
    counselor: "Dr. Anita Menon",
    type: "video",
    status: "completed",
    bookingId: "MC-345678",
  },
  {
    id: "4",
    date: "2025-09-01",
    time: "11:00 AM",
    counselor: "Dr. Priya Sharma",
    type: "in-person",
    status: "completed",
    bookingId: "MC-901234",
  },
  {
    id: "5",
    date: "2025-08-20",
    time: "4:00 PM",
    counselor: "Dr. Rajesh Kumar",
    type: "video",
    status: "cancelled",
    bookingId: "MC-567890",
  },
]

// --- Helper Components ---
const SessionIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "video": return <Video className="h-4 w-4 text-muted-foreground" />;
    case "phone": return <Phone className="h-4 w-4 text-muted-foreground" />;
    case "in-person": return <MapPin className="h-4 w-4 text-muted-foreground" />;
    default: return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
  }
}

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "confirmed": return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">Confirmed</Badge>;
    case "completed": return <Badge variant="secondary">Completed</Badge>;
    case "cancelled": return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">Cancelled</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
}

const AppointmentCard = ({ appointment }: { appointment: typeof upcomingAppointments[0] }) => {
  const isPast = new Date(appointment.date) < new Date() && appointment.status !== 'confirmed';
  const borderColor = appointment.status === 'cancelled' ? 'border-red-500/50 dark:border-red-500/30' : isPast ? 'border-border' : 'border-primary';

  return (
    <Card className={`transition-all hover:shadow-md border-l-4 ${borderColor}`}>
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-2 space-y-3">
          <div className="font-bold text-lg text-foreground">{appointment.counselor}</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(appointment.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <SessionIcon type={appointment.type} />
              <span className="capitalize">{appointment.type} Session</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2">Booking ID: {appointment.bookingId}</div>
        </div>
        <div className="flex flex-col items-start md:items-end justify-between gap-2 h-full">
          <StatusBadge status={appointment.status} />
          <div className="flex gap-2">
            {appointment.status === 'confirmed' && !isPast && (
              <>
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </>
            )}
            {appointment.status === 'completed' && (
              <Button size="sm" variant="outline">Book Follow-up</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickAction = ({ href, icon: Icon, children }: { href: string, icon: React.ElementType, children: React.ReactNode }) => (
  <Link href={href} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 hover:bg-muted/70 transition-colors group">
    <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground text-center">{children}</span>
  </Link>
);


// --- Main Component ---
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black antialiased">
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 p-4">
        <div className="container mx-auto max-w-screen-xl bg-card/60 backdrop-blur-lg border rounded-full shadow-sm">
          <div className="px-4 py-2 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Heart className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              <h1 className="text-2xl font-bold text-foreground">MindCare</h1>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Welcome, User!</span>
              <Badge variant="secondary" className="rounded-full">Dashboard</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-br from-foreground to-muted-foreground/70 bg-clip-text text-transparent">
            Your Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">Manage your appointments and track your mental health journey.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                 <Button asChild className="rounded-full hover:scale-105 transition-transform w-full sm:w-auto">
                   <Link href="/book">Book New Session</Link>
                 </Button>
              </div>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="p-10 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2 text-xl">No Upcoming Appointments</h3>
                      <p className="text-muted-foreground mb-4">Ready to take the next step in your mental health journey?</p>
                      <Button asChild>
                        <Link href="/book">Book Your First Session</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                {pastAppointments.length > 0 ? (
                  pastAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="p-10 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2 text-xl">No Past Sessions</h3>
                      <p className="text-muted-foreground">Your session history will appear here once completed.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="bg-card/80">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                  <QuickAction href="/chat" icon={Bot}>AI Chat</QuickAction>
                  <QuickAction href="/book" icon={Calendar}>Book Session</QuickAction>
                  <QuickAction href="/resources" icon={FileText}>Resources</QuickAction>
                  <QuickAction href="/community" icon={Users}>Community</QuickAction>
              </CardContent>
            </Card>

            <Card className="bg-red-50/50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  <CardTitle className="text-red-900 dark:text-red-300">Emergency Support</CardTitle>
                </div>
                <CardDescription className="text-red-800/80 dark:text-red-300/80">Available 24/7 for crisis situations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <a href="tel:08026995000" className="block font-medium text-foreground hover:underline"><strong>NIMHANS:</strong> 080-26995000</a>
                <a href="tel:9999666555" className="block font-medium text-foreground hover:underline"><strong>Vandrevala:</strong> 9999666555</a>
                <a href="tel:9152987821" className="block font-medium text-foreground hover:underline"><strong>iCall:</strong> 9152987821</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}