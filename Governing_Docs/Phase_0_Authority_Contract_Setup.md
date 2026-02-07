# Phase 0: Authority Lock and Operating Contract (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

This document defines who may decide, what constitutes an authorised change, and how agents must operate within Importal’s documentation system.

This update reflects the current operating reality:

- The docs/importal_foundation_document_v5.md is constitutional product authority (cold reference), not operational context.
- Day-to-day engineering is driven by feature-first specifications designed for rapid, low-inference iteration.

## 1. Authority hierarchy (normative)

Authority is layered. Agents must never reconcile conflicts implicitly.

1. Phase 0: Authority Lock and Operating Contract (this document) for governance, enforcement, and operating mechanics.
2. docs/importal_foundation_document_v5.md for product intent, non-goals, and constitutional product semantics.
3. Phase governance artefacts (Phases 1–6) for constraints, stop-signs, sequencing, naming enforcement, classification, and drift control.
4. Feature specifications (Feature bundles) for implementable behaviour, acceptance criteria, and verification steps.
5. Implementation notes and code reality (non-authoritative unless explicitly elevated by an authority decision recorded in change_log.md).

Conflict rule:

- If governance mechanics conflict: Phase 0 prevails.
- If product semantics conflict: importal_foundation_document_v5.md prevails.
- If a lower-tier artefact conflicts with a higher-tier artefact: the lower-tier artefact is invalid until corrected.

## 2. Operating posture for coding agents (normative)

Agents must operate feature-first.

Default working set for an implementation task:

- The relevant feature bundle (Feature spec + acceptance criteria + verification steps + constraints for that feature).
- The Global Stop-Sign Index.
- The Immutable Constraints set.

Agents must not ingest the entire importal_foundation_document_v5.md for routine tasks unless:

- the feature spec is ambiguous or incomplete, or
- a conflict is detected, or
- the task explicitly requires constitutional interpretation.

## 3. Change permissions (normative)

Agents may:

- propose edits via diffs to feature bundles and phase artefacts within allowed scope, with explicit rationale and verification artefacts.

Agents must not:

- edit the importal_foundation_document_v5.md without explicit authority to do so.
- create or redefine product intent.
- “upgrade” any document’s authority tier.
- rename or relocate canonical artefacts unless instructed by an authorised human decision.

## 4. Required execution protocol (normative)

For any task, agents must:

1. Identify the governing feature bundle (or state that none exists).
2. Identify applicable immutable constraints.
3. Identify applicable stop-signs.
4. Produce a minimal reversible change.
5. Produce verification artefacts required by the feature bundle and governance docs.
6. Record change metadata in change_log.md as required by Phase 6.

If any step cannot be completed without inference, halt under the relevant stop-sign.

## 5. Output requirements (normative)

All agent outputs must include:

- explicit scope statement
- explicit files touched
- explicit verification steps performed (or to be performed)
- explicit stop-signs checked and not triggered
- explicit remaining risk or ambiguity

## 6. Escalation (normative)

When a stop-sign triggers, the agent must:

- halt
- state which stop-sign triggered
- state what information or authority is missing
- propose the smallest clarification question(s) needed to proceed

No workaround behaviour is permitted.
