# Phase 1 v2 — Immutable Product & System Constraints (IC Register)

Status: Binding
Last updated: 2026-02-07

## 0. Scope

This file enumerates Importal’s immutable product and system constraints (ICs): identity-defining invariants that must not be violated across implementations.
It includes only product/system behaviour and architecture constraints, not governance, process, or agent-operating mechanics.
Feature-local constraints belong in implementable feature bundles, not here, unless they are truly global.
These ICs remain binding until explicitly amended through authorised change control.

## 1. Immutable Constraints

### IC-01 — Zero non-user-initiated outbound traffic

ID: IC-01
Directive: SYSTEM MUST exhibit zero non-user-initiated outbound network traffic by default.
Category: network
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 5.1 Zero Outbound Traffic Rule
Verification method(s): Manual check: network trace inspection during idle and typical UI usage; confirm no outbound requests occur absent explicit user-initiated navigation/action.
Rationale: Importal’s privacy posture requires behavioural silence unless the user explicitly initiates network access. Background traffic undermines user trust and auditability.
Provenance: Directly extracted

### IC-02 — Definition of user-initiated network access

ID: IC-02
Directive: SYSTEM MUST treat network activity as user-initiated only when it results from a direct, intentional user action whose primary purpose is network access.
Category: network
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 5.1 Zero Outbound Traffic Rule (Definition)
Verification method(s): Manual check: behavioural testing of candidate actions; for each action that triggers network activity, confirm the action is direct and intentionally network-directed (no background fetches reclassified as user-initiated).
Rationale: A strict definition prevents re-labelling background activity as “user-initiated” and preserves the integrity of the zero-outbound posture.
Provenance: Directly extracted

### IC-03 — Stop on unknown outbound traffic

ID: IC-03
Directive: STOP IF any non-user-initiated outbound traffic is observed and not explicitly whitelisted.
Category: network
Applicability: documentation agents, coding agents
Source reference: docs/importal_foundation_document_v5.md — 5.2 Unknown Traffic Handling (Locked)
Verification method(s): Manual check: network trace inspection to detect unknown outbound traffic; confirm workflow halts pending explicit whitelist decision (no further implementation or documentation proceeds).
Rationale: Unauthorised outbound traffic is a privacy-critical anomaly that requires explicit human decision; continuing work risks entrenching unsafe behaviour.
Provenance: Directly extracted

### IC-04 — Local-first source of truth

ID: IC-04
Directive: SYSTEM MUST implement local-first storage, ensuring the authoritative state for user data is stored locally on the user’s device.
Category: data-locality
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 5.3 Local-First Storage (Locked)
Verification method(s): Manual check: inspect storage locations and runtime behaviour; confirm user data state persists locally and remains available without network access.
Rationale: Local-first control minimises dependency on remote services and keeps user data ownership and privacy boundaries enforceable.
Provenance: Directly extracted

### IC-05 — Remote must not supersede local

ID: IC-05
Directive: SYSTEM MUST NOT allow any remote service (including optional synchronisation or backup) to supersede the local source of truth.
Category: data-locality
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 5.3 Local-First Storage (Locked)
Verification method(s): Manual check: if any remote integration exists, validate conflict resolution and restore flows never overwrite local truth without explicit user action confirming replacement.
Rationale: Allowing remote truth would invert control and create a network-dependent authority surface incompatible with Importal’s privacy posture.
Provenance: Directly extracted

### IC-06 — windowType is a hard behavioural boundary

ID: IC-06
Directive: SYSTEM MUST treat windowType as a first-class behavioural boundary with canonical values `main`, `taskspace`, and `aux` (case-sensitive).
Category: architecture
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.1 windowType Semantics
Verification method(s): Manual check: UI behaviour check across all window types; confirm behaviour and routing differ only per the specified windowType semantics and that values are enforced as canonical.
Rationale: Consistent window-type semantics are required for routing, isolation, history attribution, and privacy guarantees to remain coherent.
Provenance: Directly extracted

### IC-07 — Main is constrained to pinned identities

ID: IC-07
Directive: SYSTEM MUST restrict Main to rendering only content matching Application Toolbar entries (pinned app/site identity and origin match).
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.2 Main Window Behaviour
Verification method(s): Manual check: UI behaviour check; attempt to navigate Main to non-matching origins and confirm it is prevented or routed out of Main per rules.
Rationale: Main is an application surface, not a general browsing surface; this constraint preserves predictable routing and reduces cross-context leakage risk.
Provenance: Directly extracted

### IC-08 — Main mismatch routes to new Taskspace

ID: IC-08
Directive: SYSTEM MUST open any URL/domain that does not match a pinned app/site identity in a new Taskspace.
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.2 Main Window Behaviour
Verification method(s): Manual check: UI behaviour check; from Main, trigger navigation to non-matching URLs and confirm a new Taskspace is created and receives the navigation.
Rationale: Non-matching navigation in Main must not silently broaden Main into general browsing; Taskspaces are the containment boundary.
Provenance: Directly extracted

### IC-09 — Main external links and non-admin popups route to Taskspace

ID: IC-09
Directive: SYSTEM MUST open external links from Main and any non-admin popups or `window.open` calls from Main in a new Taskspace.
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.2 Main Window Behaviour
Verification method(s): Manual check: UI behaviour check; from Main, trigger external links and scripted popups and confirm they open in a new Taskspace (not in Main or aux unless explicitly admin/system).
Rationale: This prevents untrusted or out-of-surface navigation from inheriting Main context and enforces Taskspace containment for browsing.
Provenance: Directly extracted

### IC-10 — Taskspaces only by explicit user action

ID: IC-10
Directive: SYSTEM MUST create Taskspaces only by explicit user action and MUST NOT infer or auto-create Taskspaces.
Category: UX
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.3 Taskspace Behaviour
Verification method(s): Manual check: UI behaviour check across navigation scenarios; confirm no Taskspaces are created without an explicit user action to create/open one.
Rationale: Automatic Taskspace creation would introduce inference-driven behaviour and unpredictable state, breaking user agency and mental model stability.
Provenance: Directly extracted

### IC-11 — Vertical tabs only in Taskspaces

ID: IC-11
Directive: SYSTEM MUST restrict vertical tabs to Taskspaces (vertical tabs MUST exist only in Taskspaces).
Category: UX
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.3 Taskspace Behaviour
Verification method(s): Manual check: UI behaviour check; confirm vertical tabs render in Taskspaces and do not render in Main or aux.
Rationale: Vertical tabs are part of the Taskspace workflow construct; allowing them elsewhere would blur boundaries and degrade the product’s core model.
Provenance: Directly extracted

### IC-12 — Taskspace routing must remain scoped

ID: IC-12
Directive: SYSTEM MUST keep routing within a Taskspace scoped to that Taskspace.
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.3 Taskspace Behaviour
Verification method(s): Manual check: UI behaviour check; perform navigation actions within a Taskspace and confirm resulting tabs/windows remain within the same Taskspace unless an explicit rule routes elsewhere.
Rationale: Cross-Taskspace routing breaks containment, increases leakage risk, and undermines Taskspaces as the primary privacy and workflow boundary.
Provenance: Directly extracted

### IC-13 — Taskspace privacy boundaries and data isolation

ID: IC-13
Directive: SYSTEM MUST enforce privacy boundaries between user Taskspaces and other contexts, and SYSTEM MUST NOT make data created in one Taskspace accessible in another Taskspace or to third parties without explicit user permission.
Category: privacy
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.3 Taskspace Behaviour
Verification method(s): Manual check: UI behaviour check of cross-Taskspace access attempts; confirm data does not appear across Taskspaces without explicit user permission actions.
Rationale: Taskspaces are privacy boundaries; data isolation is essential to prevent accidental leakage and preserve user control.
Provenance: Directly extracted

### IC-14 — Aux usage is strictly limited

ID: IC-14
Directive: SYSTEM MUST restrict `aux` windows to system/admin prompts or supporting windows.
Category: architecture
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.4 Aux Window Behaviour
Verification method(s): Manual check: UI behaviour check; enumerate aux window entry points and confirm they are limited to system/admin prompts or supporting surfaces.
Rationale: Aux exists for constrained system surfaces; expanding its scope would create an ambiguous context that weakens boundary guarantees.
Provenance: Directly extracted

### IC-15 — Aux must not inherit Taskspace context

ID: IC-15
Directive: SYSTEM MUST NOT allow `aux` to silently inherit Taskspace context.
Category: privacy
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 6.4 Aux Window Behaviour
Verification method(s): Manual check: UI behaviour check; open aux surfaces from Taskspaces and confirm no Taskspace state, tabs, or routing context is inherited unless explicitly specified by system/admin flow.
Rationale: Silent inheritance would create covert cross-context coupling and privacy leakage paths that users cannot reason about or control.
Provenance: Directly extracted

### IC-16 — Omnibar is history-blind by default

ID: IC-16
Directive: SYSTEM MUST keep the omnibar dropdown history-blind by default.
Category: UX
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 7. Omnibar Behaviour (Locked)
Verification method(s): Manual check: UI behaviour check; type into omnibar prior to explicit selection and confirm no history suggestions appear.
Rationale: History-blind defaults reduce inadvertent disclosure and ensure history access is an explicit user choice.
Provenance: Directly extracted

### IC-17 — Omnibar pre-selection options are limited

ID: IC-17
Directive: SYSTEM MUST display only “Search Google”, “Search Importal”, and “URL” in the omnibar dropdown before explicit selection.
Category: UX
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 7. Omnibar Behaviour (Locked)
Verification method(s): Manual check: UI behaviour check; open omnibar dropdown pre-selection and confirm only the three specified options are present.
Rationale: A constrained pre-selection menu prevents implicit history exposure and makes routing intent explicit.
Provenance: Directly extracted

### IC-18 — Omnibar Search Google routing

ID: IC-18
Directive: SYSTEM MUST open “Search Google” results in a new Taskspace when initiated from Main, and in the current Taskspace (default: new tab) when initiated from a Taskspace.
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 7. Omnibar Behaviour (Locked)
Verification method(s): Manual check: UI behaviour check; run Search Google from Main and from a Taskspace and confirm routing matches the specified behaviour.
Rationale: This preserves Main as a constrained surface while allowing Taskspaces to behave as the user’s active browsing/work context.
Provenance: Directly extracted

### IC-19 — Omnibar Search Importal gates history exposure

ID: IC-19
Directive: SYSTEM MUST NOT show history suggestions prior to explicit “Search Importal” selection, and selecting “Search Importal” MUST load History in Main.
Category: history
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 7. Omnibar Behaviour (Locked)
Verification method(s): Manual check: UI behaviour check; confirm no history suggestions appear before selecting Search Importal, then select it and confirm History loads in Main.
Rationale: History access must be explicit and routed to the dedicated History surface, preventing accidental disclosure in the omnibar.
Provenance: Directly extracted

### IC-20 — History view organisation and Taskspace affordance

ID: IC-20
Directive: SYSTEM MUST organise History results by recency and Taskspace and MUST provide a one-click “Open Taskspace” action.
Category: history
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 7. Omnibar Behaviour (Locked)
Verification method(s): Manual check: UI behaviour check; open History and confirm grouping by recency and Taskspace and the presence/function of a one-click Open Taskspace action.
Rationale: History is intended to be Taskspace-aware and actionable; the UI must preserve Taskspace structure rather than flatten it.
Provenance: Directly extracted

### IC-21 — Omnibar URL routing rules

ID: IC-21
Directive: SYSTEM MUST open “URL” selections in the current Taskspace (default: new tab) when initiated from a Taskspace, and when initiated from Main it MUST show the app/site in Main only if the URL origin matches a pinned app/site identity, otherwise it MUST open a new Taskspace with the URL in a new tab.
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 7. Omnibar Behaviour (Locked)
Verification method(s): Manual check: UI behaviour check; enter matching and non-matching URLs from Main and from Taskspaces and confirm routing and tab placement match the specified rules.
Rationale: This prevents Main from becoming general browsing while preserving fast access to pinned application surfaces.
Provenance: Directly extracted

### IC-22 — History is exhaustive and append-only

ID: IC-22
Directive: SYSTEM MUST maintain History as exhaustive, append-only, and lossless.
Category: history
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 8. History Truthfulness and Retention (Locked)
Verification method(s): Manual check: Places DB inspection and behavioural tests; confirm entries are appended and not removed/overwritten during normal operation.
Rationale: Trustworthy history requires completeness and immutability at the data layer; lossy or editable records undermine truthfulness.
Provenance: Directly extracted

### IC-23 — Places is the canonical History record

ID: IC-23
Directive: SYSTEM MUST augment Firefox/Gecko Places for History storage and SYSTEM MUST NOT introduce a parallel History store/database that bypasses or duplicates Places as the canonical History record (session restore state may be stored separately but MUST NOT become a second History system).
Category: architecture
Applicability: system behaviour, coding agents
Source reference: docs/importal_foundation_document_v5.md — 8. History Truthfulness and Retention (Locked)
Verification method(s): Manual check: code and data inspection; confirm Places is the canonical history substrate and no parallel history DB/store is created for history semantics.
Rationale: A single canonical history substrate prevents divergence, duplication, and inconsistent attribution semantics.
Provenance: Directly extracted

### IC-24 — No history rewriting at the data layer

ID: IC-24
Directive: SYSTEM MUST NOT prune, compress, rewrite, or summarise History at the data layer.
Category: history
Applicability: system behaviour, coding agents
Source reference: docs/importal_foundation_document_v5.md — 8. History Truthfulness and Retention (Locked)
Verification method(s): Manual check: Places DB inspection over time and behavioural tests; confirm no pruning/compression/rewriting/summarisation occurs at the data layer.
Rationale: Data-layer transformations compromise truthfulness and make “history as record” non-auditable.
Provenance: Directly extracted

### IC-25 — Indefinite retention and no retention policy surface

ID: IC-25
Directive: SYSTEM MUST retain pages visited in `main` and `taskspace` indefinitely, MUST exclude `aux` from the indefinite retention guarantee, and MUST define no retention/expiry policy surface in v0.1 (no settings and no configurable retention).
Category: history
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 8. History Truthfulness and Retention (Locked)
Verification method(s): Manual check: UI behaviour check for absence of retention settings; Places DB inspection to confirm ongoing retention for main/taskspace entries and exclusion semantics for aux as specified.
Rationale: Indefinite retention is a defining v0.1 contract; introducing retention controls or expiry would materially change product semantics and trust posture.
Provenance: Directly extracted

### IC-26 — UI must not alter history records

ID: IC-26
Directive: SYSTEM MUST allow UI views to filter or sort History but MUST NOT alter underlying History records.
Category: trust
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 8. History Truthfulness and Retention (Locked)
Verification method(s): Manual check: perform filtering/sorting in History UI and then inspect Places DB to confirm no record mutation (only presentation changes).
Rationale: Presentation is permitted; mutation is not. Preserving record integrity maintains truthfulness and auditability.
Provenance: Directly extracted

### IC-27 — Downloads are attributed to initiating window

ID: IC-27
Directive: SYSTEM MUST attribute downloads to the initiating window (`main` or `taskspace`) and MUST ensure “Save As” attribution follows the initiating window.
Category: trust
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 9. Downloads Attribution (Locked)
Verification method(s): Manual check: UI behaviour check; initiate downloads and Save As actions from Main and Taskspaces and confirm attribution is recorded/displayed per initiating window.
Rationale: Accurate attribution preserves user understanding and supports reliable auditing of where actions originated.
Provenance: Directly extracted

### IC-28 — Block non-gesture downloads

ID: IC-28
Directive: SYSTEM MUST block downloads without an explicit user gesture.
Category: security
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 9. Downloads Attribution (Locked)
Verification method(s): Manual check: attempt scripted/automatic download triggers without user gesture and confirm the download is blocked.
Rationale: Gesture-gating prevents silent or drive-by downloads and reduces abuse vectors.
Provenance: Directly extracted

### IC-29 — File opening from Main routes to Taskspace

ID: IC-29
Directive: SYSTEM MUST open files (opening, not downloading) initiated in Main in a Taskspace and MUST attribute file opening to the Taskspace.
Category: routing
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 9. Downloads Attribution (Locked)
Verification method(s): Manual check: UI behaviour check; initiate file open from Main and confirm it opens in a Taskspace and attribution reflects Taskspace initiation.
Rationale: Files are part of browsing/work context and should not execute or display inside Main’s constrained surface.
Provenance: Directly extracted

### IC-30 — Telemetry hardening success is behavioural silence

ID: IC-30
Directive: SYSTEM MUST treat telemetry hardening success as behavioural silence (not binary removal), and residual binaries MAY remain present without violating success.
Category: network
Applicability: system behaviour
Source reference: docs/importal_foundation_document_v5.md — 11. Telemetry Hardening Closure: Known Exceptions and Rationale (Locked)
Verification method(s): Manual check: network trace inspection under defined test scenarios; confirm telemetry-related endpoints are not contacted (behavioural silence), independent of binary presence.
Rationale: The product-level outcome is observable silence; attempting to remove all remnants shifts focus to brittle refactors rather than measurable privacy posture.
Provenance: Directly extracted

### IC-31 — No kernel or network enforcement for telemetry hardening

ID: IC-31
Directive: SYSTEM MUST NOT rely on kernel or network enforcement mechanisms as part of telemetry hardening.
Category: architecture
Applicability: system behaviour, coding agents
Source reference: docs/importal_foundation_document_v5.md — 11. Telemetry Hardening Closure: Known Exceptions and Rationale (Locked)
Verification method(s): Manual check: implementation inspection; confirm telemetry hardening does not depend on OS-level kernel hooks, firewall rules, or external network enforcement.
Rationale: Hard enforcement layers materially change system assumptions and maintenance burden; Importal’s posture is defined by behavioural constraints in the product itself.
Provenance: Directly extracted

### IC-32 — v0.1 deferred and out-of-scope feature prohibitions

ID: IC-32
Directive: SYSTEM MUST NOT implement v0.1 out-of-scope areas (Updates, DRM, AI features, Accounts and sync, Multi-workspace support or cross-workspace integrations, Extensions as privacy posture) and MUST remain single-workspace unless explicitly amended.
Category: scope
Applicability: system behaviour, coding agents, documentation agents
Source reference: docs/importal_foundation_document_v5.md — 13. Deferred and Out-of-Scope Areas (Explicit)
Verification method(s): Manual check: feature audit of shipped surfaces and settings; confirm absence of the prohibited areas and confirm single-workspace posture.
Rationale: These exclusions are explicit scope boundaries; implementing them would constitute product drift and invalidate v0.1 assumptions.
Provenance: Directly extracted

## 2. Unable to Extract Safely (if any)

None.
