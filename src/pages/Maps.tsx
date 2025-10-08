import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, CheckCircle, X } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  difficulty: string;
  safetyRating: number;
  description: string;
  history: string;
  coordinates: { lat: number; lng: number };
  yearAbandoned: string;
  isVisited?: boolean;
}

const Maps = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [apiKey] = useState<string>("AIzaSyCAaS7NtW5UOVshw8hMXI6Ut7kv_QEUAX8");

  // Comprehensive location data with coordinates
  const locations: Location[] = [
    {
      id: "1",
      name: "Bhangarh Fort",
      city: "Alwar",
      state: "Rajasthan",
      difficulty: "Medium",
      safetyRating: 3,
      description: "Known as India's most haunted place. This 17th-century fort was abandoned after a curse. Entry is prohibited after sunset.",
      history: "Built in 1573 by Raja Bhagwant Das. Abandoned in 1783 after a curse. Now protected by Archaeological Survey of India.",
      coordinates: { lat: 27.0974, lng: 76.2707 },
      yearAbandoned: "1783"
    },
    {
      id: "2",
      name: "Kuldhara Village",
      city: "Jaisalmer",
      state: "Rajasthan",
      difficulty: "Easy",
      safetyRating: 5,
      description: "Entire village abandoned overnight in 1825. 85 villages vanished without trace, leaving curse behind.",
      history: "Established in 13th century by Paliwal Brahmins. All 1,500 residents disappeared mysteriously in 1825.",
      coordinates: { lat: 26.8092, lng: 70.1022 },
      yearAbandoned: "1825"
    },
    {
      id: "3",
      name: "Dumas Beach",
      city: "Surat",
      state: "Gujarat",
      difficulty: "Easy",
      safetyRating: 4,
      description: "A mysterious black sand beach with paranormal stories. Once used as a Hindu burial ground.",
      history: "Ancient cremation site. The black sand is believed to contain ashes from funeral pyres.",
      coordinates: { lat: 21.0897, lng: 72.6903 },
      yearAbandoned: "Ancient"
    },
    {
      id: "4",
      name: "Dow Hill Victoria Boys' School",
      city: "Kurseong",
      state: "West Bengal",
      difficulty: "Hard",
      safetyRating: 2,
      description: "Abandoned school with reports of footsteps and whispers in empty corridors.",
      history: "British colonial school built in 1879. Closed in 1990s due to numerous paranormal reports.",
      coordinates: { lat: 26.8808, lng: 88.2813 },
      yearAbandoned: "1990s"
    },
    {
      id: "5",
      name: "Shaniwarwada Fort",
      city: "Pune",
      state: "Maharashtra",
      difficulty: "Easy",
      safetyRating: 5,
      description: "18th-century fortification with tragic history. The death of Prince Narayanrao still echoes.",
      history: "Built in 1732. Prince Narayanrao was murdered here in 1773. Destroyed by fire in 1828.",
      coordinates: { lat: 18.5195, lng: 73.8553 },
      yearAbandoned: "1828"
    },
    {
      id: "6",
      name: "GP Block Meerut",
      city: "Meerut",
      state: "Uttar Pradesh",
      difficulty: "Medium",
      safetyRating: 3,
      description: "Infamous residential area with numerous paranormal reports.",
      history: "Site of tragic accident in 1970s where four friends died. Area has been avoided since.",
      coordinates: { lat: 28.9845, lng: 77.7064 },
      yearAbandoned: "1970s"
    },
    {
      id: "7",
      name: "Feroz Shah Kotla Fort",
      city: "Delhi",
      state: "Delhi",
      difficulty: "Easy",
      safetyRating: 4,
      description: "Ancient fort complex believed to be inhabited by djinns.",
      history: "Built by Sultan Feroz Shah Tughlaq in 1354. Locals leave offerings for djinns.",
      coordinates: { lat: 28.6386, lng: 77.2432 },
      yearAbandoned: "1400s"
    },
    {
      id: "8",
      name: "Agrasen ki Baoli",
      city: "Delhi",
      state: "Delhi",
      difficulty: "Medium",
      safetyRating: 4,
      description: "Ancient stepwell with dark atmosphere. The black water is said to hypnotize visitors.",
      history: "Built during the Mahabharata era by King Agrasen. Restored in 14th century.",
      coordinates: { lat: 28.6264, lng: 77.2199 },
      yearAbandoned: "14th Century"
    },
    {
      id: "9",
      name: "Three Kings Church",
      city: "Cansaulim",
      state: "Goa",
      difficulty: "Medium",
      safetyRating: 3,
      description: "Hilltop church with tragic history. Locals avoid this place after dark.",
      history: "Built in 1599. Three Portuguese kings allegedly fought to death here over territory.",
      coordinates: { lat: 15.5515, lng: 73.7547 },
      yearAbandoned: "1700s"
    },
    {
      id: "10",
      name: "Jatinga Valley",
      city: "Jatinga",
      state: "Assam",
      difficulty: "Hard",
      safetyRating: 2,
      description: "Valley where birds mysteriously commit mass suicide during specific months.",
      history: "Phenomenon documented since 1905. Birds dive to their deaths between September-November.",
      coordinates: { lat: 25.3217, lng: 93.0234 },
      yearAbandoned: "Natural Site"
    },
    {
      id: "11",
      name: "Ramoji Film City",
      city: "Hyderabad",
      state: "Telangana",
      difficulty: "Medium",
      safetyRating: 3,
      description: "Built on war grounds of the Nizam Sultans. Abandoned sets with supernatural activity.",
      history: "Established in 1996 on Nizam war grounds. Numerous paranormal incidents reported.",
      coordinates: { lat: 17.2543, lng: 78.6808 },
      yearAbandoned: "Various"
    },
    {
      id: "12",
      name: "D'Souza Chawl",
      city: "Mumbai",
      state: "Maharashtra",
      difficulty: "Easy",
      safetyRating: 4,
      description: "Old residential building where a woman allegedly fell into a well.",
      history: "Built in colonial era. Woman fell into well and died in 1980s. Her spirit haunts area.",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      yearAbandoned: "1980s"
    }
  ];

  // Fetch visited locations
  useEffect(() => {
    if (user) {
      fetchVisitedLocations();
    }
  }, [user]);

  const fetchVisitedLocations = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("visited_locations")
      .select("location_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setVisitedLocations(data.map(v => v.location_id));
    }
  };

  const markAsVisited = async (location: Location) => {
    if (!user) {
      toast.error("Please log in to mark locations as visited");
      return;
    }

    const { error } = await supabase
      .from("visited_locations")
      .insert({
        user_id: user.id,
        location_id: location.id,
        location_name: location.name,
        location_city: location.city,
        location_state: location.state
      });

    if (error) {
      if (error.code === "23505") {
        toast.info("You've already visited this location!");
      } else {
        toast.error("Failed to mark location as visited");
      }
    } else {
      toast.success(`${location.name} marked as visited!`);
      fetchVisitedLocations();
    }
  };

  const filteredLocations = locations.map(loc => ({
    ...loc,
    isVisited: visitedLocations.includes(loc.id)
  })).filter((loc) =>
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

          {/* Interactive Map */}
          <Card className="bg-card border-primary/20 overflow-hidden mb-12">
            <div className="h-[500px]">
              {apiKey ? (
                <LoadScript 
                  googleMapsApiKey={apiKey}
                  onLoad={() => setIsMapLoaded(true)}
                >
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: 22.9074872, lng: 79.0855928 }}
                    zoom={5}
                    options={{
                      styles: [
                        { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                      ]
                    }}
                  >
                    {isMapLoaded && filteredLocations.map((location) => (
                      <Marker
                        key={location.id}
                        position={location.coordinates}
                        onClick={() => setSelectedLocation(location)}
                        icon={{
                          path: window.google.maps.SymbolPath.CIRCLE,
                          scale: 8,
                          fillColor: location.isVisited ? "#10b981" : "#ef4444",
                          fillOpacity: 1,
                          strokeColor: "#ffffff",
                          strokeWeight: 2
                        }}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              )}
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
                  onClick={() => setSelectedLocation(location)}
                  className="bg-card border-primary/20 p-6 hover-scale cursor-pointer transition-all hover:border-secondary relative"
                >
                  {location.isVisited && (
                    <div className="absolute top-4 right-4 bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Visited
                    </div>
                  )}
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
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedLocation(null)}
            >
              <div
                className="max-w-4xl w-full bg-card border border-primary/20 rounded-lg overflow-hidden animate-fade-slide-up my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl font-bold text-white/10">{selectedLocation.id}</span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2">{selectedLocation.name}</h2>
                      <p className="text-lg text-secondary flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {selectedLocation.city}, {selectedLocation.state}
                      </p>
                    </div>
                    {selectedLocation.isVisited && (
                      <div className="bg-secondary/20 text-secondary px-3 py-2 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Visited
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Year Abandoned</p>
                      <p className="text-sm font-semibold">{selectedLocation.yearAbandoned}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                      <p className={`text-sm font-semibold ${
                        selectedLocation.difficulty === 'Easy' ? 'text-secondary' :
                        selectedLocation.difficulty === 'Medium' ? 'text-primary' :
                        'text-destructive'
                      }`}>{selectedLocation.difficulty}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Safety Rating</p>
                      <p className="text-sm font-semibold">{selectedLocation.safetyRating}/5</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
                      <p className="text-xs font-semibold">{selectedLocation.coordinates.lat.toFixed(2)}, {selectedLocation.coordinates.lng.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedLocation.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">History</h3>
                    <p className="text-muted-foreground">{selectedLocation.history}</p>
                  </div>

                  {/* Mini Map */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Location on Map</h3>
                    <div className="rounded-lg overflow-hidden border border-primary/20 h-[300px]">
                      {isMapLoaded && (
                        <GoogleMap
                          mapContainerStyle={{ width: '100%', height: '100%' }}
                          center={selectedLocation.coordinates}
                          zoom={13}
                          options={{
                            styles: [
                              { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                              { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                            ]
                          }}
                        >
                          <Marker position={selectedLocation.coordinates} />
                        </GoogleMap>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/80 text-white"
                    onClick={() => markAsVisited(selectedLocation)}
                    disabled={selectedLocation.isVisited}
                  >
                    {selectedLocation.isVisited ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Already Visited
                      </>
                    ) : (
                      "Mark as Visited"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Maps;
