import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

const Maps = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  // Mock location data
  const locations = [
    {
      id: 1,
      name: "Abandoned Textile Mill",
      city: "Mumbai",
      state: "Maharashtra",
      difficulty: "Easy",
      safetyRating: 4,
      description: "A historic textile mill from the colonial era, featuring vast halls with rusted machinery.",
      history: "Built in 1898, operated until 1995. Once employed over 2,000 workers.",
    },
    {
      id: 2,
      name: "Colonial Era Hospital",
      city: "Bangalore",
      state: "Karnataka",
      difficulty: "Medium",
      safetyRating: 3,
      description: "Victorian-style hospital with crumbling architecture and eerie corridors.",
      history: "Established in 1902, abandoned in 2005 due to structural concerns.",
    },
    {
      id: 3,
      name: "Royal Haveli",
      city: "Jaipur",
      state: "Rajasthan",
      difficulty: "Easy",
      safetyRating: 5,
      description: "A once-grand mansion with intricate carvings and faded frescoes.",
      history: "Built in 1850 by a wealthy merchant family. Abandoned in 1980.",
    },
    {
      id: 4,
      name: "Soviet-Era Factory",
      city: "Kolkata",
      state: "West Bengal",
      difficulty: "Hard",
      safetyRating: 2,
      description: "Industrial complex with dangerous floors and exposed machinery.",
      history: "Constructed in 1960s with Soviet collaboration. Closed in 2001.",
    },
  ];

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-primary text-glow-red mb-6">
              Explore Locations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover abandoned places across India. Filter by city, difficulty, or search by name.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search locations or cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-primary/20 text-foreground"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-white glow-red">
                Search
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <Card className="bg-card border-primary/20 p-8 mb-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-primary glow-red mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                Interactive map will be loaded here
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                (Requires Google Maps API integration)
              </p>
            </div>
          </Card>

          {/* Locations List */}
          <div>
            <h2 className="text-3xl font-bold text-secondary text-glow-cyan mb-8">
              Available Locations ({filteredLocations.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className="bg-card border-primary/20 p-6 hover-scale cursor-pointer transition-all hover:border-secondary"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-1">{location.name}</h3>
                      <p className="text-sm text-secondary">{location.city}, {location.state}</p>
                    </div>
                    <MapPin className="h-6 w-6 text-primary glow-red" />
                  </div>
                  <p className="text-muted-foreground mb-4">{location.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-3 py-1 rounded ${
                      location.difficulty === 'Easy' ? 'bg-secondary/20 text-secondary' :
                      location.difficulty === 'Medium' ? 'bg-primary/20 text-primary' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {location.difficulty}
                    </span>
                    <span className="text-muted-foreground">
                      Safety: {location.safetyRating}/5
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Location Detail Modal */}
          {selectedLocation && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLocation(null)}
            >
              {(() => {
                const loc = locations.find(l => l.id === selectedLocation);
                return loc ? (
                  <Card className="max-w-2xl w-full bg-card border-primary/20 p-8 animate-fade-slide-up">
                    <h2 className="text-3xl font-bold text-primary text-glow-red mb-4">
                      {loc.name}
                    </h2>
                    <p className="text-secondary mb-6">{loc.city}, {loc.state}</p>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                        <p className="text-muted-foreground">{loc.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">History</h3>
                        <p className="text-muted-foreground">{loc.history}</p>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Difficulty: </span>
                          <span className={`font-semibold ${
                            loc.difficulty === 'Easy' ? 'text-secondary' :
                            loc.difficulty === 'Medium' ? 'text-primary' :
                            'text-destructive'
                          }`}>{loc.difficulty}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Safety Rating: </span>
                          <span className="font-semibold text-foreground">{loc.safetyRating}/5</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/80 text-white glow-red">
                      Get Directions
                    </Button>
                  </Card>
                ) : null;
              })()}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Maps;
