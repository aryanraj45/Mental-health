import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  MapPin,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const upcomingAppointments = [
  {
    id: "1",
    date: "2024-01-15",
    time: "2:00 PM",
    counselor: "Dr. Priya Sharma",
    type: "video",
    status: "confirmed",
    bookingId: "MC-123456",
  },
  {
    id: "2",
    date: "2024-01-22",
    time: "10:00 AM",
    counselor: "Dr. Rajesh Kumar",
    type: "phone",
    status: "confirmed",
    bookingId: "MC-789012",
  },
];

const pastAppointments = [
  {
    id: "3",
    date: "2024-01-08",
    time: "3:00 PM",
    counselor: "Dr. Anita Menon",
    type: "video",
    status: "completed",
    bookingId: "MC-345678",
  },
];

export default function DashboardPage() {
  const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "in-person":
        return <MapPin className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
          <Badge variant="secondary">Dashboard</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your appointments and track your mental health journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="appointments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appointments">My Appointments</TabsTrigger>
                <TabsTrigger value="history">Session History</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
                  <Button asChild>
                    <Link href="/book">Book New Session</Link>
                  </Button>
                </div>

                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-IN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.counselor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getSessionIcon(appointment.type)}
                                <span className="capitalize">
                                  {appointment.type.replace("-", " ")} Session
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Booking ID: {appointment.bookingId}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(appointment.status)}
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                                <Button size="sm" variant="outline">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">
                        No Upcoming Appointments
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Ready to take the next step in your mental health
                        journey?
                      </p>
                      <Button asChild>
                        <Link href="/book">Book Your First Session</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h3 className="text-xl font-semibold">Past Sessions</h3>
                {pastAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-IN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.counselor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getSessionIcon(appointment.type)}
                                <span className="capitalize">
                                  {appointment.type.replace("-", " ")} Session
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(appointment.status)}
                              <Button size="sm" variant="outline">
                                Book Follow-up
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">No Past Sessions</h3>
                      <p className="text-muted-foreground">
                        Your session history will appear here
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/chat">Start AI Chat</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <Link href="/book">Book Session</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <Link href="/resources">Browse Resources</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <Link href="/community">Join Community</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Support</CardTitle>
                <CardDescription>
                  Available 24/7 for crisis situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <strong>NIMHANS:</strong> 080-26995000
                </div>
                <div>
                  <strong>Vandrevala Foundation:</strong> 9999666555
                </div>
                <div>
                  <strong>iCall:</strong> 9152987821
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
