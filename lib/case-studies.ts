export const caseStudies = [
  {
    slug: "fitness-app-onboarding",
    name: "Fitness app onboarding",
    category: "FUNCTIONALITY & UX",
    summary:
      "An illustrative brief for a fitness app’s first-session experience.",
    overview:
      "A fictional fitness app helps people create a routine and track workouts. This example demonstrates a testing approach; it is not customer work or a claim of observed results.",
    objectives:
      "Check whether a new user can create an account, choose a goal and save a first workout without assistance.",
    scope:
      "A proposed functional and UX pass over onboarding, permissions and workout saving, using agreed iPhone devices and dedicated test accounts.",
    approach:
      "Exercise fresh-install and returning-user paths. Try permission denial, invalid inputs and network interruption while saving. Record build, device and account preconditions.",
    findings:
      "Illustrative finding to demonstrate report structure: a goal selection is lost after returning from the permission screen. This scenario is fictional and was not observed in a client build.",
    recommendations:
      "If confirmed in a real engagement, preserve the selected goal across navigation, clarify permission messaging, and retest the save-and-relaunch path.",
    report:
      "Example QA-001 · Goal selection lost on back navigation. Preconditions: fresh test account. Steps: select a goal, open permissions, go back. Expected: selection preserved. Illustrative actual result: default goal shown. Evidence: add a redacted recording from an actual test.",
  },
  {
    slug: "budget-app-subscriptions",
    name: "Budget app subscriptions",
    category: "PURCHASES & RECOVERY",
    summary:
      "An illustrative approach to entitlement recovery and purchase-state testing.",
    overview:
      "A fictional budgeting app offers subscription features. This example explains possible coverage and is not a published customer engagement.",
    objectives:
      "Evaluate whether supported purchase and restore paths leave the app and backend in a consistent entitlement state.",
    scope:
      "A proposed sandbox purchase-state pass, with configured products, dedicated test accounts and the agreed device matrix. No real charges or production transaction claims.",
    approach:
      "Start from documented entitlement states. Exercise purchase cancellation, successful purchase, relaunch and restore. Compare visible access with the backend state.",
    findings:
      "Illustrative finding: after reinstalling, the restore action reports success while premium navigation remains locked. This is a fictional report example, not an observed defect.",
    recommendations:
      "If reproduced, synchronize the entitlement state after restore and provide a useful recovery message when verification is unavailable. Retest against a named fixed build.",
    report:
      "Example QA-002 · Premium access remains locked after restore. Preconditions: dedicated sandbox account with test entitlement. Steps: reinstall, sign in, restore. Expected: confirmed entitlement unlocks access. Illustrative actual result: feature remains locked. Include environment, build and evidence in a real report.",
  },
];
