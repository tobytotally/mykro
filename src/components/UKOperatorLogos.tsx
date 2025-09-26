import React from 'react';
import { motion } from 'framer-motion';

interface OperatorLogo {
  name: string;
  logoUrl: string;
  primaryColor: string;
  website: string;
}

const ukOperators: OperatorLogo[] = [
  {
    name: "bet365",
    logoUrl: "https://www.bet365.com/favicon.ico",
    primaryColor: "#126e51",
    website: "https://www.bet365.com"
  },
  {
    name: "William Hill",
    logoUrl: "https://www.williamhill.com/favicon.ico",
    primaryColor: "#2b3a42",
    website: "https://www.williamhill.com"
  },
  {
    name: "Paddy Power",
    logoUrl: "https://www.paddypower.com/favicon.ico",
    primaryColor: "#004833",
    website: "https://www.paddypower.com"
  },
  {
    name: "Betfair",
    logoUrl: "https://www.betfair.com/favicon.ico",
    primaryColor: "#ffd700",
    website: "https://www.betfair.com"
  },
  {
    name: "Ladbrokes",
    logoUrl: "https://www.ladbrokes.com/favicon.ico",
    primaryColor: "#ed1c24",
    website: "https://www.ladbrokes.com"
  },
  {
    name: "Coral",
    logoUrl: "https://www.coral.co.uk/favicon.ico",
    primaryColor: "#00a0de",
    website: "https://www.coral.co.uk"
  },
  {
    name: "Sky Bet",
    logoUrl: "https://www.skybet.com/favicon.ico",
    primaryColor: "#0072c6",
    website: "https://www.skybet.com"
  },
  {
    name: "Betway",
    logoUrl: "https://www.betway.com/favicon.ico",
    primaryColor: "#000000",
    website: "https://www.betway.com"
  },
  {
    name: "888sport",
    logoUrl: "https://www.888sport.com/favicon.ico",
    primaryColor: "#ff8c00",
    website: "https://www.888sport.com"
  },
  {
    name: "Unibet",
    logoUrl: "https://www.unibet.co.uk/favicon.ico",
    primaryColor: "#14805e",
    website: "https://www.unibet.co.uk"
  },
  {
    name: "BetVictor",
    logoUrl: "https://www.betvictor.com/favicon.ico",
    primaryColor: "#fdb913",
    website: "https://www.betvictor.com"
  },
  {
    name: "Betfred",
    logoUrl: "https://www.betfred.com/favicon.ico",
    primaryColor: "#ff0000",
    website: "https://www.betfred.com"
  }
];

interface UKOperatorLogosProps {
  title?: string;
  subtitle?: string;
  variant?: 'grid' | 'carousel';
  showLinks?: boolean;
}

export const UKOperatorLogos: React.FC<UKOperatorLogosProps> = ({
  title = "Leading UK Betting Operators",
  subtitle = "Trusted by the biggest names in UK online betting",
  variant = 'grid',
  showLinks = false
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const LogoCard = ({ operator, index }: { operator: OperatorLogo; index: number }) => {
    const content = (
      <motion.div
        variants={itemVariants}
        className={`
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          p-6 rounded-lg 
          flex flex-col items-center justify-center
          min-h-[120px]
          ${showLinks ? 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer' : ''}
        `}
        whileHover={showLinks ? { scale: 1.05 } : {}}
      >
        <div 
          className="w-full h-12 flex items-center justify-center mb-3"
          style={{ 
            backgroundColor: operator.primaryColor + '15',
            borderRadius: '8px',
            padding: '8px'
          }}
        >
          <div className="text-2xl font-bold" style={{ color: operator.primaryColor }}>
            {operator.name}
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {operator.name}
        </p>
      </motion.div>
    );

    if (showLinks) {
      return (
        <a 
          href={operator.website} 
          target="_blank" 
          rel="noopener noreferrer"
          key={operator.name}
        >
          {content}
        </a>
      );
    }

    return <div key={operator.name}>{content}</div>;
  };

  if (variant === 'carousel') {
    return (
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          <div className="relative">
            <motion.div 
              className="flex space-x-6"
              animate={{
                x: [0, -100 * ukOperators.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...ukOperators, ...ukOperators].map((operator, index) => (
                <div key={`${operator.name}-${index}`} className="flex-shrink-0 w-48">
                  <LogoCard operator={operator} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ukOperators.map((operator, index) => (
            <LogoCard key={operator.name} operator={operator} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};