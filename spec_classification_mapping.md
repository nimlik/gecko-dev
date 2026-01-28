# Importal Spec Classification & Mapping (Phase 5)

This document indexes all available Importal specifications and related
artefacts in the repository as of this phase. Each section records the
**authority level**, **actionability**, **phase applicability**,
governing dependencies and any relevant notes or deferrals for a single
file. When a referenced specification is missing or unavailable, that
fact is recorded explicitly. Mappings to Phase 1 immutable constraints
(IC‑x), Phase 2 stop‑signs (SS‑xx) and Phase 4 glossary terms are
provided where they apply. This list reflects only the files present in
the working directory; the `importal_specs` folder itself is absent, so
further specifications may exist but are not accessible.

## Available specifications

The following files were present and are classified below:

| File | Notes on existence |
|----|----|
| `Authority contract (phase 0).md` | Present as a PDF disguised with a `.md` extension; serves as the Phase 0 Authority & Operating Contract. |
| `Immutable constraints extraction.docx` | Present; holds the Phase 1 v2 immutable constraints table. |
| `Global_stop‑sign_index.docx` | Present; enumerates the global stop signs compiled in Phase 2. |
| `Phase_execution_model.docx` | Present; defines the ordered phase execution model for Phase 3. |
| `Glossary_creation_task.md` | Present; provides the canonical glossary and naming enforcement produced in Phase 4. |
| `Change_log_phase_1.docx` | Present; records the change‑log entries up to Phase 1. |
| `Change_log_phase_4.docx` | Present; records the change‑log entries up to Phase 4. |

### Missing or incomplete artefacts

- The `importal_specs` directory referenced in earlier phases does not
  exist in the current repository. Specifications referenced in the
  change log such as `immutable_constraints.md`, `stop_sign_index.md`,
  `phase_execution_model.md` and `glossary_and_naming.md` are not
  accessible; classification of those files is therefore impossible.
- Higher‑tier documents such as the **Foundation Document v4** and the
  Authority & Scope specifications (e.g. `00_authority_hierarchy.md`,
  `01_scope_and_non_goals.md`, `02_foundational_constraints.md`,
  `guardrails_and_stop_signs.md`) are also unavailable. Their absence is
  itself a global stop‑sign condition (SS‑01).

## Specification index

### `Authority contract (phase 0).md`

**Description:** Phase 0 Authority & Operating Contract establishing the
governing rules, authority hierarchy, agent mandates, and stop‑sign
triggers for all Importal work.

- **Authority level:** Foundational – this document sits at the top of
  the hierarchy and defines the chain of authority for all subsequent
  specifications.
- **Actionability:** Binding – its mandates and prohibitions must be
  followed by all agents and documents.
- **Phase applicability:** All phases – provides the baseline rules that
  apply before and throughout the phase sequence.
- **Governing higher‑tier artefacts:** None (highest tier in the
  hierarchy).
- **Notes:** The file is encoded as a PDF with a `.md` extension;
  content includes guardrails on local‑first storage, truthful history,
  privacy boundaries and single‑workspace usage, as well as definitions
  of when agents must halt and ask for clarification. No ambiguities
  were detected.

**Mappings:**

- **Immutable constraints:** IC‑1 (local‑first storage), IC‑2 (truthful
  history), IC‑3 (privacy boundaries), IC‑4 (single workspace). These
  constraints are derived from this contract.
- **Stop‑signs:** Source of SS‑01–SS‑13; the contract defines missing
  authority, conflicting instructions, ambiguous terminology, spec
  drift, unverifiable completion, context limits, security/ethical
  concerns, high‑impact decisions, missing plan, violation of
  guardrails, phase‑misalignment, irreversible changes and unverified
  information.
- **Glossary terms:** Authority Hierarchy, Immutable Constraint,
  Stop Sign, Phase, Verification Artefact, Local‑First Storage,
  Truthful History, Workspace (single‑workspace model), Taskspace
  (implicit in privacy boundaries).

### `Immutable constraints extraction.docx`

**Description:** Phase 1 v2 immutable constraints specification listing
non‑negotiable product and system requirements (e.g. local‑first
storage, truthful history, privacy boundaries, single‑workspace
paradigm). Each entry includes category, applicability, source
reference, rationale and provenance.

- **Authority level:** Constraint‑bearing – codifies immutable
  constraints derived from higher‑tier documents.
- **Actionability:** Binding – these constraints must be enforced across
  all implementations and phases.
- **Phase applicability:** All phases – applies throughout; no phase may
  contravene these constraints. Multi‑workspace support and other
  deferred features remain out of scope until authorised.
- **Governing higher‑tier artefacts:** Phase 0
  Authority & Operating Contract (section 2.2) and, by implication, the
  Foundation Document (not available).
- **Notes:** The constraints are extracted conservatively due to limited
  source material. The document acknowledges that further refinement may
  be required once the Foundation Document and other specs are
  accessible. Only four constraints (IC‑1–IC‑4) are present.

**Mappings:**

- **Immutable constraints:** Defines IC‑1 (local‑first storage), IC‑2
  (truthful history), IC‑3 (privacy boundaries), IC‑4 (single
  workspace). No additional constraints.
- **Stop‑signs:** SS‑10 and SS‑11 reference these constraints; violation
  of guardrails or implementing deferred features triggers halting.
- **Glossary terms:** Local‑First Storage, Truthful History,
  Privacy Boundaries (covered by “Taskspace” and “Workspace”), Workspace
  (single‑workspace model), Taskspace.

### `Global_stop‑sign_index.docx`

**Description:** Phase 2 global stop‑sign index enumerating all hard
halting conditions (SS‑01–SS‑13) applicable across all tasks and phases.
Each entry specifies the trigger condition, affected actors, mandatory
next action and source reference.

- **Authority level:** Normative – compiles binding halting rules that
  agents must observe.
- **Actionability:** Binding – whenever a stop‑sign is triggered, work
  must cease until resolved.
- **Phase applicability:** All phases – stop signs apply universally
  across the phase sequence.
- **Governing higher‑tier artefacts:** Phase 0
  Authority & Operating Contract (section 2.3) and Phase 1 immutable
  constraints (for SS‑07, SS‑10, SS‑11). Best‑practice guidelines are
  referenced but external.
- **Notes:** Stop‑sign definitions cover missing authority, conflicts,
  ambiguity, spec drift, unverifiable completion, context limits,
  security/ethics, high‑impact decisions, missing plans, guardrail
  violations, phase misalignment, irreversible changes and unverified
  information. No overlap with other specs beyond referencing their
  content.

**Mappings:**

- **Immutable constraints:** IC‑1–IC‑4 are referenced by SS‑07, SS‑10
  and SS‑11 as conditions prohibiting actions that violate local‑first
  storage, truthful history, privacy boundaries or the single‑workspace
  model.
- **Stop‑signs:** Enumerates SS‑01–SS‑13.
- **Glossary terms:** Stop Sign, Authority Hierarchy, Phase,
  Verification Artefact.

### `Phase_execution_model.docx`

**Description:** Phase 3 execution model specifying the ordered sequence
of phases (0–8), allowed scope, prohibitions, required inputs/outputs,
verification artefacts and advancement gates. It prohibits skipping,
merging or reordering phases and mandates halting when gates are unmet.

- **Authority level:** Normative – sets procedural rules and gating
  conditions for all phases.
- **Actionability:** Binding – must be followed when sequencing work;
  bypassing phases triggers SS‑11.
- **Phase applicability:** Primarily Phase 3 (execution model creation)
  but governs all subsequent phases (4–8) by defining their scope and
  gates. Explicitly forbids acting outside authorised development
  phases.
- **Governing higher‑tier artefacts:** Phase 0
  Authority & Operating Contract, Phase 1 immutable constraints, Phase 2
  stop‑sign index. Future phases (4–7) depend on the Foundation Document
  and Authority & Scope specifications which are currently unavailable.
- **Notes:** The model is complete for Phases 0–3 and defines
  placeholders for Phases 4–8 pending availability of further documents.
  It emphasises non‑skippability. Risk arises if required inputs (e.g.
  Foundation Document) remain missing; this triggers SS‑01.

**Mappings:**

- **Immutable constraints:** Ensures IC‑1–IC‑4 remain enforced
  throughout implementation (Phase 8) and prohibits deferred
  multi‑workspace support (IC‑4) until authorised.
- **Stop‑signs:** References SS‑11 (Outside the authorised development
  phase), SS‑01 (Missing authority) and SS‑10 (Violation of guardrails)
  as gating conditions.
- **Glossary terms:** Phase, Verification Artefact,
  Immutable Constraint, Stop Sign, Workspace, Taskspace.

### `Glossary_creation_task.md`

**Description:** Canonical glossary and naming‑enforcement document
produced in Phase 4. Defines product‑semantic and documentation‑system
terms to prevent semantic drift. The glossary points outward to other
artefacts for constraints, stop‑signs and phase rules and does not
restate them.

- **Authority level:** Normative – provides binding definitions for
  terminology used across Importal documentation.
- **Actionability:** Reference‑only – agents must use these definitions
  when interpreting other specs but the glossary does not prescribe
  behaviours itself.
- **Phase applicability:** Primarily Phase 4 and later – applies
  wherever terminology appears; early phases refer upward.
- **Governing higher‑tier artefacts:** Foundation Document v4, Phase 1
  immutable constraints, Phase 2 stop‑sign index, Phase 3 execution
  model (all cited as normative references).
- **Notes:** The glossary explicitly excludes constraint text, stop‑sign
  triggers and phase mechanics. It requires a change‑log entry for any
  future modification. No ambiguities detected.

**Mappings:**

- **Immutable constraints:** References (but does not define) IC‑1
  (local‑first storage), IC‑2 (truthful history), IC‑3 (privacy
  boundaries) and IC‑4 (single workspace) in the definitions of terms
  such as *Workspace*, *Taskspace*, *History* and *Local‑First Storage*.
- **Stop‑signs:** Points to the global stop‑sign index for the
  definition of *Stop Sign* but does not map to individual SS‑xx
  entries.
- **Glossary terms:** Serves as the authoritative source for Importal,
  Workspace, Taskspace, Main, Aux, windowType, History (Truthful
  History), Local‑First Storage, Foundation Document,
  Authority Hierarchy, Immutable Constraint, Stop Sign, Phase and
  Verification Artefact.

### `Change_log_phase_1.docx`

**Description:** Phase 1 change‑log document containing the change‑log
header and a single entry recording the creation of the Phase 1 v2
immutable constraints document. It includes guidelines prohibiting
deletion or modification of past entries and outlines required fields
for each log entry (date, author, summary, rationale and affected
documents).

- **Authority level:** Normative – prescribes how change‑log entries
  must be recorded.
- **Actionability:** Binding – agents must append entries and must not
  delete or modify past records.
- **Phase applicability:** All phases – the change log persists
  throughout the development lifecycle.
- **Governing higher‑tier artefacts:** Phase 0
  Authority & Operating Contract (record‑keeping mandates).
- **Notes:** Contains only an initial Phase 1 entry; later phases are
  absent. The actual `change_log.md` referenced in specifications is
  missing; this document may be a draft. Deletions or consolidation
  require higher‑tier approval.

**Mappings:**

- **Immutable constraints:** None directly; the entry describes the
  creation of IC‑1–IC‑4 but does not impose constraints.
- **Stop‑signs:** SS‑04 (Spec drift detection) applies if the change log
  becomes inconsistent with actual changes; SS‑05 (Unverifiable
  completion) applies if entries lack required information.
- **Glossary terms:** Phase, Verification Artefact (entries act as
  artefacts).

### `Change_log_phase_4.docx`

**Description:** Extended change‑log document containing entries for
Phases 1–4. It repeats the same guidelines on maintaining a immutable
record and includes entries for the creation of the immutable
constraints document, global stop‑sign index, phase execution model and
glossary & naming enforcement document.

- **Authority level:** Normative – as with the Phase 1 change log, it
  governs record‑keeping for changes.
- **Actionability:** Binding – must be updated for all subsequent
  phases; past entries must not be altered.
- **Phase applicability:** All phases – covers changes up to Phase 4 and
  sets expectations for future entries.
- **Governing higher‑tier artefacts:** Phase 0
  Authority & Operating Contract.
- **Notes:** Serves as the most complete change log currently available.
  It references specification file names (`immutable_constraints.md`,
  `stop_sign_index.md`, `phase_execution_model.md`,
  `glossary_and_naming.md`) that are not present in the repository; this
  suggests a mismatch between filenames and accessible files. That
  mismatch should be resolved or flagged before proceeding (SS‑04: spec
  drift).

**Mappings:**

- **Immutable constraints:** None directly; entries record creation of
  constraint documents but do not contain constraints themselves.
- **Stop‑signs:** SS‑04 (Spec drift detection), SS‑05 (Unverifiable
  completion) and SS‑13 (Unknown or unverified information) apply to
  ensure the log remains consistent and complete.
- **Glossary terms:** Phase, Verification Artefact.

------------------------------------------------------------------------
