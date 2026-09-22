import type { UserProfile } from "@/types/quiz";
import { findBestVisa } from "./visaLogic";
import { isWHVCountry, isDigitalNomadEligible } from "./constants";

export type StepId =
  | "age"
  | "parent-japanese"
  | "partner-status"
  | "partner-japanese"
  | "plan-to-marry"
  | "partner-degree"
  | "languages"
  | "english-level"
  | "jlpt-level"
  | "language-school"
  | "business-owner"
  | "expand-to-japan"
  | "investment"
  | "startup"
  | "management-masters"
  | "business-n2"
  | "employed"
  | "remote"
  | "income"
  | "degree"
  | "continue-to-master"
  | "company-affiliated"
  | "passport"
  | "passport-country"
  | "specialist"
  | "n4"
  | "art-student"
  | "art-sponsor"
  | "art-savings"
  | "spouse-hail-mary"
  | "result";

const STEP_ORDER: StepId[] = [
  "age",
  "parent-japanese",
  "partner-status",
  "partner-japanese",
  "plan-to-marry",
  "languages",
  "english-level",
  "jlpt-level",
  "language-school",
  "business-owner",
  "expand-to-japan",
  "investment",
  "startup",
  "management-masters",
  "business-n2",
  "employed",
  "remote",
  "income",
  "degree",
  "continue-to-master",
  "company-affiliated",
  "passport",
  "passport-country",
  "specialist",
  "n4",
  "art-student",
  "art-sponsor",
  "art-savings",
  "partner-degree", // last resort for Dependent visa
  "spouse-hail-mary",
  "result",
];

function getStepIndex(stepId: StepId): number {
  return STEP_ORDER.indexOf(stepId);
}

const QUESTION_STEPS_COUNT = STEP_ORDER.length - 1; // Exclude "result"

export function getProgressPercentage(profile: UserProfile): number {
  const stepId = getCurrentStepId(profile);
  if (stepId === "result") return 100;
  const index = getStepIndex(stepId);
  return Math.round((index / (QUESTION_STEPS_COUNT - 1)) * 100);
}

/** True if user failed degree and income paths (no work visa, no DN from income) */
export function hasFailedDegreeAndIncome(profile: UserProfile): boolean {
  const hasBachelor =
    profile.degreeType === "bachelor" || profile.degreeType === "both";
  const has10Years =
    profile.degreeType === "10years" || profile.degreeType === "both";
  const failedDegree =
    profile.degreeType === "none" ||
    (hasBachelor && profile.continueToMaster === false) ||
    (has10Years && profile.companyAffiliatedWithJapan === false);
  const failedIncome =
    profile.isEmployed === false ||
    profile.remoteWork === false ||
    profile.currentIncome === null ||
    (profile.currentIncome !== null && profile.currentIncome < 240000);
  return profile.degreeType !== null && failedDegree && failedIncome;
}

export function getCurrentStepId(profile: UserProfile): StepId {
  if (profile.userAge === null) return "age";

  if (profile.userAge < 18) {
    if (profile.parentJapanese === null) return "parent-japanese";
    return "result";
  }

  if (profile.partnerStatus === null) return "partner-status";
  if (profile.partnerStatus === true && profile.partnerJapanese === null)
    return "partner-japanese";
  if (
    profile.partnerStatus === true &&
    profile.partnerJapanese === true &&
    profile.planToMarry === null
  )
    return "plan-to-marry";
  if (profile.planToMarry === true) return "result";
  // Partner not Japanese: skip partner-degree here; ask only as last resort (see end of flow)

  if (!profile.languages || profile.languages.length === 0) return "languages";
  if (profile.languages.includes("english") && profile.englishLevel === null)
    return "english-level";
  if (profile.languages.includes("japanese") && profile.jlptLevel === null)
    return "jlpt-level";
  if (profile.languages.includes("japanese")) {
    if (profile.planToLanguageSchool === null) return "language-school";
    if (profile.planToLanguageSchool === true) return "result";
  }

  if (profile.isBusinessOwner === null) return "business-owner";
  if (profile.isBusinessOwner === true) {
    if (profile.expandBusinessToJapan === null) return "expand-to-japan";
    if (profile.expandBusinessToJapan === true) {
      if (profile.investmentAmount === null) return "investment";
      if (profile.investmentAmount < 100000) {
        if (profile.isStartup === null) return "startup";
        if (profile.isStartup === true) return "result";
      }
      if (profile.investmentAmount >= 100000) {
        if (profile.hasManagementExpOrMasters === null)
          return "management-masters";
        if (profile.hasManagementExpOrMasters === true) {
          if (profile.hasBusinessN2 === null) return "business-n2";
          if (profile.hasBusinessN2 === true) return "result";
        }
      }
    }
  }

  // Employment → Remote → Income (for Digital Nomad path)
  // Skip for business owners (they're self-employed)
  const skipEmployment = profile.isBusinessOwner === true;
  if (!skipEmployment) {
    if (profile.isEmployed === null) return "employed";
    if (profile.isEmployed === true && profile.remoteWork === null)
      return "remote";
    if (
      profile.isEmployed === true &&
      profile.remoteWork === true &&
      profile.currentIncome === null
    )
      return "income";
  }

  // Degree flow (Student, Work visa) → then Passport (WHV, DN)
  if (profile.degreeType === null) return "degree";
  const hasBachelor =
    profile.degreeType === "bachelor" || profile.degreeType === "both";
  const has10Years =
    profile.degreeType === "10years" || profile.degreeType === "both";

  if (hasBachelor && profile.continueToMaster === null)
    return "continue-to-master";
  if (profile.continueToMaster === true) return "result";

  if (has10Years && profile.companyAffiliatedWithJapan === null)
    return "company-affiliated";
  if (profile.companyAffiliatedWithJapan === true) return "result";

  // Passport at END (for both WHV and DN)
  if (profile.hasNonIsraeliPassport === null) return "passport";
  if (profile.hasNonIsraeliPassport === true) {
    if (
      !profile.passportCountry ||
      profile.passportCountry === "SKIP"
    )
      return "passport-country";
    const whvMatch =
      isWHVCountry(profile.passportCountry) &&
      profile.userAge !== null &&
      profile.userAge >= 18 &&
      profile.userAge <= 30;
    const dnMatch =
      profile.remoteWork === true &&
      profile.currentIncome !== null &&
      profile.currentIncome >= 240000 &&
      isDigitalNomadEligible(profile.passportCountry);
    if (whvMatch || dnMatch) return "result";
  }

  if (profile.willingSpecialist === null) return "specialist";
  if (profile.willingSpecialist === true) {
    if (profile.canPassN4 === null) return "n4";
    if (profile.canPassN4 === true) return "result";
  }

  if (profile.isArtStudent === null) return "art-student";
  if (profile.isArtStudent === true) {
    if (profile.hasArtSponsor === null) return "art-sponsor";
    if (profile.savingsForArt === null) return "art-savings";
    if (profile.hasArtSponsor === true && profile.savingsForArt === true)
      return "result";
  }

  const { result } = findBestVisa(profile);
  if (result !== null) return "result";

  // Last resort: partner degree (Dependent visa) — only if partner exists and is not Japanese
  if (
    profile.partnerStatus === true &&
    profile.partnerJapanese === false &&
    profile.partnerDegreeOrHighIncome === null
  )
    return "partner-degree";

  if (profile.spouseHailMary === null) return "spouse-hail-mary";
  return "result";
}

export function getStepNumber(profile: UserProfile): number {
  const stepId = getCurrentStepId(profile);
  return getStepIndex(stepId);
}

export function isResultStep(profile: UserProfile): boolean {
  return getCurrentStepId(profile) === "result";
}

export function shouldShowResult(profile: UserProfile): boolean {
  const { result } = findBestVisa(profile);
  return result !== null;
}
