"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { UserProfile, VisaResult } from "@/types/quiz";
import { findBestVisa } from "@/lib/visaLogic";

const initialProfile: UserProfile = {
  userAge: null,
  parentJapanese: null,
  partnerStatus: null,
  partnerJapanese: null,
  planToMarry: null,
  partnerDegreeOrHighIncome: null,
  languages: null,
  englishLevel: null,
  jlptLevel: null,
  planToLanguageSchool: null,
  hasNonIsraeliPassport: null,
  passportCountry: null,
  isBusinessOwner: null,
  expandBusinessToJapan: null,
  investmentAmount: null,
  isStartup: null,
  hasManagementExpOrMasters: null,
  hasBusinessN2: null,
  isEmployed: null,
  remoteWork: null,
  currentIncome: null,
  degreeType: null,
  continueToMaster: null,
  companyAffiliatedWithJapan: null,
  isArtStudent: null,
  hasArtSponsor: null,
  savingsForArt: null,
  willingSpecialist: null,
  canPassN4: null,
  spouseHailMary: null,
};

interface QuizContextType {
  profile: UserProfile;
  updateProfile: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
  result: VisaResult;
  isShortcut: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [currentStep, setCurrentStep] = useState(0);

  const updateProfile = useCallback(<K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  const { result, isShortcut } = findBestVisa(profile);

  const reset = useCallback(() => {
    setProfile(initialProfile);
    setCurrentStep(0);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        profile,
        updateProfile,
        result,
        isShortcut,
        currentStep,
        setCurrentStep,
        reset,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
