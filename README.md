# Awesome Long Video Generation

A problem-oriented collection of papers, project pages, code, and research notes on long video generation.

The repository focuses on five practical goals:

- **Generation quality**: visual fidelity, temporal coherence, and motion quality.
- **Generation length**: extending short-video models to minute-scale or open-ended generation.
- **Generation speed**: reducing latency, memory use, and per-frame computation.
- **Interactivity**: supporting streaming prompts, motion controls, and real-time user input.
- **Editability**: enabling controllable changes to content, motion, camera, or shots.

> [!NOTE]
> Paper claims and personal observations are intentionally separated. Sections labeled **Research note** contain the maintainer's interpretation rather than claims made verbatim by the paper authors.

## Contents

- [Method Taxonomy](#method-taxonomy)
- [Training-Based Methods](#training-based-methods)
  - [Self-Forcing Family](#self-forcing-family)
  - [LongLive Family](#longlive-family)
  - [Helios](#helios)
- [Inference-Based Methods](#inference-based-methods)
  - [LongLive-RAG](#longlive-rag)
- [Entry Template](#entry-template)

## Method Taxonomy

This collection uses the stage containing the method's primary intervention as its top-level taxonomy.

- **Training-based methods** change the objective, rollout strategy, data construction, model conversion, distillation process, or training infrastructure.
- **Inference-based methods** primarily change generation-time memory, retrieval, caching, attention, sampling, or scheduling.

The boundary is not absolute. Many systems combine training and inference techniques; such entries are placed according to their central contribution and explicitly marked when they cross categories.

Dates refer to the first arXiv submission unless stated otherwise. Code status is recorded as of the repository's last update date.

| Problem | Typical failure mode | Representative directions |
| --- | --- | --- |
| Quality | Appearance degradation, identity drift, background flicker, repetitive motion | Self-rollout supervision, drift simulation, retrieval from history |
| Length | Short-training/long-inference mismatch, accumulated errors | Long-rollout training, historical KV conditioning, attention sinks |
| Speed | Many denoising steps, bidirectional attention, expensive long context | Causal generation, token compression, few-step distillation, quantization |
| Interactivity | Offline generation and inability to respond to changing input | Streaming prompts, KV recache, motion-conditioned causal generation |
| Editability | Weak control over motion, camera, content, and shot transitions | Motion trajectories, prompt switching, multi-shot generation |

## Training-Based Methods

### Self-Forcing Family

#### Self Forcing: Bridging the Train-Test Gap in Autoregressive Video Diffusion

| Field | Information |
| --- | --- |
| Date | 2025-06-09 |
| Paper | [arXiv:2506.08009](https://arxiv.org/abs/2506.08009) |
| Project | [Project page](https://self-forcing.github.io/) |
| Code | [guandeh17/Self-Forcing](https://github.com/guandeh17/Self-Forcing) |
| Primary problems | Training-inference mismatch, generation speed, streaming generation |

Self Forcing trains an autoregressive video diffusion model on its own causal rollouts with KV caching. The model therefore observes generated history during training instead of conditioning only on clean ground-truth history. Distribution Matching Distillation (DMD) converts the diffusion teacher into a few-step causal student for real-time streaming generation.

**Research note: remaining gaps**

1. **Short-train/long-test extrapolation**: training rollouts are still much shorter than the long videos produced at inference, so long-horizon states remain out of distribution.
2. **Distillation before full long-horizon adaptation**: relying on a distilled causal initialization before long-horizon autoregressive adaptation may constrain the student to the distilled model's capacity instead of fully preserving the original bidirectional diffusion model's capability. This is a hypothesis to test rather than an established result.

#### Self-Forcing++: Towards Minute-Scale High-Quality Video Generation

| Field | Information |
| --- | --- |
| Date | 2025-10-02 |
| Paper | [arXiv:2510.02283](https://arxiv.org/abs/2510.02283) |
| Project | [Project page](https://self-forcing-plus-plus.github.io/) |
| Code | [justincui03/Self-Forcing-Plus-Plus](https://github.com/justincui03/Self-Forcing-Plus-Plus) — reproduction instructions available; full code not yet released |
| Primary problems | Long-horizon quality degradation, error accumulation, short-teacher/long-student mismatch |

Self-Forcing++ samples short segments from a long video produced by the autoregressive student. A short-horizon bidirectional teacher refines these sampled segments, and the correction knowledge is distilled back into the student. This lets a short-video teacher supervise long-horizon failure states without requiring a long-video teacher or a long-video training dataset.

**Research note**

The important change is where teacher supervision is applied: the teacher does not need to generate an entire long video. It only supervises short windows sampled from a long self-generated trajectory, including windows in which drift has already begun.

#### MotionStream: Real-Time Video Generation with Interactive Motion Controls

| Field | Information |
| --- | --- |
| Date | 2025-11-03 |
| Paper | [arXiv:2511.01266](https://arxiv.org/abs/2511.01266) |
| Project | [Project page](https://joonghyuk.com/motionstream-web/index.html) |
| Code | [alex4727/MotionStream](https://github.com/alex4727/MotionStream) — release pending internal review |
| Primary problems | Interactivity, motion control, real-time speed, long-horizon consistency |

MotionStream first augments a bidirectional text-to-video teacher with motion control, then distills it into a causal student through Self Forcing and a distribution-matching objective. Its sliding-window causal attention, attention sinks, and rolling KV cache are simulated during training to better match open-ended inference.

The system targets two simultaneous requirements:

- **Fast response**: sub-second latency and up to 29 FPS on a single H100.
- **Interactive control**: trajectory painting, camera control, and motion transfer during streaming generation.

**Research note**

MotionStream treats interactivity as more than an inference interface. The teacher's motion controllability must first be strengthened, and the causal student's training state must reproduce the fixed-window, rolling-cache conditions it will encounter at inference.

### LongLive Family

#### LongLive: Real-time Interactive Long Video Generation

| Field | Information |
| --- | --- |
| Date | 2025-09-26 |
| Paper | [arXiv:2509.22622](https://arxiv.org/abs/2509.22622) |
| Project | [Project page](https://nvlabs.github.io/LongLive/) |
| Code | [NVlabs/LongLive, v1.0 branch](https://github.com/NVlabs/LongLive/tree/v1.0) |
| Primary problems | Interactivity, train-test alignment, speed, long-range consistency |

LongLive uses three central components:

- **Streaming long tuning** changes the regime from short-rollout training followed by long inference to long-rollout training followed by long inference.
- **KV recache** refreshes cached states after a prompt change, allowing interactive prompt switching while improving prompt adherence and transition consistency.
- **Short-window attention with a frame sink** bounds computation while retaining a stable global reference for long-range coherence.

The reported system supports videos up to 240 seconds and runs at 20.7 FPS on a single H100.

#### LongLive-2.0: An NVFP4 Parallel Infrastructure for Long Video Generation

| Field | Information |
| --- | --- |
| Date | 2026-05-18 |
| Paper | [arXiv:2605.18739](https://arxiv.org/abs/2605.18739) |
| Project | [Project page](https://nvlabs.github.io/LongLive/LongLive2/) |
| Code | [NVlabs/LongLive](https://github.com/NVlabs/LongLive) |
| Primary problems | Training cost, inference speed, memory use, multi-shot generation |

LongLive-2.0 directly converts a pretrained bidirectional diffusion model into a long, interactive, multi-shot autoregressive model. Its main path avoids the ODE initialization, short-video DMD, and extra long-tuning stages used by earlier Self-Forcing pipelines. Optional standalone LoRA weights can subsequently reduce generation from four denoising steps to two.

The system combines:

- Balanced sequence-parallel autoregressive training.
- NVFP4 training and W4A4 inference.
- An NVFP4 KV cache and parallel dequantization.
- Asynchronous streaming VAE decoding.
- Global and shot-level attention sinks for multi-shot consistency.

**Research note**

Directly training the original diffusion model as an autoregressive generator matches the maintainer's working hypothesis: beginning from the full model may preserve more of its native generative capacity, whereas beginning from an already distilled model may impose an early quality ceiling.

### Helios

#### Helios: Real Real-Time Long Video Generation Model

| Field | Information |
| --- | --- |
| Date | 2026-03-04 |
| Paper | [arXiv:2603.04379](https://arxiv.org/abs/2603.04379) |
| Project | [Project page](https://pku-yuangroup.github.io/Helios-Page/) |
| Code | [PKU-YuanGroup/Helios](https://github.com/PKU-YuanGroup/Helios) |
| Primary problems | Drift, real-time generation, growing context cost, training efficiency |

Helios is a 14B autoregressive diffusion model designed for minute-scale generation at a reported 19.5 FPS on a single H100. Rather than relying mainly on inference-time anti-drift heuristics, it moves much of the solution into a three-stage training pipeline:

1. **Base stage**: Unified History Injection, Easy Anti-Drifting, and Multi-Term Memory Patchification convert a bidirectional model into an autoregressive generator. Training data explicitly simulates typical drift states and targets repetitive motion at its source.
2. **Mid stage**: Pyramid Unified Predictor Corrector compresses noisy tokens and reduces computation.
3. **Distilled stage**: Adversarial Hierarchical Distillation reduces sampling from 50 steps to 3 and removes classifier-free guidance.

**Research note**

Helios represents a scale-intensive approach: drift robustness, speed, and context compression are co-designed during training rather than assembled primarily from generation-time fixes. Its central question is whether sufficiently comprehensive training can make a large model both more robust and faster than smaller autoregressive baselines.

## Inference-Based Methods

### LongLive-RAG

#### LongLive-RAG: A General Retrieval-Augmented Framework for Long Video Generation

| Field | Information |
| --- | --- |
| Date | 2026-06-01 |
| Paper | [arXiv:2606.02553](https://arxiv.org/abs/2606.02553) |
| Project | [Project page](https://longlive-rag.github.io/) |
| Code | [qixinhu11/LongLive-RAG](https://github.com/qixinhu11/LongLive-RAG) |
| Primary problems | Identity drift, accumulated errors, background flicker, limited sliding-window context |

LongLive-RAG treats previously generated latents as a searchable memory. At each autoregressive step, the model retrieves relevant non-local history instead of conditioning only on the most recent sliding window. This makes the generation trajectory less dependent on an already degraded local context.

Its adaptive selection mechanism uses latent relevance to choose historical context. Window Temporal Delta Loss trains the retrieval embedding to suppress redundant local similarity and emphasize meaningful temporal changes.

> [!IMPORTANT]
> This entry is classified as inference-based because retrieval changes the context selected during generation and does not require retraining the base video generator. It is nevertheless a hybrid method because the retrieval representation itself is trained.

**Research note**

The main conceptual shift is from fixed recency to content-based memory: the most useful context for the next block may be an older, visually matching state rather than the immediately preceding frames.

## Entry Template

Use this structure when adding a new paper:

```markdown
#### Paper Title

| Field | Information |
| --- | --- |
| Date | YYYY-MM-DD |
| Paper | [Paper](URL) |
| Project | [Project page](URL) |
| Code | [Repository](URL), or Not released |
| Primary problems | Quality, length, speed, interactivity, editability |

One-paragraph summary of the problem and the proposed method.

**Key ideas**

- Idea one.
- Idea two.

**Research note**

Personal interpretation, criticism, connection, or research hypothesis.
```

---

Last updated: 2026-09-02.
