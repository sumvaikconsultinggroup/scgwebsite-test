import Link from 'next/link';

const footerLinks = {
  'Quick Links': [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ],
  Services: [
    { name: 'Branding', href: '/services' },
    { name: 'Social Media Marketing', href: '/services' },
    { name: 'Influencer Marketing', href: '/services' },
  ],
  Tools: [
    { name: 'Content Calendar', href: '/tools/content-calendar' },
    { name: 'Find Influencers', href: '/influencer-platform/influencers' },
    { name: 'Post Campaign', href: '/influencer-platform/campaigns' },
    { name: 'Dashboard', href: '/influencer-platform/dashboard' },
  ],
};

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter/X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050510]">
      {/* Top gradient line */}
      <div className="h-px animated-gradient-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large brand heading */}
        <div className="py-16 md:py-24 text-center">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-[family-name:var(--font-heading)] gradient-text leading-none tracking-tighter select-none">
            Sumvaik
          </h2>
        </div>

        {/* Gradient separator */}
        <div className="section-divider" />

        {/* Grid: Links + Newsletter */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-cyan transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Weekly breakdown of what is working in digital marketing right now. No spam, just signal.
            </p>
            <form action="#" className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for newsletter subscription"
                className="flex-1 px-4 py-2.5 bg-surface border border-gray-800 rounded-lg text-sm text-foreground placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan to-purple text-background rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-shadow"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Social links - text style */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pb-12">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-sm text-gray-500 hover:text-cyan transition-colors duration-300"
              data-cursor-hover
            >
              {social.label}
            </a>
          ))}
        </div>

        {/* Gradient separator */}
        <div className="section-divider" />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; 2025 Sumvaik Consulting Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
