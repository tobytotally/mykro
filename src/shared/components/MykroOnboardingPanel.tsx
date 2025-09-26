import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useMykroOnboarding, MykroOnboardingStep } from '../hooks/useMykroOnboarding';
import { useOperatorTheme } from '../hooks/useOperatorTheme';

interface MykroOnboardingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialPathway?: 'new' | 'existing' | 'connected';
}

export function MykroOnboardingPanel({ isOpen, onClose, initialPathway = 'new' }: MykroOnboardingPanelProps) {
  const { getThemeClasses } = useOperatorTheme();
  const onboarding = useMykroOnboarding();
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<'about' | 'how' | 'why'>('about');

  // Calculate max panel height to not exceed betting slip bottom
  useEffect(() => {
    if (isOpen) {
      // Use a timeout to ensure DOM is ready
      setTimeout(() => {
        const bettingSlip = document.querySelector('[data-testid="betting-slip"]') || 
                           document.querySelector('.lg\\:col-span-1 > div');
        
        if (bettingSlip) {
          const rect = bettingSlip.getBoundingClientRect();
          // Set max height to ensure panel doesn't extend below betting slip
          const maxHeight = rect.height - 10; // Subtract small buffer
          setPanelHeight(Math.max(maxHeight, 400)); // Minimum height of 400px
        } else {
          // Fallback max height
          setPanelHeight(500);
        }
      }, 100);
    }
  }, [isOpen]);

  // Set initial pathway when panel opens
  React.useEffect(() => {
    if (isOpen) {
      onboarding.openPanel(initialPathway);
    }
  }, [isOpen, initialPathway, onboarding]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Remove body scroll prevention - allow scrolling when panel is open

  return (
    <>
      {/* Custom styles for panel positioning */}
      <style>{`
        .mykro-panel {
          /* Remove right border radius and border to connect seamlessly */
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          border-right: none !important;
          /* Minimal shadow only on left side */
          box-shadow: -2px 0 8px -2px rgba(0, 0, 0, 0.1);
          /* Fixed height for presentation style */
          height: 700px;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="mykro-panel bg-[var(--theme-slipBg)] border border-[var(--theme-slipBorder)] rounded-lg overflow-hidden h-full"
          >
            {/* Header */}
            <div className="border-b border-[var(--theme-slipBorder)]">
              <div className="flex justify-between items-center p-4 pb-2">
                <div>
                  <h2 className="font-bold text-lg text-[var(--theme-text)]">Mykro</h2>
                  <p className="text-sm text-[var(--theme-textMuted)]">Turn bets into charity</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-[var(--theme-surface)] text-[var(--theme-textMuted)] hover:bg-[var(--theme-primary)] hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex">
              {/* Vertical Navigation - Only show for new users */}
              {initialPathway !== 'existing' && (
                <div className="w-48 border-r border-[var(--theme-border)] p-4">
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveSection('about')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === 'about'
                          ? 'bg-[var(--theme-primary)] text-[var(--theme-primaryText)]'
                          : 'text-[var(--theme-text)] hover:bg-[var(--theme-surface)]'
                      }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveSection('how')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === 'how'
                          ? 'bg-[var(--theme-primary)] text-[var(--theme-primaryText)]'
                          : 'text-[var(--theme-text)] hover:bg-[var(--theme-surface)]'
                      }`}
                    >
                      How
                    </button>
                    <button
                      onClick={() => setActiveSection('why')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === 'why'
                          ? 'bg-[var(--theme-primary)] text-[var(--theme-primaryText)]'
                          : 'text-[var(--theme-text)] hover:bg-[var(--theme-surface)]'
                      }`}
                    >
                      Why
                    </button>
                    
                    {/* Get Started Button */}
                    <button
                      onClick={onClose}
                      className="w-full text-left px-4 py-3 rounded-lg transition-colors bg-[var(--theme-success)] text-white hover:bg-[var(--theme-success)]/90 font-medium"
                    >
                      Get Started
                    </button>
                  </nav>
                </div>
              )}
              
              {/* Main Content */}
              <div className="flex-1 p-8 pt-4">
                {initialPathway === 'existing' ? (
                  <ConnectAccountContent onClose={onClose} />
                ) : (
                  <>
                    <PresentationContent 
                      activeSection={activeSection}
                      pathway={onboarding.pathway}
                      currentStep={onboarding.currentStep}
                      onboarding={onboarding}
                    />
                    
                    {/* Next Button */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          if (activeSection === 'about') setActiveSection('how');
                          else if (activeSection === 'how') setActiveSection('why');
                          else if (activeSection === 'why') setActiveSection('about');
                        }}
                        className="px-4 py-2 text-[var(--theme-textMuted)] hover:text-[var(--theme-text)] transition-colors text-sm flex items-center gap-1"
                      >
                        Next
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface ProgressIndicatorProps {
  pathway: string;
  currentStep: MykroOnboardingStep;
}

function ProgressIndicator({ pathway, currentStep }: ProgressIndicatorProps) {
  const getPathwaySteps = (pathway: string) => {
    switch (pathway) {
      case 'new':
        return ['intro', 'education', 'charity-selection', 'donation-setup', 'complete'];
      case 'existing':
        return ['login', 'connect-account', 'preferences', 'complete'];
      case 'connected':
        return ['preferences', 'complete'];
      default:
        return ['intro', 'complete'];
    }
  };

  const steps = getPathwaySteps(pathway);
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="bg-[var(--theme-surface)] border-b border-[var(--theme-border)] p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index <= currentIndex
                  ? 'bg-[var(--theme-primary)] text-[var(--theme-primaryText)]'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  index < currentIndex ? 'bg-[var(--theme-primary)]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface ConnectAccountContentProps {
  onClose: () => void;
}

function ConnectAccountContent({ onClose }: ConnectAccountContentProps) {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--theme-text)] mb-4">
            Connect Your Account
          </h1>
          <p className="text-xl text-[var(--theme-textMuted)] leading-relaxed">
            Welcome back! Sign in to continue your charitable impact journey.
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Google Login */}
          <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-[var(--theme-border)] rounded-lg hover:bg-[var(--theme-surface)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-[var(--theme-text)]">Continue with Google</span>
          </button>
          
          {/* Apple Login */}
          <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-[var(--theme-border)] rounded-lg hover:bg-[var(--theme-surface)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="font-medium text-[var(--theme-text)]">Continue with Apple</span>
          </button>
          
          {/* Email Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--theme-border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--theme-slipBg)] text-[var(--theme-textMuted)]">or continue with email</span>
            </div>
          </div>
          
          {/* Email Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--theme-text)] mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-[var(--theme-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] bg-[var(--theme-surface)] text-[var(--theme-text)]"
                placeholder="your@email.com"
              />
            </div>
            
            <button className="w-full px-6 py-3 bg-[var(--theme-primary)] text-[var(--theme-primaryText)] rounded-lg font-medium hover:bg-[var(--theme-primaryHover)] transition-colors">
              Send Magic Link
            </button>
          </div>
          
          {/* Help Text */}
          <p className="text-sm text-[var(--theme-textMuted)] text-center mt-6">
            We'll send you a secure link to sign in instantly. No password required.
          </p>
        </div>
      </div>
    </div>
  );
}

interface PresentationContentProps {
  activeSection: 'about' | 'how' | 'why';
  pathway: string;
  currentStep: MykroOnboardingStep;
  onboarding: ReturnType<typeof useMykroOnboarding>;
}

function PresentationContent({ activeSection, pathway, currentStep, onboarding }: PresentationContentProps) {
  // About Section
  if (activeSection === 'about') {
    return (
      <div className="h-full">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--theme-text)] mb-4">
            Every Payment Has Purpose
          </h1>
          <p className="text-xl text-[var(--theme-textMuted)] mb-10 leading-relaxed">
            Transform your everyday transactions into extraordinary impact.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-left">
              <div className="w-16 h-16 bg-[var(--theme-primary)] bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <HeartIcon className="w-8 h-8 text-[var(--theme-primary)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--theme-text)] mb-2">Give Effortlessly</h3>
              <p className="text-sm text-[var(--theme-textMuted)] leading-relaxed">Round up or add a percentage to support causes you care about</p>
            </div>
            
            <div className="text-left">
              <div className="w-16 h-16 bg-[var(--theme-success)] bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-[var(--theme-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[var(--theme-text)] mb-2">Track Impact</h3>
              <p className="text-sm text-[var(--theme-textMuted)] leading-relaxed">See exactly how your contributions make a difference</p>
            </div>
            
            <div className="text-left">
              <div className="w-16 h-16 bg-[var(--theme-primary)] bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-[var(--theme-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[var(--theme-text)] mb-2">Join Community</h3>
              <p className="text-sm text-[var(--theme-textMuted)] leading-relaxed">Be part of a movement making the world better</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // How Section
  if (activeSection === 'how') {
    return (
      <div className="h-full">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--theme-text)] mb-6">
            How It Works
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-[var(--theme-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[var(--theme-primaryText)]">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">Choose Your Cause</h3>
                <p className="text-base text-[var(--theme-textMuted)] leading-relaxed">
                  Select from verified charities that align with your values and passions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-[var(--theme-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[var(--theme-primaryText)]">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">Set Your Contribution</h3>
                <p className="text-base text-[var(--theme-textMuted)] leading-relaxed">
                  Choose to round up, add a percentage, or set a fixed amount per transaction.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-[var(--theme-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[var(--theme-primaryText)]">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">Make Impact Automatically</h3>
                <p className="text-base text-[var(--theme-textMuted)] leading-relaxed">
                  Every payment triggers a donation. Watch your impact grow with each transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Why Section
  if (activeSection === 'why') {
    return (
      <div className="h-full">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--theme-text)] mb-4">
            Why Mykro?
          </h2>
          
          <div className="space-y-3">
            <div className="bg-[var(--theme-surface)] p-4 rounded-lg border border-[var(--theme-border)]">
              <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">Effortless Giving</h3>
              <p className="text-sm text-[var(--theme-textMuted)] leading-relaxed">
                No need to remember to donate or set aside money. Your generosity happens automatically with every transaction, making charity a seamless part of your daily life.
              </p>
            </div>
            
            <div className="bg-[var(--theme-surface)] p-4 rounded-lg border border-[var(--theme-border)]">
              <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">100% Transparency</h3>
              <p className="text-sm text-[var(--theme-textMuted)] leading-relaxed">
                Track exactly where your money goes and see the real impact you're making. Get updates from the charities you support and celebrate the change you're creating.
              </p>
            </div>
            
            <div className="bg-[var(--theme-surface)] p-4 rounded-lg border border-[var(--theme-border)]">
              <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">Collective Power</h3>
              <p className="text-sm text-[var(--theme-textMuted)] leading-relaxed">
                Join thousands of others turning small actions into big change. Together, we're proving that everyday transactions can transform the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}

interface StepContentProps {
  pathway: string;
  currentStep: MykroOnboardingStep;
  onboarding: ReturnType<typeof useMykroOnboarding>;
}

function StepContent({ pathway, currentStep, onboarding }: StepContentProps) {
  // New user pathway
  if (pathway === 'new') {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-[var(--theme-success)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-14 h-14 text-[var(--theme-success)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--theme-text)] mb-4">
                Welcome to Mykro!
              </h3>
              <p className="text-lg text-[var(--theme-textMuted)] mb-6 leading-relaxed">
                Turn your bets into a force for good. With Mykro, every wager supports the causes you care about.
              </p>
            </div>
            <div className="bg-[var(--theme-success)] bg-opacity-10 border border-[var(--theme-success)] border-opacity-20 rounded-lg p-6">
              <p className="text-base text-[var(--theme-text)] font-medium text-center">
                ✨ Win or lose, charity always wins!
              </p>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-6">
              How Mykro Works
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[var(--theme-primary)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-[var(--theme-primary)]">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--theme-text)] mb-1">Choose Your Cause</h4>
                  <p className="text-sm text-[var(--theme-textMuted)]">
                    Select from verified charities making a real difference worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[var(--theme-primary)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-[var(--theme-primary)]">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--theme-text)] mb-1">Set Your Donation</h4>
                  <p className="text-sm text-[var(--theme-textMuted)]">
                    Choose what percentage of your winnings to donate (1-10%).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[var(--theme-primary)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-[var(--theme-primary)]">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--theme-text)] mb-1">Make a Difference</h4>
                  <p className="text-sm text-[var(--theme-textMuted)]">
                    If you win, your chosen percentage goes to charity. If you don't win, we'll still donate 20% of your pledge!
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'charity-selection':
        return <CharitySelection onboarding={onboarding} />;

      case 'donation-setup':
        return <DonationSetup onboarding={onboarding} />;

      case 'complete':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--theme-success)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[var(--theme-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-4">
              You're All Set!
            </h3>
            <p className="text-[var(--theme-textMuted)] mb-6">
              Mykro is now active on your account. Every bet will support your chosen charity.
            </p>
            <div className="bg-[var(--theme-primary)] bg-opacity-10 border border-[var(--theme-primary)] border-opacity-20 rounded-lg p-4">
              <p className="text-sm text-[var(--theme-text)] font-medium mb-2">
                Your Impact Settings:
              </p>
              <p className="text-sm text-[var(--theme-textMuted)]">
                {onboarding.donationPercentage}% of winnings → {onboarding.selectedCharity || 'Selected Charity'}
              </p>
            </div>
          </div>
        );
    }
  }

  // Existing user pathway
  if (pathway === 'existing') {
    switch (currentStep) {
      case 'login':
        return (
          <div>
            <h3 className="text-xl font-bold text-[var(--theme-text)] mb-4">
              Connect Your Mykro Account
            </h3>
            <p className="text-[var(--theme-textMuted)] mb-6">
              Enter your email to connect your existing Mykro account.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--theme-text)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={onboarding.userEmail}
                  onChange={(e) => onboarding.setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--theme-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] bg-[var(--theme-surface)] text-[var(--theme-text)]"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        );

      case 'connect-account':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--theme-primary)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-10 h-10 text-[var(--theme-primary)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-4">
              Welcome Back!
            </h3>
            <p className="text-[var(--theme-textMuted)] mb-6">
              We found your Mykro account. Let's continue your charitable impact journey.
            </p>
          </div>
        );
    }
  }

  // Connected user pathway
  if (pathway === 'connected') {
    switch (currentStep) {
      case 'preferences':
        return (
          <div>
            <h3 className="text-xl font-bold text-[var(--theme-text)] mb-4">
              Manage Your Donations
            </h3>
            <p className="text-[var(--theme-textMuted)] mb-6">
              Update your charity and donation preferences.
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--theme-text)] mb-3">
                  Donation Percentage: {onboarding.donationPercentage}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={onboarding.donationPercentage}
                  onChange={(e) => onboarding.setDonationPercentage(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[var(--theme-textMuted)] mt-1">
                  <span>1%</span>
                  <span>5%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return null;
}

function CharitySelection({ onboarding }: { onboarding: ReturnType<typeof useMykroOnboarding> }) {
  const charities = [
    { id: 'red-cross', name: 'Red Cross', description: 'Humanitarian aid worldwide', emoji: '🏥' },
    { id: 'unicef', name: 'UNICEF', description: 'Children\'s rights and welfare', emoji: '👶' },
    { id: 'wwf', name: 'WWF', description: 'Wildlife and nature conservation', emoji: '🌍' },
    { id: 'oxfam', name: 'Oxfam', description: 'Fighting global poverty', emoji: '🤝' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-4">
        Choose Your Charity
      </h3>
      <p className="text-lg text-[var(--theme-textMuted)] mb-8">
        Select a verified charity to support with your winnings.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {charities.map((charity) => (
          <button
            key={charity.id}
            onClick={() => onboarding.setCharity(charity.id)}
            className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
              onboarding.selectedCharity === charity.id
                ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] bg-opacity-10'
                : 'border-[var(--theme-border)] hover:border-[var(--theme-primary)] hover:border-opacity-50'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl">{charity.emoji}</span>
              <div>
                <h4 className="font-medium text-lg text-[var(--theme-text)]">{charity.name}</h4>
                <p className="text-sm text-[var(--theme-textMuted)] mt-1">{charity.description}</p>
              </div>
              {onboarding.selectedCharity === charity.id && (
                <svg className="w-6 h-6 text-[var(--theme-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DonationSetup({ onboarding }: { onboarding: ReturnType<typeof useMykroOnboarding> }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-4">
        Set Your Donation Amount
      </h3>
      <p className="text-lg text-[var(--theme-textMuted)] mb-8">
        Choose what percentage of your winnings to donate to charity.
      </p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--theme-text)] mb-3">
          Donation Percentage: {onboarding.donationPercentage}%
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={onboarding.donationPercentage}
          onChange={(e) => onboarding.setDonationPercentage(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-[var(--theme-textMuted)] mt-1">
          <span>1%</span>
          <span>3%</span>
          <span>5%</span>
          <span>10%</span>
        </div>
      </div>

      <div className="bg-[var(--theme-success)] bg-opacity-10 border border-[var(--theme-success)] border-opacity-20 rounded-lg p-4">
        <h4 className="font-medium text-[var(--theme-text)] mb-2">Example Impact</h4>
        <p className="text-sm text-[var(--theme-textMuted)] mb-2">
          If you bet $100 and win $250:
        </p>
        <p className="text-sm font-medium text-[var(--theme-success)]">
          ${(250 * onboarding.donationPercentage / 100).toFixed(2)} goes to {onboarding.selectedCharity || 'your chosen charity'}
        </p>
        <p className="text-xs text-[var(--theme-textMuted)] mt-2">
          If you don't win, we'll still donate ${(100 * onboarding.donationPercentage / 100 * 0.2).toFixed(2)} on your behalf!
        </p>
      </div>
    </div>
  );
}