import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, Camera, Users, MapPin, Heart } from "lucide-react";

const Rules = () => {
  const rules = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Always prioritize personal safety. Wear appropriate gear, bring a first aid kit, and never explore alone.",
      items: [
        "Wear sturdy boots and protective clothing",
        "Carry flashlights with extra batteries",
        "Bring a first aid kit and emergency contacts",
        "Never explore alone—always have a buddy",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Legal Awareness",
      description: "Respect private property and local laws. Urban exploration is not trespassing.",
      items: [
        "Obtain permission when possible",
        "Research property ownership beforehand",
        "Leave immediately if asked by authorities",
        "Never break locks or force entry",
      ],
    },
    {
      icon: Camera,
      title: "Take Only Photos",
      description: "Leave locations exactly as you found them. We document, we don't vandalize.",
      items: [
        "No graffiti or vandalism",
        "Don't remove or take artifacts",
        "Don't disturb wildlife or nests",
        "Pack out all trash—leave no trace",
      ],
    },
    {
      icon: Users,
      title: "Respect the Community",
      description: "Keep location details private to prevent overcrowding and vandalism.",
      items: [
        "Don't share exact addresses publicly",
        "Respect other explorers' experiences",
        "Report dangerous conditions to the group",
        "Share knowledge, not coordinates",
      ],
    },
    {
      icon: MapPin,
      title: "Know Your Limits",
      description: "Not every location is safe or suitable for all skill levels.",
      items: [
        "Start with beginner-friendly locations",
        "Be aware of structural dangers",
        "Watch for asbestos, mold, and hazards",
        "Turn back if conditions are unsafe",
      ],
    },
    {
      icon: Heart,
      title: "Preserve History",
      description: "We explore to document and appreciate, not to destroy.",
      items: [
        "Document with photos and notes",
        "Share the history of locations",
        "Advocate for preservation when possible",
        "Respect the memories within these walls",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-primary text-glow-red mb-6">
              Rules & Safety
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Urban exploration is about discovery, not destruction. These guidelines ensure
              we explore responsibly, safely, and with respect for history.
            </p>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {rules.map((rule, index) => (
              <Card
                key={index}
                className="bg-card border-primary/20 p-8 hover-scale transition-all hover:border-secondary"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <rule.icon className="h-10 w-10 text-primary glow-red flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">{rule.title}</h3>
                    <p className="text-muted-foreground mb-4">{rule.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-14">
                  {rule.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Emergency Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-primary/10 border-primary/40 p-8">
              <h2 className="text-3xl font-bold text-primary text-glow-red mb-4">
                Emergency Protocols
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• <strong>Before Exploring:</strong> Share your location and expected return time with someone you trust.</p>
                <p>• <strong>During Exploration:</strong> Stay in communication with your group. Have a designated meeting point.</p>
                <p>• <strong>If Injured:</strong> Call emergency services immediately (112). Don't attempt to move if seriously hurt.</p>
                <p>• <strong>If Lost:</strong> Stay calm, stay put, and use your phone for GPS. Contact your group.</p>
                <p>• <strong>Report Incidents:</strong> All accidents or close calls should be reported to the URBEX team to prevent future issues.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;
