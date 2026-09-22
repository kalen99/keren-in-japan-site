// Working Holiday Visa - 31 countries (incl. Malta)
export const whvCountries = [
  "Australia",
  "New Zealand",
  "Canada",
  "South Korea",
  "France",
  "Germany",
  "United Kingdom",
  "Ireland",
  "Denmark",
  "Taiwan",
  "Hong Kong",
  "Norway",
  "Portugal",
  "Poland",
  "Slovakia",
  "Austria",
  "Hungary",
  "Spain",
  "Argentina",
  "Chile",
  "Iceland",
  "Czech Republic",
  "Lithuania",
  "Sweden",
  "Estonia",
  "Netherlands",
  "Uruguay",
  "Finland",
  "Latvia",
  "Luxembourg",
  "Malta",
] as const;

// Digital Nomad - 49 countries (incl. Israel)
export const dnCountries = [
  ...whvCountries,
  "Israel",
  "United States",
  "United Arab Emirates",
  "Singapore",
  "Switzerland",
  "Brazil",
  "Mexico",
  "Thailand",
  "Croatia",
  "Bulgaria",
  "Romania",
  "Greece",
  "Cyprus",
  "Slovenia",
  "Belgium",
  "Italy",
  "Monaco",
  "San Marino",
] as const;

// Legacy exports for compatibility
export const WHV_COUNTRIES = whvCountries;
export const DIGITAL_NOMAD_ELIGIBLE = dnCountries;

export const normalizeCountryForMatch = (input: string): string =>
  input.trim().toLowerCase().replace(/\s+/g, " ");

const COUNTRY_ALIASES: Record<string, string> = {
  czechia: "czech republic",
  uk: "united kingdom",
  korea: "south korea",
};

export const isWHVCountry = (country: string): boolean => {
  const normalized = normalizeCountryForMatch(country);
  const withAlias = COUNTRY_ALIASES[normalized] ?? normalized;
  return whvCountries.some(
    (c) =>
      normalizeCountryForMatch(c) === withAlias ||
      normalizeCountryForMatch(c) === normalized
  );
};

export const isDigitalNomadEligible = (country: string): boolean => {
  const normalized = normalizeCountryForMatch(country);
  const withAlias = COUNTRY_ALIASES[normalized] ?? normalized;
  return dnCountries.some(
    (c) =>
      normalizeCountryForMatch(c) === withAlias ||
      normalizeCountryForMatch(c) === normalized
  );
};
