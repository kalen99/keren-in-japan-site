/**
 * VISA_DATABASE_2026 - Master data source for visa thresholds, sliders, and result cards.
 * Use this object for: slider min/max, validation thresholds, and Result Card content.
 */

export const VISA_DATABASE_2026 = {
  business_manager: {
    title: "Business Manager Visa",
    japaneseTitle: "経営・管理",
    thresholds: {
      investment_ils: 750000, // Approx 30M JPY
      experience_years: 3,
      language_level: "N2",
    },
    conditions: [
      "30M JPY Capital",
      "Local Office Space",
      "Business Plan Required",
    ],
    stay_limit: "1 - 5 Years (Renewable)",
    badge: "🏢 EXECUTIVE",
  },
  digital_nomad: {
    title: "Digital Nomad Visa",
    japaneseTitle: "特定活動 (Digital Nomad)",
    thresholds: {
      income_ils_annual: 240000, // 10M JPY
      eligible_passports: [
        "Israel",
        "USA",
        "UK",
        "Germany",
        "France",
        "EU",
        "Australia",
        "Singapore",
      ],
    },
    conditions: [
      "Remote Work Only",
      "Private Health Insurance",
      "Non-Renewable",
    ],
    stay_limit: "6 Months",
    badge: "💻 NOMAD",
  },
  working_holiday: {
    title: "Working Holiday Visa",
    japaneseTitle: "特定活動 (WHV)",
    thresholds: {
      age_max: 30,
      age_min: 18,
      eligible_countries: [
        "Germany",
        "France",
        "UK",
        "Canada",
        "Australia",
        "New Zealand",
        "Netherlands",
      ],
    },
    conditions: [
      "12-Month Stay",
      "Incidental Work Allowed",
      "One-time Only",
    ],
    stay_limit: "1 Year",
    badge: "🎒 EXPLORER",
  },
  student: {
    title: "Student Visa",
    japaneseTitle: "留学",
    thresholds: {
      savings_ils: 750000, // 2M JPY Approx
      school_enrollment: true,
    },
    conditions: [
      "28hrs/week Work Permit",
      "Language School Enrollment",
    ],
    stay_limit: "6 Months - 2 Years",
    badge: "🎓 SCHOLAR",
  },
  startup: {
    title: "Startup Visa",
    japaneseTitle: "スタートアップビザ",
    thresholds: {
      investment_ils_max: 100000,
    },
    conditions: [
      "2-Year Launchpad",
      "Tokyo or Fukuoka",
      "Startup Support",
    ],
    stay_limit: "2 Years",
    badge: "🚀 STARTUP",
  },
  cultural_activities: {
    title: "Cultural Activities Visa",
    japaneseTitle: "文化活動",
    thresholds: {
      savings_ils: 75000,
    },
    conditions: [
      "Traditional Arts Study",
      "Sponsor Required",
      "Limited Work",
    ],
    stay_limit: "1 - 3 Years",
    badge: "🎌 CULTURAL",
  },
};

/** Slider config derived from database thresholds */
export const SLIDER_CONFIG = {
  income: {
    min: 0,
    max: 1000000,
    step: 10000,
    threshold: VISA_DATABASE_2026.digital_nomad.thresholds.income_ils_annual,
  },
  investment: {
    min: 0,
    max: 1000000,
    step: 50000,
    threshold: VISA_DATABASE_2026.business_manager.thresholds.investment_ils,
  },
};

/** Map visa result keys (from visaLogic) to database keys */
export const VISA_RESULT_TO_DB_KEY = {
  "business-manager-visa": "business_manager",
  "digital-nomad-visa": "digital_nomad",
  "working-holiday-visa": "working_holiday",
  "student-visa": "student",
  "language-school-visa": "student",
  "startup-visa": "startup",
  "cultural-activities-visa": "cultural_activities",
};
