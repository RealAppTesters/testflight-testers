export const articles = [
  {
    slug: "how-to-find-real-testflight-testers",
    title: "How to Find Real TestFlight Testers",
    category: "Getting started",
    description:
      "Build a useful tester brief and recruit people who can exercise the journeys that matter.",
    sections: [
      [
        "Start with the risk, not the headcount",
        "Write down the decision your beta needs to support. You might need to know whether a new customer can finish onboarding, whether an existing customer can restore an entitlement, or whether a workflow remains usable with larger text. These questions lead to a more useful recruitment brief than a request for downloads.",
        "List the required device families, supported operating systems, languages and account states. Separate requirements from preferences so you can see where your planned coverage has gaps.",
      ],
      [
        "Give testers a repeatable assignment",
        "Provide the build identifier, invitation link, dedicated test account instructions and a short list of priorities. Ask for reproduction steps, expected and actual results, and the device and OS used. A screenshot without context can be difficult to investigate.",
        "Use a small initial assignment to check whether feedback is actionable. Agree on how sensitive screenshots and credentials will be handled. Recruitment, exploratory feedback and structured QA are different services; establish which you are buying.",
      ],
    ],
  },
  {
    slug: "how-to-get-external-testflight-testers",
    title: "How to Get External TestFlight Testers",
    category: "Getting started",
    description:
      "Prepare an external testing group, an accessible build and a brief that makes feedback useful.",
    sections: [
      [
        "Prepare before sharing",
        "Confirm your beta build is available to the intended external testing group. Open the invitation on a separate test device and check that installation and account setup work. Include any access requirements in your brief.",
        "Keep public recruitment separate from private test account credentials. Share dedicated account information through an access-controlled channel, and rotate credentials after the engagement.",
      ],
      [
        "Turn invitations into feedback",
        "Explain who the app is for and which tasks you want tested. Give testers a way to report issues and a clear description of the information you need.",
        "Before each new build, explain what changed and which earlier issues need retesting. A growing invitation list does not establish that those workflows were exercised.",
      ],
    ],
  },
  {
    slug: "complete-guide-testflight-beta-testing",
    title: "Complete Guide to TestFlight Beta Testing",
    category: "Testing guides",
    description:
      "A practical workflow from a testable beta build to a reviewed issue list.",
    sections: [
      [
        "Define entry conditions",
        "Before the testing window opens, verify that the build installs, the test backend is reachable and dedicated accounts have the right permissions. Record the build number and the features included in scope.",
        "Create a compact device and account matrix. Include fresh installations and an upgrade path when that distinction affects the release. Agree on the reporting format and who will triage findings.",
      ],
      [
        "Run, report and retest",
        "Begin with a smoke pass over launch, authentication and the principal task. Follow with the purchased functional or exploratory scope. Preserve useful evidence without collecting unnecessary personal data.",
        "Triage each finding by user impact and reproducibility. Retest fixes on a named build and record whether the issue is resolved, persists or cannot be reproduced. Keep untested areas visible in the release decision.",
      ],
    ],
  },
  {
    slug: "how-much-does-testflight-testing-cost",
    title: "How Much Does TestFlight Testing Cost?",
    category: "Planning",
    description:
      "Understand the difference between distribution and paid testing effort.",
    sections: [
      [
        "Budget for defined work",
        "Testing effort depends on the number of testers, hours per tester, device coverage and the scenarios included. More people can broaden perspective; more time can deepen investigation. Neither substitutes for a clear brief.",
        "On TestFlightTesters, the existing calculator uses $10 per tester per hour. Standard delivery adds no surcharge; priority adds $2 per tester and express adds $5 per tester. Use the live calculator to review your selected configuration before paying.",
      ],
      [
        "Compare like-for-like scope",
        "A five-tester, one-hour standard configuration is $50 under that formula. Adding priority delivery makes it $60. These are examples of the calculation, not a promise of exhaustive app coverage.",
        "When comparing services, ask whether the scope includes reproduction steps, device information, evidence, a reviewed report and any retesting. Clarify delivery timing and what happens if the build or test accounts are not ready.",
      ],
    ],
  },
  {
    slug: "internal-vs-external-testflight-testers",
    title: "Internal vs External TestFlight Testers",
    category: "Getting started",
    description:
      "Choose a testing audience based on access needs and the feedback you need.",
    sections: [
      [
        "Keep team access deliberate",
        "Internal testing is suited to a trusted development and product team. External testing is intended for a broader audience. Consult Apple’s current eligibility and review requirements before setting up groups.",
        "Do not grant a tester access to your development organization simply to make recruitment easier. Choose an invitation approach that gives them the access they need without additional privileges.",
      ],
      [
        "Use both perspectives thoughtfully",
        "Your internal team can quickly verify build health and implementation details. People outside the team can reveal unclear instructions, hidden assumptions and unfamiliar workflows.",
        "Use a shared issue format so findings can be compared and triaged. Neither audience guarantees coverage; record what was actually tested and by whom.",
      ],
    ],
  },
  {
    slug: "how-many-testflight-testers-do-you-need",
    title: "How Many TestFlight Testers Do You Need?",
    category: "Planning",
    description:
      "Choose tester numbers around risk, coverage and useful feedback.",
    sections: [
      [
        "Map the important variations",
        "List the tasks, devices, languages and account states that could materially affect the experience. Identify the combinations that must be exercised before release. A single tester cannot cover an unlimited matrix in a short session.",
        "For a narrow change, a focused assignment may be sufficient to answer a specific question. A major onboarding redesign or new subscription flow may need distinct assignments for different user states.",
      ],
      [
        "Allocate time before scaling people",
        "Decide how long each assignment takes, including setup and reporting. If the assignment barely fits the purchased time, reduce scope or increase the testing budget.",
        "Add testers when you need additional perspectives or independent coverage, and add time when you need deeper investigation. Review the first findings before expanding the engagement. No fixed headcount proves an app is bug-free.",
      ],
    ],
  },
  {
    slug: "ios-app-testing-checklist-before-launch",
    title: "iOS App Testing Checklist Before Launch",
    category: "Testing guides",
    description:
      "A risk-based checklist for the moments that can derail a release.",
    sections: [
      [
        "Check the principal journey",
        "Verify installation, first launch, account creation, sign-in and the app’s primary task. Repeat the task after closing and reopening the app. Check how the app behaves when permissions are denied or connectivity changes.",
        "Exercise supported display sizes, larger text and the navigation patterns that matter to your audience. Record the device, OS and build for each meaningful failure.",
      ],
      [
        "Check recovery and release readiness",
        "Include invalid input, expired sessions, empty states and interruptions during save operations. If purchases are in scope, verify entitlement recovery and the states your backend supports.",
        "Review privacy-sensitive output in logs and screenshots. Retest critical fixes and preserve a list of untested areas. This checklist guides a brief; the purchased scope determines which checks are performed.",
      ],
    ],
  },
  {
    slug: "how-to-test-in-app-purchases-ios",
    title: "How to Test In-App Purchases on iOS",
    category: "Testing guides",
    description:
      "Plan purchase tests around entitlement states and recovery, using Apple’s testing tools.",
    sections: [
      [
        "Design a purchase state matrix",
        "Separate StoreKit testing in development from testing through a distributed beta. Follow Apple’s current sandbox setup instructions for the environment you use. Test purchases are not evidence of production revenue.",
        "Create dedicated test accounts and document the products, subscription groups and expected entitlements. Avoid sharing personal payment credentials.",
      ],
      [
        "Verify more than the happy path",
        "Include successful purchase, user cancellation, interrupted transactions, restore behavior and relaunch after purchase. Where applicable, test subscription changes, expiration and the server’s handling of entitlement updates.",
        "Record the environment and account state alongside every finding. Verify the app and backend agree on access. Keep a reproducible scenario for any discrepancy rather than assuming a purchase sheet’s success means the feature is unlocked correctly.",
      ],
    ],
  },
  {
    slug: "testing-ios-apps-different-devices",
    title: "Testing iOS Apps on Different Devices",
    category: "Testing guides",
    description: "Build a device matrix that reflects real product risk.",
    sections: [
      [
        "Pick meaningful differences",
        "Choose devices by supported screen size, OS version and capabilities used by your app. Include iPad layouts when the app supports them. A list of model names is less useful than an explanation of what each device is intended to cover.",
        "Assign a specific set of workflows to each device. Include orientation changes or interrupted sessions where relevant. Record any unavailable combinations before the engagement begins.",
      ],
      [
        "Keep comparisons reproducible",
        "Use the same build and comparable account data when investigating a device-specific difference. Record text size, orientation and network conditions where these may matter.",
        "A simulator can help early development checks, but it does not establish how every supported physical device behaves. Ask for the actual device and OS used in each reported issue, and disclose gaps in the final report.",
      ],
    ],
  },
  {
    slug: "how-to-write-professional-ios-qa-report",
    title: "How to Write a Professional iOS QA Report",
    category: "QA reports",
    description:
      "Turn observations into findings a developer can reproduce and prioritize.",
    sections: [
      [
        "Give each issue a complete story",
        "Start with a precise title, build number, device, OS and preconditions. Write the smallest sequence that reproduces the problem. Separate what should happen from what actually happens.",
        "Add evidence that helps diagnosis. Crop screenshots to the relevant area and remove personal data. Explain frequency and impact without using severity as a substitute for detail.",
      ],
      [
        "Make the report useful for a release decision",
        "Summarize the tested scope, important findings and known limitations. Distinguish confirmed defects from usability observations and recommendations. Avoid percentages unless you have a defined denominator.",
        "Group findings consistently and give them stable identifiers for retesting. A reviewed PDF should help the team decide what to fix next while preserving the evidence behind that decision.",
      ],
    ],
  },
  {
    slug: "common-bugs-ios-beta-testing",
    title: "Common Bugs Found During iOS Beta Testing",
    category: "Testing guides",
    description:
      "Useful failure patterns to investigate without assuming they exist in every app.",
    sections: [
      [
        "Look at state transitions",
        "A screen may work correctly on first load and fail after logout, expiration or navigation back from a purchase. Test transitions between signed-out, signed-in and interrupted states.",
        "Pay attention to stale cached data, duplicate submissions and operations that appear successful before a network request finishes. Record the exact sequence rather than reporting only the final broken screen.",
      ],
      [
        "Include layout and recovery",
        "Long labels, larger text and empty data sets can expose layout assumptions. Connectivity changes can reveal unclear error messages or a missing retry path.",
        "These are investigation prompts, not claims about the frequency of defects in any product. Prioritize scenarios that match your app’s features and users, and explain untested areas in the report.",
      ],
    ],
  },
  {
    slug: "how-to-prepare-app-testflight-testing",
    title: "How to Prepare Your App for TestFlight Testing",
    category: "Getting started",
    description: "Remove setup friction so testing time goes into your app.",
    sections: [
      [
        "Make the build and account usable",
        "Verify the invitation on a separate device. Confirm the intended build is available, the backend is running and test accounts have the right data and permissions. Tell the team about geographic or network restrictions.",
        "Provide an app summary and a short priority list. Explain any expected limitations so testers can distinguish known gaps from new findings.",
      ],
      [
        "Define the handoff",
        "Share dedicated test credentials through a secure channel. Specify which environments can safely receive test data and which actions must be avoided. Agree on the evidence and reporting format.",
        "Keep the build stable during the testing window, or announce changes with a new build identifier. After testing, rotate credentials and review findings with the team before planning retests.",
      ],
    ],
  },
].map((a) => ({
  ...a,
  date: "2026-11-01",
  readTime: `${Math.max(3, Math.ceil(a.sections.flat().join(" ").split(" ").length / 180))} min read`,
}));
export const appleSources = [
  {
    title: "Apple: TestFlight overview",
    url: "https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/",
  },
  {
    title: "Apple: Invite external testers",
    url: "https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers/",
  },
  {
    title: "Apple: Testing in-app purchases with sandbox",
    url: "https://developer.apple.com/documentation/storekit/testing-in-app-purchases-with-sandbox",
  },
];
