import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white border-t-4 border-gold mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">AusClear</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for Australian security clearance services.
              Professional, secure, and reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-colours">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-gold transition-colours">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-gold transition-colours">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold transition-colours">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/request-introduction" className="text-gray-300 hover:text-gold transition-colours">
                  Request Introduction
                </Link>
              </li>
              <li>
                <Link href="/categories/faq" className="text-gray-300 hover:text-gold transition-colours">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colours">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colours">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} AusClear. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Secure. Vetted. Ready.
          </p>
        </div>
      </div>
    </footer>
  )
}
