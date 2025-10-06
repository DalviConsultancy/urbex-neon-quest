import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const About = () => {
  const founders = [
    {
      name: "Alex",
      role: "Lead Explorer",
      bio: "Urban exploration enthusiast with 10+ years of experience discovering India's hidden gems.",
    },
    {
      name: "Kai",
      role: "Safety Officer",
      bio: "Former architect passionate about preserving the memory of abandoned structures.",
    },
    {
      name: "Sam",
      role: "Community Manager",
      bio: "Bringing together explorers from across the country to share their discoveries.",
    },
    {
      name: "Jordan",
      role: "Documentation Lead",
      bio: "Professional photographer capturing the haunting beauty of forgotten places.",
    },
  ];

  const testimonials = [
    {
      name: "Priya M.",
      text: "URBEX introduced me to a whole new world. The community is amazing and safety is always the priority!",
      rating: 5,
    },
    {
      name: "Rahul S.",
      text: "I've discovered incredible locations through this platform. The guided expeditions are well-organized and thrilling.",
      rating: 5,
    },
    {
      name: "Ananya K.",
      text: "As a photographer, URBEX has given me access to the most unique and atmospheric locations in India.",
      rating: 5,
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
              About URBEX
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a collective of urban explorers dedicated to uncovering, documenting, and preserving
              India's forgotten architectural history.
            </p>
          </div>

          {/* Our Story */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-secondary text-glow-cyan mb-8 text-center">
              Our Story
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-primary/20 p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  URBEX began in 2020 when four friends discovered an abandoned textile mill in Mumbai. 
                  What started as a casual exploration transformed into a passion for documenting India's 
                  rapidly disappearing industrial and architectural heritage.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Today, we've grown into India's largest urban exploration community, with hundreds of 
                  documented locations and thousands of members across the country. Our mission is to 
                  explore responsibly, document thoroughly, and inspire others to appreciate the beauty 
                  in decay.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe in exploring with respect—for the structures, for history, and for safety. 
                  Every location tells a story, and we're here to listen.
                </p>
              </Card>
            </div>
          </section>

          {/* Founders */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-secondary text-glow-cyan mb-12 text-center">
              Meet the Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {founders.map((founder, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-primary/20 p-6 hover-scale transition-all hover:border-secondary"
                >
                  <div className="h-48 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary/30">{founder.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-1">{founder.name}</h3>
                  <p className="text-sm text-secondary mb-3">{founder.role}</p>
                  <p className="text-sm text-muted-foreground">{founder.bio}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-4xl font-bold text-secondary text-glow-cyan mb-12 text-center">
              What Our Members Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-primary/20 p-6 hover-scale transition-all"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-secondary font-semibold">— {testimonial.name}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
