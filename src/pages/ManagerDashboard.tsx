import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MapPin, Megaphone, Plus, Edit, Trash2 } from "lucide-react";

// MANAGER-ONLY PAGE - Should be protected by authentication
const ManagerDashboard = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "Abandoned Mill", city: "Mumbai", state: "Maharashtra" },
    { id: 2, name: "Colonial Hospital", city: "Bangalore", state: "Karnataka" },
  ]);

  const [banners, setBanners] = useState([
    { id: 1, message: "Next Exploration: Delhi Factory on Saturday!" },
  ]);

  const [newLocation, setNewLocation] = useState({
    name: "",
    city: "",
    state: "",
    description: "",
  });

  const [newBanner, setNewBanner] = useState("");

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.city) {
      toast.error("Please fill in required fields");
      return;
    }
    setLocations([...locations, { ...newLocation, id: Date.now() }]);
    setNewLocation({ name: "", city: "", state: "", description: "" });
    toast.success("Location added successfully!");
  };

  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter((loc) => loc.id !== id));
    toast.success("Location deleted");
  };

  const handleAddBanner = () => {
    if (!newBanner) {
      toast.error("Please enter a message");
      return;
    }
    setBanners([...banners, { id: Date.now(), message: newBanner }]);
    setNewBanner("");
    toast.success("Banner added successfully!");
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter((banner) => banner.id !== id));
    toast.success("Banner deleted");
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 animate-fade-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold text-primary text-glow-red mb-4">
                  Manager Dashboard
                </h1>
                <p className="text-xl text-muted-foreground">
                  Manage locations and site announcements
                </p>
              </div>
              <div className="px-4 py-2 bg-primary/20 border border-primary/40 rounded text-primary font-semibold">
                ADMIN ACCESS
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="locations" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="locations">
                <MapPin className="h-4 w-4 mr-2" />
                Locations
              </TabsTrigger>
              <TabsTrigger value="banners">
                <Megaphone className="h-4 w-4 mr-2" />
                Banners
              </TabsTrigger>
            </TabsList>

            {/* Location Manager */}
            <TabsContent value="locations">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Location Form */}
                <Card className="bg-card border-primary/20 p-8">
                  <h2 className="text-2xl font-bold text-secondary text-glow-cyan mb-6">
                    Add New Location
                  </h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Location Name *"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      className="bg-input border-primary/20 text-foreground"
                    />
                    <Input
                      placeholder="City *"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                      className="bg-input border-primary/20 text-foreground"
                    />
                    <Input
                      placeholder="State *"
                      value={newLocation.state}
                      onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                      className="bg-input border-primary/20 text-foreground"
                    />
                    <Textarea
                      placeholder="Description"
                      value={newLocation.description}
                      onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                      rows={4}
                      className="bg-input border-primary/20 text-foreground"
                    />
                    <Button
                      onClick={handleAddLocation}
                      className="w-full bg-primary hover:bg-primary/80 text-white glow-red"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                </Card>

                {/* Location List */}
                <Card className="bg-card border-primary/20 p-8">
                  <h2 className="text-2xl font-bold text-secondary text-glow-cyan mb-6">
                    Current Locations ({locations.length})
                  </h2>
                  <div className="space-y-3">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground">{location.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {location.city}, {location.state}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-secondary hover:text-secondary/80">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive/80"
                            onClick={() => handleDeleteLocation(location.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Banner Manager */}
            <TabsContent value="banners">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Banner Form */}
                <Card className="bg-card border-primary/20 p-8">
                  <h2 className="text-2xl font-bold text-secondary text-glow-cyan mb-6">
                    Add New Banner
                  </h2>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Banner Message *"
                      value={newBanner}
                      onChange={(e) => setNewBanner(e.target.value)}
                      rows={4}
                      className="bg-input border-primary/20 text-foreground"
                    />
                    <Button
                      onClick={handleAddBanner}
                      className="w-full bg-primary hover:bg-primary/80 text-white glow-red"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Banner
                    </Button>
                  </div>
                </Card>

                {/* Banner List */}
                <Card className="bg-card border-primary/20 p-8">
                  <h2 className="text-2xl font-bold text-secondary text-glow-cyan mb-6">
                    Current Banners ({banners.length})
                  </h2>
                  <div className="space-y-3">
                    {banners.map((banner) => (
                      <div
                        key={banner.id}
                        className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded"
                      >
                        <p className="text-sm text-foreground">{banner.message}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => handleDeleteBanner(banner.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManagerDashboard;
