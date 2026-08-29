import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { amountRanges, banks, channels, demoCredentials, disclosure, nextSteps, timings } from './mockData';

const ReportContext = createContext(null);
const initialReport = {
  channel: '', amount: '', whenMinutesAgo: '', bank: '', calledHelpline: null,
  bankEmailSent: false, complaintSubmitted: false, acknowledgementNo: '',
};

function useReport() {
  return useContext(ReportContext);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

function TimerHeader() {
  const { secondsLeft } = useReport();
  const tone = secondsLeft < 300 ? 'bg-signal' : secondsLeft < 900 ? 'bg-amber-700' : 'bg-ink';
  return (
    <header className={`sticky top-0 z-20 flex min-h-16 items-center justify-between border-b-2 border-ink px-5 text-white shadow-[0_3px_0_#101211] ${tone}`}>
      <Link to="/" className="font-mono text-sm font-bold uppercase tracking-[0.14em]" aria-label="Golden Hour home">Golden Hour</Link>
      <div className="border border-white/35 bg-black/20 px-3 py-2 text-right">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/80">time to act</p>
        <p className="font-mono text-xl font-bold leading-5" aria-label={`${formatTime(secondsLeft)} remaining`}>{formatTime(secondsLeft)}</p>
      </div>
    </header>
  );
}

function DisclosureFooter() {
  const [open, setOpen] = useState(false);
  return (
    <footer className="relative z-10 border-t-2 border-ink bg-[#fbfcf5] px-5 py-4">
      <button className="min-h-10 font-mono text-sm font-bold uppercase tracking-wide text-ink underline decoration-volt decoration-4 underline-offset-4" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Hide prototype disclosure' : "What's real, what's mocked?"}
      </button>
      {open && (
        <div className="mt-3 space-y-3 border-2 border-ink bg-mist p-4 text-sm leading-6 text-slate-700">
          <DisclosureItem title="What works" items={disclosure.works} />
          <DisclosureItem title="What is mocked" items={disclosure.mocked} />
          <DisclosureItem title="A real service would need" items={disclosure.needs} />
        </div>
      )}
    </footer>
  );
}

function DisclosureItem({ title, items }) {
  return <section><h2 className="font-bold text-ink">{title}</h2><ul className="mt-1 list-disc pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function PrototypeNotice() {
  return <p className="relative z-10 border-b-2 border-ink bg-[#fbfcf5] px-5 py-2 font-mono text-[10px] font-bold uppercase leading-4 tracking-wide text-ink">Independent prototype — not an official cybercrime or government department application.</p>;
}

function Layout({ children }) {
  const { started } = useReport();
  return <div className="page">{started && <TimerHeader />}<PrototypeNotice />{children}<DisclosureFooter /></div>;
}

function Landing() {
  const { startFlow } = useReport();
  const navigate = useNavigate();
  const begin = () => { startFlow(); navigate('/login'); };
  return <Layout><main className="content flex flex-col justify-center">
    <p className="eyebrow">Rapid fraud response // 01</p>
    <h1 className="title max-w-md text-4xl">Money just left your account?</h1>
    <p className="body-copy max-w-md">The first hour after online fraud gives your bank the best chance to hold the money before it moves on.</p>
    <button onClick={begin} className="primary-button mt-8">Start — every minute counts</button>
    <section className="card mt-7" aria-label="Demo credentials">
      <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-ink">Demo access</h2>
      <div className="mt-3 grid grid-cols-[5.5rem_1fr] gap-y-2 text-sm">
        <span className="text-slate-600">Username</span><code className="font-semibold text-ink">{demoCredentials.username}</code>
        <span className="text-slate-600">Password</span><code className="font-semibold text-ink">{demoCredentials.password}</code>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">Login is mocked. Any email and password will work.</p>
    </section>
  </main></Layout>;
}

function Login() {
  const { startFlow } = useReport();
  const navigate = useNavigate();
  const enter = (event) => { event?.preventDefault(); startFlow(); navigate('/call'); };
  return <Layout><main className="content">
    <Link className="font-mono text-sm font-bold uppercase tracking-wide text-ink underline decoration-volt decoration-4 underline-offset-4" to="/">← Back</Link>
    <p className="eyebrow mt-8">Step 1</p><h1 className="title">Sign in to continue</h1>
    <p className="body-copy">This keeps your report together. In this prototype, any details are accepted.</p>
    <form className="mt-7 space-y-4" onSubmit={enter}>
      <label className="block text-sm font-bold text-ink">Email<input className="field" type="text" placeholder="you@example.com" autoComplete="username" /></label>
      <label className="block text-sm font-bold text-ink">Password<input className="field" type="password" placeholder="Your password" autoComplete="current-password" /></label>
      <button className="primary-button mt-3" type="submit">Continue</button>
    </form>
    <button className="mt-5 min-h-12 w-full text-base font-semibold text-pine underline underline-offset-4" onClick={() => enter()}>Skip login</button>
  </main></Layout>;
}

function CallFirst() {
  const { updateReport } = useReport(); const navigate = useNavigate();
  const continueFlow = (called) => { updateReport({ calledHelpline: called }); navigate('/triage'); };
  return <Layout><main className="content">
    <p className="eyebrow">First, protect your money</p><h1 className="title">Call before filling anything in.</h1>
    <p className="body-copy">Tell the fraud helpline what happened now. You can complete the report immediately after.</p>
    <section className="mt-7 border-2 border-ink bg-ink p-6 text-center shadow-[6px_6px_0_#dcff5a]">
      <p className="font-mono text-sm font-bold uppercase tracking-wider text-volt">National cyber fraud helpline</p>
      <a className="mt-2 block text-5xl font-black tracking-[-0.06em] text-white underline decoration-volt decoration-2 underline-offset-8" href="tel:1930">1930</a>
      <p className="mt-5 text-sm leading-6 text-slate-600">This opens your phone dialler. In an emergency, call now.</p>
    </section>
    <div className="mt-6 space-y-3"><button className="primary-button" onClick={() => continueFlow(true)}>I've called</button><button className="secondary-button" onClick={() => continueFlow(false)}>I'll call after this</button></div>
  </main></Layout>;
}

function Reminder() {
  const { report } = useReport();
  if (report.calledHelpline !== false) return null;
  return <div className="mb-6 border-l-4 border-signal bg-[#fff1ec] px-4 py-3 text-sm leading-6 text-ink"><strong className="font-mono uppercase">Reminder:</strong> call <a href="tel:1930" className="font-bold underline">1930</a> as soon as you can. A quick call can help start a hold on the funds.</div>;
}

const questions = [
  { key: 'channel', title: 'How did the money leave?', options: channels },
  { key: 'amount', title: 'Roughly how much?', options: amountRanges, amount: true },
  { key: 'whenMinutesAgo', title: 'When did it happen?', options: timings },
  { key: 'bank', title: 'Which bank?', options: banks.map((bank) => bank.name) },
];

function Triage() {
  const { report, updateReport } = useReport(); const navigate = useNavigate();
  const [index, setIndex] = useState(0); const question = questions[index]; const selected = report[question.key];
  const choose = (value) => updateReport({ [question.key]: value });
  const next = () => index === questions.length - 1 ? navigate('/freeze') : setIndex(index + 1);
  return <Layout><main className="content">
    <Reminder />
    <div className="flex items-center justify-between"><p className="eyebrow">Quick details</p><p className="text-sm font-bold text-slate-600">{index + 1} of 4</p></div>
    <div className="mt-3 h-2 overflow-hidden border border-ink bg-[#fbfcf5]"><div className="h-full bg-volt transition-all" style={{ width: `${((index + 1) / 4) * 100}%` }} /></div>
    <h1 className="title">{question.title}</h1>
    {index === 0 && <p className="mt-3 text-sm leading-6 text-slate-600">Tap an answer instead of typing — this is designed for a stressful moment.</p>}
    <div className="mt-7 space-y-3">{question.options.map((option) => <button key={option} onClick={() => choose(option)} className={`chip ${selected === option ? 'chip-selected' : ''}`}>{option}</button>)}</div>
    {question.amount && <label className="mt-5 block text-sm font-bold text-ink">Or enter an exact amount (optional)<input inputMode="numeric" className="field" value={selected.startsWith('₹') && !amountRanges.includes(selected) ? selected.replace('₹', '') : ''} onChange={(event) => choose(event.target.value ? `₹${event.target.value}` : '')} placeholder="e.g. 12500" /></label>}
    <div className="mt-8 flex gap-3"><button className="secondary-button max-w-28" onClick={() => index === 0 ? navigate('/call') : setIndex(index - 1)}>Back</button><button className="primary-button" disabled={!selected} onClick={next}>{index === 3 ? 'Create freeze request' : 'Continue'}</button></div>
  </main></Layout>;
}

function bankEmail(bankName) { return banks.find((bank) => bank.name === bankName)?.email || 'frauddesk@yourbank.example'; }
function reportDetails(report) { return `Payment method: ${report.channel || 'Not specified'}\nAmount: ${report.amount || 'Not specified'}\nTime since transfer: ${report.whenMinutesAgo || 'Not specified'}\nBank: ${report.bank || 'Not specified'}`; }
function freezeCopy(report) {
  const email = bankEmail(report.bank);
  return {
    email: `To: ${email}\nSubject: URGENT — Request to freeze suspected fraudulent transaction\n\nHello Fraud Desk,\n\nI am reporting a suspected fraudulent ${report.channel || 'online'} transaction. Please urgently place a hold on any recoverable funds and begin your fraud process.\n\n${reportDetails(report)}\n\nI can provide further details immediately.\n\nRegards,\nAccount holder`,
    whatsapp: `URGENT FREEZE REQUEST\nI need to report a suspected fraudulent transaction. Please place a hold on recoverable funds.\n\n${reportDetails(report)}\n\nPlease tell me the next steps.`,
  };
}

function CopyBlock({ title, text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(text); } catch { /* Clipboard may be unavailable in a local preview. */ } setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return <section className="card mt-5"><div className="flex items-center justify-between gap-3"><h2 className="font-mono text-sm font-bold uppercase tracking-wider text-ink">{title}</h2><button onClick={copy} className="min-h-11 border-2 border-ink bg-volt px-3 font-mono text-sm font-bold uppercase tracking-wide text-ink">{copied ? 'Copied!' : 'Copy'}</button></div><pre className="mt-4 whitespace-pre-wrap break-words border-t-2 border-ink pt-4 font-mono text-sm leading-6 text-slate-700">{text}</pre></section>;
}

function Freeze() {
  const { report, updateReport } = useReport(); const navigate = useNavigate(); const copy = freezeCopy(report);
  return <Layout><main className="content"><Reminder /><p className="eyebrow">Keep the bank moving</p><h1 className="title">Ask for a freeze now</h1><p className="body-copy">We drafted this from your answers. Send it to <strong>{bankEmail(report.bank)}</strong>, then mark it sent.</p><CopyBlock title="Email request" text={copy.email} /><CopyBlock title="WhatsApp message" text={copy.whatsapp} /><button className="primary-button mt-7" onClick={() => { updateReport({ bankEmailSent: true }); navigate('/complaint'); }}>I've sent it</button></main></Layout>;
}

const labels = { channel: 'Money left via', amount: 'Amount', whenMinutesAgo: 'When it happened', bank: 'Bank' };
function Complaint() {
  const { report, updateReport } = useReport(); const navigate = useNavigate();
  const submit = () => { const suffix = Math.floor(100000 + Math.random() * 900000); updateReport({ complaintSubmitted: true, acknowledgementNo: `NCRP-2026-${suffix}` }); navigate('/done'); };
  return <Layout><main className="content"><Reminder /><p className="eyebrow">Your complaint is ready</p><h1 className="title">Review, then submit</h1><p className="body-copy">There are no new questions. Make sure these details look right.</p><section className="card mt-7 divide-y divide-slate-200 p-0">{Object.entries(labels).map(([key, label]) => <div className="flex items-start justify-between gap-3 p-4" key={key}><div><p className="text-sm text-slate-600">{label}</p><p className="mt-1 font-semibold text-ink">{report[key] || 'Not provided'}</p></div><button onClick={() => navigate('/triage')} className="min-h-11 shrink-0 text-sm font-bold text-pine underline underline-offset-4">Edit</button></div>)}</section><button className="primary-button mt-7" onClick={submit}>Submit complaint</button><p className="mt-3 text-center text-xs leading-5 text-slate-500">Prototype only — submitting does not contact the cybercrime portal.</p></main></Layout>;
}

function Done() {
  const { report, elapsedSeconds } = useReport(); const mins = Math.floor(elapsedSeconds / 60); const secs = elapsedSeconds % 60;
  return <Layout><main className="content"><Reminder /><p className="eyebrow">Report submitted</p><h1 className="title">You acted quickly.</h1><section className="card mt-6 border-pine/20 bg-white"><p className="text-sm text-slate-600">Mock acknowledgement number</p><p className="mt-1 break-all text-2xl font-bold tracking-tight text-pine">{report.acknowledgementNo || 'NCRP-2026-000000'}</p><p className="mt-4 text-sm font-semibold text-ink">Reported in {mins} {mins === 1 ? 'minute' : 'minutes'} {secs} {secs === 1 ? 'second' : 'seconds'}</p></section><h2 className="mt-8 text-xl font-bold text-ink">What happens next</h2><ol className="mt-4 space-y-0">{nextSteps.map(([task, status], index) => <li className="relative flex gap-4 pb-6 last:pb-0" key={task}>{index < nextSteps.length - 1 && <span className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-slate-300" />}<span className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${index === 0 ? 'bg-pine text-white' : 'bg-slate-200 text-slate-600'}`}>{index === 0 ? '✓' : index + 1}</span><div><p className="font-semibold text-ink">{task}</p><p className="mt-1 text-sm text-slate-600">{status}</p></div></li>)}</ol><Link to="/" className="secondary-button mt-8">Return to start</Link></main></Layout>;
}

function App() {
  const [report, setReport] = useState(initialReport); const [startedAt, setStartedAt] = useState(null); const [now, setNow] = useState(Date.now());
  const startFlow = () => setStartedAt((value) => value || Date.now());
  useEffect(() => { if (!startedAt) return undefined; const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, [startedAt]);
  const elapsedSeconds = startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;
  const value = useMemo(() => ({ report, updateReport: (changes) => setReport((current) => ({ ...current, ...changes })), startFlow, started: Boolean(startedAt), secondsLeft: Math.max(0, 3600 - elapsedSeconds), elapsedSeconds }), [report, startedAt, elapsedSeconds]);
  return <ReportContext.Provider value={value}><Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<Login />} /><Route path="/call" element={<CallFirst />} /><Route path="/triage" element={<Triage />} /><Route path="/freeze" element={<Freeze />} /><Route path="/complaint" element={<Complaint />} /><Route path="/done" element={<Done />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></ReportContext.Provider>;
}

export default App;
