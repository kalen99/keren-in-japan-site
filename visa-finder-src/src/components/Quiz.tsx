"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { getCurrentStepId } from "@/lib/flowLogic";
import { JourneyProgressBar } from "./JourneyProgressBar";
import { AgeStep } from "./quiz/AgeStep";
import { ParentJapaneseStep } from "./quiz/ParentJapaneseStep";
import {
  PartnerStatusStep,
  PartnerJapaneseStep,
  PartnerDegreeStep,
} from "./quiz/PartnerSteps";
import { PlanToMarryStep } from "./quiz/PlanToMarryStep";
import { LanguagesStep } from "./quiz/LanguagesStep";
import { EnglishLevelStep } from "./quiz/EnglishLevelStep";
import { JLPTStep } from "./quiz/JLPTStep";
import { LanguageSchoolStep } from "./quiz/LanguageSchoolStep";
import {
  BusinessOwnerStep,
  ExpandToJapanStep,
  InvestmentStep,
  StartupStep,
  ManagementMastersStep,
} from "./quiz/EntrepreneurSteps";
import { BusinessN2Step } from "./quiz/BusinessN2Step";
import { EmployedStep, RemoteStep, IncomeStep } from "./quiz/EmploymentSteps";
import {
  DegreeStep,
  ContinueToMasterStep,
  CompanyAffiliatedStep,
} from "./quiz/DegreeSteps";
import { PassportStep, PassportCountryStep } from "./quiz/PassportSteps";
import { SpecialistStep, N4Step } from "./quiz/SpecialistSteps";
import {
  ArtStudentStep,
  ArtSponsorStep,
  ArtSavingsStep,
} from "./quiz/ArtSteps";
import { SpouseTasteTestStep } from "./quiz/SpouseTasteTestStep";
import { ResultScreen } from "./ResultScreen";

export function Quiz() {
  const { profile } = useQuiz();
  const stepId = getCurrentStepId(profile);

  // reducedMotion="user" makes every framer-motion animation in the quiz
  // (floating hearts, coin flip, gacha machine, stamp wobble, ...) honour the
  // visitor's OS "reduce motion" setting: transitions resolve instantly
  // instead of animating (WCAG 2.2.2 / 2.3.3).
  if (stepId === "result") {
    return (
      <MotionConfig reducedMotion="user">
        <JourneyProgressBar />
        <ResultScreen />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <JourneyProgressBar />
      {renderStep(stepId)}
    </MotionConfig>
  );
}

function renderStep(stepId: string) {
  switch (stepId) {
    case "age":
      return <AgeStep />;
    case "parent-japanese":
      return <ParentJapaneseStep />;
    case "partner-status":
      return <PartnerStatusStep />;
    case "partner-japanese":
      return <PartnerJapaneseStep />;
    case "plan-to-marry":
      return <PlanToMarryStep />;
    case "partner-degree":
      return <PartnerDegreeStep />;
    case "languages":
      return <LanguagesStep />;
    case "english-level":
      return <EnglishLevelStep />;
    case "jlpt-level":
      return <JLPTStep />;
    case "language-school":
      return <LanguageSchoolStep />;
    case "business-owner":
      return <BusinessOwnerStep />;
    case "expand-to-japan":
      return <ExpandToJapanStep />;
    case "investment":
      return <InvestmentStep />;
    case "startup":
      return <StartupStep />;
    case "management-masters":
      return <ManagementMastersStep />;
    case "business-n2":
      return <BusinessN2Step />;
    case "employed":
      return <EmployedStep />;
    case "remote":
      return <RemoteStep />;
    case "income":
      return <IncomeStep />;
    case "degree":
      return <DegreeStep />;
    case "continue-to-master":
      return <ContinueToMasterStep />;
    case "company-affiliated":
      return <CompanyAffiliatedStep />;
    case "passport":
      return <PassportStep />;
    case "passport-country":
      return <PassportCountryStep />;
    case "specialist":
      return <SpecialistStep />;
    case "n4":
      return <N4Step />;
    case "art-student":
      return <ArtStudentStep />;
    case "art-sponsor":
      return <ArtSponsorStep />;
    case "art-savings":
      return <ArtSavingsStep />;
    case "spouse-hail-mary":
      return <SpouseTasteTestStep />;
    default:
      return <ResultScreen />;
  }
}
