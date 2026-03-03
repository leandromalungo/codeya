import { motion } from "motion/react";

export const InfiniteLogo = ({ size = 40, className = "" }: { size?: number; className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M25 25C25 10 45 10 50 25C55 40 75 40 75 25C75 10 55 10 50 25C45 40 25 40 25 25Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            } 
          }}
        />
      </svg>
    </div>
  );
};

export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
    <InfiniteLogo size={80} className="text-black" />
    <p className="mt-4 font-display text-sm uppercase tracking-widest animate-pulse">Carregando Codeya...</p>
  </div>
);
