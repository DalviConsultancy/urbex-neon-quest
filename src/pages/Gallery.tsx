import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery items
  const galleryItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Abandoned Location ${i + 1}`,
    location: ["Delhi Factory", "Mumbai Mill", "Kolkata Mansion", "Bangalore Hospital"][i % 4],
    photographer: ["Alex", "Kai", "Sam", "Jordan"][i % 4],
  }));

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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
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
                  <p className="text-sm text-secondary mb-1">{item.location}</p>
                  <p className="text-xs text-muted-foreground">By {item.photographer}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Modal for selected image */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="max-w-4xl w-full bg-card border border-primary/20 rounded-lg overflow-hidden animate-fade-slide-up">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl font-bold text-white/10">{selectedImage}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Abandoned Location {selectedImage}
                  </h2>
                  <p className="text-secondary mb-4">
                    {["Delhi Factory", "Mumbai Mill", "Kolkata Mansion", "Bangalore Hospital"][(selectedImage - 1) % 4]}
                  </p>
                  <p className="text-muted-foreground">
                    Click anywhere to close this preview.
                  </p>
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
