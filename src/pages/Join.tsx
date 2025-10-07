import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Join = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Welcome to URBEX!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Access to exclusive location coordinates",
    "Join organized group expeditions",
    "Connect with experienced explorers",
    "Learn professional documentation techniques",
    "Priority access to premium locations",
    "Safety training and equipment guidance",
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-primary text-glow-red mb-6">
              Join URBEX
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to explore India's forgotten places? Join our community and embark on
              real-life expeditions with experienced urban explorers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold text-secondary text-glow-cyan mb-8">
                Member Benefits
              </h2>
              <Card className="bg-card border-primary/20 p-8 mb-8">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-primary/10 border-primary/40 p-6">
                <h3 className="text-xl font-bold text-primary mb-3">What to Expect</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our expeditions are carefully planned and safety-focused. You'll explore
                  with experienced guides, learn documentation techniques, and discover
                  locations that few have seen.
                </p>
                <p className="text-sm text-muted-foreground">
                  All skill levels are welcome—from curious beginners to seasoned explorers.
                </p>
              </Card>
            </div>

            {/* Signup Form */}
            <div>
              <h2 className="text-3xl font-bold text-secondary text-glow-cyan mb-8">
                Create Your Account
              </h2>
              <Card className="bg-card border-primary/20 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-input border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-input border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                      Password *
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                      className="bg-input border-primary/20 text-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                      Urban Exploration Experience
                    </label>
                    <Input
                      id="experience"
                      placeholder="e.g., Beginner, 2 years, etc."
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="bg-input border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Why do you want to join URBEX? *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-input border-primary/20 text-foreground"
                      placeholder="Tell us about your interest in urban exploration..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-white pulse-glow"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account & Join"}
                  </Button>
                </form>
              </Card>

              <p className="text-sm text-muted-foreground text-center mt-6">
                Already have an account?{" "}
                <a href="/auth" className="text-secondary hover:underline">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
