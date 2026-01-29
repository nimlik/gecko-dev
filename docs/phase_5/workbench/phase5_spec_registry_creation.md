# Importal Spec Registry

**Phase:** Phase 5 — Step 3

**Status:** CANONICAL

**Inputs:**

- spec_corpus_inventory.md
- spec_corpus_classification.md

## Governing Artefacts

- Foundation Document v4
- Phase 0: Authority & Operating Contract
- Phase 1: Immutable Constraints
- Phase 2: Global Stop‑Sign Index
- Phase 3: Phase Execution Model
- Phase 4: Glossary & Naming Enforcement
- Phase 5: Spec Classification & Mapping
- Phase 6: Governance Stability & Drift Control

## Registry Scope

The registry includes only artefacts with a **keep** or **archive**
disposition. Deleted artefacts are excluded. This index is derived
directly from `docs/spec_corpus_classification.md` and distinguishes
between **active corpus** artefacts and **archived** legacy artefacts.

### Active Corpus Artefacts

| registry_id | artefact_id | file_path | phase_5_class | status |
|----|----|----|----|----|
| R030 | A030 | importal_specs\_\_opencode_review/application_toolbar.md | C | normative |
| R031 | A031 | importal_specs\_\_opencode_review/browsing_history.md | C | normative |
| R032 | A032 | importal_specs\_\_opencode_review/build_commands.md | D | reference |
| R033 | A033 | importal_specs\_\_opencode_review/change_log.md | D | reference |
| R034 | A034 | importal_specs\_\_opencode_review/conceptual_data_model.md | C | normative |
| R035 | A035 | importal_specs\_\_opencode_review/dashboard.md | C | normative |
| R039 | A039 | importal_specs\_\_opencode_review/history_attribution_spec.md | C | normative |
| R040 | A040 | importal_specs\_\_opencode_review/hook_points.md | C | normative |
| R041 | A041 | importal_specs\_\_opencode_review/internal_data_schema.md | C | normative |
| R042 | A042 | importal_specs\_\_opencode_review/main_window.md | C | normative |
| R043 | A043 | importal_specs\_\_opencode_review/mapping_to_firefox_internals.md | D | reference |
| R045 | A045 | importal_specs\_\_opencode_review/taskspace_lifecycle.md | C | normative |
| R046 | A046 | importal_specs\_\_opencode_review/taskspace_registry_spec.md | C | normative |
| R047 | A047 | importal_specs\_\_opencode_review/taskspaces.md | C | normative |
| R048 | A048 | importal_specs\_\_opencode_review/templates/README.md | D | reference |
| R049 | A049 | importal_specs\_\_opencode_review/templates/windowType-gating.TEMPLATE.md | D | reference |
| R050 | A050 | importal_specs\_\_opencode_review/verification_map.md | C | normative |
| R051 | A051 | importal_specs\_\_opencode_review/version_differentiation.md | D | reference |
| R052 | A052 | importal_specs\_\_opencode_review/window_type_spec.md | C | normative |

### Archived Legacy Artefacts

| registry_id | artefact_id | original_file_path | archive_target_path | superseded_by | status |
|----|----|----|----|----|----|
| R027 | A027 | importal_specs\_\_opencode_review/00_authority_hierarchy.md | UNKNOWN | Foundation Document v4 | archived |
| R028 | A028 | importal_specs\_\_opencode_review/01_scope_and_non_goals.md | UNKNOWN | Phase 1 — Immutable Constraints | archived |
| R029 | A029 | importal_specs\_\_opencode_review/02_foundational_constraints.md | UNKNOWN | Foundation Document v4 | archived |
| R036 | A036 | importal_specs\_\_opencode_review/development_plan.md | UNKNOWN | Phase 3 — Phase Execution Model | archived |
| R037 | A037 | importal_specs\_\_opencode_review/future_v1_build_plan.md | UNKNOWN | Phase 3 — Phase Execution Model | archived |
| R038 | A038 | importal_specs\_\_opencode_review/guardrails_and_stop_signs.md | UNKNOWN | Phase 2 — Global Stop‑Sign Index | archived |
| R044 | A044 | importal_specs\_\_opencode_review/product_principles.md | UNKNOWN | Foundation Document v4 | archived |

### Excluded Deletions

The following artefact IDs were deleted and are excluded from the
registry tables: **A001–A026**. Deleted artefacts are excluded from
registry tables by policy.

## Registry Rules

- Phase 5 classification is required before a specification can be
  included in the registry.
- The registry is updated only through a recorded change_log entry;
  ad‑hoc modifications are not permitted.
- Artefacts marked with a delete disposition are never registered and
  remain excluded.
- Archived artefacts remain indexed in a separate table but are not part
  of the active corpus.

------------------------------------------------------------------------
