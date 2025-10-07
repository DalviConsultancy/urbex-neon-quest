import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { X, MapPin, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationItem {
  id: number;
  title: string;
  location: string;
  photographer: string;
  coordinates: { lat: number; lng: number };
  description: string;
  yearAbandoned: string;
  dangerLevel: string;
  visitDate: string;
}

const Gallery = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [apiKey] = useState<string>("AIzaSyCAaS7NtW5UOVshw8hMXI6Ut7kv_QEUAX8");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useState<HTMLAudioElement | null>(null)[0];

  // Detailed gallery items with real abandoned locations in India
  const galleryItems: LocationItem[] = [
    {
      id: 1,
      title: "Bhangarh Fort",
      location: "Rajasthan",
      photographer: "Alex",
      coordinates: { lat: 27.0974, lng: 76.2707 },
      description: "Known as one of India's most haunted places. This 17th-century fort was abandoned after a curse. Entry is prohibited after sunset.",
      yearAbandoned: "1783",
      dangerLevel: "Medium",
      visitDate: "March 2024"
    },
    {
      id: 2,
      title: "Dumas Beach",
      location: "Gujarat",
      photographer: "Kai",
      coordinates: { lat: 21.0897, lng: 72.6903 },
      description: "A mysterious black sand beach with paranormal stories. Once used as a Hindu burial ground.",
      yearAbandoned: "Ancient",
      dangerLevel: "Low",
      visitDate: "January 2024"
    },
    {
      id: 3,
      title: "Dow Hill Victoria Boys' School",
      location: "Kurseong, West Bengal",
      photographer: "Sam",
      coordinates: { lat: 26.8808, lng: 88.2813 },
      description: "Abandoned school with reports of footsteps and whispers in empty corridors. Dark history shrouds this colonial building.",
      yearAbandoned: "1990s",
      dangerLevel: "High",
      visitDate: "February 2024"
    },
    {
      id: 4,
      title: "GP Block, Meerut",
      location: "Uttar Pradesh",
      photographer: "Jordan",
      coordinates: { lat: 28.9845, lng: 77.7064 },
      description: "Infamous residential area with numerous paranormal reports. Four friends allegedly killed here in a car accident.",
      yearAbandoned: "1970s",
      dangerLevel: "Medium",
      visitDate: "April 2024"
    },
    {
      id: 5,
      title: "Shaniwarwada Fort",
      location: "Pune, Maharashtra",
      photographer: "Alex",
      coordinates: { lat: 18.5195, lng: 73.8553 },
      description: "18th-century fortification with tragic history. The death of Prince Narayanrao still echoes through these ruins.",
      yearAbandoned: "1828",
      dangerLevel: "Low",
      visitDate: "May 2024"
    },
    {
      id: 6,
      title: "Ramoji Film City",
      location: "Hyderabad, Telangana",
      photographer: "Kai",
      coordinates: { lat: 17.2543, lng: 78.6808 },
      description: "Built on war grounds of the Nizam Sultans. Abandoned sets reported to have supernatural activity.",
      yearAbandoned: "Various",
      dangerLevel: "Medium",
      visitDate: "March 2024"
    },
    {
      id: 7,
      title: "Kuldhara Village",
      location: "Rajasthan",
      photographer: "Sam",
      coordinates: { lat: 26.8092, lng: 70.1022 },
      description: "Entire village abandoned overnight in 1825. 85 villages vanished without trace, leaving curse behind.",
      yearAbandoned: "1825",
      dangerLevel: "Medium",
      visitDate: "December 2023"
    },
    {
      id: 8,
      title: "D'Souza Chawl",
      location: "Mumbai, Maharashtra",
      photographer: "Jordan",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      description: "An old residential building where a woman allegedly fell into a well and died. Her spirit is said to haunt the area.",
      yearAbandoned: "1980s",
      dangerLevel: "Medium",
      visitDate: "February 2024"
    },
    {
      id: 9,
      title: "Feroz Shah Kotla Fort",
      location: "Delhi",
      photographer: "Alex",
      coordinates: { lat: 28.6386, lng: 77.2432 },
      description: "Ancient fort complex believed to be inhabited by djinns. Locals leave offerings hoping for wishes to be granted.",
      yearAbandoned: "1400s",
      dangerLevel: "Low",
      visitDate: "November 2023"
    },
    {
      id: 10,
      title: "Agrasen ki Baoli",
      location: "Delhi",
      photographer: "Kai",
      coordinates: { lat: 28.6264, lng: 77.2199 },
      description: "Ancient stepwell with dark, eerie atmosphere. The black water is said to hypnotize visitors.",
      yearAbandoned: "14th Century",
      dangerLevel: "Medium",
      visitDate: "January 2024"
    },
    {
      id: 11,
      title: "Tunnel No. 33",
      location: "Shimla, Himachal Pradesh",
      photographer: "Sam",
      coordinates: { lat: 31.1048, lng: 77.1734 },
      description: "Longest tunnel on Kalka-Shimla route. Legend of Colonel Barog who haunts this tunnel after his suicide.",
      yearAbandoned: "Active but Haunted",
      dangerLevel: "High",
      visitDate: "April 2024"
    },
    {
      id: 12,
      title: "Three Kings Church",
      location: "Goa",
      photographer: "Jordan",
      coordinates: { lat: 15.5515, lng: 73.7547 },
      description: "Hilltop church with tragic history of three Portuguese kings. Locals avoid this place after dark.",
      yearAbandoned: "1700s",
      dangerLevel: "Medium",
      visitDate: "March 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-primary text-glow-red mb-6">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Witness the haunting beauty of India's forgotten places through our lens.
              Each image tells a story of time, decay, and hidden history.
            </p>
          </div>

          {/* Background Music Controls */}
          <div className="mb-8 flex justify-center">
            <Button
              onClick={() => {
                const audio = document.getElementById('bg-music') as HTMLAudioElement;
                if (audio) {
                  if (isPlaying) {
                    audio.pause();
                  } else {
                    audio.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
              variant="outline"
              className="gap-2"
            >
              {isPlaying ? '🔇 Pause Music' : '🎵 Play Background Music'}
            </Button>
          </div>

          <audio id="bg-music" loop>
            <source src="/ambient-horror.mp3" type="audio/mpeg" />
          </audio>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => setSelectedLocation(item)}
                className="group bg-card border-primary/20 overflow-hidden hover-scale cursor-pointer transition-all hover:border-secondary"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/10">{item.id}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold">View Details</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-secondary mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                  <p className="text-xs text-muted-foreground">By {item.photographer}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Modal for selected location */}
          {selectedLocation && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedLocation(null)}
            >
              <div 
                className="max-w-5xl w-full bg-card border border-primary/20 rounded-lg overflow-hidden animate-fade-slide-up my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
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
                  {/* Title and Location */}
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                      {selectedLocation.title}
                    </h2>
                    <p className="text-lg text-secondary flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {selectedLocation.location}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Year Abandoned</p>
                      <p className="text-sm font-semibold text-foreground">{selectedLocation.yearAbandoned}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Danger Level</p>
                      <p className="text-sm font-semibold text-foreground">{selectedLocation.dangerLevel}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Photographer
                      </p>
                      <p className="text-sm font-semibold text-foreground">{selectedLocation.photographer}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Visit Date
                      </p>
                      <p className="text-sm font-semibold text-foreground">{selectedLocation.visitDate}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">About This Location</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedLocation.description}
                    </p>
                  </div>

                  {/* Google Map */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Location on Map</h3>
                    {apiKey ? (
                      <div className="rounded-lg overflow-hidden border border-primary/20 h-[400px]">
                        <LoadScript googleMapsApiKey={apiKey}>
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
                        </LoadScript>
                      </div>
                    ) : (
                      <div className="rounded-lg overflow-hidden border border-primary/20 h-[400px] bg-background/50 flex items-center justify-center">
                        <p className="text-muted-foreground">Please enter Google Maps API key to view map</p>
                      </div>
                    )}
                  </div>

                  {/* Coordinates */}
                  <div className="bg-background/50 p-4 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground">
                      Coordinates: {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
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

export default Gallery;
