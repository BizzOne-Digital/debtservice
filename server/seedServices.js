require('dotenv').config();
const mongoose = require('mongoose');
const { Service } = require('./models');

const defaultServices = [
  {
    title: 'Consumer Proposal',
    description: 'The most powerful debt relief tool in Canada. A consumer proposal lets you legally settle your unsecured debts for a fraction of what you owe — with zero interest.',
    icon: 'ShieldIcon',
    features: ['Reduce debt by up to 80%', 'Single monthly payment', 'No interest on remaining balance', 'Stop all collection activity', 'Keep your assets', 'Discharge in as little as 5 years'],
    order: 0,
  },
  {
    title: 'Debt Negotiation',
    description: 'We negotiate directly with your creditors on your behalf to reduce balances, waive interest, and create manageable repayment arrangements.',
    icon: 'HandshakeIcon',
    features: ['Direct creditor negotiation', 'Reduced interest rates', 'Waived late fees', 'Structured payment plans', 'Stop harassing calls', 'Written agreements'],
    order: 1,
  },
  {
    title: 'Debt Consolidation (Alternative)',
    description: 'Instead of high-interest consolidation loans, we show you better alternatives that actually reduce what you owe rather than just rearranging it.',
    icon: 'DollarIcon',
    features: ['No new high-interest loans', 'One combined payment', 'Lower than consolidation loan rates', 'Better credit impact', 'Suitable for multiple debts', 'Personalized plan'],
    order: 2,
  },
  {
    title: 'Credit Counselling',
    description: 'Understand your complete financial picture and build a recovery plan. We explain every option honestly so you can make the best decision for your future.',
    icon: 'ChartIcon',
    features: ['Full financial assessment', 'All options explained', 'No pressure or judgment', 'Budgeting support', 'Financial education', 'Ongoing guidance'],
    order: 3,
  },
  {
    title: 'Fresh Start Program',
    description: 'After completing your debt relief program, we help you rebuild your credit and establish healthy financial habits for long-term stability.',
    icon: 'LeafIcon',
    features: ['Post-proposal support', 'Credit rebuilding plan', 'Financial habit coaching', 'Banking guidance', 'Secured credit advice', 'Progress tracking'],
    order: 4,
  },
  {
    title: 'Emergency Debt Relief',
    description: 'Facing wage garnishment, frozen accounts, or imminent legal action? We move fast to protect you and stop creditor action immediately.',
    icon: 'ClockIcon',
    features: ['Same-day consultations available', 'Stop wage garnishment', 'Unfreeze bank accounts', 'Halt legal proceedings', 'Emergency filing available', 'Immediate creditor notification'],
    order: 5,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/debtservice');

  const existing = await Service.countDocuments();
  if (existing > 0) {
    console.log(`Services collection already has ${existing} document(s). Skipping seed to avoid duplicates.`);
    process.exit(0);
  }

  await Service.insertMany(defaultServices);
  console.log(`Seeded ${defaultServices.length} services.`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
