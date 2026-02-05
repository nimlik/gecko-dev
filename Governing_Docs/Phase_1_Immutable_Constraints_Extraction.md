# Phase 1 v2: Immutable Constraints Extraction (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

This artefact defines Importal’s immutable product and system constraints.

Update intent: align enforcement with the feature-first specification model and reduce repeated Foundation ingestion during routine tasks.

## 1. Constraint classes (normative)

IC: Immutable Constraint

- A product-level invariant that must never be violated.
- Must be stable across feature bundles.
- Must be testable or verifiable.

Feature constraints:

- Constraints that are specific to a single feature belong in that feature bundle, not here, unless they are truly global invariants.

## 2. Working-set rule (normative)

For routine engineering tasks, agents must operate from:

- the relevant feature bundle, plus
- this Phase 1 constraints artefact, plus
- the Global Stop-Sign Index.

The Foundation Document is a constitutional reference only, consulted when:

- a feature spec conflicts with a global invariant, or
- a feature spec is incomplete and constitutional intent is required.

## 3. Authoring and amendment rules (normative)

- Only authorised humans may add, remove, or materially change an IC.
- Agents may propose changes but must treat all ICs as binding until explicitly amended.
- Any change to ICs must include: rationale, impact analysis across feature bundles, and verification artefacts.

## 4. Canonical form (normative)

Each immutable constraint must have:

- identifier (IC-nn)
- statement (single sentence, normative)
- scope (where it applies)
- rationale (brief)
- verification method(s)
- provenance (authoritative sources)

## 5. Interaction with feature bundles (normative)

Feature bundles must:

- cite relevant IC identifiers
- add feature-local constraints separately (do not dilute IC meaning)
- halt if a feature requirement appears to violate an IC

## 6. Prohibition on duplication (normative)

This document must not re-host feature specs, user stories, or acceptance criteria.
It may reference feature bundles only by identifier/path.
