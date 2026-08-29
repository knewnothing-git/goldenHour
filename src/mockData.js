export const banks = [
  { name: 'State Bank of India', email: 'frauddesk@sbi-demo.example' },
  { name: 'HDFC Bank', email: 'fraudhelp@hdfc-demo.example' },
  { name: 'ICICI Bank', email: 'frauddesk@icici-demo.example' },
  { name: 'Axis Bank', email: 'urgentfreeze@axis-demo.example' },
  { name: 'Kotak Mahindra Bank', email: 'fraudalert@kotak-demo.example' },
  { name: 'Other / not listed', email: 'yourbank-frauddesk@example' },
];

export const channels = ['UPI', 'Debit or credit card', 'Net banking', 'Wallet', 'Not sure'];
export const amountRanges = ['Under ₹10,000', '₹10,000–₹50,000', '₹50,000–₹2 lakh', 'Over ₹2 lakh'];
export const timings = ['Under 30 min ago', '30–60 min', '1–6 hours', 'More than 6 hours ago'];

export const disclosure = {
  works: ['The full citizen journey, timer, generated copy, and screen-to-screen routing.'],
  mocked: ['Login, bank list, acknowledgement number, and every submission. Nothing is sent anywhere.'],
  needs: ['Bank fraud-desk API integration, NCRP backend access, 1930 helpline routing, and identity verification.'],
};

export const demoCredentials = {
  username: 'demo@citizen.in',
  password: 'demo1234',
};

export const nextSteps = [
  ['Bank acknowledges your report', 'Done'],
  ['Funds are held where possible', 'Usually within 1–2 hours'],
  ['Police station is assigned', 'Usually within 24 hours'],
  ['Follow-up call', 'Usually within 1–3 days'],
];
