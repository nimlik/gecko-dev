# Phase 4: Glossary and Naming Enforcement (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

This artefact freezes meaning and naming to prevent agent hallucination and semantic drift.

Update intent: ensure feature bundles do not redefine terms and that the glossary remains a pointer system, not a content re-host.

## 1. Definitions (normative)

Glossary entry:

- term
- definition (stable, minimal)
- prohibited meanings
- allowed variants (if any)
- authoritative references (links to constraints/stop-signs/specs)

Naming enforcement:

- canonical names for entities that must not be renamed (files, components, user-facing objects, internal concepts)

## 2. Feature bundle interaction (normative)

Feature bundles must:

- use canonical terms
- reference glossary terms rather than redefining them
- halt under SS-01 if a required term is not defined

Feature bundles must not:

- introduce new core terms without updating this artefact through authorised change-control
- invent synonyms for frozen names to “improve readability”

## 3. Prohibition on re-hosting (normative)

This artefact must not re-host:

- immutable constraints
- stop-sign definitions (beyond identifiers and pointers)
- execution models
- feature specs

It may cite identifiers and link outward.

## 4. Drift control (normative)

Any term redefinition or naming proposal must be treated as high-risk drift and requires:

- explicit rationale
- impact analysis across feature bundles and specs
- recorded approval in change_log.md

## 5. Agent behaviour (normative)

If a naming or term issue is detected, agents must:

- stop
- identify the conflicting term/name
- propose the minimal corrective change to the relevant artefact
- avoid changing code naming unless explicitly instructed
