# Phase 3: Phase Execution Model (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

This artefact defines when work may proceed and what sequencing discipline applies.

Update intent: reflect that implementation work is now driven by feature bundles, not by repeated ingestion of the docs/importal_foundation_document_v5.md.

## 1. Core rule (normative)

Work proceeds only when the required authoritative inputs exist and are accessible.

For feature work, the minimal required inputs are:

- the feature bundle (spec + acceptance criteria + verification)
- immutable constraints (Phase 1)
- stop-sign index (Phase 2)
- naming/glossary enforcement (Phase 4)
- classification/mapping (Phase 5) when artefact authority is in question

## 2. Phases and permitted outputs (normative)

Phase 0: Authority and operating contract
- Defines decision rights and agent operating posture.

Phase 1: Immutable constraints
- Defines global invariants.

Phase 2: Stop-signs
- Defines halting conditions.

Phase 3: Phase execution model (this document)
- Defines sequencing and gating rules.

Phase 4: Glossary and naming enforcement
- Defines terms and naming immutability.

Phase 5: Spec classification and mapping
- Defines what each artefact is, its authority, and how it may be used.

Phase 6: Maintenance, drift control, and governance stability
- Defines change-control discipline and auditing.

## 3. Feature bundle gating (normative)

A feature bundle is required before any feature implementation begins.

A feature bundle is considered “ready” only if it includes:

- a clear feature statement
- explicit non-goals
- user stories (where applicable)
- constraints mapping (IC references and feature-local constraints)
- acceptance criteria (binary and verifiable)
- verification steps

If any element is missing or ambiguous, stop under SS-10 or SS-11.

## 4. docs/importal_foundation_document_v5.md usage rule (normative)

The docs/importal_foundation_document_v5.md is constitutional reference only.

Agents must not treat the docs/importal_foundation_document_v5.md as an implementation spec.

Permitted uses:

- resolving a conflict that cannot be resolved by feature bundles and phase artefacts
- validating that a proposed feature does not violate non-goals
- interpreting product semantics when a feature bundle explicitly delegates to constitutional intent

## 5. Verification artefact rule (normative)

Verification artefacts are required at the granularity specified by the feature bundle.

Feature verification must be:

- localised (tests, logs, screenshots, network traces)
- reproducible
- recorded or referenced from change_log.md per Phase 6

## 6. Stop-before-risk rule (normative)

If proceeding would require inference or broad refactors, halt and request tighter specification.
