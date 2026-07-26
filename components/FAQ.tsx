export default function FAQ() {
  const faqs = [
    { q: "How do invitations work?", a: "You share your TestFlight public link. Testers install and start testing immediately." },
    { q: "How many devices do you test on?", a: "We test across a range of iPhones and iPads. You can specify models." },
    { q: "Can you test In-App Purchases?", a: "Yes, we can test IAP flows end-to-end with real purchase scenarios." },
    { q: "Can you sign an NDA?", a: "Absolutely. We sign NDAs before any testing begins." },
    { q: "Can you test login & authentication?", a: "Yes, we test all login flows including social sign-in, email, and 2FA." },
    { q: "Can you test subscriptions?", a: "We test subscription flows, renewals, and cancellation paths." },
    { q: "Can you test push notifications?", a: "Yes, we validate push notification delivery and handling." },
    { q: "Can I choose countries?", a: "Yes, you can select specific countries or regions for testing." },
  ];

  return (
    <div className="faq-grid">
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <div className="q"><i className="fas fa-question-circle"></i> {faq.q}</div>
          <div className="a">{faq.a}</div>
        </div>
      ))}
    </div>
  );
}
