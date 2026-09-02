# Awesome Long Video Generation Papers

A problem-oriented list of papers, project pages, code, and personal notes on long video generation.

## Problems

- Generation quality
- Generation length
- Generation speed
- Interactivity
- Editability

## Training-Based Methods

| Family | Date | Paper | Project | Code | Problems Addressed | My Understanding |
| --- | --- | --- | --- | --- | --- | --- |
| Self-Forcing | 2025-06-09 | [Self Forcing: Bridging the Train-Test Gap in Autoregressive Video Diffusion](https://arxiv.org/abs/2506.08009) | [Project](https://self-forcing.github.io/) | [GitHub](https://github.com/guandeh17/Self-Forcing) | Training-inference mismatch; generation speed; streaming generation | — |
| Self-Forcing | 2025-10-02 | [Self-Forcing++: Towards Minute-Scale High-Quality Video Generation](https://arxiv.org/abs/2510.02283) | [Project](https://self-forcing-plus-plus.github.io/) | [GitHub](https://github.com/justincui03/Self-Forcing-Plus-Plus) · Full code not yet released | Long-horizon quality degradation; error accumulation; short-teacher/long-student mismatch | — |
| Self-Forcing | 2025-11-03 | [MotionStream: Real-Time Video Generation with Interactive Motion Controls](https://arxiv.org/abs/2511.01266) | [Project](https://joonghyuk.com/motionstream-web/index.html) | [GitHub](https://github.com/alex4727/MotionStream) · Code not yet released | Interactivity; motion control; generation speed; long-horizon consistency | — |
| LongLive | 2025-09-26 | [LongLive: Real-time Interactive Long Video Generation](https://arxiv.org/abs/2509.22622) | [Project](https://nvlabs.github.io/LongLive/) | [GitHub](https://github.com/NVlabs/LongLive/tree/v1.0) | Interactivity; training-inference mismatch; generation speed; long-range consistency | — |
| LongLive | 2026-05-18 | [LongLive-2.0: An NVFP4 Parallel Infrastructure for Long Video Generation](https://arxiv.org/abs/2605.18739) | [Project](https://nvlabs.github.io/LongLive/LongLive2/) | [GitHub](https://github.com/NVlabs/LongLive) | Training cost; inference speed; memory usage; multi-shot generation | — |
| Helios | 2026-03-04 | [Helios: Real Real-Time Long Video Generation Model](https://arxiv.org/abs/2603.04379) | [Project](https://pku-yuangroup.github.io/Helios-Page/) | [GitHub](https://github.com/PKU-YuanGroup/Helios) | Drift; generation speed; context cost; training efficiency | — |

## Inference-Based Methods

| Family | Date | Paper | Project | Code | Problems Addressed | My Understanding |
| --- | --- | --- | --- | --- | --- | --- |
| LongLive | 2026-06-01 | [LongLive-RAG: A General Retrieval-Augmented Framework for Long Video Generation](https://arxiv.org/abs/2606.02553) | [Project](https://longlive-rag.github.io/) | [GitHub](https://github.com/qixinhu11/LongLive-RAG) | Identity drift; accumulated errors; background flicker; limited sliding-window context | — |

## Notes

- Dates refer to the first arXiv submission.
- The **My Understanding** column is intentionally left blank for personal summaries and ideas.

---

Last updated: 2026-09-02.
