# Importal – Immutable Product & System Constraints (Phase 1 v2)

The following table lists immutable constraints for Importal’s product
and system. These directives apply across all implementations and
phases. Each rule is framed as a non‑negotiable requirement (SYSTEM MUST
or SYSTEM MUST NOT) and includes metadata on its category, applicability
and provenance.

| ID | Directive (SYSTEM MUST/ MUST NOT/ STOP) | Category | Applicability | Source reference | Rationale | Provenance |
|----|----|----|----|----|----|----|
| **IC‑1** | **SYSTEM MUST** implement **local‑first storage**, ensuring the authoritative state for user data is stored locally on the user’s device. Remote services may be used only for optional synchronisation or backup and must never supersede the local source of truth. | **Privacy / Architecture** | System behaviour | Phase 0 Authority & Operating Contract – Section 2.2 “Do not override constraints or guardrails” references guardrails including “local‑first storage”. | Local‑first storage gives users control over their data, reduces dependency on network services and preserves privacy even when offline. Violating this would undermine Importal’s core promise of user‑controlled data. | Conservatively inferred from mention of “local‑first storage” as a guardrail; underlying details require the Foundation Document. |
| **IC‑2** | **SYSTEM MUST** preserve a **truthful, append‑only history** of user actions and system events. The history log must be immutable once recorded; edits or deletions are prohibited. | **Trust & History** | System behaviour | Phase 0 Authority & Operating Contract – Section 2.2 mentions guardrails including “truthful history”. | A truthful history ensures auditability and accountability. It provides users and auditors with a reliable record of what occurred. Altering history would erode trust and break critical audit capabilities. | Conservatively inferred from the guardrail “truthful history”; specific behaviour is expected to be defined by higher‑tier documents. |
| **IC‑3** | **SYSTEM MUST** enforce **privacy boundaries** between user taskspaces and other contexts. Data created in one taskspace must not be accessible in another taskspace or by third parties without explicit user permission. | **Privacy / Data Isolation** | System behaviour | Phase 0 Authority & Operating Contract – Section 2.2 lists “privacy boundaries” among the guardrails. | Strong isolation prevents accidental data leakage and protects sensitive information. Violations would compromise user confidentiality and undermine Importal’s safety guarantees. | Conservatively inferred from the guardrail “privacy boundaries”; full specifications likely reside in the Foundation Document. |
| **IC‑4** | **SYSTEM MUST** maintain a **single workspace** paradigm per user; multi‑workspace support or cross‑workspace integrations are out of scope and must not be implemented without explicit higher‑tier approval. | **Scope / Non‑Goal** | System behaviour | Phase 0 Authority & Operating Contract – Section 2.2 cautions that agents must not override guardrails and names “single workspace” as a guardrail, and Section 2.2 further notes that “multi‑workspace support” remains off‑limits. | Restricting the system to a single workspace simplifies mental models and reduces the risk of unintended data mixing. Introducing multiple workspaces prematurely would alter scope and break assumptions across Importal’s architecture. | Conservatively inferred from the stated guardrail “single workspace” and the explicit deferral of multi‑workspace support. |

\<!-- Notes:

- These constraints are derived from the limited authoritative sources
  available (Phase 0 contract). They are framed conservatively to avoid
  inventing new behaviour. When the Foundation Document and other specs
  become available, these directives should be cross‑checked and
  refined.
- A lack of further product documentation prevented extraction of
  additional invariants. Where higher‑tier documents provide more detail
  (e.g. on telemetry or networking behaviour), those should be added in
  future phases. --\>

------------------------------------------------------------------------
