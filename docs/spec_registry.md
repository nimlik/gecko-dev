# docs/spec_registry.md

Importal Spec Registry

Status: CANONICAL (policy artefact)

Purpose

This registry is the routing index for agents operating in Importal’s closed authority system. It defines canonical artefacts, their authority tier, and where agents may (and may not) pull decision-making inputs from.

Authority routing (binding)

## Routing labels (exact intent)

This registry is intended to be interpreted mechanically (no judgement).

Path-prefix routing map:

| path_prefix                | status                                     | intent |
|---------------------------|---------------------------------------------|--------|
| docs/features/impl/       | active_authoritative_implementable           | Authoritative (implementable) |
| docs/features/epics/      | active_authoritative_overview_non_implementable | Authoritative (overview, non-implementable) |
| docs/adrs/                | active_authoritative_architecture            | Authoritative (architecture) |
| docs/non_authority/       | non_authoritative_reference                  | Non-authority |
| docs/archive/legacy/      | legacy_non_authoritative_archived            | Legacy (prohibited unless explicitly overridden by user) |

Implementation source of truth rule (hard):

For implementation tasks, only `docs/features/impl/` and `docs/adrs/` are valid normative inputs.

`docs/features/epics/` may be used for orientation only and MUST never be implemented directly.

Legacy and non-authority paths are prohibited unless the user explicitly overrides.


* importal_foundation_document_v5.md is the sole constitutional authority.
* Phase 0–6 governance artefacts are binding governance authority.
* Stage 4 agent-operation artefacts (agents.md, activation rules, agent system prompts, this registry) are policy-only and must not be treated as product behaviour specs.
* All non-authoritative artefacts must live under exactly one of:
  - docs/non_authority/ (active work products / scratch / working notes)
  - docs/archive/ (superseded / legacy / preserved historical copies)

Legacy and non_authority paths are prohibited unless the user explicitly overrides.

Deterministic path rule

Canonical means exact path, not “best match”. If an agent cannot locate a required canonical artefact, it must STOP under SS-04.

---

Section A — Active authoritative and policy artefacts (canonical, in-repo)

These are the minimum canonical artefacts required for agent operation and governance routing.

| canonical_path                                                     | status                            | notes                                      |
| ------------------------------------------------------------------ | --------------------------------- | ------------------------------------------ |
| agents.md                                                          | active_authoritative_policy       | Agent boundary and canonical artefact list |
| docs/agent_activation_rules.md                                     | active_authoritative_policy       | Hard gates, stop semantics, role taxonomy  |
| docs/agent_prompts/agent_system_prompt__bootstrap.md               | active_authoritative_policy       | Agent bootstrap posture                    |
| docs/agent_prompts/agent_system_prompt__read_only_audit_clerk.md   | active_authoritative_policy       | Read-Only Audit Clerk prompt               |
| docs/agent_prompts/agent_system_prompt__change_proposal_clerk.md   | active_authoritative_policy       | Change Proposal Clerk prompt               |
| docs/agent_prompts/agent_system_prompt__phase_executor_clerk.md    | active_authoritative_policy       | Phase Executor Clerk prompt                |
| docs/agent_prompts/agent_system_prompt__governance_record_clerk.md | active_authoritative_policy       | Governance Record Clerk prompt             |
| docs/agent_prompts/agent_system_prompt__registry_clerk.md          | active_authoritative_policy       | Registry Clerk prompt                      |
| docs/spec_registry.md                                              | active_authoritative_policy       | This file                                  |
| Governing_Docs/Phase_0_Authority_Contract_Setup.md                 | active_authoritative_governance   | Phase 0                                    |
| Governing_Docs/Phase_1_Immutable_Constraints_Extraction.md         | active_authoritative_governance   | Phase 1                                    |
| Governing_Docs/Phase_2_Global_Stop_Sign_Index.md                   | active_authoritative_governance   | Phase 2                                    |
| Governing_Docs/Phase_3_Phase_Execution_Model.md                    | active_authoritative_governance   | Phase 3                                    |
| Governing_Docs/Phase_4_Glossary_and_Naming_Enforcement.md          | active_authoritative_governance   | Phase 4                                    |
| Governing_Docs/Phase_5_Spec_Classification_Mapping.md              | active_authoritative_governance   | Phase 5                                    |
| Governing_Docs/Phase_6_Governance_Stability_Policy.md              | active_authoritative_governance   | Phase 6                                    |
| Governing_Docs/change_log.md                                       | active_authoritative_audit_record | Audit log only (non-policy content)        |
| docs/importal_foundation_document_v5.md                            | active_authoritative_constitution | Constitutional product authority |
| docs/archive/legacy/foundation/Importal Foundation Document v4.md   | archived_non_authoritative         | Superseded constitutional document (see v5) |

---

Section B — Feature bundles (Class C, authoritative within scope)

Canonical location: docs/features/

Naming: FB-<number>_<slug>.md

Registry entries

Registry entries are maintained explicitly; absence of entries here must not be interpreted as absence of feature bundles in the repository.

---

Section C — Non-authoritative locations (routing only)

These are non-authoritative by location and must not be used for decisions unless explicitly instructed.

| location              | status                                           | intended use |
|----------------------|--------------------------------------------------|--------------|
| docs/features/impl/  | active_authoritative_implementable               | Implementable feature specifications |
| docs/features/epics/ | active_authoritative_overview_non_implementable  | Orientation only (must never be implemented directly) |
| docs/adrs/           | active_authoritative_architecture                | Architecture decisions and rationale |
| docs/non_authority/  | non_authoritative_reference                      | Active work products, scratch, working notes |
| docs/archive/legacy/ | legacy_non_authoritative_archived                | Archived legacy material (prohibited unless explicitly overridden by user) |

---

## legacy_non_authoritative_archived

This section is a routing label only.

Any artefact listed under this heading is legacy, non-authoritative, and archived for agent-routing purposes. Agents MUST NOT open, quote, or rely on these unless the user explicitly instructs it. If explicitly instructed, treat as historical context only; decisions must be justified from Class A/B/C artefacts or the agent must STOP under SS-05.

Legacy corpus is provided externally as an attachment (not in-repo). Do not assume any in-repo path for it.

Legacy external attachment index (relative paths inside the attachment)

| external_relative_path                                                  | status                            |
| ----------------------------------------------------------------------- | --------------------------------- |
| importal_specs__opencode_review/00_authority_hierarchy.md               | legacy_non_authoritative_archived |
| importal_specs__opencode_review/01_scope_and_non_goals.md               | legacy_non_authoritative_archived |
| importal_specs__opencode_review/02_foundational_constraints.md          | legacy_non_authoritative_archived |
| importal_specs__opencode_review/application_toolbar.md                  | legacy_non_authoritative_archived |
| importal_specs__opencode_review/browsing_history.md                     | legacy_non_authoritative_archived |
| importal_specs__opencode_review/build_commands.md                       | legacy_non_authoritative_archived |
| importal_specs__opencode_review/change_log.md                           | legacy_non_authoritative_archived |
| importal_specs__opencode_review/conceptual_data_model.md                | legacy_non_authoritative_archived |
| importal_specs__opencode_review/dashboard.md                            | legacy_non_authoritative_archived |
| importal_specs__opencode_review/development_plan.md                     | legacy_non_authoritative_archived |
| importal_specs__opencode_review/future_v1_build_plan.md                 | legacy_non_authoritative_archived |
| importal_specs__opencode_review/guardrails_and_stop_signs.md            | legacy_non_authoritative_archived |
| importal_specs__opencode_review/history_attribution_spec.md             | legacy_non_authoritative_archived |
| importal_specs__opencode_review/hook_points.md                          | legacy_non_authoritative_archived |
| importal_specs__opencode_review/internal_data_schema.md                 | legacy_non_authoritative_archived |
| importal_specs__opencode_review/main_window.md                          | legacy_non_authoritative_archived |
| importal_specs__opencode_review/mapping_to_firefox_internals.md         | legacy_non_authoritative_archived |
| importal_specs__opencode_review/product_principles.md                   | legacy_non_authoritative_archived |
| importal_specs__opencode_review/taskspace_lifecycle.md                  | legacy_non_authoritative_archived |
| importal_specs__opencode_review/taskspace_registry_spec.md              | legacy_non_authoritative_archived |
| importal_specs__opencode_review/taskspaces.md                           | legacy_non_authoritative_archived |
| importal_specs__opencode_review/templates/README.md                     | legacy_non_authoritative_archived |
| importal_specs__opencode_review/templates/windowType-gating.TEMPLATE.md | legacy_non_authoritative_archived |
| importal_specs__opencode_review/verification_map.md                     | legacy_non_authoritative_archived |
| importal_specs__opencode_review/version_differentiation.md              | legacy_non_authoritative_archived |
| importal_specs__opencode_review/window_type_spec.md                     | legacy_non_authoritative_archived |

Excluded from registry (non-spec, non-routing)

Git metadata and internal objects (for example, any paths under importal_specs__opencode_review/.git/) are excluded from this registry by policy. They are not specifications and are not valid routing inputs.

