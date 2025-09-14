import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Calendar, BookOpen, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">MindCare</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
              AI Support
            </Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
            <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <Link href="/book" className="text-muted-foreground hover:text-foreground transition-colors">
              Book Session
            </Link>
            <Link href="/emergency" className="text-red-600 hover:text-red-700 transition-colors font-medium">
              Emergency
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">Your Mental Health Journey Starts Here</h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            A safe, confidential, and culturally-aware platform designed specifically for students in higher education.
            Get support, connect with peers, and access resources - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/chat">Start AI Chat Support</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Comprehensive Mental Health Support</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Guided Support</CardTitle>
                <CardDescription>
                  24/7 intelligent chatbot providing coping strategies and crisis intervention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get immediate support with culturally-aware responses and evidence-based techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Confidential Booking</CardTitle>
                <CardDescription>Anonymous appointment scheduling with campus counselors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Book sessions without fear of judgment. Your privacy is our priority.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Resource Hub</CardTitle>
                <CardDescription>Curated content in multiple languages for self-help and education</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access videos, guides, and tools designed for Indian students.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Peer Support</CardTitle>
                <CardDescription>Connect with fellow students in moderated support groups</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share experiences and support each other in a safe environment.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Emergency Support</CardTitle>
                <CardDescription>Immediate access to crisis helplines and emergency resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Direct connection to NIMHANS and other emergency mental health services.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Wellness Tracking</CardTitle>
                <CardDescription>Monitor your mental health journey with personalized insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track mood, stress levels, and progress with privacy-first analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold mb-6">Ready to Take the First Step?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who have found support, community, and healing through MindCare. Your mental
            health matters, and you don't have to face challenges alone.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold">MindCare</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Supporting student mental health across India with culturally-aware, accessible care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/chat" className="hover:text-foreground">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="hover:text-foreground">
                    Book Session
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-foreground">
                    Emergency Help
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/resources" className="hover:text-foreground">
                    Self-Help
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/wellness" className="hover:text-foreground">
                    Wellness Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>NIMHANS: 080-26995000</li>
                <li>Vandrevala: 9999666555</li>
                <li>iCall: 9152987821</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MindCare. Built with care for student mental health.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
