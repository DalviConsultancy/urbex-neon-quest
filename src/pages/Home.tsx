import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Camera, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="space-y-8 animate-fade-slide-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary text-glow-red glitch" data-text="URBEX">
              URBEX
            </h1>
            <p className="text-xl md:text-3xl text-foreground font-heading">
              Uncover India's Forgotten Places
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dare to see what time forgot. Your next discovery awaits in the shadows of abandoned history.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-white pulse-glow text-lg px-8 py-6">
                  Join the Exploration
                </Button>
              </Link>
              <Link to="/gallery">
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 py-6">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-secondary text-glow-cyan">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: "Interactive Maps",
                description: "Explore abandoned locations across India with detailed maps and coordinates.",
              },
              {
                icon: Users,
                title: "Community",
                description: "Connect with fellow explorers and join real-life expeditions.",
              },
              {
                icon: Camera,
                title: "Gallery",
                description: "Share and discover stunning photography from forgotten places.",
              },
              {
                icon: Shield,
                title: "Safety First",
                description: "Comprehensive safety protocols and guidelines for responsible exploration.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-primary/20 p-6 rounded-lg hover-scale hover:border-secondary transition-all"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 glow-red" />
                <h3 className="text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary text-glow-red">
            Ready to Begin?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join India's premier urban exploration community. Sign in with Gmail and start your journey into the forgotten.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-primary hover:bg-primary/80 text-white pulse-glow text-lg px-8 py-6">
              Sign In Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
