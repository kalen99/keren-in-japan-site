export type UserLanguage = "english" | "japanese" | "other";
export type JLPTLevel = "N1" | "N2" | "N3" | "N4" | "N5";
export type EnglishLevel = "native" | "business" | "casual" | "can-speak-a-little";
export type DegreeType = "bachelor" | "10years" | "both" | "none";

export interface UserProfile {
  userAge: number | null;
  parentJapanese: boolean | null;
  partnerStatus: boolean | null;
  partnerJapanese: boolean | null;
  planToMarry: boolean | null;
  partnerDegreeOrHighIncome: boolean | null;
  languages: UserLanguage[] | null;
  englishLevel: EnglishLevel | null;
  jlptLevel: JLPTLevel | null;
  planToLanguageSchool: boolean | null;
  hasNonIsraeliPassport: boolean | null;
  passportCountry: string | null;
  isBusinessOwner: boolean | null;
  expandBusinessToJapan: boolean | null;
  investmentAmount: number | null;
  isStartup: boolean | null;
  hasManagementExpOrMasters: boolean | null;
  hasBusinessN2: boolean | null;
  isEmployed: boolean | null;
  remoteWork: boolean | null;
  currentIncome: number | null;
  degreeType: DegreeType | null;
  continueToMaster: boolean | null;
  companyAffiliatedWithJapan: boolean | null;
  isArtStudent: boolean | null;
  hasArtSponsor: boolean | null;
  savingsForArt: boolean | null;
  willingSpecialist: boolean | null;
  canPassN4: boolean | null;
  spouseHailMary: boolean | null;
}

export type VisaResult =
  | "child-of-japanese-national"
  | "working-holiday-visa"
  | "spouse-visa"
  | "dependent-visa"
  | "business-manager-visa"
  | "startup-visa"
  | "digital-nomad-visa"
  | "work-visa"
  | "student-visa"
  | "language-school-visa"
  | "cultural-activities-visa"
  | "specified-skilled-worker"
  | "tourist-visa-hazure"
  | "spouse-visa-theoretical"
  | "90-day-tourist-visa"
  | null;
