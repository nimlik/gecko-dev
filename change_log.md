# Importal Documentation Change Log

\<!-- This file records all changes to the Importal specifications after
Phase 0. Do not delete or modify past entries. Each entry includes the
date, author/agent, summary of changes, rationale referencing the
relevant authority, and the affected documents. Group entries under
phase headings for clarity. --\>

## Phase 0

No changes recorded. Phase 0 establishes the authority and operating
contract; subsequent modifications are logged under later phases.

## Phase 1

2026-01-28 -- Documentation agent  
**Summary:** Produced the Phase 1 v2 immutable constraints document
(`immutable_constraints.md`). This version replaces the earlier Phase 1
attempt and formalises Importal's non‑negotiable product and system
invariants.  
**Rationale:** In Phase 0, the authority contract notes that guardrails
such as local‑first storage, truthful history, privacy boundaries and a
single‑workspace model must never be overridden. With limited
higher‑tier documents available, the Phase 1 v2 effort conservatively
extracted those guardrails as immutable constraints. This entry records
the creation of those constraints and acknowledges that further
refinement will be required when the Foundation Document and other specs
are accessible.  
**Affected documents:** `immutable_constraints.md` (new),
`change_log.md` (this entry).

## Phase 2

2026-01-28 -- Documentation agent  
**Summary:** Produced the Phase 2 canonical stop‑sign index
(`stop_sign_index.md`) and appended the Phase 2 entry in the change
log.  
**Rationale:** Following the Phase 0 Authority contract's guidance on
global stop signs and the immutable constraints extracted in Phase 1,
the documentation agent created a consolidated index of all hard halting
conditions. This index ensures that future agents and contributors can
quickly determine when work must stop and seek clarification or human
approval, preventing scope drift, unverifiable changes or safety
violations. The Phase 2 entry records the creation of this stop‑sign
index and updates the change log accordingly.  
**Affected documents:** `stop_sign_index.md` (new), `change_log.md`
(this entry).

## Phase 3

2026-01-28 -- Documentation agent  
**Summary:** Created the Phase 3 Phase Execution Model
(`phase_execution_model.md`) and appended this entry to the change
log.  
**Rationale:** Building on the authority hierarchy, immutable
constraints and global stop‑sign index, the Phase 3 effort defines a
strict ordering of work for Importal. By specifying allowed scope,
prohibitions, required inputs/outputs, verification artefacts and
advancement gates for each phase, the model prevents unsafe progression
and ensures that work does not proceed without the necessary
documentation and approvals. This entry records the creation of the
phase execution model and acknowledges that future phases depend on the
availability of the Foundation Document and other specifications.  
**Affected documents:** `phase_execution_model.md` (new),
`change_log.md` (this entry).

## Phase 4

2026-01-28 -- Documentation agent  
**Summary:** Created the Phase 4 Glossary & Naming Enforcement document
(`glossary_and_naming.md`) and appended this entry to the change log.  
**Rationale:** According to the Phase Execution Model, Phase 4 requires
producing a binding glossary and naming‑enforcement document to prevent
semantic drift and hallucinated terminology. This entry records the
creation of the glossary, which freezes the meaning of key terms and
defines allowed and forbidden aliases, ensuring consistent language
across future work.  
**Affected documents:** `glossary_and_naming.md` (new), `change_log.md`
(this entry).

## Phase 5

2026-01-28 -- Documentation agent  
**Summary:** Produced the Phase 5 spec classification & mapping document
(`spec_classification_and_mapping.md`) and created `change_log.md` with
an appended Phase 5 entry. This document indexes all available
specifications, conservatively classifies each along authority,
actionability and phase applicability axes, maps each spec to immutable
constraints, stop signs and glossary terms, flags missing documents, and
records ambiguities or risks.  
**Rationale:** In accordance with the Phase Execution Model, Phase 5
requires establishing a spec classification and mapping to enable agents
to navigate the corpus safely. This entry records the creation of that
index and acknowledges that several referenced specifications are
missing, triggering SS‑01 and SS‑04 if not resolved.  
**Affected documents:** `spec_classification_and_mapping.md` (new),
`change_log.md` (this entry).

## Phase 6

2026-01-28 -- Documentation agent  
**Summary:** Created the Phase 6 Maintenance & Drift‑Control policy
(`maintenance_and_drift_control.md`) and appended this entry to the
change log. The policy defines authorised change pathways, change
triggers, mandatory change mechanics, drift detection signals, audit
cadence and scope, and agent‑specific rules to prevent silent change,
degradation or loss of authority over time.  
**Rationale:** According to the Phase Execution Model, Phase 6 addresses
governance over time. Drawing on the Authority & Operating Contract, the
immutable constraints, the global stop‑sign index and the spec
classification mapping, the maintenance policy establishes mechanical
rules to control change, detect drift and enforce audits. This entry
records the creation of this policy and ensures that time‑related
governance is now codified.  
**Affected documents:** `maintenance_and_drift_control.md` (new),
`change_log.md` (this entry).

------------------------------------------------------------------------

## Phase 7 — Foundation Document v4 assimilation

- Recorded ingestion of Foundation Document v4 as authoritative source (no semantic changes in this entry).
