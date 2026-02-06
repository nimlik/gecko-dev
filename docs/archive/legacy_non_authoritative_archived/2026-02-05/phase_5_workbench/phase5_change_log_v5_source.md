# Specification Changes Log

**IGNORE THIS FILE** **THIS FILE DOES NOT PROVIDE USEFUL INFORMATION FOR
IMPORTAL** **IGNORE THIS FILE**

This log records all modifications made during the authority & scope
reset. Each entry identifies the file, the original section impacted
(where relevant) and a summary of the change. The purpose of this log is
to provide traceability for reviewers and future authors.

## New Documents

------------------------------------------------------------------------

File Description

------------------------------------------------------------------------

**01_scope_and_non_goals.md** Added a new authority & scope
specification that enumerates Importal's explicit scope, deferred
features and permanent exclusions. It clarifies that provider
integrations, multi‑device sync, multi‑workspace, collaboration, AI
assistance and offline‑first operation are out of scope for v0.1. It
also lists non‑target markets and personas.

**02_foundational_constraints.md** Added a new authority & scope
specification capturing non‑negotiable constraints from the Foundation
Document. It codifies local‑first storage, telemetry hardening, truthful
history, UI privacy boundaries, trust‑over‑convenience defaults,
structural invariants (Scratch Taskspace, window typing, session
restore) and the phased development process.

**version_differentiation.md** Replaced the speculative roadmap
(rewritten) table with a context‑only overview. The new file now
describes v0.1's focus on a local‑first core and notes that future
versions are undefined until the Foundation Document is updated. It
removes prior references to calendar, tasks, email and provider support.

------------------------------------------------------------------------

## Updated Core Concept Specifications (Tier 3)

------------------------------------------------------------------------

File Section Summary of Changes

------------------------------------------------------------------------

**window_type_spec.md** Entire document Added authority context. Rewrote
navigation and routing rules to reference the Scratch Taskspace instead
of "Scratch/InBox". Removed right‑hand Task Panel requirements,
email/event linking and other provider‑dependent features. Clarified
that allowed actions in Taskspace windows include only tab management
and history; metadata panels are deferred. Added guidance that secondary
toolbar interactions may offer "open in new Taskspace" without defining
UI details.

**taskspaces.md** Scratch Taskspace Renamed the section "Scratch/Inbox
Taskspace" section to "Scratch Taskspace"; clarified that Scratch
captures only ambiguous navigations from Importal and that no external
content (emails) is routed there.

**taskspace_lifecycle.md** Guardrails, state Updated guardrails to
model, creation remove references to principles emails. Clarified that
creation implies no commitment via clicks only. Updated the state model:
Active Taskspaces are those persisted by the user (not linked to tasks).
Revised creation principles to remove Inbox/email references.

**taskspace_registry_spec.md** Core fields & lifecycle Added clarity
that rules `created_from` values include only dashboard, main and
toolbar (email removed). Changed lifecycle rules: Activation is now
defined by user persistence (e.g., editing the title), not linking to
tasks. Archival is triggered by explicit user action or closing the
window.

**main_window.md** Meaningful navigation & Replaced references to
shortcut semantics the Scratch/InBox Taskspace with the Scratch
Taskspace. Corrected the semantics of Cmd + W to close the Main Window
and exit Importal (rather than doing nothing).

**verification_map.md** Entire document Added authority context. Updated
behaviours and verification steps across all weeks to align with the
foundation: removed email/Inbox references, specified creation paths via
toolbar options, removed export/clear controls and history editing, and
clarified scratch semantics.

**guardrails_and_stop_signs.md** Context & safety Replaced mentions of
guardrails; deferred "Scratch/InBox" with work "Scratch". Clarified that
creation is via clicks only and defers provider‑driven creation. Renamed
the guardrail "No forced naming or task creation" to "No forced naming
or linking" and removed references to tasks. Updated the deferred work
item on history editing/deletion to state that export/clear controls do
not exist in v0.1 and must be authorised later.

------------------------------------------------------------------------

## Implementation‑Adjacent Specifications (Tier 4)

------------------------------------------------------------------------

File Section Summary of Changes

------------------------------------------------------------------------

**verification_map.md** Added authority context and aligned  
verification steps with updated scope; see  
above.

**taskspace_registry_spec.md** See Core Concept  
updates; this doc  
defines the schema and  
lifecycle rules.

**window_type_spec.md** Added authority context and removed speculative
UI details; see above.

------------------------------------------------------------------------

## Deleted or Deprecated Content

------------------------------------------------------------------------

File Action Rationale

------------------------------------------------------------------------

**version_differentiation.md** Removed the original The previous content
(old) speculative roadmap violated the scope and containing V2/V3
introduced unauthorised features like calendar, features not sanctioned
tasks, email and by the Foundation provider support. Document. Replaced
with the  
context‑only overview  
described above.

------------------------------------------------------------------------

This change log should be referenced when reviewing the updated spec
set. It summarises the authority and scope alignment work performed to
bring all documents into compliance with the Foundation Document.

## Phase 5 --- Step 2

Phase: Phase 5 --- Step 2

Summary: Corpus classified; legacy governance enforced

Counts:

- total artefacts processed: 52
- Class A: 0
- Class B: 0
- Class C: 13
- Class D: 39
- archived: 7
- deleted: 26

Uncertainty note: A small number of assignments were made with medium or
low certainty (e.g., build commands, development and future plans,
mapping to Firefox internals and version differentiation).

Stop-signs: No stop‑signs were triggered during this classification
step.

## Phase 5 --- Step 2B

Phase: Phase 5 --- Step 2B

Purpose: Change‑log normalisation and audit correction

Authority clarification: - The narrative and "IGNORE THIS FILE" notices
above are legacy and non‑authoritative; they predate the phased
governance model. - Only Phase‑numbered entries (including
Phase 5 --- Step 2 and onward) are canonical going forward.

Action traceability: - See `docs/spec_corpus_classification.md` for full
classification details. - Archived artefact IDs: A027, A028, A029, A036,
A037, A038, A044. - Deleted artefact IDs: A001, A002, A003, A004, A005,
A006, A007, A008, A009, A010, A011, A012, A013, A014, A015, A016, A017,
A018, A019, A020, A021, A022, A023, A024, A025, A026.

Stop‑sign rationale: None of the above actions triggered stop‑signs. The
deleted items were Mac OS resource fork files with no specification
content, and the archived documents were legacy governance materials now
superseded by the Foundation Document and Phase directives. As no
substantive or in‑scope specifications were removed or altered, no
stop‑signs were invoked.

Final statement: This entry normalises the change log for Phase 5. All
prior narrative content remains for traceability but is
non‑authoritative. The change log is safe for continued governance use.

## Phase 5 --- Step 3

Phase: Phase 5 — Step 3

Summary: Spec registry created; indexed absence recorded

Counts:

- total registered artefacts: 52
- total Class C specs: 13
- total indexed absences: 1

Statement: Phase 5 is complete; further spec authoring requires Phase‑3
gating

## Phase 5 --- Step 3B

Phase: Phase 5 — Step 3B

Summary: spec_registry corrected for deletion exclusion and status
taxonomy

Counts:

- active artefacts registered: 19
- archived artefacts registered: 7
- deletions excluded: 26

Reference: Derived from docs/spec_corpus_classification.md

------------------------------------------------------------------------
