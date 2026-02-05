# Phase 4: Glossary and Naming Enforcement (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-02-01

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

### 1.1 Naming enforcement (normative)

This section prevents collisions where multiple artefacts appear authoritative (for example, multiple “Phase N” governance files across different folders or formats).

Definitions:

- First heading means the first Markdown H1 line in a file (a line starting with "# ").
- Phase heading means a first heading that matches "# Phase [0-9]+:".
- Self-identified non-authority phase heading means a first heading that matches "# (PROMPT|NON-AUTHORITY|ARCHIVED) — Phase [0-9]+:".

Rule 0: Canonical entity names must not be renamed

Canonical names are frozen and must not be renamed by tidying, normalisation, or collision resolution. Canonical names include, but are not limited to:

- files
- components
- user-facing objects
- internal concepts

Operational test:

- If an entity name appears as canonical in Governing_Docs/* or is referenced as canonical in docs/spec_registry.md, it is frozen for naming purposes.

Collision resolution constraint:

- If a naming collision involves a frozen canonical name, resolve by disambiguating via location and explicit non-authority labelling (PROMPT/NON-AUTHORITY/ARCHIVED), not by renaming the canonical entity.

Rule 1: Governance-only phase headings

Only files under Governing_Docs/ may use a Phase heading as the first heading.

Enforcement:

- Outside Governing_Docs/, the first heading must not match "# Phase [0-9]+:".

Rule 2: Prompts, non-authority, and archived artefacts must self-identify.

Files outside Governing_Docs/ must not present themselves as governance.

If an artefact outside Governing_Docs/ needs to reference a phase in its first heading, it must use a self-identified non-authority phase heading.

Enforcement:

- Outside Governing_Docs/, any first heading that references a phase must begin with one of:
  - "# PROMPT — Phase N: ..."
  - "# NON-AUTHORITY — Phase N: ..."
  - "# ARCHIVED — Phase N: ..."

Rule 3: Canonical locations

Canonical locations are mandatory. Canonical artefacts found outside their canonical location are a collision risk and must be treated as ambiguity (STOP / resolve), not silently reclassified.

* Governing_Docs/ is the only canonical location for Phase 0–6 governance artefacts.
* Governing_Docs/change_log.md is the only canonical governance change log.
* docs/spec_registry.md is the canonical routing index for agents.
* docs/agent_prompts/ is the canonical location for agent operational system prompts (policy documents).
* docs/features/ is the canonical location for feature bundles (Class C), using naming FB-<number>_<slug>.md.
* All non-authoritative artefacts must live under exactly one of:

  * docs/non_authority/ (active work products / scratch / working notes)
  * docs/archive/ (superseded / legacy / preserved historical copies)

Both non-authority folders are refuse-by-default unless explicitly requested.

Rule 4: Filename prefixes for non-authoritative artefacts

Non-authoritative artefacts may use an explicit filename prefix to self-identify:

* PROMPT__... (prompts)
* NONAUTH__... (non-authority work products)
* ARCHIVED__... (archived / superseded artefacts)

Location is the primary non-authority signal; filename prefixes are secondary. Prefixes must not be required where they would create churn or conflict with established non-authority naming.

This rule applies regardless of whether the file mentions a phase.

Rule 5: Prohibition on "Phase_*" filenames outside governance

No file outside Governing_Docs/ may be named "Phase_*" or begin with "Phase_".

If such a file exists outside Governing_Docs/, it is a collision candidate and must be resolved by either:

* relocating it under docs/archive/ with an ARCHIVED__ filename prefix and an in-file archive banner, or
* renaming it with a non-authority filename prefix (PROMPT__/NONAUTH__/ARCHIVED__) and ensuring its first heading is self-identified non-authority (PROMPT / NON-AUTHORITY / ARCHIVED) as required by Rule 2.


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
- cite the exact file path(s) and the exact first heading/filename causing the collision
- propose the minimal corrective change to the relevant artefact(s)
- avoid changing code naming unless explicitly instructed

STOP conditions (non-exhaustive):

- Any file outside Governing_Docs/ has a Phase heading as its first heading.
- Any file outside Governing_Docs/ uses a "Phase_*" filename.
- Any non-authoritative artefact uses a misleading governance-lookalike filename or label (for example, “Phase_”, “Governing_”, “canonical”, “authoritative”) outside Governing_Docs/, or otherwise presents itself as governance.
- Any collision resolution would require renaming a frozen canonical entity (Rule 0).
- Any document references docs/phase_5/workbench/ as canonical (obsolete location).
