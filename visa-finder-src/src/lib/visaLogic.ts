import type { UserProfile } from "@/types/quiz";
import type { VisaResult } from "@/types/quiz";
import { isWHVCountry, isDigitalNomadEligible } from "./constants";
import { VISA_DATABASE_2026 } from "./visaData";

const BM_INVESTMENT_THRESHOLD =
  VISA_DATABASE_2026.business_manager.thresholds.investment_ils;
const DN_INCOME_THRESHOLD =
  VISA_DATABASE_2026.digital_nomad.thresholds.income_ils_annual;
const WHV_AGE_MAX = VISA_DATABASE_2026.working_holiday.thresholds.age_max;
const WHV_AGE_MIN = VISA_DATABASE_2026.working_holiday.thresholds.age_min;

export interface VisaResultWithMeta {
  result: VisaResult;
  isShortcut: boolean;
}

function qualifiesWorkVisa(profile: UserProfile): boolean {
  return (
    (profile.degreeType === "10years" || profile.degreeType === "both") &&
    profile.companyAffiliatedWithJapan === true
  );
}

function qualifiesWHV(profile: UserProfile): boolean {
  return (
    profile.hasNonIsraeliPassport === true &&
    profile.passportCountry !== null &&
    profile.passportCountry !== "SKIP" &&
    isWHVCountry(profile.passportCountry) &&
    profile.userAge !== null &&
    profile.userAge >= WHV_AGE_MIN &&
    profile.userAge <= WHV_AGE_MAX
  );
}

function qualifiesDN(profile: UserProfile): boolean {
  return (
    profile.remoteWork === true &&
    profile.currentIncome !== null &&
    profile.currentIncome >= DN_INCOME_THRESHOLD &&
    profile.passportCountry !== null &&
    profile.passportCountry !== "SKIP" &&
    isDigitalNomadEligible(profile.passportCountry)
  );
}

function qualifiesBusinessManager(profile: UserProfile): boolean {
  return (
    profile.isBusinessOwner === true &&
    profile.expandBusinessToJapan === true &&
    profile.investmentAmount !== null &&
    profile.investmentAmount >= BM_INVESTMENT_THRESHOLD &&
    profile.hasManagementExpOrMasters === true &&
    profile.hasBusinessN2 === true
  );
}

const STARTUP_INVESTMENT_THRESHOLD =
  VISA_DATABASE_2026.startup.thresholds.investment_ils_max;

function qualifiesStartup(profile: UserProfile): boolean {
  return (
    profile.isBusinessOwner === true &&
    profile.expandBusinessToJapan === true &&
    profile.investmentAmount !== null &&
    profile.investmentAmount < STARTUP_INVESTMENT_THRESHOLD &&
    profile.isStartup === true
  );
}

/**
 * Priority Selection Engine: runs after final question.
 * Applies smart narrowing logic to suggest the best visa.
 */
export function findBestVisa(profile: UserProfile): VisaResultWithMeta {
  // Under 18
  if (profile.userAge !== null && profile.userAge < 18) {
    if (profile.parentJapanese === true)
      return { result: "child-of-japanese-national", isShortcut: false };
    return { result: "tourist-visa-hazure", isShortcut: false };
  }

  // Plan to marry Japanese partner
  if (
    profile.partnerStatus === true &&
    profile.partnerJapanese === true &&
    profile.planToMarry === true
  ) {
    return { result: "spouse-visa", isShortcut: false };
  }

  // Dependent Visa
  if (
    profile.partnerStatus === true &&
    profile.partnerJapanese === false &&
    profile.partnerDegreeOrHighIncome === true
  ) {
    return { result: "dependent-visa", isShortcut: false };
  }

  // Language School (Student Visa) — early exit for Japanese speakers
  if (
    profile.languages?.includes("japanese") &&
    profile.planToLanguageSchool === true
  ) {
    return { result: "language-school-visa", isShortcut: false };
  }

  // PRIORITY: Work + WHV → suggest WHV (shortcut, no degree/employer sponsor)
  if (qualifiesWorkVisa(profile) && qualifiesWHV(profile)) {
    return { result: "working-holiday-visa", isShortcut: true };
  }

  // PRIORITY: DN + WHV → suggest WHV (12 months vs 6)
  if (qualifiesDN(profile) && qualifiesWHV(profile)) {
    return { result: "working-holiday-visa", isShortcut: true };
  }

  // Business Manager (full qualification)
  if (qualifiesBusinessManager(profile)) {
    return { result: "business-manager-visa", isShortcut: false };
  }

  // PRIORITY: BM credentials but < ₪750k → suggest Startup Visa
  const hasBMCredentials =
    profile.isBusinessOwner === true &&
    profile.expandBusinessToJapan === true &&
    profile.investmentAmount !== null &&
    profile.investmentAmount >= STARTUP_INVESTMENT_THRESHOLD &&
    profile.investmentAmount < BM_INVESTMENT_THRESHOLD &&
    profile.hasManagementExpOrMasters === true &&
    profile.hasBusinessN2 === true;
  if (hasBMCredentials) {
    return { result: "startup-visa", isShortcut: true };
  }

  // Startup Visa (normal path)
  if (qualifiesStartup(profile)) {
    return { result: "startup-visa", isShortcut: false };
  }

  // Digital Nomad
  if (qualifiesDN(profile)) {
    return { result: "digital-nomad-visa", isShortcut: false };
  }

  // Work Visa
  if (qualifiesWorkVisa(profile)) {
    return { result: "work-visa", isShortcut: false };
  }

  // Student Visa
  if (
    (profile.degreeType === "bachelor" || profile.degreeType === "both") &&
    profile.continueToMaster === true
  ) {
    return { result: "student-visa", isShortcut: false };
  }

  // Working Holiday
  if (qualifiesWHV(profile)) {
    return { result: "working-holiday-visa", isShortcut: false };
  }

  // SSW
  if (
    profile.willingSpecialist === true &&
    profile.canPassN4 === true
  ) {
    return { result: "specified-skilled-worker", isShortcut: false };
  }

  // Cultural Activities
  if (
    profile.isArtStudent === true &&
    profile.hasArtSponsor === true &&
    profile.savingsForArt === true
  ) {
    return { result: "cultural-activities-visa", isShortcut: false };
  }

  // Spouse Taste Test
  if (profile.spouseHailMary === true) {
    return { result: "spouse-visa-theoretical", isShortcut: false };
  }

  if (profile.spouseHailMary === false) {
    return { result: "90-day-tourist-visa", isShortcut: false };
  }

  return { result: null, isShortcut: false };
}

/** Legacy: returns raw result for flow logic */
export function computeVisaResult(profile: UserProfile): VisaResult | null {
  return findBestVisa(profile).result;
}
