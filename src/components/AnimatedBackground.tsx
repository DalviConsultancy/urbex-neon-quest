const AnimatedBackground = () => {
  return (
    <>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Glitch scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent animate-scan" />
      </div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black opacity-60" />

      {/* Floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-64 h-64 border border-secondary/10 rounded-full animate-orbit" style={{ left: '10%', top: '20%' }} />
        <div className="absolute w-96 h-96 border border-primary/10 rounded-full animate-orbit-reverse" style={{ right: '15%', bottom: '15%' }} />
        <div className="absolute w-32 h-32 border border-secondary/10 rotate-45 animate-float-slow" style={{ left: '80%', top: '10%' }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }

        @keyframes orbit-reverse {
          0% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
          100% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-30px) rotate(45deg); }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-scan {
          animation: scan 8s linear infinite;
        }

        .animate-orbit {
          animation: orbit 20s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 25s linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
};

export default AnimatedBackground;
