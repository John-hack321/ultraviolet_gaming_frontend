'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Shield, Zap, Users, Trophy, Menu, X, Star, ArrowRight, Gamepad2, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chessGame = {
    name: 'Chess',
    icon: '♔',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6']
  };

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoveIndex((prev) => (prev + 1) % chessGame.moves.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const Particles = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    );
  };

  const AnimatedGameBoard = () => {
    return (
      <div className="relative">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Now Playing: {chessGame.name}</h3>
          <div className="text-6xl mb-4">{chessGame.icon}</div>
        </div>
        
        <div 
          className="w-80 h-80 mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative"
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        >
          <div className="grid grid-cols-8 gap-1 w-64 h-64">
            {[...Array(64)].map((_, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const isLight = (row + col) % 2 === 0;
              const isActive = index % 12 === (currentMoveIndex * 3) % 12;
              
              return (
                <div
                  key={index}
                  className={`
                    w-7 h-7 rounded-sm transition-all duration-500
                    ${isLight ? 'bg-slate-200' : 'bg-slate-600'}
                    ${isActive ? 'ring-2 ring-emerald-400 bg-emerald-400/30' : ''}
                  `}
                />
              );
            })}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 to-transparent rounded-xl" />
        </div>
        
        <div className="text-center mt-4 text-emerald-400 font-semibold">
          Current Move: {chessGame.moves[currentMoveIndex]}
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              .ULVT_GAMERS
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/two_player" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors duration-200">Staking</Link>
              <Link href="/chess_puzzles" className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors duration-200">Tournaments</Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="/signup" className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-200">
              Join Beta
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/two_player" className="text-gray-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium" onClick={() => setIsMenuOpen(false)}>Staking</Link>
            <Link href="/chess_puzzles" className="text-gray-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium" onClick={() => setIsMenuOpen(false)}>Tournaments</Link>
            <Link href="/signup" className="w-full text-left bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-3 py-2 rounded-lg font-semibold mt-4">
              Join Beta
            </Link>
          </div>
        </div>
      )}
    </nav>
  );

  const HeroSection = () => (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Stake & Play
              </span>
              <br />
              <span className="text-white">
                Competitive Chess
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              The ultimate online staking platform for competitive chess. Challenge players worldwide, stake your skills, and win real rewards. Currently in Beta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="group bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald-400/25 transition-all duration-300 flex items-center justify-center gap-2">
              <Play size={20} />
              Join Beta Launch
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-emerald-400 hover:bg-emerald-400/10 transition-all duration-300 flex items-center justify-center gap-2">
              <Gamepad2 size={20} />
              Login
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">Chess</div>
              <div className="text-gray-400 text-sm">Game Type</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">Beta</div>
              <div className="text-gray-400 text-sm">Phase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">24/7</div>
              <div className="text-gray-400 text-sm">Gaming</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <AnimatedGameBoard />
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => {
    const features = [
      {
        icon: <Gamepad2 size={32} />,
        title: "Competitive Chess",
        description: "The purest form of skill-based competition. Outwit your opponent on the 64 squares."
      },
      {
        icon: <Trophy size={32} />,
        title: "Real Stakes, Real Rewards",
        description: "Put your money where your skills are. Win real rewards by outplaying your opponents in chess."
      },
      {
        icon: <Users size={32} />,
        title: "Online Tournaments",
        description: "Compete in scheduled tournaments, climb the leaderboard, and win big prizes."
      },
      {
        icon: <Shield size={32} />,
        title: "Secure & Fair",
        description: "Advanced anti-cheat systems and secure payment processing ensure fair play for everyone."
      }
    ];

    return (
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">.ULVT_GAMERS?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're building the ultimate competitive chess platform where skill meets rewards. 
              Join thousands of players who are already preparing for launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const CTASection = () => (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-2xl border border-slate-700">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Stake Your Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be among the first to experience competitive chess with real stakes. 
            Join our beta program and help shape the future of online gaming.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="group bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald-400/25 transition-all duration-300 flex items-center justify-center gap-2">
              <Play size={20} />
              Join Beta Program
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/chess_puzzles" className="border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-emerald-400 hover:bg-emerald-400/10 transition-all duration-300">
              Practice with Puzzles
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            🚀 Beta launching soon • Early access available • Limited spots
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      <Particles />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">
            .ULVT_GAMERS
          </Link>
          <p className="text-gray-400 mb-4">
            The future of competitive online chess with real stakes.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 .ULVT_GAMERS. Building the ultimate gaming experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;