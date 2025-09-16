"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { X, Bot, Users, Video, Music, BookOpen, Smile, Sparkles, TrendingUp, AlertCircle, ShieldAlert, ThumbsUp } from 'lucide-react'; 
import { cn } from '@/lib/utils';

// ============================================================================
// --- PARENT COMPONENT WITH THE NEW LOGIC ---
// This is an example of how you would use the modal on a dashboard page.
// ============================================================================

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Replace "Jane" with the actual user's name from your authentication state
  const userName = "Jane"; 

  // This effect runs only once when the page loads
  useEffect(() => {
    // Check if the flag to show the modal exists in session storage
    const shouldShowModal = sessionStorage.getItem('showMoodModal') === 'true';

    if (shouldShowModal) {
      setIsModalOpen(true);
    }
  }, []); // The empty dependency array [] ensures this runs only once on mount

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // IMPORTANT: Remove the flag from session storage when the modal is closed
    // This prevents it from showing again on the next refresh.
    sessionStorage.removeItem('showMoodModal');
  };
  
  // A helper function to simulate logging in and setting the flag.
  // In your real app, you would call sessionStorage.setItem after a successful login API call.
  const simulateLogin = () => {
    sessionStorage.setItem('showMoodModal', 'true');
    alert("Login simulated! The 'showMoodModal' flag is set. Refresh the page to see the modal.");
    window.location.reload();
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard, {userName}</h1>
      <p className="mt-2 text-gray-400">This is your main application content.</p>

      <button 
        onClick={simulateLogin}
        className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Simulate Login
      </button>

      {/* The MoodAssessmentModal is rendered here with the controlled state */}
      <MoodAssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userName={userName}
      />
    </div>
  );
}


// ============================================================================
// --- YOUR ORIGINAL MoodAssessmentModal (UNCHANGED) ---
// No changes were made to the component below.
// ============================================================================

// --- TYPE DEFINITIONS (ENHANCED) ---
interface MoodAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

type MoodOption = { label: string; emoji: string; value: number };
type CapacityOption = { label: string; icon: React.ElementType; value: number };
type ContextOption = { label: string };
type Recommendation = { icon: React.ElementType; title: string; description: string; action: string; href: string; isPrimary?: boolean };
type Insight = { icon: React.ElementType; text: string };
type ScoreCategory = 'Positive' | 'Neutral' | 'Struggling' | 'Concerning';

type AnalysisResult = {
  score: number;
  category: ScoreCategory;
  color: string;
  headline: string;
  insights: Insight[];
  recommendations: Recommendation[];
};

// --- COMPONENT DATA ---
const moodOptions: MoodOption[] = [
  { label: 'Happy', emoji: '😄', value: 100 },
  { label: 'Okay', emoji: '🙂', value: 75 },
  { label: 'Sad', emoji: '😔', value: 30 },
  { label: 'Anxious', emoji: '😟', value: 20 },
  { label: 'Angry', emoji: '😠', value: 40 },
];

const capacityOptions: CapacityOption[] = [
  { label: 'On Top of Things', icon: ThumbsUp, value: 1.0 },
  { label: 'Feeling the Pressure', icon: ShieldAlert, value: 0.9 },
  { label: 'Feeling Overwhelmed', icon: AlertCircle, value: 0.75 },
];

const contextOptions: ContextOption[] = [
  { label: 'Academics & Exams' },
  { label: 'Relationships' },
  { label: 'Health & Sleep' },
  { label: 'Future Uncertainty' },
  { label: 'Nothing Specific' },
];

// --- MAIN COMPONENT ---
export function MoodAssessmentModal({ isOpen, onClose, userName }: MoodAssessmentModalProps) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<{ mood: number | null; capacity: number | null }>({
    mood: null,
    capacity: null,
  });
  const [context, setContext] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setSelections({ mood: null, capacity: null });
        setContext('');
        setAnalysisResult(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleMoodSelect = (value: number) => {
    setSelections(prev => ({ ...prev, mood: value }));
    setStep(2);
  };

  const handleCapacitySelect = (value: number) => {
    setSelections(prev => ({ ...prev, capacity: value }));
    setStep(3);
  };

  const handleContextSelect = (label: string) => {
    setContext(label);
    generateResults(label);
    setStep(4);
  };

  const generateResults = (selectedContext: string) => {
    const moodScore = selections.mood ?? 75;
    const capacityMultiplier = selections.capacity ?? 0.9;

    const finalScore = Math.round(moodScore * capacityMultiplier);
    let result: AnalysisResult;

    if (finalScore >= 70) {
      result = {
        score: finalScore,
        category: 'Positive',
        color: '#2ECC71',
        headline: `Great to see you're feeling good, ${userName}!`,
        insights: [
          { icon: Sparkles, text: `Your mood score is ${finalScore}, indicating a healthy emotional state.` },
          { icon: TrendingUp, text: "You're feeling capable and on top of things right now." },
        ],
        recommendations: [
          { icon: Smile, title: 'Mood Tracker & Journal', description: "Capture this positive moment in your journal to reflect on later.", action: 'Use Tool', href: '/tools/journal', isPrimary: true },
          { icon: Video, title: 'Building Healthy Sleep Habits', description: "Proactively support your well-being by improving your sleep.", action: 'Watch Video', href: '/resources' },
        ],
      };
    } else if (finalScore >= 45) {
      result = {
        score: finalScore,
        category: 'Neutral',
        color: '#3498DB',
        headline: "It's okay to have an off day. Let's find some balance.",
        insights: [
          { icon: AlertCircle, text: `Your score of ${finalScore} suggests you're feeling a bit down or stressed.` },
          { icon: TrendingUp, text: "Feeling under pressure can certainly impact your mood. It's okay to slow down." },
          ...(selectedContext !== 'Nothing Specific' ? [{ icon: BookOpen, text: `${selectedContext} seems to be on your mind.` }] : []),
        ],
        recommendations: [
          { icon: Bot, title: 'Start AI Chat', description: "Talk through your feelings in a safe, judgment-free space.", action: 'Chat Now', href: '/chat', isPrimary: true },
          selectedContext === 'Academics & Exams' 
            ? { icon: Music, title: 'Guided Meditation for Exam Stress', description: "Find calm and focus with this guided audio.", action: 'Listen Now', href: '/resources' }
            : { icon: BookOpen, title: 'Read about Stress Management', description: "Learn new techniques for managing daily stressors.", action: 'Read Article', href: '/resources' }
        ],
      };
    } else {
      result = {
        score: finalScore,
        category: 'Struggling',
        color: '#E74C3C',
        headline: "We're here for you. Please take a moment.",
        insights: [
          { icon: AlertCircle, text: `A score of ${finalScore} indicates you're going through a tough time.` },
          { icon: TrendingUp, text: "Feeling overwhelmed is a sign to prioritize your well-being right now." },
          ...(selectedContext !== 'Nothing Specific' ? [{ icon: BookOpen, text: `It's brave to acknowledge that ${selectedContext} is challenging right now.` }] : []),
        ],
        recommendations: [
          { icon: Users, title: 'Book a Session', description: "Connect with a professional who can provide the support you need.", action: 'Book Now', href: '/book', isPrimary: true },
          { icon: Bot, title: 'Start AI Chat', description: "For immediate support, our AI is available to listen 24/7.", action: 'Chat Now', href: '/chat' },
          { icon: Video, title: 'Breathing Exercises for Anxiety', description: "Learn techniques to manage overwhelming feelings.", action: 'Watch Video', href: '/resources/' },
        ],
      };
    }
    setAnalysisResult(result);
  };

  const renderStepContent = () => {
    const motionProps = {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.3, ease: "easeInOut" },
    };

    switch (step) {
      case 1:
        return (
          <motion.div key="step1" {...motionProps}>
            <h2 className="text-2xl font-bold text-white text-center">How are you feeling right now, {userName}?</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8">
              {moodOptions.map(opt => (
                <OptionCard key={opt.label} onClick={() => handleMoodSelect(opt.value)}>
                  <span className="text-5xl">{opt.emoji}</span>
                  <span className="mt-2 font-semibold text-white/90">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </motion.div>
        );
      case 2: // ENHANCED STEP 2
        return (
          <motion.div key="step2" {...motionProps}>
            <h2 className="text-2xl font-bold text-white text-center">
              How would you describe your capacity to handle things right now?
            </h2>
            <p className="text-white/60 text-center mt-2 max-w-lg mx-auto">
              Think about how mentally and emotionally available you feel for challenges,
              problem-solving, and responsibilities at this moment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {capacityOptions.map(opt => (
                <OptionCard key={opt.label} onClick={() => handleCapacitySelect(opt.value)}>
                  <opt.icon className="w-12 h-12 text-white mb-2" />
                  <span className="font-semibold text-white/90 text-center">{opt.label}</span>
                  <span className="text-xs text-white/50 mt-1 text-center">
                    {opt.value === 1.0 && "You feel fully capable and in control."}
                    {opt.value === 0.9 && "You’re managing but noticing some stress."}
                    {opt.value === 0.75 && "You might need to slow down and take a breather."}
                  </span>
                </OptionCard>
              ))}
            </div>
            <p className="text-xs text-white/40 text-center mt-4 italic">
              This helps personalize your results — there are no right or wrong answers.
            </p>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" {...motionProps}>
            <h2 className="text-2xl font-bold text-white text-center">What's on your mind? <span className="text-white/50">(Optional)</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {contextOptions.map(opt => (
                <motion.button key={opt.label} onClick={() => handleContextSelect(opt.label)} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 font-medium" whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.95 }}>
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        if (!analysisResult) return null;
        const chartData = [
          { name: 'score', value: analysisResult.score },
          { name: 'remaining', value: 100 - analysisResult.score },
        ];
        return (
          <motion.div key="step4" {...motionProps} className="w-full">
            <h2 className="text-3xl font-bold text-white text-center mb-8">{analysisResult.headline}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: 100 }]} dataKey="value" stroke="none" outerRadius={100} innerRadius={80} fill="rgba(255, 255, 255, 0.1)" startAngle={90} endAngle={450} />
                    <Pie data={chartData} dataKey="value" stroke="none" outerRadius={100} innerRadius={80} startAngle={90} endAngle={450} cornerRadius={50} isAnimationActive={true}>
                      <Cell fill={analysisResult.color} />
                      <Cell fill="transparent" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-5xl font-bold" style={{ color: analysisResult.color }}>{analysisResult.score}</span>
                  <span className="text-lg font-semibold text-white/80">{analysisResult.category}</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white mb-3">Key Insights</h3>
                <div className="space-y-3 mb-6">
                  {analysisResult.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <insight.icon className="w-5 h-5 text-white/60 mt-0.5 shrink-0" />
                      <p className="text-white/80">{insight.text}</p>
                    </div>
                  ))}
                </div>
                {analysisResult.recommendations.map(rec => (
                  <RecommendationCard key={rec.title} {...rec} />
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors" aria-label="Close modal"><X /></button>
            <div className="text-center text-white/50 mb-6 font-medium">Step {step > 3 ? 3 : step} of 3</div>
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- HELPER COMPONENTS ---
const OptionCard: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <motion.button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-lg aspect-square text-center"
    whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.button>
);

const RecommendationCard = ({ icon: Icon, title, description, action, href, isPrimary = false }: Recommendation) => (
  <motion.a
    href={href}
    className={cn(
      "flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg text-left w-full",
      isPrimary && "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-400/30"
    )}
    whileHover={{ scale: 1.02, y: -3, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
  >
    <div className={cn("p-3 rounded-lg bg-white/10", isPrimary && "bg-white/20")}>
      <Icon className={cn("h-6 w-6 text-white", isPrimary && "text-violet-200")} />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-sm text-white/60">{description}</p>
    </div>
    <div className={cn(
      "px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white/90",
      isPrimary && "bg-white text-black"
    )}>
      {action}
    </div>
  </motion.a>
);