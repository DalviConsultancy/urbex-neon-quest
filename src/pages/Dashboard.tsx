import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, FileText, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "Explorer",
    level: "Novice Explorer",
    locationsVisited: 3,
    memberSince: "2024",
  };

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
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12 animate-fade-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow-red mb-4">
              Welcome back, {user.name}!
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
                <TrendingUp className="h-6 w-6 text-primary glow-red" />
              </div>
              <p className="text-3xl font-bold text-primary">{user.level}</p>
            </Card>

            <Card className="bg-card border-primary/20 p-6 hover-scale transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-secondary">Locations Visited</h3>
                <MapPin className="h-6 w-6 text-primary glow-red" />
              </div>
              <p className="text-3xl font-bold text-primary">{user.locationsVisited}</p>
            </Card>

            <Card className="bg-card border-primary/20 p-6 hover-scale transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-secondary">Member Since</h3>
                <TrendingUp className="h-6 w-6 text-primary glow-red" />
              </div>
              <p className="text-3xl font-bold text-primary">{user.memberSince}</p>
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
                    <link.icon className={`h-12 w-12 mb-4 ${link.color === 'primary' ? 'text-primary glow-red' : 'text-secondary glow-cyan'}`} />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{link.title}</h3>
                    <p className="text-muted-foreground">{link.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
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
            <Button className="bg-primary hover:bg-primary/80 text-white glow-red">
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
