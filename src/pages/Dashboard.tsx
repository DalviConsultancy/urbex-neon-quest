import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, MessageSquare, FileText, TrendingUp, Star, Tag, Plus, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [visitedLocations, setVisitedLocations] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    locationName: "",
    city: "",
    state: "",
    description: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!authUser) return;
      
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        setProfile(profileData);
      }

      const { data: locationsData, error: locationsError } = await supabase
        .from("visited_locations")
        .select("*")
        .eq("user_id", authUser.id)
        .order("visited_at", { ascending: false });

      if (locationsError) {
        console.error("Error fetching visited locations:", locationsError);
      } else {
        setVisitedLocations(locationsData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [authUser]);

  const toggleFavorite = (locationId: string) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locationId)) {
        newSet.delete(locationId);
        toast({ title: "Removed from favorites" });
      } else {
        newSet.add(locationId);
        toast({ title: "Added to favorites" });
      }
      return newSet;
    });
  };

  const addTag = (locationId: string, tag: string) => {
    if (!tag.trim()) return;
    setLocationTags(prev => ({
      ...prev,
      [locationId]: [...(prev[locationId] || []), tag.trim()],
    }));
  };

  const removeTag = (locationId: string, tagToRemove: string) => {
    setLocationTags(prev => ({
      ...prev,
      [locationId]: (prev[locationId] || []).filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmitLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Location Submitted!",
      description: "Thank you for your suggestion. We'll review it soon.",
    });
    setSubmitForm({ locationName: "", city: "", state: "", description: "" });
    setShowSubmitForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-primary text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const displayName = profile?.full_name || authUser?.email?.split("@")[0] || "Explorer";

  const quickLinks = [
    {
      title: "Explore Maps",
      description: "Discover new abandoned locations",
      icon: MapPin,
      link: "/maps",
      color: "primary",
    },
    {
      title: "Feedback",
      description: "Share your thoughts and experiences",
      icon: FileText,
      link: "/feedback",
      color: "secondary",
    },
    {
      title: "AI Guide",
      description: "Chat with our urban exploration assistant",
      icon: MessageSquare,
      link: "/chatbot",
      color: "secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12 animate-fade-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow-red mb-4">
              Welcome back, {displayName}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready for your next exploration?
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-primary/20 p-6 hover-scale transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-secondary">Level</h3>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">{profile?.level || "Novice Explorer"}</p>
            </Card>

            <Card className="bg-card border-primary/20 p-6 hover-scale transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-secondary">Locations Visited</h3>
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">{profile?.locations_visited || 0}</p>
            </Card>

            <Card className="bg-card border-primary/20 p-6 hover-scale transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-secondary">Member Since</h3>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">
                {profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear()}
              </p>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary text-glow-cyan mb-8">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.link}>
                  <Card className="bg-card border-primary/20 p-8 hover-scale transition-all hover:border-secondary h-full">
                    <link.icon className={`h-12 w-12 mb-4 ${link.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{link.title}</h3>
                    <p className="text-muted-foreground">{link.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Exploration History */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-secondary text-glow-cyan">
                Your Exploration History
              </h2>
              <Button 
                onClick={() => setShowSubmitForm(!showSubmitForm)}
                className="bg-primary hover:bg-primary/80"
              >
                <Plus className="h-4 w-4 mr-2" />
                Suggest Location
              </Button>
            </div>

            {showSubmitForm && (
              <Card className="bg-card border-primary/20 p-6 mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Submit New Location</h3>
                <form onSubmit={handleSubmitLocation} className="space-y-4">
                  <Input
                    placeholder="Location Name"
                    value={submitForm.locationName}
                    onChange={(e) => setSubmitForm({ ...submitForm, locationName: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={submitForm.city}
                      onChange={(e) => setSubmitForm({ ...submitForm, city: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="State"
                      value={submitForm.state}
                      onChange={(e) => setSubmitForm({ ...submitForm, state: e.target.value })}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Description (optional)"
                    value={submitForm.description}
                    onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-primary hover:bg-primary/80">
                      Submit
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowSubmitForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {visitedLocations.length > 0 ? (
              <div className="grid gap-4">
                {visitedLocations.map((location) => (
                  <Card key={location.id} className="bg-card border-primary/20 p-6 hover-scale transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-primary">{location.location_name}</h3>
                          <button
                            onClick={() => toggleFavorite(location.id)}
                            className="text-secondary hover:text-primary transition-colors"
                          >
                            <Star 
                              className={`h-5 w-5 ${favoriteIds.has(location.id) ? 'fill-primary text-primary' : ''}`} 
                            />
                          </button>
                        </div>
                        <p className="text-muted-foreground">
                          {location.location_city}, {location.location_state}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Visited: {new Date(location.visited_at).toLocaleDateString()}
                        </p>
                        {location.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            "{location.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Tags Section */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-secondary">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(locationTags[location.id] || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(location.id, tag)}
                              className="hover:text-primary/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                        <Input
                          placeholder="Add tag..."
                          className="w-32 h-8 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addTag(location.id, e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-card border-primary/20 p-12 text-center">
                <MapPin className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  You haven't visited any locations yet. Start exploring!
                </p>
              </Card>
            )}
          </div>

          {/* Banner / Announcements */}
          <Card className="bg-primary/10 border-primary/40 p-8">
            <h2 className="text-2xl font-bold text-primary text-glow-red mb-4">
              Next Exploration: Delhi Factory
            </h2>
            <p className="text-muted-foreground mb-4">
              Join us this Saturday for an exclusive group expedition to an abandoned textile factory in Delhi.
              Limited spots available!
            </p>
            <Button className="bg-primary hover:bg-primary/80 text-white">
              Register Now
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
