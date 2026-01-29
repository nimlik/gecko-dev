# Phase 5: Spec Classification and Mapping (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

This artefact classifies each specification document and defines:

- its authority tier
- how it may be used
- what it must not be used for
- how it maps to implementation work

Update intent: introduce a first-class “feature bundle” layer and reduce dependence on the Foundation Document for routine tasks.

## 1. Spec classes (normative)

Class A: Constitutional product authority
- Foundation Document v4
Use: product intent, philosophy, non-goals, constitutional semantics.
Do not use: as an implementation spec.

Class B: Governance authority
- Phase 0–6 governance artefacts
Use: operating rules, constraints, stop-signs, sequencing, naming, mapping, drift control.
Do not use: to invent product behaviour.

Class C: Feature bundles (new, first-class)
Use: implementable behaviour for a single feature, including user stories, constraints mapping, acceptance criteria, and verification steps.
Authority: subordinate to Classes A and B; authoritative within its declared scope if consistent with higher tiers.
Do not use: to redefine core terms, add product intent, or violate immutable constraints.

Class D: Engineering reference
- build notes, code mapping notes, internal references
Use: support implementation.
Do not use: as a source of product truth.

## 2. Canonical working set for coding tasks (normative)

For feature implementation tasks, the canonical working set is:

- the relevant feature bundle (Class C)
- immutable constraints (Phase 1)
- stop-sign index (Phase 2)
- glossary and naming enforcement (Phase 4)

Consult Phase 0, Phase 3, Phase 5, Phase 6 when required by ambiguity, conflict, or change-control.

Foundation Document consult rule:

- consult only when needed to resolve ambiguity or validate non-goals
- do not ingest for routine tasks

## 3. Artefact registry (normative)

This document must contain and maintain a registry of:

- each governance artefact (Phase 0–6) and its canonical filename
- the Foundation Document canonical filename
- each feature bundle identifier and path (lightweight index)

If registry information is missing or stale, stop under SS-04 or SS-09.

## 4. Feature bundle minimum structure (normative)

A feature bundle must include:

- overview
- explicit non-goals
- user stories (where applicable)
- constraints mapping (IC references + feature-local constraints)
- acceptance criteria (binary)
- verification steps (reproducible)
- scope boundaries (files/areas allowed to change)

## 5. Prohibitions (normative)

- No document may self-elevate its authority tier.
- No feature bundle may contradict immutable constraints or constitutional non-goals.
- No governance artefact may introduce feature behaviour (feature behaviour lives in feature bundles).

## 6. Change-control integration (normative)

Adding or modifying a feature bundle must:

- follow Phase 6 drift-control rules
- be recorded in change_log.md
- include a verification plan
