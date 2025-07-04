export interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  keyPoints: string[];
  icon: string;
  gradient: string;
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "SIMULATION-BASED IMMERSIVE LEARNING",
    description: "Experience decades of market cycles in months. Our flight simulator for finance lets you practice without risk, fail without fear, and master patterns through repetition.",
    keyPoints: [
      "11% higher skill development",
      "3x better decision-making under pressure"
    ],
    icon: "🎮",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "REAL-TIME FEEDBACK & AI MENTORSHIP",
    description: "Your personal AI mentor watches every move, providing instant guidance. Know immediately when you're overtrading, tilting, or missing opportunities.",
    keyPoints: [
      "Behavioral pattern recognition",
      "Personalized learning paths",
      "Adaptive difficulty"
    ],
    icon: "🤖",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "SOCIAL & COMPETITIVE LEARNING",
    description: "Learn alongside peers, compete in weekly tournaments, and build your reputation. Because finance is more fun with friends and rivals.",
    keyPoints: [
      "Guild-based learning cohorts",
      "Weekly Bellaforum competitions",
      "Peer strategy sharing"
    ],
    icon: "🏆",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "REAL-WORLD SKILL TRANSFER",
    description: "Skills learned in NetWorth directly translate to market success. Top performers earn internships, seed capital, and industry recognition.",
    keyPoints: [
      "Students show 32% better risk-adjusted returns",
      "2.5x faster analysis and execution",
      "Direct pipeline to finance careers"
    ],
    icon: "💼",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  }
];