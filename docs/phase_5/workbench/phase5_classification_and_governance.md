# Spec Corpus Classification

**Phase:** Phase 5 — Step 2  
**Inputs referenced:** spec_corpus_inventory.md,
importal_specs\_\_opencode_review.zip  
**Status:** COMPLETE

## Classification Table

| artefact_id | file_path | phase_5_class | authority_basis | conflict_detected | disposition | disposition_rationale |
|----|----|----|----|----|----|----|
| A001 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_00_authority_hierarchy.md | D | none | no | delete | MacOS resource fork file; contains no substantive spec content. |
| A002 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_01_scope_and_non_goals.md | D | none | no | delete | MacOS resource fork file; non‑authoritative metadata. |
| A003 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_02_foundational_constraints.md | D | none | no | delete | MacOS resource fork file; carries no functional specification. |
| A004 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_application_toolbar.md | D | none | no | delete | MacOS resource fork file; redundant metadata. |
| A005 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_browsing_history.md | D | none | no | delete | MacOS resource fork file; holds no useful content. |
| A006 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_build_commands.md | D | none | no | delete | MacOS resource fork file; safe to remove. |
| A007 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_change_log.md | D | none | no | delete | MacOS resource fork file; does not contain spec material. |
| A008 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_conceptual_data_model.md | D | none | no | delete | MacOS resource fork file; not part of the specification corpus. |
| A009 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_dashboard.md | D | none | no | delete | MacOS resource fork file; contains only resource metadata. |
| A010 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_development_plan.md | D | none | no | delete | MacOS resource fork file; extraneous to the corpus. |
| A011 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_future_v1_build_plan.md | D | none | no | delete | MacOS resource fork file; can be removed without loss. |
| A012 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_guardrails_and_stop_signs.md | D | none | no | delete | MacOS resource fork file; contains no relevant text. |
| A013 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_history_attribution_spec.md | D | none | no | delete | MacOS resource fork file; not needed. |
| A014 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_hook_points.md | D | none | no | delete | MacOS resource fork file; safe to delete. |
| A015 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_internal_data_schema.md | D | none | no | delete | MacOS resource fork file; contains no specification. |
| A016 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_main_window.md | D | none | no | delete | MacOS resource fork file; redundant metadata. |
| A017 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_mapping_to_firefox_internals.md | D | none | no | delete | MacOS resource fork file; contains no substantive information. |
| A018 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_product_principles.md | D | none | no | delete | MacOS resource fork file; extraneous to specifications. |
| A019 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_taskspace_lifecycle.md | D | none | no | delete | MacOS resource fork file; contains no useful specification content. |
| A020 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_taskspace_registry_spec.md | D | none | no | delete | MacOS resource fork file; safe to remove. |
| A021 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_taskspaces.md | D | none | no | delete | MacOS resource fork file; not part of the corpus. |
| A022 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_verification_map.md | D | none | no | delete | MacOS resource fork file; contains no specification text. |
| A023 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_version_differentiation.md | D | none | no | delete | MacOS resource fork file; remove to avoid clutter. |
| A024 | \_\_MACOSX/importal_specs\_\_opencode_review/.\_window_type_spec.md | D | none | no | delete | MacOS resource fork file; holds no substantive content. |
| A025 | \_\_MACOSX/importal_specs\_\_opencode_review/templates/.\_README.md | D | none | no | delete | MacOS resource fork file; unnecessary metadata. |
| A026 | \_\_MACOSX/importal_specs\_\_opencode_review/templates/.\_windowType-gating.TEMPLATE.md | D | none | no | delete | MacOS resource fork file; no specification content. |
| A027 | importal_specs\_\_opencode_review/00_authority_hierarchy.md | D | Foundation Document v4, Phase 0–4 | yes | archive | Duplicates and extends governance authority; superseded by the Foundation Document and should be archived as legacy. |
| A028 | importal_specs\_\_opencode_review/01_scope_and_non_goals.md | D | Foundation Document v4, Phase 0–4 | yes | archive | Defines scope and non‑goals in conflict with existing governance; superseded and archived. |
| A029 | importal_specs\_\_opencode_review/02_foundational_constraints.md | D | Foundation Document v4, Phase 1 | yes | archive | Restates foundational constraints already defined in higher‑tier documents; archived for reference. |
| A030 | importal_specs\_\_opencode_review/application_toolbar.md | C | none | no | keep | Feature‑level specification for the Application Toolbar; part of the active spec corpus. |
| A031 | importal_specs\_\_opencode_review/browsing_history.md | C | none | no | keep | Defines conceptual model for browsing history; implementable specification. |
| A032 | importal_specs\_\_opencode_review/build_commands.md | C | none | no | keep | Provides canonical build, run and test commands; implementation guidance. |
| A033 | importal_specs\_\_opencode_review/change_log.md | D | none | no | keep | Change log documenting spec updates; historical reference to be retained. |
| A034 | importal_specs\_\_opencode_review/conceptual_data_model.md | C | none | no | keep | Defines core entities and relationships; feature‑level specification. |
| A035 | importal_specs\_\_opencode_review/dashboard.md | C | none | no | keep | Specifies high‑level behaviour of the Dashboard; implementable spec. |
| A036 | importal_specs\_\_opencode_review/development_plan.md | D | none | no | keep | Phased development roadmap; planning document retained for context. |
| A037 | importal_specs\_\_opencode_review/future_v1_build_plan.md | D | development_plan.md | yes | archive | Future‑focused build plan marked non‑canonical; superseded by development_plan.md and archived. |
| A038 | importal_specs\_\_opencode_review/guardrails_and_stop_signs.md | D | Phase 2 (Global Stop‑Sign Index) | yes | archive | Re‑states guardrails and stop signs defined in governing documents; archived as legacy. |
| A039 | importal_specs\_\_opencode_review/history_attribution_spec.md | C | none | no | keep | Defines how history is augmented with context; active specification. |
| A040 | importal_specs\_\_opencode_review/hook_points.md | C | none | no | keep | Outlines implementation touchpoints for integrating Importal concepts; implementation‑adjacent specification. |
| A041 | importal_specs\_\_opencode_review/internal_data_schema.md | C | none | no | keep | Specifies the local data schema; implementable spec. |
| A042 | importal_specs\_\_opencode_review/main_window.md | C | none | no | keep | Defines behaviour of the Main Window; feature‑level specification. |
| A043 | importal_specs\_\_opencode_review/mapping_to_firefox_internals.md | C | none | no | keep | Maps Importal concepts to Firefox internals; implementation‑adjacent spec. |
| A044 | importal_specs\_\_opencode_review/product_principles.md | D | Foundation Document v4 | yes | archive | High‑level product principles and guardrails; overlapping with higher‑tier governance, so archived. |
| A045 | importal_specs\_\_opencode_review/taskspace_lifecycle.md | C | none | no | keep | Specifies Taskspace lifecycle and guardrails; active specification. |
| A046 | importal_specs\_\_opencode_review/taskspace_registry_spec.md | C | none | no | keep | Defines data model and rules for the Taskspace registry; feature‑level spec. |
| A047 | importal_specs\_\_opencode_review/taskspaces.md | C | none | no | keep | Defines the concept and behaviour of Taskspaces; active specification. |
| A048 | importal_specs\_\_opencode_review/templates/README.md | D | none | no | keep | Template usage guide; informational reference retained in templates. |
| A049 | importal_specs\_\_opencode_review/templates/windowType-gating.TEMPLATE.md | D | none | no | keep | Template scaffold; non‑authoritative and retained for future use. |
| A050 | importal_specs\_\_opencode_review/verification_map.md | D | none | no | keep | Verification map detailing behaviours and test steps; reference document retained. |
| A051 | importal_specs\_\_opencode_review/version_differentiation.md | D | none | no | keep | Contextual overview of version focus and exclusions; informational and retained. |
| A052 | importal_specs\_\_opencode_review/window_type_spec.md | C | none | no | keep | Defines window types and behaviours; active product specification. |

## Supersession & Archival Notes

The following artefacts are archived as legacy due to overlap with
higher‑tier governance documents or being superseded by other
specifications. They are moved to `docs/archive/legacy_specs/` and no
longer authoritative:

- `00_authority_hierarchy.md` (A027) – superseded by the Foundation
  Document and Authority & Scope definitions.
- `01_scope_and_non_goals.md` (A028) – scope boundaries defined by the
  Foundation Document; archive.
- `02_foundational_constraints.md` (A029) – non‑negotiable constraints
  already codified in higher‑tier documents.
- `future_v1_build_plan.md` (A037) – superseded by
  `development_plan.md`.
- `guardrails_and_stop_signs.md` (A038) – duplicates the Global
  Stop‑Sign Index (Phase 2).
- `product_principles.md` (A044) – high‑level guardrails and philosophy
  now embodied in the Foundation Document.

The MacOS resource fork files (`._*`) listed above (A001–A026) are
metadata artifacts with no informational value and are proposed for
deletion.

------------------------------------------------------------------------
