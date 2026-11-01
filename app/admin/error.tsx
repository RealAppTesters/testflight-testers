"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="portal">
      <main className="p-main">
        <h1>We couldn’t load your workspace.</h1>
        <p>
          The service may need configuration, or your account may not have
          access. Please retry or contact support@testflighttesters.com.
        </p>
        <button className="p-button" onClick={reset}>
          Try again
        </button>
        <a className="p-secondary" href="/login">
          Sign in
        </a>
      </main>
    </div>
  );
}
