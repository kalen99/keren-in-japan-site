# Japan Visa Finder — Full Question Flow Structure

This document maps the complete selection flow. Arrows (→) show transitions; `[result]` means the quiz ends with a visa recommendation.

---

## 1. Age & Family (18+ only continues)

```
age
├── < 18 → parent-japanese
│           ├── Yes → [Child of Japanese National]
│           └── No  → [Tourist Visa Hazure]
└── ≥ 18  → partner-status
```

---

## 2. Partner Path (if partner = No, skip to Languages)

```
partner-status (Do you have a partner?)
├── No  → languages
└── Yes → partner-japanese (Is partner Japanese?)
            ├── Yes → plan-to-marry
            │           ├── Yes → [Spouse Visa]
            │           └── No  → languages
            └── No  → languages  (skip partner-degree; asked only as last resort)
```

---

## 3. Languages (always asked)

```
languages (Which languages do you speak?)
├── If "english" → english-level
├── If "japanese" → jlpt-level
│                   → language-school (Do you plan to pursue language school in Japan?)
│                       ├── Yes → [Student Visa]
│                       └── No  → business-owner
└── → business-owner
```

---

## 4. Business Path

```
business-owner (Are you a business owner?)
├── No  → employed
└── Yes → expand-to-japan (Planning to expand to Japan?)
            ├── No  → degree  (skip employed; go to Student / Work / WHV path)
            └── Yes → investment (How much can you invest?)
                        ├── < ₪100k → startup (Are you a startup?)
                        │               ├── Yes → [Startup Visa]
                        │               └── No  → degree  (skip employed)
                        └── ≥ ₪100k → management-masters (3yr management or Master's?)
                                        ├── Yes → business-n2 (N2 Japanese?)
                                        │           ├── Yes → [Business Manager or Startup*]
                                        │           └── No  → degree  (skip employed)
                                        └── No  → degree  (skip employed)
```

*Startup if investment ₪100k–₪750k; Business Manager if ≥₪750k

---

## 5. Employment Path (for Digital Nomad)

```
employed (Are you employed?) — skipped if business owner
├── No  → degree
└── Yes → remote (Can you work remotely?)
            ├── No  → degree
            └── Yes → income (Annual income?)
                        → degree
```

---

## 6. Degree Path

```
degree (Bachelor's / 10 years / both / neither?)
├── bachelor or both → continue-to-master (Planning Master's?)
│                       ├── Yes → [Student Visa MEXT]
│                       └── No  → passport
└── 10years or both  → company-affiliated (Company affiliated with Japan?)
                        ├── Yes → [Work Visa]
                        └── No  → passport

degree = "none" → passport
```

---

## 7. Passport (at end — for WHV & Digital Nomad)

```
passport (Do you have a non-Israeli passport?)
├── No  → specialist
└── Yes → passport-country (Which country?)
            ├── WHV match (18–30, WHV country) → [Working Holiday]
            ├── DN match (remote + ₪240k+ + DN country) → [Digital Nomad]
            └── else → specialist
```

---

## 8. Specialist Path (SSW)

```
specialist (Willing to be Specified Skilled Worker?)
├── No  → art-student
└── Yes → n4 (Can you pass N4?)
            ├── Yes → [Specified Skilled Worker]
            └── No  → art-student
```

---

## 9. Art Path (Cultural Activities)

```
art-student (Are you an art student?)
├── No  → spouse-hail-mary
└── Yes → art-sponsor (Have a sponsor?)
            → art-savings (Have savings?)
                ├── Yes + Yes → [Cultural Activities Visa]
                └── else      → spouse-hail-mary
```

---

## 10. Last Resort (only when all other routes fail → Tourist visa)

```
partner-degree (ONLY if partner=Yes, partner≠Japanese, not yet asked)
  Does your partner have a Bachelor's Degree or high income?
├── Yes → [Dependent Visa]
└── No  → spouse-hail-mary

spouse-hail-mary (Considering marrying a Japanese national?)
├── Yes → [Spouse Visa]
└── No  → [Tourist Visa Hazure]
```

---

## Summary of Clunky / Redundant Points

| Issue | Current Flow | Suggestion |
|-------|--------------|------------|
| ~~Business owner → employed~~ | ~~Resolved~~ | Business owners skip employed entirely |
| **Degree "both"** | "Both" goes to continue-to-master first; company-affiliated is never asked for "both" | Clarify: does "both" mean Student path, Work path, or user choice? |
| **Passport timing** | Passport asked late; WHV/DN depend on it | Already at end — OK for shortcut logic |

---

## Linear Step Order (for reference)

```
age → parent-japanese → partner-status → partner-japanese → plan-to-marry 
→ languages → english-level → jlpt-level → language-school → business-owner 
→ expand-to-japan → investment → startup → management-masters → business-n2 
→ employed → remote → income → degree → continue-to-master → company-affiliated 
→ passport → passport-country → specialist → n4 → art-student → art-sponsor 
→ art-savings → partner-degree → spouse-hail-mary → result
```

Note: The actual flow is **branching**; the order above is the sequence of step IDs, not the user path.
