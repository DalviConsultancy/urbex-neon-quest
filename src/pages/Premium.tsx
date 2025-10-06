import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Star, MapPin, Crown } from "lucide-react";

const Premium = () => {
  const premiumLocations = [
    {
      id: 1,
      name: "Abandoned Royal Palace",
      city: "Udaipur",
      state: "Rajasthan",
      difficulty: "Hard",
      locked: true,
      description: "An 18th-century palace with hidden chambers and secret passages.",
    },
    {
      id: 2,
      name: "Underground Bunker Complex",
      city: "Delhi",
      state: "Delhi",
      difficulty: "Expert",
      locked: true,
      description: "Cold War-era military bunker with extensive tunnel network.",
    },
    {
      id: 3,
      name: "Gothic Cathedral Ruins",
      city: "Goa",
      state: "Goa",
      difficulty: "Medium",
      locked: true,
      description: "Stunning Portuguese-era cathedral with intricate stone carvings.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-slide-up">
            <Crown className="h-16 w-16 text-primary glow-red mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-primary text-glow-red mb-6">
              Premium Locations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access exclusive, high-difficulty locations with premium membership.
              These sites are historically significant and rarely explored.
            </p>
          </div>

          {/* Premium Benefits */}
          <Card className="bg-card border-primary/20 p-8 mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary text-glow-cyan mb-6 text-center">
              Premium Membership Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Access to exclusive premium locations",
                "Priority booking for expeditions",
                "Advanced safety equipment guides",
                "One-on-one mentorship with founders",
                "Premium member-only events",
                "Detailed historical documentation",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-primary glow-red flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-primary hover:bg-primary/80 text-white pulse-glow text-lg px-8 py-6">
                Upgrade to Premium
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                ₹999/month or ₹9,999/year
              </p>
            </div>
          </Card>

          {/* Premium Locations */}
          <div>
            <h2 className="text-3xl font-bold text-secondary text-glow-cyan mb-8 text-center">
              Exclusive Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumLocations.map((location) => (
                <Card
                  key={location.id}
                  className="bg-card border-primary/20 p-6 opacity-60 hover-scale transition-all relative"
                >
                  {/* Lock Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                    <Lock className="h-12 w-12 text-primary glow-red" />
                  </div>

                  {/* Content (visible but grayed out) */}
                  <div className="relative">
                    <MapPin className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{location.name}</h3>
                    <p className="text-sm text-secondary mb-3">
                      {location.city}, {location.state}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{location.description}</p>
                    <span className="px-3 py-1 rounded bg-destructive/20 text-destructive text-sm">
                      {location.difficulty}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-primary/10 border-primary/40 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary text-glow-red mb-4">
                Ready to Unlock Premium Access?
              </h3>
              <p className="text-muted-foreground mb-6">
                Gain access to India's most exclusive abandoned locations and take your
                urban exploration to the next level.
              </p>
              <Button className="bg-primary hover:bg-primary/80 text-white pulse-glow text-lg px-8 py-6">
                Subscribe Now
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Premium;
