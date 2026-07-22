import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, ArrowIcon } from '../components/Icons';
import Reveal from '../components/Reveal';

const faqs = [
  {
    q: 'What is a consumer proposal?',
    a: 'A consumer proposal is a legally binding agreement between you and your creditors, administered by a Licensed Insolvency Trustee. It allows you to settle your unsecured debts for less than the full amount owed — often up to 80% less — with one affordable monthly payment over up to 5 years. No interest is charged on the remaining balance.',
  },
  {
    q: 'How much of my debt can be reduced?',
    a: 'Many qualified clients reduce their unsecured debt by up to 80%. The exact amount depends on your income, assets, and the total debt owed. During your free consultation, we\'ll review your situation and give you a realistic estimate.',
  },
  {
    q: 'Will I lose my house or car?',
    a: 'In most cases, no. A consumer proposal typically allows you to keep your secured assets like your home and vehicle, as long as you continue making the regular payments on those secured debts. Unlike bankruptcy, a consumer proposal is specifically designed to protect your assets.',
  },
  {
    q: 'How quickly will collection calls stop?',
    a: 'Once your consumer proposal is filed, all unsecured creditors must immediately stop all collection activity. This means no more phone calls, letters, wage garnishments, or legal actions. This protection goes into effect the moment the proposal is filed — often within 24-48 hours of starting the process.',
  },
  {
    q: 'What debts are included in a consumer proposal?',
    a: 'Consumer proposals cover most unsecured debts including credit cards, personal loans, lines of credit, payday loans, income tax debt, and some student loans. Secured debts like mortgages and car loans are not included — you continue paying those separately.',
  },
  {
    q: 'How long does a consumer proposal take?',
    a: 'Consumer proposals run for a maximum of 5 years (60 months), but you can pay it off early at any time with no penalty. Once all payments are complete, the remaining unsecured debt is legally discharged and forgiven forever.',
  },
  {
    q: 'What happens to my credit score?',
    a: 'A consumer proposal does affect your credit score and will appear on your credit report. However, once your proposal is completed and discharged, you can begin rebuilding your credit. Many clients find that their credit score actually improves faster after a consumer proposal compared to continuing to struggle with unmanageable debt.',
  },
  {
    q: 'Is this the same as bankruptcy?',
    a: 'No — a consumer proposal is a significantly better alternative to bankruptcy for most people. Unlike bankruptcy, you keep your assets, your monthly payment is fixed, the process is more private, and the impact on your credit is typically less severe. We always explore whether a consumer proposal is an option before considering bankruptcy.',
  },
  {
    q: 'Is the consultation really free?',
    a: 'Yes, 100% free and with no obligation. We will review your full financial situation, explain all your options, and give you an honest recommendation — at no cost and no pressure to proceed.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply call us at 519-835-1210 or fill out our online form. We\'ll schedule a free consultation and walk you through everything step by step.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-300">Honest answers to the questions we hear most often.</p>
        </Reveal>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal delay={100} className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${open === i ? 'border-crimson-200 shadow-sm' : 'border-gray-100'}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className={`font-semibold text-base ${open === i ? 'text-crimson-600' : 'text-navy-900'}`}>{faq.q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${open === i ? 'bg-crimson-600 text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
                    +
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-14 bg-navy-900 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Still Have Questions?</h2>
            <p className="text-gray-400 mb-6 text-sm">Call us or fill out the form — we'll answer everything during your free consultation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:5198351210" className="btn-primary flex items-center justify-center gap-2">
                <PhoneIcon className="w-4 h-4" />519-835-1210
              </a>
              <Link to="/contact" className="btn-outline flex items-center justify-center gap-2">
                Contact Us <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
