import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would connect to backend
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    navigate("/dashboard");
  };

  const handleGoogleAuth = () => {
    // Mock Google auth - in production, this would use actual OAuth
    toast.success("Signing in with Google...");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-card border-primary/20 p-8 animate-fade-slide-up">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold text-primary text-glow-red glitch mb-2" data-text="URBEX">
              URBEX
            </h1>
          </Link>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back, explorer" : "Begin your journey"}
          </p>
        </div>

        {/* Google Sign In */}
        <Button
          onClick={handleGoogleAuth}
          variant="outline"
          className="w-full mb-6 border-secondary text-secondary hover:bg-secondary/10"
        >
          <Mail className="mr-2 h-5 w-5" />
          Continue with Gmail
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-primary/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input border-primary/20 text-foreground"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input border-primary/20 text-foreground"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-white glow-red"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-secondary hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            ← Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
