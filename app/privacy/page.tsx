import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Clearance First',
  description: 'Privacy Policy for Clearance First - How we collect, use, and protect your personal information in accordance with Australian Privacy Principles.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom" style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#002147', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>Last updated: {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div style={{ lineHeight: 1.8, color: '#334155' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>1. Introduction</h2>
            <p style={{ marginBottom: '16px' }}>
              Nepthys Pty Ltd trading as AusClear (ABN 70 628 031 587) ("we", "our", or "us") is committed to protecting your privacy and complying with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information.
            </p>
            <p style={{ marginBottom: '16px' }}>
              By using our services, you consent to the collection and use of your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>2. Information We Collect</h2>
            <p style={{ marginBottom: '16px' }}>We may collect the following types of personal information:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Contact Information:</strong> Name, email address, mobile number, and postal address</li>
              <li style={{ marginBottom: '8px' }}><strong>Security Clearance Information:</strong> Clearance level requirements, citizenship status, employment details</li>
              <li style={{ marginBottom: '8px' }}><strong>Technical Information:</strong> IP address, browser type, device information, location data, and website usage data</li>
              <li style={{ marginBottom: '8px' }}><strong>Communication Records:</strong> Chat transcripts, email correspondence, and support tickets</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>3. How We Collect Information</h2>
            <p style={{ marginBottom: '16px' }}>We collect personal information through:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Contact forms and enquiry submissions on our website</li>
              <li style={{ marginBottom: '8px' }}>Live chat interactions and AI assistant conversations</li>
              <li style={{ marginBottom: '8px' }}>Email and phone communications</li>
              <li style={{ marginBottom: '8px' }}>Cookies and analytics tools when you visit our website</li>
              <li style={{ marginBottom: '8px' }}>Third-party referrals and professional networks</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>4. How We Use Your Information</h2>
            <p style={{ marginBottom: '16px' }}>We use your personal information to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Provide security clearance consulting and sponsorship services</li>
              <li style={{ marginBottom: '8px' }}>Respond to your enquiries and provide customer support</li>
              <li style={{ marginBottom: '8px' }}>Process and manage your security clearance applications</li>
              <li style={{ marginBottom: '8px' }}>Communicate with you about our services and updates</li>
              <li style={{ marginBottom: '8px' }}>Improve our website, services, and user experience</li>
              <li style={{ marginBottom: '8px' }}>Comply with legal obligations and AGSVA requirements</li>
              <li style={{ marginBottom: '8px' }}>Conduct research and analytics to enhance our services</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>5. Disclosure of Information</h2>
            <p style={{ marginBottom: '16px' }}>We may disclose your personal information to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>AGSVA:</strong> When facilitating security clearance applications and sponsorships</li>
              <li style={{ marginBottom: '8px' }}><strong>Government Agencies:</strong> As required by Australian law or security clearance processes</li>
              <li style={{ marginBottom: '8px' }}><strong>Service Providers:</strong> Third-party contractors who assist in delivering our services (e.g., IT support, CRM systems)</li>
              <li style={{ marginBottom: '8px' }}><strong>Professional Advisors:</strong> Legal, accounting, or consulting firms when necessary</li>
              <li style={{ marginBottom: '8px' }}><strong>Law Enforcement:</strong> When required by law or to protect our legal rights</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>6. Data Security</h2>
            <p style={{ marginBottom: '16px' }}>
              We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. Our security measures include:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Encryption of data in transit and at rest</li>
              <li style={{ marginBottom: '8px' }}>Secure Australian-based servers and data storage</li>
              <li style={{ marginBottom: '8px' }}>Regular security audits and vulnerability assessments</li>
              <li style={{ marginBottom: '8px' }}>Access controls and authentication measures</li>
              <li style={{ marginBottom: '8px' }}>Staff training on data protection and privacy obligations</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>7. Data Retention</h2>
            <p style={{ marginBottom: '16px' }}>
              We retain your personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Security clearance-related information may be retained for up to seven years in accordance with Australian government record-keeping requirements.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>8. Your Rights</h2>
            <p style={{ marginBottom: '16px' }}>Under Australian privacy law, you have the right to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Access:</strong> Request access to your personal information we hold</li>
              <li style={{ marginBottom: '8px' }}><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li style={{ marginBottom: '8px' }}><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li style={{ marginBottom: '8px' }}><strong>Complaint:</strong> Lodge a complaint about our handling of your personal information</li>
              <li style={{ marginBottom: '8px' }}><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              To exercise these rights, please contact us at <a href="mailto:support@ausclear.com.au" style={{ color: '#002147', fontWeight: 600 }}>support@ausclear.com.au</a>
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>9. Cookies and Tracking Technologies</h2>
            <p style={{ marginBottom: '16px' }}>
              We use cookies and similar tracking technologies to enhance your experience on our website. These include:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Essential Cookies:</strong> Required for website functionality and security</li>
              <li style={{ marginBottom: '8px' }}><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (Google Analytics)</li>
              <li style={{ marginBottom: '8px' }}><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>10. Third-Party Links</h2>
            <p style={{ marginBottom: '16px' }}>
              Our website may contain links to third-party websites, including the AGSVA website. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>11. Children's Privacy</h2>
            <p style={{ marginBottom: '16px' }}>
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>12. Changes to This Policy</h2>
            <p style={{ marginBottom: '16px' }}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date at the top of this page indicates when the policy was last revised. We encourage you to review this policy periodically.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>13. Complaints and Disputes</h2>
            <p style={{ marginBottom: '16px' }}>
              If you have concerns about our handling of your personal information, please contact us first:
            </p>
            <p style={{ marginBottom: '16px', paddingLeft: '24px' }}>
              <strong>Email:</strong> support@ausclear.com.au<br />
              <strong>Phone:</strong> 1300 027 423<br />
              <strong>Address:</strong> 82 Onkaparinga Valley Road, Woodside SA 5244, Australia
            </p>
            <p style={{ marginBottom: '16px' }}>
              If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC):
            </p>
            <p style={{ marginBottom: '16px', paddingLeft: '24px' }}>
              <strong>Website:</strong> <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: '#002147', fontWeight: 600 }}>www.oaic.gov.au</a><br />
              <strong>Phone:</strong> 1300 363 992
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>14. Contact Us</h2>
            <p style={{ marginBottom: '16px' }}>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <p style={{ paddingLeft: '24px' }}>
              <strong>Nepthys Pty Ltd</strong><br />
              Trading as: AusClear<br />
              ABN: 70 628 031 587<br />
              Email: support@ausclear.com.au<br />
              Phone: 1300 027 423<br />
              Address: 82 Onkaparinga Valley Road, Woodside SA 5244, Australia
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
