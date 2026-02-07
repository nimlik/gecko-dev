artefact_type: adr
adr_id: ADR-0001
title: Routing defaults and constraints
status: draft
implementable: no
orientation_only: yes
canonical_path: docs/adrs/ADR-0001_routing_defaults_and_constraints.md
applies_to: docs/features/impl/FB-301_router_core_inputs_and_precedence.md, docs/features/impl/FB-341_omnibar_submit_routing.md, docs/features/impl/FB-342_external_open_routing.md, docs/features/impl/FB-362_link_click_routing.md, docs/features/impl/FB-363_context_menu_taskspace_overrides.md
authority_tier: architectural
last_updated: 2026-02-07

# ADR-0001 — Routing defaults and constraints (Orientation only)

## 1. status

Draft. Architectural decision record (orientation-only). Not directly implementable.

## 2. decision

Adopt deterministic routing with explicit routing inputs and precedence, with no inference: default to staying within the current `windowType` and current taskspace unless an explicit rule requires escalation (e.g., main non-matching content opens in a new taskspace).

## 3. context

Importal v0.1 treats `windowType` as a first-class behavioural boundary (docs/importal_foundation_document_v5.md, section 6.1). Routing must be deterministic, testable, and must not infer user intent; ambiguity must trigger STOP rather than heuristic behaviour (docs/importal_foundation_document_v5.md, sections 2–3). Routing must honour locked Main/Taskspace/Aux behavioural contracts, including Main-to-Taskspace escalation for non-matching content and restricted Aux usage (docs/importal_foundation_document_v5.md, sections 6.2–6.4).

### 3.1 authority basis (Foundation v5 anchors)

This ADR is a constraints map only. It does not define implementable routing tables, allowlists, UI behaviour, or per-surface routing rules; those belong in implementable feature bundles.

Binding authority sources (docs/importal_foundation_document_v5.md, locked sections):

1. Sections 2–4 and 10: agent operating rules, conflict resolution, and execution gating (no assumptions; stop on ambiguity or conflict; artefact-gated progression; stop-sign enforcement).
2. Section 6.1–6.4: windowType semantics and behavioural contracts (main/taskspace/aux boundaries; Main non-matching content escalation to a new Taskspace; Taskspaces created only by explicit user action; Taskspace routing remains scoped; Aux limitations).
3. Section 7: omnibar behaviour (history-blind dropdown by default; explicit mode selection; mode-specific routing constraints).
4. Section 8: history truthfulness and retention (append-only, lossless; no pruning/rewriting; Places augmentation; no parallel History store; Aux excluded from retention guarantees).

If any statement in this ADR conflicts with the above clauses, the docs/importal_foundation_document_v5.md clause prevails and this ADR MUST be corrected.

## 4. options

1. Heuristic routing (infer intent from URL/domain/history and choose destination automatically).
2. Deterministic routing with explicit inputs and precedence, and explicit escalation rules.
3. Minimal routing: always open everything in taskspace, treat main as a static UI shell.

## 5. rationale

Option 2 is the only option that satisfies: (a) “no inference” constraints, (b) `windowType` boundary enforcement, and (c) a mechanically testable routing test matrix. Heuristic routing increases ambiguity and drift risk, and “always taskspace” undermines the main surface contract and toolbar gating.

## 6. consequences

1. Routing decisions may consider only explicit inputs (user gesture/disposition, current `windowType`, current taskspace, target URL, explicit policy rules); they must not use history-derived inference unless explicitly authorised by an implementable FB.

2. When destination is ambiguous, routing must either follow the defined default precedence or STOP (per the stop-sign model), rather than guess.

3. Verification artefacts must include a routing test matrix that enumerates each routing rule and expected outcomes.

4. Changes to routing precedence are architectural decisions and must be recorded via ADR updates, not silently modified inside implementable FBs.

## 7. explicit-inputs rule (normative summary)

This ADR establishes a project-wide default constraint for routing logic:

1. Allowed inputs must be explicitly declared by the owning implementable FB (or schema/ADR it references).
2. Disallowed inputs include (unless an implementable FB explicitly authorises them):
   - browsing history state used as an implicit signal
   - probabilistic classification
   - heuristics such as “looks like a URL”, “this domain is probably an app”, “user likely intends …”
   - content semantics inference from DOM/page meaning

## 8. precedence and defaults (normative summary)

1. Default stance:
   - Stay within the current `windowType` and (if in a Taskspace) within the current Taskspace.

2. Explicit escalation:
   - Escalation (for example, opening a new Taskspace) must be triggered only by an explicit rule owned by an implementable FB and consistent with higher-tier authority (not by heuristic inference).

3. Main constraints:
   - Main-specific constraints and any “non-matching content must open in a new Taskspace” rule are enforced by higher-tier authority and must not be weakened by implementable specs.

## 9. ambiguity handling and STOP discipline

If an implementable spec cannot produce a deterministic outcome from explicitly declared inputs, implementation and drafting MUST STOP rather than introduce heuristics.

Stop-sign mapping (see Governing_Docs/Phase_2_Global_Stop_Sign_Index.md):

 - SS-01 Semantic ambiguity: a required term, requirement, or acceptance criterion is undefined or ambiguous.
 - SS-02 Authority conflict: two authoritative artefacts conflict for the same routing decision surface.
 - SS-05 Inference-required implementation: completing the task would require inventing behaviour, requirements, or intent not explicitly specified by authoritative inputs.

When STOP is invoked, request REQUIRED_AUTHORITY_INPUT with the minimum clarifying questions needed to restore determinism.

## 10. verification expectation (routing test matrix)

Implementable routing specs that depend on this ADR must be verifiable via a deterministic routing matrix:

1. Each routing trigger and rule branch enumerated
2. Inputs listed and held constant per test case
3. Expected routing outcome stated (destination `windowType` and any disposition rule where specified)
4. “No inference” stability demonstrated by repeating cases under different history states (where relevant)

## 11. implementation references (non-normative pointers)

Implementable feature bundles that operationalise this ADR (not exhaustive beyond those supplied as REQUIRED_AUTHORITY_INPUT):

1. docs/features/impl/FB-301_router_core_inputs_and_precedence.md
2. docs/features/impl/FB-341_omnibar_submit_routing.md
3. docs/features/impl/FB-342_external_open_routing.md
4. docs/features/impl/FB-362_link_click_routing.md
5. docs/features/impl/FB-363_context_menu_taskspace_overrides.md

## 12. change control

Updates to routing defaults, allowed inputs, or precedence ordering MUST be made by updating this ADR, and recorded per Governing_Docs/Phase_6_Governance_Stability_Policy.md and Governing_Docs/change_log.md. Implementable FBs MUST NOT silently drift routing precedence or allowed-input rules.