# Awesome Long Video Generation Papers

A problem-oriented list of papers, project pages, code, and personal notes on long video generation.

## Website

[Explore the public interactive research map](https://youngkinlon.github.io/Awesome-long-video-generation-papers/) to filter papers by method type and research problem, search the collection, and read the maintainer's notes. The website source is available in [`site/`](./site).

## Problems

- 🔴 **Generation quality**: reduces drift, repetition, degradation, and temporal inconsistency.
- 🟠 **Generation length**: extends generation beyond the model's original training horizon.
- 🟡 **Generation speed**: reduces latency and computational cost toward real-time generation.
- 🟢 **Interactivity**: supports multiple prompts, prompt switching, and multi-shot transitions during generation.
- 🔵 **Controllability**: enables flexible control and editing of generated content, motion, camera, or actions.

## Training-Based Methods

| Family | Date | Paper | Project | Code | Problems Addressed | My Understanding |
| --- | --- | --- | --- | --- | --- | --- |
| Self-Forcing | 2025-06-09 | [Self Forcing: Bridging the Train-Test Gap in Autoregressive Video Diffusion](https://arxiv.org/abs/2506.08009) | [Project](https://self-forcing.github.io/) | [GitHub](https://github.com/guandeh17/Self-Forcing) | 🟠 Generation length | Pioneering work. |
| Self-Forcing | 2025-10-02 | [Self-Forcing++: Towards Minute-Scale High-Quality Video Generation](https://arxiv.org/abs/2510.02283) | [Project](https://self-forcing-plus-plus.github.io/) | [GitHub](https://github.com/justincui03/Self-Forcing-Plus-Plus) · Full code not yet released | 🔴 Generation quality | Aligns training with inference; aligns teacher supervision with the final inference trajectory. |
| Self-Forcing | 2025-11-03 | [MotionStream: Real-Time Video Generation with Interactive Motion Controls](https://arxiv.org/abs/2511.01266) | [Project](https://joonghyuk.com/motionstream-web/index.html) | [GitHub](https://github.com/alex4727/MotionStream) · Code not yet released | 🔵 Controllability · 🟡 Generation speed | Trains controllability into the teacher and manages the KV cache. |
| LongLive | 2025-09-26 | [LongLive: Real-time Interactive Long Video Generation](https://arxiv.org/abs/2509.22622) | [Project](https://nvlabs.github.io/LongLive/) | [GitHub](https://github.com/NVlabs/LongLive/tree/v1.0) | 🟢 Interactivity · 🟡 Generation speed | Training-inference alignment; short window; frame sink; prompt switching. |
| LongLive | 2026-05-18 | [LongLive-2.0: An NVFP4 Parallel Infrastructure for Long Video Generation](https://arxiv.org/abs/2605.18739) | [Project](https://nvlabs.github.io/LongLive/LongLive2/) | [GitHub](https://github.com/NVlabs/LongLive) | 🟡 Generation speed · 🟢 Interactivity | Directly trains the diffusion model as an AR model to preserve and unlock the teacher's capability; supports multi-shot generation. |
| Rolling Forcing | 2025-09-29 | [Rolling Forcing: Autoregressive Long Video Diffusion in Real Time](https://arxiv.org/abs/2509.25161) | [Project](https://kunhao-liu.github.io/Rolling_Forcing_Webpage/) | [GitHub](https://github.com/TencentARC/RollingForcing) | 🔴 Generation quality | Aligns the teacher and student. |
| Helios | 2026-03-04 | [Helios: Real Real-Time Long Video Generation Model](https://arxiv.org/abs/2603.04379) | [Project](https://pku-yuangroup.github.io/Helios-Page/) | [GitHub](https://github.com/PKU-YuanGroup/Helios) | 🔴 Generation quality · 🟡 Generation speed | Uses training to replace inference-time tricks. |
| Causal Forcing | 2026-02-02 | [Causal Forcing: Autoregressive Diffusion Distillation Done Right for High-Quality Real-Time Interactive Video Generation](https://arxiv.org/abs/2602.02214) | [Project](https://thu-ml.github.io/CausalForcing.github.io/) | [GitHub](https://github.com/thu-ml/Causal-Forcing) | 🔴 Generation quality | Similar to LongLive-2.0: trains the AR model first to preserve the diffusion model's capability. |
| Causal Forcing | 2026-05-14 | [Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation](https://arxiv.org/abs/2605.15141) | [Project](https://thu-ml.github.io/CausalForcing.github.io/) | [GitHub](https://github.com/thu-ml/Causal-Forcing) | 🟡 Generation speed | — |

## Inference-Based Methods

| Family | Date | Paper | Project | Code | Main Inspiration | Problems Addressed | My Understanding |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LongLive | 2026-06-01 | [LongLive-RAG: A General Retrieval-Augmented Framework for Long Video Generation](https://arxiv.org/abs/2606.02553) | [Project](https://longlive-rag.github.io/) | [GitHub](https://github.com/qixinhu11/LongLive-RAG) | LLM retrieval and memory | 🔴 Generation quality | Adaptive latent retrieval reduces drift. |
| Deep Forcing | 2025-12-04 | [Deep Forcing: Training-Free Long Video Generation with Deep Sink and Participative Compression](https://arxiv.org/abs/2512.05081) | [Project](https://cvlab-kaist.github.io/DeepForcing/) | [GitHub](https://github.com/cvlab-kaist/DeepForcing) | LLM KV-cache management | 🔴 Generation quality · 🟠 Generation length | Deep sink and important-frame selection; multi-shot scalability is uncertain. |
| LoL | 2026-01-23 | [LoL: Longer than Longer, Scaling Video Generation to Hour](https://arxiv.org/abs/2601.16914) | — | [GitHub](https://github.com/justincui03/LoL) | LLM positional encoding | 🔴 Generation quality · 🟠 Generation length | RoPE jitter prevents periodic collapse. |
| Infinity-RoPE | 2025-11-25 | [Infinity-RoPE: Action-Controllable Infinite Video Generation Emerges From Autoregressive Self-Rollout](https://arxiv.org/abs/2511.20649) | [Project](https://infinity-rope.github.io/) | [GitHub](https://github.com/yesiltepe-hidir/infinity-rope) | LLM RoPE and KV cache | 🟠 Generation length · 🟢 Interactivity · 🔵 Controllability | Relative RoPE, KV Flush, and RoPE Cut support long generation and scene switching. |
| Pathwise TTC | 2026-02-05 | [Pathwise Test-Time Correction for Autoregressive Long Video Generation](https://arxiv.org/abs/2602.05871) | [Project](https://ttc-1231.github.io/) | [GitHub](https://github.com/xbxsxp9/Pathwise_TTC) | Diffusion sampling | 🔴 Generation quality | Corrects the diffusion path using the first frame; limited for major scene changes. |
| Future Forcing | 2026-05-28 | [Future Forcing: Future-aware Training-free KV Cache Policy for Autoregressive Video Generation](https://arxiv.org/abs/2605.30083) | — | — | Future-aware KV-cache policy | 🔴 Generation quality | Pre-RoPE queries change little across frames. Future-aware KV-cache weighting is a useful idea, but it may become ineffective after interactive changes. |
| PackCache | 2026-01-07 | [PackCache: A Training-Free Acceleration Method for Unified Autoregressive Video Generation via Compact KV-Cache](https://arxiv.org/abs/2601.04359) | — | — | Compact KV-cache | 🟡 Generation speed | — |
| Dummy Forcing | 2026-01-28 | [Efficient Autoregressive Video Diffusion with Dummy Head](https://arxiv.org/abs/2601.20499) | [Project](https://csguoh.github.io/project/DummyForcing/) | [GitHub](https://github.com/csguoh/DummyForcing) | Head-wise KV-cache pruning | 🟡 Generation speed | — |
| FlowCache | 2026-02-11 | [Flow Caching for Autoregressive Video Generation](https://arxiv.org/abs/2602.10825) | — | [GitHub](https://github.com/mikeallen39/FlowCache) | Chunkwise diffusion caching | 🟡 Generation speed | — |

## Notes

- Dates refer to the first arXiv submission.
- The **My Understanding** column contains the maintainer's personal notes.

---

Last updated: 2026-09-03.
