import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Clearance First',
  description: 'Terms of Service for Clearance First - Professional security clearance advisory and referral services in Australia.',
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
              Clearance First is a professional advisory and referral service specialising in Australian Government security clearances. We connect eligible individuals with AGSVA-approved sponsors and provide expert guidance throughout the clearance process.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>2. Services Provided</h2>
            <p style={{ marginBottom: '16px' }}><strong>Important:</strong> Clearance First is an advisory and referral service. We do NOT currently sponsor security clearances ourselves.</p>
            <p style={{ marginBottom: '16px' }}>Our services include:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Security clearance eligibility assessments and pre-assessments</li>
              <li style={{ marginBottom: '8px' }}>Professional consultation and guidance on the clearance process</li>
              <li style={{ marginBottom: '8px' }}>Referrals to our preferred AGSVA-approved clearance sponsor</li>
              <li style={{ marginBottom: '8px' }}>Document review and application assistance</li>
              <li style={{ marginBottom: '8px' }}>Educational resources and support throughout the vetting process</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              <strong>Sponsorship Services:</strong> We connect eligible applicants with our preferred clearance partner who sponsors clearances "in prospect" of employment. This means applicants do NOT need a job offer to obtain sponsorship through our partner.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Future Services:</strong> Clearance First is pursuing DISP (Defence Industry Security Program) accreditation. Upon accreditation, we may offer direct sponsorship services. Until then, all sponsorship is provided by our approved partner organisation.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>3. Fees and Charges</h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>AGSVA Fees:</strong> AGSVA (Australian Government Security Vetting Agency) charges the following fees for security clearance applications:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Baseline Vetting: $884 AUD</li>
              <li style={{ marginBottom: '8px' }}>Negative Vetting Level 1 (NV1): $1,355 AUD</li>
              <li style={{ marginBottom: '8px' }}>Negative Vetting Level 2 (NV2): $2,486 AUD</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              These fees are paid directly to AGSVA and are non-refundable regardless of application outcome.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Advisory Services:</strong> Clearance First may charge fees for consultation, pre-assessment, and advisory services. Any applicable fees will be clearly communicated before services are provided.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Sponsor Fees:</strong> Our approved sponsor partner may charge fees for sponsorship services. These fees are separate from Clearance First's advisory fees and AGSVA's application fees. All sponsorship fees will be disclosed by the sponsor organisation before you engage their services.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>4. Eligibility Requirements</h2>
            <p style={{ marginBottom: '16px' }}>To be eligible for security clearance referral and advisory services, you must:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Be an Australian citizen (mandatory for all clearance levels)</li>
              <li style={{ marginBottom: '8px' }}>Meet AGSVA's eligibility criteria for the requested clearance level</li>
              <li style={{ marginBottom: '8px' }}>Provide accurate and truthful information throughout the process</li>
              <li style={{ marginBottom: '8px' }}>Consent to background checks and security vetting procedures</li>
              <li style={{ marginBottom: '8px' }}>Have a legitimate need for security clearance</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We reserve the right to decline referrals if eligibility requirements are not met or if AGSVA guidance suggests an application would be unsuccessful.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>5. Client Obligations</h2>
            <p style={{ marginBottom: '16px' }}>By engaging our services, you agree to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Provide complete, accurate, and truthful information at all times</li>
              <li style={{ marginBottom: '8px' }}>Respond promptly to requests for documentation or information</li>
              <li style={{ marginBottom: '8px' }}>Disclose any information that may affect your clearance eligibility</li>
              <li style={{ marginBottom: '8px' }}>Cooperate fully with AGSVA during the vetting process</li>
              <li style={{ marginBottom: '8px' }}>Maintain confidentiality regarding sensitive information shared during the process</li>
              <li style={{ marginBottom: '8px' }}>Pay all applicable fees in accordance with agreed payment terms</li>
              <li style={{ marginBottom: '8px' }}>Notify us immediately of any changes to your circumstances</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>6. No Guarantee of Outcome</h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>Important Disclaimer:</strong> Neither Clearance First nor our sponsor partners can guarantee the approval of any security clearance application. Final clearance decisions are made solely by AGSVA based on their independent assessment and vetting process.
            </p>
            <p style={{ marginBottom: '16px' }}>
              We provide professional guidance and referrals to maximise your chances of success, but factors outside our control may affect the outcome, including:
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
              <li style={{ marginBottom: '8px' }}>Used to provide advisory services and facilitate referrals</li>
              <li style={{ marginBottom: '8px' }}>Shared with our approved sponsor partner (with your consent)</li>
              <li style={{ marginBottom: '8px' }}>Disclosed to government agencies when legally required</li>
              <li style={{ marginBottom: '8px' }}>Provided to service providers who assist in delivering our services (under confidentiality obligations)</li>
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
              <li style={{ marginBottom: '8px' }}>Clearance First is not liable for unsuccessful clearance applications or decisions made by AGSVA</li>
              <li style={{ marginBottom: '8px' }}>We are not responsible for delays in the AGSVA vetting process or changes to government policies</li>
              <li style={{ marginBottom: '8px' }}>We are not liable for services provided by our sponsor partner organisation</li>
              <li style={{ marginBottom: '8px' }}>Our total liability for advisory services is limited to the amount of fees you have paid to Clearance First</li>
              <li style={{ marginBottom: '8px' }}>We are not liable for indirect, consequential, or incidental damages</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Australian Consumer Law.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#002147', marginBottom: '16px' }}>10. Termination</h2>
            <p style={{ marginBottom: '16px' }}>
              Either party may terminate the advisory service agreement by providing written notice. Upon termination:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>You remain liable for any fees owed for services rendered up to the termination date</li>
              <li style={{ marginBottom: '8px' }}>We will provide you with all relevant documentation and information</li>
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
