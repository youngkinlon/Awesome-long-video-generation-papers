'use client';

import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Code2,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type MethodType = 'training' | 'inference';
type Problem = 'quality' | 'length' | 'speed' | 'interactivity' | 'controllability';

type Paper = {
  family: string;
  date: string;
  title: string;
  type: MethodType;
  problems: Problem[];
  paper: string;
  project?: string;
  code?: string;
  codeStatus?: string;
  inspiration?: string;
  note?: string;
};

const problems: Record<
  Problem,
  { label: string; short: string; description: string; className: string; dot: string }
> = {
  quality: {
    label: 'Generation quality',
    short: 'Quality',
    description: 'Drift, repetition, degradation, and temporal inconsistency.',
    className: 'border-rose-200 bg-rose-50 text-rose-800',
    dot: 'bg-rose-500',
  },
  length: {
    label: 'Generation length',
    short: 'Length',
    description: 'Extrapolation beyond the original training horizon.',
    className: 'border-orange-200 bg-orange-50 text-orange-800',
    dot: 'bg-orange-500',
  },
  speed: {
    label: 'Generation speed',
    short: 'Speed',
    description: 'Latency and compute cost on the path to real time.',
    className: 'border-amber-200 bg-amber-50 text-amber-900',
    dot: 'bg-amber-400',
  },
  interactivity: {
    label: 'Interactivity',
    short: 'Interactivity',
    description: 'Prompt switching and multi-shot transitions during generation.',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  controllability: {
    label: 'Controllability',
    short: 'Control',
    description: 'Flexible control of content, motion, camera, and actions.',
    className: 'border-sky-200 bg-sky-50 text-sky-800',
    dot: 'bg-sky-500',
  },
};

const papers: Paper[] = [
  {
    family: 'Self-Forcing',
    date: '2025-06-09',
    title: 'Self Forcing: Bridging the Train-Test Gap in Autoregressive Video Diffusion',
    type: 'training',
    problems: ['length'],
    paper: 'https://arxiv.org/abs/2506.08009',
    project: 'https://self-forcing.github.io/',
    code: 'https://github.com/guandeh17/Self-Forcing',
    note: 'Pioneering work.',
  },
  {
    family: 'Self-Forcing',
    date: '2025-10-02',
    title: 'Self-Forcing++: Towards Minute-Scale High-Quality Video Generation',
    type: 'training',
    problems: ['quality'],
    paper: 'https://arxiv.org/abs/2510.02283',
    project: 'https://self-forcing-plus-plus.github.io/',
    code: 'https://github.com/justincui03/Self-Forcing-Plus-Plus',
    codeStatus: 'Full code pending',
    note: 'Aligns training with inference and teacher supervision with the final inference trajectory.',
  },
  {
    family: 'Self-Forcing',
    date: '2025-11-03',
    title: 'MotionStream: Real-Time Video Generation with Interactive Motion Controls',
    type: 'training',
    problems: ['controllability', 'speed'],
    paper: 'https://arxiv.org/abs/2511.01266',
    project: 'https://joonghyuk.com/motionstream-web/index.html',
    code: 'https://github.com/alex4727/MotionStream',
    codeStatus: 'Code pending',
    note: 'Trains controllability into the teacher and manages the KV cache.',
  },
  {
    family: 'LongLive',
    date: '2025-09-26',
    title: 'LongLive: Real-time Interactive Long Video Generation',
    type: 'training',
    problems: ['interactivity', 'speed'],
    paper: 'https://arxiv.org/abs/2509.22622',
    project: 'https://nvlabs.github.io/LongLive/',
    code: 'https://github.com/NVlabs/LongLive/tree/v1.0',
    note: 'Training-inference alignment; short window; frame sink; prompt switching.',
  },
  {
    family: 'LongLive',
    date: '2026-05-18',
    title: 'LongLive-2.0: An NVFP4 Parallel Infrastructure for Long Video Generation',
    type: 'training',
    problems: ['speed', 'interactivity'],
    paper: 'https://arxiv.org/abs/2605.18739',
    project: 'https://nvlabs.github.io/LongLive/LongLive2/',
    code: 'https://github.com/NVlabs/LongLive',
    note: "Directly trains the diffusion model as an AR model to preserve the teacher's capability; supports multi-shot generation.",
  },
  {
    family: 'Rolling Forcing',
    date: '2025-09-29',
    title: 'Rolling Forcing: Autoregressive Long Video Diffusion in Real Time',
    type: 'training',
    problems: ['quality'],
    paper: 'https://arxiv.org/abs/2509.25161',
    project: 'https://kunhao-liu.github.io/Rolling_Forcing_Webpage/',
    code: 'https://github.com/TencentARC/RollingForcing',
    note: 'Aligns the teacher and student.',
  },
  {
    family: 'Helios',
    date: '2026-03-04',
    title: 'Helios: Real Real-Time Long Video Generation Model',
    type: 'training',
    problems: ['quality', 'speed'],
    paper: 'https://arxiv.org/abs/2603.04379',
    project: 'https://pku-yuangroup.github.io/Helios-Page/',
    code: 'https://github.com/PKU-YuanGroup/Helios',
    note: 'Uses training to replace inference-time tricks.',
  },
  {
    family: 'Causal Forcing',
    date: '2026-02-02',
    title: 'Causal Forcing: Autoregressive Diffusion Distillation Done Right for High-Quality Real-Time Interactive Video Generation',
    type: 'training',
    problems: ['quality'],
    paper: 'https://arxiv.org/abs/2602.02214',
    project: 'https://thu-ml.github.io/CausalForcing.github.io/',
    code: 'https://github.com/thu-ml/Causal-Forcing',
    note: "Similar to LongLive-2.0: trains the AR model first to preserve the diffusion model's capability.",
  },
  {
    family: 'Causal Forcing',
    date: '2026-05-14',
    title: 'Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation',
    type: 'training',
    problems: ['speed'],
    paper: 'https://arxiv.org/abs/2605.15141',
    project: 'https://thu-ml.github.io/CausalForcing.github.io/',
    code: 'https://github.com/thu-ml/Causal-Forcing',
  },
  {
    family: 'LongLive',
    date: '2026-06-01',
    title: 'LongLive-RAG: A General Retrieval-Augmented Framework for Long Video Generation',
    type: 'inference',
    problems: ['quality'],
    paper: 'https://arxiv.org/abs/2606.02553',
    project: 'https://longlive-rag.github.io/',
    code: 'https://github.com/qixinhu11/LongLive-RAG',
    inspiration: 'LLM retrieval and memory',
    note: 'Adaptive latent retrieval reduces drift.',
  },
  {
    family: 'Deep Forcing',
    date: '2025-12-04',
    title: 'Deep Forcing: Training-Free Long Video Generation with Deep Sink and Participative Compression',
    type: 'inference',
    problems: ['quality', 'length'],
    paper: 'https://arxiv.org/abs/2512.05081',
    project: 'https://cvlab-kaist.github.io/DeepForcing/',
    code: 'https://github.com/cvlab-kaist/DeepForcing',
    inspiration: 'LLM KV-cache management',
    note: 'Deep sink and important-frame selection; multi-shot scalability is uncertain.',
  },
  {
    family: 'LoL',
    date: '2026-01-23',
    title: 'LoL: Longer than Longer, Scaling Video Generation to Hour',
    type: 'inference',
    problems: ['quality', 'length'],
    paper: 'https://arxiv.org/abs/2601.16914',
    code: 'https://github.com/justincui03/LoL',
    inspiration: 'LLM positional encoding',
    note: 'RoPE jitter prevents periodic collapse.',
  },
  {
    family: 'Infinity-RoPE',
    date: '2025-11-25',
    title: 'Infinity-RoPE: Action-Controllable Infinite Video Generation Emerges From Autoregressive Self-Rollout',
    type: 'inference',
    problems: ['length', 'interactivity', 'controllability'],
    paper: 'https://arxiv.org/abs/2511.20649',
    project: 'https://infinity-rope.github.io/',
    code: 'https://github.com/yesiltepe-hidir/infinity-rope',
    inspiration: 'LLM RoPE and KV cache',
    note: 'Relative RoPE, KV Flush, and RoPE Cut support long generation and scene switching.',
  },
  {
    family: 'Pathwise TTC',
    date: '2026-02-05',
    title: 'Pathwise Test-Time Correction for Autoregressive Long Video Generation',
    type: 'inference',
    problems: ['quality'],
    paper: 'https://arxiv.org/abs/2602.05871',
    project: 'https://ttc-1231.github.io/',
    code: 'https://github.com/xbxsxp9/Pathwise_TTC',
    inspiration: 'Diffusion sampling',
    note: 'Corrects the diffusion path using the first frame; limited for major scene changes.',
  },
  {
    family: 'Future Forcing',
    date: '2026-05-28',
    title: 'Future Forcing: Future-aware Training-free KV Cache Policy for Autoregressive Video Generation',
    type: 'inference',
    problems: ['quality'],
    paper: 'https://arxiv.org/abs/2605.30083',
    inspiration: 'Future-aware KV-cache policy',
    note: 'Pre-RoPE queries change little across frames. Future-aware KV-cache weighting is a useful idea, but it may become ineffective after interactive changes.',
  },
  {
    family: 'PackCache',
    date: '2026-01-07',
    title: 'PackCache: A Training-Free Acceleration Method for Unified Autoregressive Video Generation via Compact KV-Cache',
    type: 'inference',
    problems: ['speed'],
    paper: 'https://arxiv.org/abs/2601.04359',
    inspiration: 'Compact KV-cache',
  },
  {
    family: 'Dummy Forcing',
    date: '2026-01-28',
    title: 'Efficient Autoregressive Video Diffusion with Dummy Head',
    type: 'inference',
    problems: ['speed'],
    paper: 'https://arxiv.org/abs/2601.20499',
    project: 'https://csguoh.github.io/project/DummyForcing/',
    code: 'https://github.com/csguoh/DummyForcing',
    inspiration: 'Head-wise KV-cache pruning',
  },
  {
    family: 'FlowCache',
    date: '2026-02-11',
    title: 'Flow Caching for Autoregressive Video Generation',
    type: 'inference',
    problems: ['speed'],
    paper: 'https://arxiv.org/abs/2602.10825',
    code: 'https://github.com/mikeallen39/FlowCache',
    inspiration: 'Chunkwise diffusion caching',
  },
];

const methodFilters: Array<{ value: 'all' | MethodType; label: string }> = [
  { value: 'all', label: 'All methods' },
  { value: 'training', label: 'Training-based' },
  { value: 'inference', label: 'Inference-based' },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [methodType, setMethodType] = useState<'all' | MethodType>('all');
  const [problem, setProblem] = useState<Problem | null>(null);

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return papers.filter((entry) => {
      const matchesType = methodType === 'all' || entry.type === methodType;
      const matchesProblem = !problem || entry.problems.includes(problem);
      const searchable = [
        entry.title,
        entry.family,
        entry.inspiration ?? '',
        entry.note ?? '',
        ...entry.problems.map((item) => problems[item].label),
      ]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesType && matchesProblem && matchesQuery;
    });
  }, [methodType, problem, query]);

  const hasFilters = query.length > 0 || methodType !== 'all' || problem !== null;

  const chronologicalPapers = useMemo(
    () => [...filteredPapers].sort((a, b) => a.date.localeCompare(b.date)),
    [filteredPapers],
  );

  const clearFilters = () => {
    setQuery('');
    setMethodType('all');
    setProblem(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[rgba(247,247,242,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label="Go to top">
            <span className="grid size-8 place-items-center bg-slate-950 text-[11px] font-bold tracking-tight text-white">
              LV
            </span>
            <span>
              <span className="block text-xs font-bold tracking-[0.12em] text-slate-950 uppercase">
                Long Video Index
              </span>
              <span className="hidden text-[10px] text-slate-500 sm:block">A working research map</span>
            </span>
          </a>
          <a
            href="https://github.com/youngkinlon/Awesome-long-video-generation-papers"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950"
          >
            <Code2 className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">View repository</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        <section className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
              <span className="h-px w-8 bg-slate-400" />
              Problem-oriented literature collection
            </p>
            <h1 className="max-w-4xl font-heading text-4xl leading-[0.98] font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              Long video generation,
              <span className="block text-slate-400">mapped by the problems it solves.</span>
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-px border border-slate-200 bg-slate-200">
            <div className="bg-[#f7f7f2] p-4">
              <strong className="block text-2xl font-semibold tracking-tight text-slate-950">{papers.length}</strong>
              <span className="text-[11px] font-medium text-slate-500 uppercase">Papers</span>
            </div>
            <div className="bg-[#f7f7f2] p-4">
              <strong className="block text-2xl font-semibold tracking-tight text-slate-950">
                {papers.filter((entry) => entry.type === 'training').length}
              </strong>
              <span className="text-[11px] font-medium text-slate-500 uppercase">Training</span>
            </div>
            <div className="bg-[#f7f7f2] p-4">
              <strong className="block text-2xl font-semibold tracking-tight text-slate-950">
                {papers.filter((entry) => entry.type === 'inference').length}
              </strong>
              <span className="text-[11px] font-medium text-slate-500 uppercase">Inference</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="problem-map-title" className="py-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 id="problem-map-title" className="text-sm font-bold tracking-[0.12em] text-slate-950 uppercase">
                Problem map
              </h2>
              <p className="mt-1 text-sm text-slate-500">Select a problem to narrow the collection.</p>
            </div>
            {problem && (
              <Button variant="ghost" size="sm" onClick={() => setProblem(null)}>
                <X aria-hidden="true" /> Clear
              </Button>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.entries(problems) as Array<[Problem, (typeof problems)[Problem]]>).map(
              ([key, item]) => {
                const count = papers.filter((entry) => entry.problems.includes(key)).length;
                const active = problem === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setProblem(active ? null : key)}
                    className={`group min-h-28 border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                      active
                        ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10'
                        : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-400'
                    }`}
                  >
                    <span className="mb-4 flex items-center justify-between">
                      <span className={`size-2.5 rounded-full ${item.dot}`} />
                      <span className={`font-mono text-xs ${active ? 'text-slate-300' : 'text-slate-400'}`}>
                        {String(count).padStart(2, '0')}
                      </span>
                    </span>
                    <strong className="block text-sm font-semibold">{item.label}</strong>
                    <span className={`mt-1 block text-xs leading-5 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                      {item.description}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </section>

        <section aria-labelledby="papers-title" className="pt-3">
          <div className="sticky top-16 z-30 -mx-5 border-y border-slate-200 bg-[rgba(247,247,242,0.94)] px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="mx-auto flex max-w-[1344px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <SlidersHorizontal className="mr-1 size-4 text-slate-400" aria-hidden="true" />
                {methodFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={methodType === filter.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMethodType(filter.value)}
                    className={methodType === filter.value ? 'bg-slate-950' : 'bg-white'}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-full lg:w-80">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search papers, families, or ideas"
                    aria-label="Search papers"
                    className="h-9 border-slate-300 bg-white pl-9"
                  />
                </div>
                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          <section
            aria-labelledby="timeline-title"
            className="mt-8 border border-slate-200 bg-white px-5 py-5 sm:px-6 sm:py-6"
          >
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Chronology
                </p>
                <h2 id="timeline-title" className="font-heading text-2xl font-semibold tracking-tight text-slate-950">
                  Publication timeline
                </h2>
                <p className="mt-1 text-sm text-slate-500">First arXiv submission dates, from earliest to latest.</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-violet-500" /> Training-based
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-cyan-500" /> Inference-based
                </span>
              </div>
            </div>

            {chronologicalPapers.length > 0 ? (
              <div
                className="timeline-scroll -mx-5 overflow-x-auto px-5 pt-5 pb-2 sm:-mx-6 sm:px-6"
                tabIndex={0}
                aria-label="Paper publication timeline. Scroll horizontally to see all papers."
              >
                <ol className="flex min-w-max">
                  {chronologicalPapers.map((entry, index) => (
                    <li key={entry.title} className="relative w-56 shrink-0 pr-7">
                      <time dateTime={entry.date} className="font-mono text-[11px] font-semibold text-slate-500">
                        {entry.date}
                      </time>
                      <div className="relative my-3 h-3" aria-hidden="true">
                        {index < chronologicalPapers.length - 1 && (
                          <span className="absolute top-1/2 left-1.5 h-px w-[calc(100%+1.25rem)] -translate-y-1/2 bg-slate-200" />
                        )}
                        <span
                          className={`absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-full border-2 border-white ring-1 ring-slate-300 ${
                            entry.type === 'training' ? 'bg-violet-500' : 'bg-cyan-500'
                          }`}
                        />
                      </div>
                      <a
                        href={entry.paper}
                        target="_blank"
                        rel="noreferrer"
                        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                      >
                        <span className="block text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">
                          {entry.family}
                        </span>
                        <span className="mt-1 line-clamp-3 block font-heading text-[15px] leading-5 font-semibold text-slate-800 transition-colors group-hover:text-sky-700">
                          {entry.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="py-8 text-sm text-slate-500">No papers match the current filters.</p>
            )}
          </section>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">Collection</p>
              <h2 id="papers-title" className="mt-1 font-heading text-3xl font-semibold tracking-tight text-slate-950">
                {methodType === 'all' ? 'All methods' : methodType === 'training' ? 'Training-based methods' : 'Inference-based methods'}
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-500" aria-live="polite">
              {filteredPapers.length} / {papers.length}
            </p>
          </div>

          {filteredPapers.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPapers.map((entry) => (
                <Card
                  key={entry.title}
                  className="paper-card gap-0 rounded-none border-0 bg-white py-0 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.09)]"
                >
                  <CardHeader className="gap-4 border-b border-slate-100 px-5 py-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`rounded-sm border-0 px-2 font-mono text-[10px] uppercase ${
                            entry.type === 'training'
                              ? 'bg-violet-50 text-violet-700'
                              : 'bg-cyan-50 text-cyan-800'
                          }`}
                        >
                          {entry.type}
                        </Badge>
                        <span className="text-xs font-semibold text-slate-500">{entry.family}</span>
                      </div>
                      <time className="font-mono text-[11px] text-slate-400" dateTime={entry.date}>
                        {entry.date}
                      </time>
                    </div>
                    <CardTitle className="min-h-[4.7rem] font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-slate-950">
                      {entry.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.problems.map((item) => (
                        <Badge key={item} variant="outline" className={`rounded-sm ${problems[item].className}`}>
                          <span className={`size-1.5 rounded-full ${problems[item].dot}`} />
                          {problems[item].short}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4 px-5 py-5">
                    {entry.inspiration && (
                      <div className="flex items-center justify-between gap-3 border-l-2 border-slate-900 bg-slate-50 px-3 py-2.5">
                        <span className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">Inspiration</span>
                        <span className="text-right text-xs font-semibold text-slate-700">{entry.inspiration}</span>
                      </div>
                    )}
                    <div className="mt-auto">
                      <p className="mb-1 text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">My understanding</p>
                      <p className={`text-sm leading-6 ${entry.note ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                        {entry.note ?? 'Notes to be added.'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between rounded-none border-t border-slate-100 bg-slate-50/70 px-5 py-3.5">
                    <div className="flex items-center gap-4">
                      <ExternalLink href={entry.paper}>
                        <BookOpen className="size-3.5" aria-hidden="true" /> Paper
                      </ExternalLink>
                      {entry.project && <ExternalLink href={entry.project}>Project</ExternalLink>}
                      {entry.code && (
                        <ExternalLink href={entry.code}>
                          <Code2 className="size-3.5" aria-hidden="true" /> Code
                        </ExternalLink>
                      )}
                    </div>
                    {entry.codeStatus && <span className="hidden text-[10px] text-slate-400 xl:block">{entry.codeStatus}</span>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid min-h-72 place-items-center border border-dashed border-slate-300 bg-white/60 p-8 text-center">
              <div>
                <Search className="mx-auto mb-4 size-7 text-slate-300" aria-hidden="true" />
                <h3 className="font-heading text-xl font-semibold text-slate-900">No matching papers</h3>
                <p className="mt-1 text-sm text-slate-500">Try another keyword or clear the active filters.</p>
                <Button variant="outline" className="mt-5 bg-white" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-8 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>Awesome Long Video Generation Papers · Maintainer notes are personal interpretations.</p>
          <p className="font-mono text-slate-500">Updated 2026-09-03</p>
        </div>
      </footer>
    </div>
  );
}
