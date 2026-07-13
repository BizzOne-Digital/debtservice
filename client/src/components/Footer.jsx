import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, LocationIcon, CheckIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo1.png" alt="Debt Service" className="h-10 w-auto" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            We help Canadians overcome financial hardship through legal debt relief options including consumer proposals.
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <a href="tel:5878921200" className="flex items-center gap-2 hover:text-gold transition-colors">
              <PhoneIcon className="w-4 h-4 text-crimson-500" />587-892-1200
            </a>
            <a href="mailto:info@debtservice.ca" className="flex items-center gap-2 hover:text-gold transition-colors">
              <MailIcon className="w-4 h-4 text-crimson-500" />info@debtservice.ca
            </a>
            <span className="flex items-center gap-2">
              <LocationIcon className="w-4 h-4 text-crimson-500" />Alberta, Canada
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {['Home', 'About', 'Services', 'How It Works', 'Blog', 'Contact'].map(item => (
              <li key={item}>
                <Link to={`/${item === 'Home' ? '' : item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-gold transition-colors hover:pl-1 duration-200 block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold text-base mb-4 uppercase tracking-wider">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {['Consumer Proposal', 'Debt Consolidation', 'Credit Counselling', 'Bankruptcy Alternatives', 'Debt Negotiation', 'Financial Planning'].map(s => (
              <li key={s} className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-crimson-500 shrink-0" />{s}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-white font-bold text-base mb-4 uppercase tracking-wider">Get Help Today</h3>
          <div className="bg-crimson-600 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-white mb-1">80%</div>
            <div className="text-sm text-white/80 mb-3">Average Debt Reduction</div>
            <p className="text-xs text-white/70 mb-4">Qualified Canadians can reduce their unsecured debt through a consumer proposal.</p>
            <Link to="/contact" className="block bg-white text-crimson-600 font-bold text-sm py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Free Consultation
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Debt Service Inc. All rights reserved.</p>
          <p>Results may vary. Consumer proposals are administered by Licensed Insolvency Trustees.</p>
        </div>
      </div>
    </footer>
  );
}
