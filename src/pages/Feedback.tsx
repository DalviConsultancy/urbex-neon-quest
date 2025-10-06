import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Feedback = () => {
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Feedback submitted successfully!");
    setFormData({ type: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-primary text-glow-red mb-6">
              Feedback & Support
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question, suggestion, or issue? We're here to help.
            </p>
          </div>

          {/* Feedback Form */}
          <Card className="bg-card border-primary/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                  Feedback Type *
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-input border-primary/20 text-foreground">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="location">Location Suggestion</SelectItem>
                    <SelectItem value="safety">Safety Concern</SelectItem>
                    <SelectItem value="general">General Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-input border-primary/20 text-foreground"
                  placeholder="Brief summary of your feedback"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={8}
                  className="bg-input border-primary/20 text-foreground"
                  placeholder="Provide as much detail as possible..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-white pulse-glow"
              >
                Submit Feedback
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <Card className="bg-primary/10 border-primary/40 p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Need Immediate Help?</h3>
              <p className="text-muted-foreground mb-4">
                For urgent safety concerns or time-sensitive issues, contact us directly:
              </p>
              <p className="text-secondary font-semibold">
                support@urbex-india.com
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
