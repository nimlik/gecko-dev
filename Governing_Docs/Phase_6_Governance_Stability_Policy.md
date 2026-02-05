# Phase 6: Maintenance, Drift Control, and Governance Stability (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

This artefact defines how the documentation system remains stable, auditable, and authoritative over time.

Update intent: include feature bundles as the primary evolving layer while preserving constitutional and governance stability.

## 1. Stability model (normative)

Stable (rare change):

- Phase 0–6 governance artefacts
- Foundation Document v4
- Immutable constraints

Evolving (regular change):

- Feature bundles (feature specs, acceptance criteria, verification steps)

Ephemeral:

- task prompts, scratch notes, temporary logs

## 2. Change triggers (normative)

A change process must be initiated when:

- a stop-sign identifies missing or conflicting authority
- feature bundle requirements drift from implemented behaviour
- filenames/paths differ from the spec registry (Phase 5)
- security, privacy, or legal events require update
- a new feature bundle is added or an existing one is materially changed

## 3. No retroactive edits (normative)

- Superseded artefacts must be archived.
- Edits must create an explicit new version or a recorded change entry.
- Silent edits to historical artefacts are prohibited.

## 4. Feature bundle versioning (normative)

Feature bundles must be versioned in-place via:

- a version header
- dated change entries
- linkage to change_log.md entries

A feature bundle change must include:

- what changed
- why it changed
- which acceptance criteria changed
- verification impact

## 5. Drift detection and response (normative)

Drift signals include:

- registry mismatch (Phase 5)
- glossary divergence
- conflicting constraints citations
- acceptance criteria that cannot be verified
- repeated agent stop-sign triggers on the same ambiguity

When drift is detected:

- halt the related work stream
- update the minimal authoritative artefact necessary
- record the drift and resolution in change_log.md

## 6. Audit cadence (normative)

At minimum, perform a periodic audit that checks:

- authority hierarchy consistency across artefacts
- registry correctness
- feature bundle completeness vs minimum structure
- stop-sign index relevance and non-proliferation
- verification artefacts presence for recent changes

Audit outputs must be stored in a dedicated audit location and referenced from change_log.md.

## 7. Prohibitions (normative)

- Do not “optimise” or modernise language under the guise of maintenance.
- Do not move constitutional product intent into feature bundles.
- Do not allow feature bundles to redefine frozen terms.

## 8. Administrative changes (normative)

Purely administrative changes (formatting, headings, file moves) are still changes and must:

- be recorded
- preserve meaning
- avoid unapproved renames
- maintain traceability
