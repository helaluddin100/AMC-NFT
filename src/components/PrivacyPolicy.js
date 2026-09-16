import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LAST_UPDATED = "September 17, 2026";
const SITE_URL = "https://appmafiaclub.netlify.app";
const CONTACT_EMAIL = "privacy@apemafiaclub.com";
const CROSSMINT_PRIVACY = "https://www.crossmint.com/legal/privacy-policy";
const CROSSMINT_TERMS = "https://www.crossmint.com/legal/terms-of-service";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="legal-page">
      <div className="legal-page__inner">
        <p className="legal-page__eyebrow">Ape Mafia Club</p>
        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__meta">Last updated: {LAST_UPDATED}</p>

        <p>
          This Privacy Policy explains how <strong>Ape Mafia Club</strong>{" "}
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
          shares, and protects personal information when you visit{" "}
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
            {SITE_URL}
          </a>{" "}
          (the &quot;Site&quot;) or use our NFT minting and related services
          (the &quot;Services&quot;).
        </p>
        <p>
          We use <strong>Crossmint, Inc.</strong> and its affiliates
          (&quot;Crossmint&quot;) as our payment, checkout, and digital-asset
          delivery partner. When you buy an NFT with a card or receive an NFT
          by email through Crossmint, Crossmint processes certain personal data
          under its own{" "}
          <a href={CROSSMINT_PRIVACY} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          . By using card checkout or Crossmint-powered features on our Site,
          you acknowledge that Crossmint may process your information as
          described there and in this Policy.
        </p>

        <h2>1. Who we are</h2>
        <p>
          Ape Mafia Club operates the Site and the Ape Mafia Club NFT
          collection. For privacy questions related to our Site and Services,
          contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          For privacy questions about Crossmint&apos;s processing of your data
          during checkout, wallet creation, or payment, contact Crossmint at{" "}
          <a href="mailto:privacy@crossmint.com">privacy@crossmint.com</a> or
          review their{" "}
          <a href={CROSSMINT_PRIVACY} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>

        <h2>2. Information we collect</h2>
        <p>
          The personal information we collect depends on how you interact with
          us:
        </p>
        <h3>2.1 Information you provide</h3>
        <ul>
          <li>
            <strong>Email address</strong> — when you start a card checkout,
            claim, or request NFT delivery to email (no crypto wallet required).
          </li>
          <li>
            <strong>Communications</strong> — messages you send us via email or
            social channels (for example Discord, Twitter/X, or Instagram).
          </li>
        </ul>
        <h3>2.2 Information from wallet / blockchain interactions</h3>
        <ul>
          <li>
            <strong>Public wallet address</strong> — when you connect a wallet
            and mint on-chain.
          </li>
          <li>
            <strong>On-chain transaction data</strong> — publicly available
            blockchain records related to your mint or transfer (for example
            transaction hash, NFT token ID, and timestamps).
          </li>
        </ul>
        <h3>2.3 Information collected automatically</h3>
        <ul>
          <li>
            Device and usage data such as browser type, approximate location
            derived from IP address, pages visited, and referring URLs.
          </li>
          <li>
            Cookies or similar technologies needed for Site functionality,
            security, and basic analytics, where permitted by law.
          </li>
        </ul>
        <h3>2.4 Information processed by Crossmint (payment partner)</h3>
        <p>
          When you use Crossmint Checkout or related Crossmint services on our
          Site, Crossmint may collect and process information needed to
          complete your purchase and deliver your NFT, which may include:
        </p>
        <ul>
          <li>Contact details (such as email address and name)</li>
          <li>
            Payment and transaction details (for example card payments
            processed by Crossmint and its payment providers; we do not store
            your full card number)
          </li>
          <li>
            Wallet or custodial delivery details used to send you the NFT
          </li>
          <li>
            Device, fraud-prevention, and compliance data as described in
            Crossmint&apos;s Privacy Policy
          </li>
          <li>
            Identity or KYC information if Crossmint is legally required to
            collect it for a particular service or jurisdiction
          </li>
        </ul>
        <p>
          Crossmint acts as an independent controller (or as otherwise
          described in its policies) for payment, compliance, and custodial
          wallet services it provides. Please review Crossmint&apos;s{" "}
          <a href={CROSSMINT_PRIVACY} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href={CROSSMINT_TERMS} target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          for full details.
        </p>

        <h2>3. How we use your information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Provide, operate, and improve the Site and Services</li>
          <li>
            Process NFT purchases and deliver NFTs to your email or wallet
          </li>
          <li>
            Enable Crossmint checkout and related payment / delivery flows
          </li>
          <li>Respond to support requests and communicate with you</li>
          <li>
            Detect, prevent, and investigate fraud, abuse, or security
            incidents
          </li>
          <li>Comply with applicable laws and enforce our terms</li>
          <li>
            Send project updates or marketing only where permitted (you may
            opt out of marketing at any time)
          </li>
        </ul>

        <h2>4. Legal bases (EEA / UK / similar laws)</h2>
        <p>Where required, we process personal data based on:</p>
        <ul>
          <li>
            <strong>Contract</strong> — to fulfill your mint or purchase
            request
          </li>
          <li>
            <strong>Legitimate interests</strong> — to secure and improve our
            Services, provided these interests are not overridden by your
            rights
          </li>
          <li>
            <strong>Consent</strong> — where required (for example certain
            cookies or marketing)
          </li>
          <li>
            <strong>Legal obligation</strong> — where we must retain or
            disclose information to comply with law
          </li>
        </ul>

        <h2>5. How we share information</h2>
        <p>We may share personal information with:</p>
        <ul>
          <li>
            <strong>Crossmint</strong> — to process payments, create or use
            wallets for delivery, mint or transfer NFTs, prevent fraud, and
            meet compliance requirements. Crossmint&apos;s processing is
            governed by its{" "}
            <a
              href={CROSSMINT_PRIVACY}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Service providers</strong> — hosting, analytics, email, or
            security vendors who process data on our instructions
          </li>
          <li>
            <strong>Blockchain networks</strong> — public ledgers where wallet
            addresses and transaction data are inherently public
          </li>
          <li>
            <strong>Legal / safety</strong> — when required by law, court
            order, or to protect rights, safety, or property
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger,
            acquisition, or asset sale, subject to appropriate safeguards
          </li>
        </ul>
        <p>We do not sell your personal information for money.</p>

        <h2>6. International transfers</h2>
        <p>
          We and our partners (including Crossmint) may process information in
          the United States and other countries. Where required, transfers are
          protected by appropriate safeguards such as standard contractual
          clauses or frameworks described by our partners (including
          Crossmint&apos;s Data Privacy Framework participation, as applicable).
        </p>

        <h2>7. Retention</h2>
        <p>
          We retain personal information only as long as needed for the
          purposes described in this Policy, including to provide the Services,
          resolve disputes, enforce agreements, and meet legal, tax, accounting,
          or compliance requirements. Blockchain records are permanent and
          outside our control once published on-chain.
        </p>

        <h2>8. Security</h2>
        <p>
          We use reasonable administrative, technical, and organizational
          measures designed to protect personal information. No method of
          transmission or storage is 100% secure. Card payment data is handled
          by Crossmint and its payment providers; we do not store full payment
          card numbers on our servers.
        </p>

        <h2>9. Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct,
          delete, restrict, or object to certain processing of your personal
          data, and to data portability or withdrawal of consent. To exercise
          rights regarding data we control, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. For data
          processed by Crossmint (for example checkout or custodial wallet
          data), you may also contact Crossmint as described in their Privacy
          Policy.
        </p>
        <p>
          You may also have the right to lodge a complaint with your local data
          protection authority.
        </p>

        <h2>10. Children</h2>
        <p>
          The Services are not directed to children under 18 (or the age of
          digital consent in your jurisdiction). We do not knowingly collect
          personal information from children. If you believe a child has
          provided us information, contact us and we will take appropriate
          steps to delete it.
        </p>

        <h2>11. Cookies</h2>
        <p>
          We may use essential cookies to operate the Site and optional cookies
          for analytics or preferences where allowed. You can control cookies
          through your browser settings. Disabling certain cookies may affect
          Site functionality. Crossmint&apos;s interfaces may set their own
          cookies as described in Crossmint&apos;s Privacy Policy.
        </p>

        <h2>12. Third-party links and services</h2>
        <p>
          The Site may link to third-party sites or embed third-party services
          (including Crossmint Checkout, Discord, Twitter/X, Instagram, and
          wallet providers). Their privacy practices are governed by their own
          policies. We are not responsible for third-party practices.
        </p>

        <h2>13. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The
          &quot;Last updated&quot; date at the top will change when we do. If
          changes are material, we will take reasonable steps to notify you
          (for example by posting a notice on the Site). Continued use of the
          Services after an update means you accept the revised Policy.
        </p>

        <h2>14. Contact us</h2>
        <p>
          Ape Mafia Club — Privacy inquiries
          <br />
          Website:{" "}
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
            {SITE_URL}
          </a>
          <br />
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          Crossmint privacy:{" "}
          <a href="mailto:privacy@crossmint.com">privacy@crossmint.com</a>
          <br />
          Crossmint Privacy Policy:{" "}
          <a href={CROSSMINT_PRIVACY} target="_blank" rel="noopener noreferrer">
            {CROSSMINT_PRIVACY}
          </a>
        </p>

        <p className="legal-page__back">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </section>
  );
}
