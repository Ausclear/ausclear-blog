import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Clearance First',
  description: 'Terms of Service for Clearance First - Professional security clearance consulting services in Australia.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom" style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#002147', marginBottom: '16px' }}>Terms of Service</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>Last updated: {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div style={{ lineHeight: 1.8, color: '#334155' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>1. Introduction</h2>
            <p style={{ marginBottom: '16px' }}>
              These Terms of Service ("Terms") govern your use of services provided by Clearance First (ABN 70 628 031 587) ("we", "our", or "us"). By engaging our services or using our website, you agree to be bound by these Terms.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Clearance First is a professional consultancy specialising in Australian Government security clearance sponsorship, application assistance, and advisory services. We operate under Australian law and comply with all relevant regulations, including those set by the Australian Government Security Vetting Agency (AGSVA).
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>2. Services Provided</h2>
            <p style={{ marginBottom: '16px' }}>Clearance First provides the following services:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Security clearance sponsorship for eligible individuals</li>
              <li style={{ marginBottom: '8px' }}>Consultation and guidance on security clearance applications</li>
              <li style={{ marginBottom: '8px' }}>Document review and application assistance</li>
              <li style={{ marginBottom: '8px' }}>Clearance eligibility assessments</li>
              <li style={{ marginBottom: '8px' }}>Support throughout the AGSVA vetting process</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              <strong>Important:</strong> Clearance First facilitates the security clearance process but does not make final clearance decisions. All clearances are granted solely by AGSVA following their independent assessment and vetting procedures.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>3. Eligibility Requirements</h2>
            <p style={{ marginBottom: '16px' }}>To be eligible for our security clearance sponsorship services, you must:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Be an Australian citizen (for all clearance levels)</li>
              <li style={{ marginBottom: '8px' }}>Meet AGSVA's eligibility criteria for the requested clearance level</li>
              <li style={{ marginBottom: '8px' }}>Provide accurate and truthful information throughout the application process</li>
              <li style={{ marginBottom: '8px' }}>Consent to background checks and security vetting procedures</li>
              <li style={{ marginBottom: '8px' }}>Have a legitimate need for security clearance (employment, contract work, or business purposes)</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We reserve the right to decline sponsorship if we determine that eligibility requirements are not met or if AGSVA guidance suggests an application would be unsuccessful.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>4. Client Obligations</h2>
            <p style={{ marginBottom: '16px' }}>By engaging our services, you agree to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Provide complete, accurate, and truthful information at all times</li>
              <li style={{ marginBottom: '8px' }}>Respond promptly to requests for documentation or information</li>
              <li style={{ marginBottom: '8px' }}>Disclose any information that may affect your clearance eligibility</li>
              <li style={{ marginBottom: '8px' }}>Cooperate fully with AGSVA during the vetting process</li>
              <li style={{ marginBottom: '8px' }}>Maintain confidentiality regarding sensitive information shared during the process</li>
              <li style={{ marginBottom: '8px' }}>Pay all fees in accordance with the agreed payment terms</li>
              <li style={{ marginBottom: '8px' }}>Notify us immediately of any changes to your circumstances that may affect your application</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>5. Fees and Payment</h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>Service Fees:</strong> Our service fees are separate from AGSVA's official application fees. You will be informed of all applicable fees before engaging our services.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>AGSVA Fees:</strong> AGSVA charges the following fees for security clearance applications (as of January 2025):
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Baseline Vetting: $884 AUD</li>
              <li style={{ marginBottom: '8px' }}>Negative Vetting Level 1 (NV1): $1,355 AUD</li>
              <li style={{ marginBottom: '8px' }}>Negative Vetting Level 2 (NV2): $2,486 AUD</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              <strong>Payment Terms:</strong>
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Service fees are payable as outlined in your service agreement</li>
              <li style={{ marginBottom: '8px' }}>AGSVA fees are payable directly to AGSVA upon application submission</li>
              <li style={{ marginBottom: '8px' }}>All fees are in Australian Dollars (AUD) and include GST where applicable</li>
              <li style={{ marginBottom: '8px' }}>Payment can be made via bank transfer, credit card, or other agreed methods</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              <strong>Refund Policy:</strong> Service fees are non-refundable once work has commenced. AGSVA fees are set by the Australian Government and are non-refundable regardless of application outcome.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>6. No Guarantee of Outcome</h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>Important Disclaimer:</strong> Clearance First cannot guarantee the approval of any security clearance application. Final clearance decisions are made solely by AGSVA based on their independent assessment and vetting process.
            </p>
            <p style={{ marginBottom: '16px' }}>
              We provide professional guidance and sponsorship to maximise your chances of success, but factors outside our control may affect the outcome, including:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>AGSVA's assessment of your background and circumstances</li>
              <li style={{ marginBottom: '8px' }}>Information discovered during security vetting</li>
              <li style={{ marginBottom: '8px' }}>Changes to government policy or security requirements</li>
              <li style={{ marginBottom: '8px' }}>Incomplete or inaccurate information provided during the application</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>7. Confidentiality</h2>
            <p style={{ marginBottom: '16px' }}>
              We maintain strict confidentiality regarding all client information in accordance with Australian privacy law and professional standards. Information you provide will only be:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Used to facilitate your security clearance application</li>
              <li style={{ marginBottom: '8px' }}>Shared with AGSVA as required for the vetting process</li>
              <li style={{ marginBottom: '8px' }}>Disclosed to government agencies when legally required</li>
              <li style={{ marginBottom: '8px' }}>Provided to third-party service providers who assist in delivering our services (under confidentiality obligations)</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              For detailed information about how we handle your personal information, please refer to our <a href="/privacy" style={{ color: '#002147', fontWeight: 600 }}>Privacy Policy</a>.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>8. Intellectual Property</h2>
            <p style={{ marginBottom: '16px' }}>
              All content on the Clearance First website, including text, graphics, logos, images, and software, is the property of Clearance First or its licensors and is protected by Australian and international intellectual property laws.
            </p>
            <p style={{ marginBottom: '16px' }}>
              You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>9. Limitation of Liability</h2>
            <p style={{ marginBottom: '16px' }}>
              To the fullest extent permitted by Australian law:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Clearance First is not liable for any unsuccessful clearance applications or decisions made by AGSVA</li>
              <li style={{ marginBottom: '8px' }}>We are not responsible for delays in the AGSVA vetting process or changes to government policies</li>
              <li style={{ marginBottom: '8px' }}>Our total liability to you for any claim arising from our services is limited to the amount of fees you have paid to us</li>
              <li style={{ marginBottom: '8px' }}>We are not liable for indirect, consequential, or incidental damages, including lost income or opportunities</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Australian Consumer Law.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>10. Termination</h2>
            <p style={{ marginBottom: '16px' }}>
              Either party may terminate the service agreement by providing written notice. Upon termination:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>You remain liable for any fees owed for services rendered up to the termination date</li>
              <li style={{ marginBottom: '8px' }}>We will provide you with all documents and information relevant to your application</li>
              <li style={{ marginBottom: '8px' }}>AGSVA application fees already paid are non-refundable</li>
              <li style={{ marginBottom: '8px' }}>Confidentiality obligations continue after termination</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>11. Compliance with Australian Law</h2>
            <p style={{ marginBottom: '16px' }}>
              Our services are provided in accordance with:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Privacy Act 1988 (Cth)</li>
              <li style={{ marginBottom: '8px' }}>Australian Consumer Law</li>
              <li style={{ marginBottom: '8px' }}>AGSVA policies and procedures</li>
              <li style={{ marginBottom: '8px' }}>Relevant security and defence legislation</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>12. Dispute Resolution</h2>
            <p style={{ marginBottom: '16px' }}>
              If a dispute arises, we encourage you to contact us first to attempt resolution:
            </p>
            <p style={{ marginBottom: '16px', paddingLeft: '24px' }}>
              <strong>Email:</strong> support@ausclear.com.au<br />
              <strong>Phone:</strong> 1300 027 423
            </p>
            <p style={{ marginBottom: '16px' }}>
              If the dispute cannot be resolved through direct communication, either party may refer the matter to mediation before pursuing legal action. Any legal proceedings will be subject to the exclusive jurisdiction of the courts of South Australia, Australia.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>13. Changes to These Terms</h2>
            <p style={{ marginBottom: '16px' }}>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>14. Severability</h2>
            <p style={{ marginBottom: '16px' }}>
              If any provision of these Terms is found to be invalid or unenforceable under Australian law, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>15. Contact Information</h2>
            <p style={{ marginBottom: '16px' }}>
              For questions about these Terms of Service, please contact:
            </p>
            <p style={{ paddingLeft: '24px' }}>
              <strong>Clearance First</strong><br />
              (Powered by AusClear)<br />
              ABN: 70 628 031 587<br />
              Email: support@ausclear.com.au<br />
              Phone: 1300 027 423<br />
              Address: 82 Onkaparinga Valley Road, Woodside SA 5244, Australia<br />
              Website: <a href="https://support.ausclear.au" style={{ color: '#002147', fontWeight: 600 }}>support.ausclear.au</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
