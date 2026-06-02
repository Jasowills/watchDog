import { MarketingLayout } from '@/components/marketing-layout'

export function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Legal
        </p>
        <h1 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--text-main)]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Last updated: June 1, 2026
        </p>

        <div className="mt-12 space-y-8 text-sm leading-7 text-[var(--text-muted)]">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Information We Collect
            </h2>
            <p>
              When you sign in with Google, we collect your name, email address,
              and profile picture from your Google account. This information is
              used solely to identify you within your workspace and personalise
              your experience.
            </p>
            <p className="mt-3">
              We collect monitoring data you configure through the product: URLs
              to check, alert channels, error traces from our SDK, and incident
              timelines. This data belongs to your workspace and is not shared
              outside it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              How We Use Your Information
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To authenticate you and manage workspace access</li>
              <li>To deliver the monitoring, alerting, and tracing features you configure</li>
              <li>To send you service notifications (e.g. incident alerts) via your configured channels</li>
              <li>To improve the product through anonymous usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Data Sharing
            </h2>
            <p>
              We do not sell your personal information. We do not share your
              monitoring data with third parties except as required to operate
              the service (e.g. cloud infrastructure providers) or as compelled
              by law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Data Retention
            </h2>
            <p>
              We retain your account information for as long as your workspace
              is active. Monitoring data is retained according to your
              workspace&apos;s retention settings. You may request deletion of
              your data at any time by contacting support.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Security
            </h2>
            <p>
              All data in transit is encrypted over TLS. Authentication is
              handled by Google OAuth 2.0; we do not store passwords. We follow
              industry-standard practices to protect data at rest.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Changes to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Material changes will
              be communicated via the email address associated with your
              workspace.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--text-main)]">
              Contact
            </h2>
            <p>
              If you have questions about this policy, contact your workspace
              administrator or reach us at the support address listed in the
              application.
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  )
}
