

Importal Foundation Document v5

Engine decision, privacy posture, governance, and agent-executable constraints for Importal v0.1

Supersedes: Foundation Document v4 (superseded on 2026-02-05)

Status: draft (until user freezes)

Scope: constitutional authority

Change control: updates must be logged in Governing_Docs/change_log.md (do not edit it in this run)

Audience: Human architects and autonomous coding agents operating on the Importal codebase

---

## 0. Purpose and Operating Model

This document is the constitutional authority governing Importal v0.1 product semantics.

It is written to be executable by autonomous agents, not merely descriptive.

Primary objectives:

- Prevent silent scope creep

- Enforce strict sequencing and gating discipline (artefact-driven; no assertion-based progression)

- Protect privacy through architectural constraints, not promises

- Ensure agents halt safely on ambiguity, conflict, or unknown risk

Any contradiction between this document and lower-order artefacts is a defect, unless explicitly accepted in writing.

---

## 1. Authority Hierarchy (Locked)

Order of authority, highest to lowest:

1. This Foundation Document v5 (constitutional product authority)

2. Governing_Docs Phase 0–6 (binding governance authority for closed-authority operation and change control)

3. docs/spec_registry.md (routing index; canonical paths and authority labels)

4. docs/adrs/* (authoritative architecture decisions within stated scope)

5. docs/features/impl/* (implementable feature bundles: requirements + acceptance + verification)

6. docs/features/epics/* (non-implementable overview epics; orientation only)

Note: docs/features/epics/* contains Epic Feature Bundles (EFB-###). EFBs are authoritative for orientation and domain framing only and are not implementable requirements. For implementation tasks, normative requirements must come from docs/features/impl/* (FB-###) and normative architecture constraints from docs/adrs/* (ADR-####). If a document is marked implementable: no, implementation must STOP and request the relevant docs/features/impl/* bundle.

7. Implementation notes, build notes, comments (non-authoritative)

8. Code reality (non-authoritative; contradictions are defects)

Legacy specification corpus status (locked):

- Any “frozen” or historical spec corpus is legacy, non-authoritative, archived and MUST NOT be used for decisions unless the user explicitly instructs it.

- When explicitly instructed, legacy may be used as historical context only; decisions MUST still be justified from items 1–6 above, or agents MUST STOP.

Rules:

- Agents MUST NOT infer behaviour from lower authority when higher authority is silent.

- Code that contradicts higher authority MUST be treated as a defect, not “ground truth”.

- Agents MUST NOT introduce new guarantees, features, or subsystems without an explicit update to an authoritative artefact (this document, a relevant ADR, or a relevant implementable feature bundle).

---

## 2. AI Agent Operating Rules (Hard Constraints)

These rules are mandatory and override all generic agent behaviour.

Agents MUST:

- Not assume missing context

- Not fabricate repo state, files, flags, or behaviour

- Use minimum diagnostics only

- Stop immediately on ambiguity or conflict

- Request human input rather than “fill gaps”

Agents MUST NOT:

- Continue work outside the declared scope boundary (see docs/agent_activation_rules.md: scope isolation and role limits)

- Investigate unknown network traffic autonomously

- Expand accepted exception lists

- Reinterpret “intent” where text is explicit

---

## 3. Conflict Resolution Protocol (Mandatory)

On detecting conflict or ambiguity between authorities, agents MUST halt and produce a Conflict Report containing:

1. Cited clauses (exact references)

2. Description of the conflict or ambiguity

3. Impacted scope and risk

4. At least two resolution options

5. Explicit refusal to proceed until resolved

No work may continue until a human resolves the conflict.

---

## 4. Execution Gating Protocol (Locked)

Work progression is artefact-gated, not assertion-based.

Rules:

- Required authoritative inputs and gating discipline are defined in Governing_Docs/Phase_3_Phase_Execution_Model.md and routed via docs/spec_registry.md.

- For feature implementation, the relevant implementable feature bundle (docs/features/impl/*) is required before work begins.

- Verification artefacts are required at the granularity specified by the feature bundle; audit references are recorded per Governing_Docs/Phase_6_Governance_Stability_Policy.md.

- If required authoritative inputs or required verification artefacts are missing or ambiguous, agents MUST STOP (see Governing_Docs/Phase_2_Global_Stop_Sign_Index.md and docs/agent_activation_rules.md).

Rollback expectation:

- Every change must be reversible

- Rollback instructions are part of verification, not optional

---

## 5. Network Posture and Telemetry Discipline (v0.1)

### 5.1 Zero Outbound Traffic Rule

By default, Importal v0.1 MUST exhibit:

### Zero non-user-initiated outbound network traffic

Definition (added for agent executability):

- *User-initiated* means a direct, intentional user action whose primary purpose is network access (e.g. navigating to a URL, clicking a link).

### 5.2 Unknown Traffic Handling (Locked)

If any non-user-initiated outbound traffic is observed and not explicitly whitelisted:

- All work MUST halt immediately

- Agents MUST request human input

- Agents MUST NOT attempt investigation, mitigation, or suppression

### 5.3 Local-First Storage (Locked)

Rules:

- Importal MUST implement local-first storage, ensuring the authoritative state for user data is stored locally on the user’s device.

- Remote services may be used only for optional synchronisation or backup and MUST NEVER supersede the local source of truth.

---


---

## 6. Core Behavioural Contracts (Locked)

### 6.1 windowType Semantics

Canonical values (case-sensitive):

- `main`

- `taskspace`

- `aux`

windowType is a first-class behavioural boundary.

---

### 6.2 Main Window Behaviour

Main is a constrained browsing surface.

Rules:

- Main may only render content matching Application Toolbar entries (identity/origin match as defined by routing policy tables; a pinned app identity MAY explicitly enumerate multiple required origins, but only when those origins are listed in the routing policy tables)

- If a user-initiated navigation targets a URL/domain that does not match, it MUST open in a new Taskspace

- External links from Main (user-initiated) MUST open in a new Taskspace

- Non-admin popups or `window.open` calls from Main MUST open in a new Taskspace when they occur as a direct consequence of explicit user action

- Admin/system prompts MAY open in `aux`

---

### 6.3 Taskspace Behaviour

Rules:

- Taskspaces are created only by explicit user action

- Explicit user action includes a user-initiated navigation gesture whose deterministic routing outcome is to open in a new Taskspace (for example, a link click or omnibar submission from Main that does not match a pinned app identity)

- No automatic inference or background creation (no heuristic or autonomous Taskspace creation not directly caused by a user gesture)

- Vertical tabs exist only in Taskspaces

- Routing within a Taskspace MUST remain scoped to that Taskspace

- Taskspaces MUST enforce privacy boundaries between user Taskspaces and other contexts.

- Data created in one Taskspace MUST NOT be accessible in another Taskspace or by third parties without explicit user permission.


---

### 6.4 Aux Window Behaviour

Aux is strictly limited.

Rules:

- Used only for system/admin prompts or supporting windows

- Aux MUST NOT silently inherit Taskspace context

- Aux is excluded from history retention guarantees

---

## 7. Omnibar Behaviour (Locked)

Rules:

- Omnibar dropdown is history-blind by default

- Before explicit selection, it MUST show only:

- “Search Google”

- “Search Importal”

- “URL”

Behaviour (routing is defined by EFB-003; these clauses exist to prevent contradiction):

- Selecting “Search Google”:
- From Main: open a new Taskspace with results
- From a Taskspace: open results in the current Taskspace (default: new tab)

- Selecting “Search Importal” loads History in Main

- Selecting “URL”:
- From a Taskspace: open the URL in the current Taskspace (default: new tab)
- From Main:
- If the URL’s origin matches a pinned app/site identity: show that app/site in Main
- Else: open a new Taskspace with the URL in a new tab

- History suggestions MUST NOT appear prior to explicit “Search Importal” selection

- History results are organised by recency and Taskspace

- A one-click “Open Taskspace” action MUST be present

---

## 8. History Truthfulness and Retention (Locked)

Rules:

- History is exhaustive, append-only, and lossless. 

- History storage constraint (v0.1): Importal MUST augment Firefox/Gecko Places for History storage. Implementations MUST NOT introduce a parallel History store/database that bypasses or duplicates Places as the canonical History record. Session restore state (open windows/taskspaces/tabs) may be stored separately, but MUST NOT become a second History system (i.e., it must not duplicate History retention, indexing, or attribution semantics).

- No pruning, compression, rewriting, or summarisation at the data layer

- Pages visited in `main` and `taskspace` are retained indefinitely

- `aux` is excluded from the indefinite retention guarantee

### Retention policy is removed entirely from v0.1 schema and specs

 - v0.1 defines no retention/expiry policy surface (no settings, no configurable retention). History persistence is treated as indefinite by default until an explicit retention feature is specified.

Implementation detail is defined in the History Feature Bundle set (see EFB-004 for orientation). Any implementable FB under docs/features/impl/ must implement the above constitutional constraints and must not weaken them.

UI views may filter or sort, but MUST NOT alter underlying records.

---

## 9. Downloads Attribution (Locked)

Rules:

- Downloads are attributed to the initiating window (main/taskspace)

- Downloads without explicit user gesture MUST be blocked

- “Save As” attribution follows initiating window

- Opening (not downloading) a file in Main opens it in a Taskspace

- File opening is attributed to the Taskspace

---

## 10. Execution Gating and Stop Signs (Locked)

This constitution does not define an implementation roadmap. Sequencing and gating are defined by the authoritative governance stack and feature bundles.

Rules:

1. Work progression is artefact-gated (see Governing_Docs/Phase_3_Phase_Execution_Model.md).

2. STOP semantics and refusal conditions are defined by Governing_Docs/Phase_2_Global_Stop_Sign_Index.md and enforced by docs/agent_activation_rules.md.

3. Verification artefacts are required at the granularity specified by the relevant implementable feature bundle (docs/features/impl/*), and must be recorded or referenced in Governing_Docs/change_log.md per Governing_Docs/Phase_6_Governance_Stability_Policy.md.

4. Any prior enumerated execution-plan text in Foundation v4 is superseded by this feature-first gating model and MUST NOT be treated as authoritative sequencing.

---

## 11. Telemetry Hardening Closure: Known Exceptions and Rationale (Locked)

Rules:

- Success criterion is behavioural silence

- Residual binaries MAY remain present

- Prohibited actions:

- Binary removal

- “Proving impossibility” refactors

- Kernel or network enforcement

- Agents MUST NOT expand accepted residuals without authorisation

---

## 12. Agent Halt and Refusal Conditions (Consolidated)

Agents MUST refuse to proceed if:

- Any required authoritative artefact is missing or ambiguous (see docs/spec_registry.md and docs/agent_activation_rules.md)

- Any required verification artefact (as defined by the relevant implementable feature bundle) is missing or ambiguous

- An authority conflict exists

- Declared scope or role limits are violated (see docs/agent_activation_rules.md)

- Unknown outbound network traffic is observed

---

## 13. Deferred and Out-of-Scope Areas (Explicit)

Out of scope for v0.1:

- Updates

- DRM

- AI features

- Accounts and sync

- Multi-workspace support or cross-workspace integrations (Importal remains single-workspace unless explicitly amended)

- Extensions as privacy posture

Agents MUST NOT implement speculative placeholders.

---

## 14. Amendments and Change Control

Changes require:

- Explicit documentation

- Rationale

- Scope impact

- Human approval

Change control:

- Updates to authoritative artefacts MUST be logged in Governing_Docs/change_log.md (audit record only).

- Canonical paths and authority labels are routed by docs/spec_registry.md; path drift is a defect.

Silent evolution is forbidden.

---

End of Foundation Document v5
