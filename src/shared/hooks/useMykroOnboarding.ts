import { useState, useCallback } from 'react';

export type MykroOnboardingStep = 
  | 'intro' 
  | 'education' 
  | 'charity-selection' 
  | 'donation-setup' 
  | 'login'
  | 'connect-account'
  | 'preferences'
  | 'complete';

export type MykroOnboardingPathway = 'new' | 'existing' | 'connected';

export interface MykroOnboardingState {
  isOpen: boolean;
  pathway: MykroOnboardingPathway;
  currentStep: MykroOnboardingStep;
  selectedCharity: string | null;
  donationPercentage: number;
  userEmail: string;
}

export function useMykroOnboarding() {
  const [state, setState] = useState<MykroOnboardingState>({
    isOpen: false,
    pathway: 'new',
    currentStep: 'intro',
    selectedCharity: null,
    donationPercentage: 2,
    userEmail: ''
  });

  const openPanel = useCallback((pathway: MykroOnboardingPathway) => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      pathway,
      currentStep: getInitialStep(pathway)
    }));
  }, []);

  const closePanel = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: getNextStep(prev.pathway, prev.currentStep)
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: getPrevStep(prev.pathway, prev.currentStep)
    }));
  }, []);

  const setCharity = useCallback((charityId: string) => {
    setState(prev => ({
      ...prev,
      selectedCharity: charityId
    }));
  }, []);

  const setDonationPercentage = useCallback((percentage: number) => {
    setState(prev => ({
      ...prev,
      donationPercentage: percentage
    }));
  }, []);

  const setUserEmail = useCallback((email: string) => {
    setState(prev => ({
      ...prev,
      userEmail: email
    }));
  }, []);

  return {
    ...state,
    openPanel,
    closePanel,
    nextStep,
    prevStep,
    setCharity,
    setDonationPercentage,
    setUserEmail,
    canGoNext: canGoToNextStep(state),
    canGoPrev: canGoToPrevStep(state)
  };
}

function getInitialStep(pathway: MykroOnboardingPathway): MykroOnboardingStep {
  switch (pathway) {
    case 'new':
      return 'intro';
    case 'existing':
      return 'login';
    case 'connected':
      return 'preferences';
    default:
      return 'intro';
  }
}

function getNextStep(pathway: MykroOnboardingPathway, currentStep: MykroOnboardingStep): MykroOnboardingStep {
  const pathwaySteps = getPathwaySteps(pathway);
  const currentIndex = pathwaySteps.indexOf(currentStep);
  
  if (currentIndex < pathwaySteps.length - 1) {
    return pathwaySteps[currentIndex + 1];
  }
  
  return currentStep;
}

function getPrevStep(pathway: MykroOnboardingPathway, currentStep: MykroOnboardingStep): MykroOnboardingStep {
  const pathwaySteps = getPathwaySteps(pathway);
  const currentIndex = pathwaySteps.indexOf(currentStep);
  
  if (currentIndex > 0) {
    return pathwaySteps[currentIndex - 1];
  }
  
  return currentStep;
}

function getPathwaySteps(pathway: MykroOnboardingPathway): MykroOnboardingStep[] {
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
}

function canGoToNextStep(state: MykroOnboardingState): boolean {
  const { pathway, currentStep, selectedCharity, userEmail } = state;
  
  // Check step-specific requirements
  switch (currentStep) {
    case 'charity-selection':
      return selectedCharity !== null;
    case 'login':
      return userEmail.length > 0;
    default:
      return true;
  }
}

function canGoToPrevStep(state: MykroOnboardingState): boolean {
  const pathwaySteps = getPathwaySteps(state.pathway);
  return pathwaySteps.indexOf(state.currentStep) > 0;
}