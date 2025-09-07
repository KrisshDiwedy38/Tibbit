"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Shield, Users, MapPin, CheckCircle, X } from "lucide-react"

export default function TibbitLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ email: "", university: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const openWaitlistModal = () => {
    setIsModalOpen(true)
    setSubmitMessage("")
  }

  const closeWaitlistModal = () => {
    setIsModalOpen(false)
    setFormData({ email: "", university: "" })
    setSubmitMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage("Successfully joined the waitlist!")
        setFormData({ email: "", university: "" })
        setTimeout(() => {
          closeWaitlistModal()
        }, 2000)
      } else {
        setSubmitMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-2xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={closeWaitlistModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <img src="\logo-wb-fill.jpg" alt="Logo" className="w-20 h-20" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Join the Waitlist</h2>
              <p className="text-muted-foreground mb-6">
                Be among the first to experience the future of campus marketplace
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your .edu email"
                  className="bg-input border-border"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type="text"
                  placeholder="University name"
                  className="bg-input border-border"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>

              {submitMessage && (
                <p
                  className={`text-sm mt-3 ${submitMessage.includes("Successfully") ? "text-green-600" : "text-red-600"}`}
                >
                  {submitMessage}
                </p>
              )}

              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  <span>Early access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center">
              <img src="\logo-wb-fill.jpg" alt="Logo" className="w-20 h-20" />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <Button onClick={openWaitlistModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Join Waitlist
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Tibbit <br></br>
            Your Campus Marketplace, <span className="text-primary">Reimagined</span>
          </h1>
          <Badge variant="secondary" className="text-xl mb-6 bg-card text-card-foreground">
            🎓 Student-Exclusive Marketplace
          </Badge>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Buy, sell, and exchange with fellow students in a secure, verified environment. From textbooks to furniture,
            find everything you need within your university community.
          </p>

          <div className="mb-12">
            <Button
              onClick={openWaitlistModal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              Join Waitlist
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Free to join • Student ID verification required</p>
          </div>

          {/* Hero Image*/}
          <div className="relative max-w-4xl mx-auto">
            <img
              src="\Gemini_Generated_Image_2irav92irav92ira.png"
              alt="University Environment"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Students Choose Tibbit</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for university communities with security and trust at the core
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">Verified Students Only</CardTitle>
                <CardDescription>
                  Student ID verification ensures you're only dealing with verified university peers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6  text-black" />
                </div>
                <CardTitle className="text-card-foreground">Hyperlocal Network</CardTitle>
                <CardDescription>Connect with students on your campus for easy pickup and delivery</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">Trusted Community</CardTitle>
                <CardDescription>
                  Built-in rating system and community guidelines keep transactions safe
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple. Secure. Student-Focused.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Sign Up with Student Email</h3>
                  <p className="text-muted-foreground">
                    Verify your identity with your .edu email and student ID for secure access
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Browse & List Items</h3>
                  <p className="text-muted-foreground">
                    Find textbooks, furniture, electronics, and more from your campus community
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Connect & Trade</h3>
                  <p className="text-muted-foreground">
                    Message sellers, arrange meetups, and complete transactions safely on campus
                  </p>
                </div>
              </div>

              <Button onClick={openWaitlistModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Join the Waitlist
              </Button>
            </div>

            <div className="relative">
              <img
                src="mobilechat.png"
                alt="Tibbit app interface"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Campus Shopping?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already on the waitlist for early access to Tibbit
          </p>

          <div className="mb-8">
            <Button
              onClick={openWaitlistModal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              Join Waitlist
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Early access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Student verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-25 h-25 bg-primary rounded-lg flex items-center justify-center">
                <img src="/logo-wb-fill.jpg" alt="Logo" className="w-25 h-25" />
              </div>
            </div>
            <p className="text-muted-foreground">Tibbit. Your university marketplace</p>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Tibbit. All rights reserved. Built for students, by students.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
