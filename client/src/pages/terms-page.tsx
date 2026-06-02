import { MarketingLayout } from '@/components/marketing-layout'

export function TermsPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Legal
        </p>
        <h1 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--text-main)]">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Last updated: June 1, 2026
        </p>

        <div className="mt-12 space-y-8 text-sm leading-7 text-[var(--text-muted)]">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using Watchdog, you agree to be bound by these
              Terms &amp; Conditions. If you do not agree, you may not use the
              service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Description of Service
            </h2>
            <p>
              Watchdog provides a unified observability platform including
              uptime monitoring, error tracing, alert routing, incident
              management, and status pages. The service is delivered as a
              cloud-based web application.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              User Accounts
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>You must be authorised by your workspace to create an account</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials</li>
              <li>Google handles authentication; we do not store passwords</li>
              <li>You may not share your account access with unauthorised users</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Acceptable Use
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>You may use the service only for lawful purposes and in accordance with these terms</li>
              <li>You may not use the service to monitor systems you do not own or have permission to monitor</li>
              <li>You may not attempt to disrupt, compromise, or reverse-engineer the service</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Service Level
            </h2>
            <p>
              We aim to provide a reliable service but do not guarantee
              uninterrupted availability. The service is provided &quot;as
              is&quot; without warranties of any kind, express or implied.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Limitation of Liability
            </h2>
            <p>
              Watchdog shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of the
              service, including but not limited to missed incidents, data loss,
              or business interruption.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Termination
            </h2>
            <p>
              We may suspend or terminate your access to the service if you
              violate these terms. You may discontinue use at any time. Upon
              termination, your data will be handled per our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to update these terms. Continued use of the
              service after changes constitutes acceptance of the new terms.
              Material changes will be communicated via email.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which
              the workspace is registered. Any disputes shall be resolved in the
              courts of that jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  )
}
