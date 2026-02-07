artefact_type: epic_feature_bundle
implementable: no
status: draft
implementation_sources:
- docs/features/impl/FB-301_router_core_inputs_and_precedence.md (planned)
- docs/features/impl/FB-321_routing_table_schemas.md
- docs/features/impl/FB-322_routing_table_seed_data_v0_1.md (planned)
- docs/features/impl/FB-341_omnibar_submit_routing.md (planned)
- docs/features/impl/FB-342_external_open_routing.md (planned)
- docs/features/impl/FB-362_link_click_routing.md (planned)
- docs/features/impl/FB-363_context_menu_taskspace_overrides.md (planned)

# EFB-003_navigation_routing_policy

Status: Draft (v0.1)

Purpose (non-implementable)
This epic describes the Navigation Routing domain at a conceptual level and provides an index to the implementable Feature Bundles (FB-3xx). It MUST NOT be implemented directly.

Non-goals (orientation)
- No behavioural inference.
- No DOM-level semantic detection.
- No “smart” cross-taskspace heuristics.

Authority dependencies (orientation)
- Foundation v5 (constitutional):
  - 6.1 windowType Semantics
  - 6.2 Main Window Behaviour
  - 6.3 Taskspace Behaviour
  - 7 Omnibar Behaviour (Locked)
  - 8 History Truthfulness and Retention (Locked)
- ADRs (authoritative architecture):
  - docs/adrs/ADR-0001_routing_defaults_and_constraints.md (Decision: Default routing precedence + allowed routing inputs; Applies to: routing policy tables and ambiguity handling)

Rule: ADRs are normative for architecture and constraints. Implementable requirements live only in docs/features/impl/*. EFBs are orientation only and must not be implemented directly.

Decomposition map (implementation sources)
All implementable routing requirements for this epic MUST live only in the FBs referenced in the header’s implementation_sources list.

Notes (orientation)
- “(planned)” markers indicate the intended implementation artefact set; tooling and agents MUST NOT assume file existence until created under docs/features/impl/.
- Determinism and “no inference” are architectural and constitutional constraints. Routing behaviour must remain table-driven and based only on explicit inputs and rules, per ADR-0001 and Foundation v5.

# Orientation appendices (authoritative domain facts; implementable schemas live in FB-321/FB-322)

## Appendix A: Table schemas (authoritative for v0.1)

### A1) toolbar_entry_table schema (UI pins)

Each pinned toolbar entry MUST define:

1. entry_id
- Stable identifier for the pin instance (string), e.g., tb_gmail, tb_slack.
- Note: entry_id is a UI pin identifier, not the same as app_id.

2. label
- UI label shown in the toolbar.

3. app_id
- References an entry in app_identity_table.

4. launch_url_override (optional)
- If present, overrides app_identity_table[app_id].default_launch_url when launching from the toolbar.
- Use only when you want multiple pins for the same app_id with different landing URLs.

5. ui_pin_location (optional)
- Enum: left | right | top | bottom
- Optional because you also have global toolbar docking state; include only if per-entry needed.

No routing semantics live here.

#### A1.1 Behaviour (normative)

- Selecting a toolbar entry resolves:
  - app_id from the entry
  - launch_url = launch_url_override if present else app_identity.default_launch_url
- Then routing rules apply based on surface (Main vs Taskspace) and app_identity defaults.

### A2) app_identity_table schema (identity + routing semantics)

Each app definition MUST define:

1. app_id
- Stable identifier string (slug), e.g., gmail, slack.

2. default_launch_url
- Default URL opened when launched from toolbar (unless overridden by the toolbar entry).

3. canonical_origins
- List of exact origins treated as core identity for this app.
- Origin format: scheme://host[:port]

4. within_app_origin_allowlist
- List of exact origins treated as “within-app navigation” in Main for this app.
- within_app(app_id, target_url) is true iff target_origin exact-matches an allowlist origin.
- No wildcard origins in v0.1.

5. default_destination_from_main
- Enum: main | new_taskspace
- Meaning: if the user selects this app from the toolbar while in Main, where does it open?

6. default_destination_from_taskspace
- Fixed for v0.1: current_taskspace_new_tab
- Meaning: if selected from toolbar inside a Taskspace, open as a new tab in the current taskspace.

7. notes (optional)
- Must not be used for behaviour unless encoded elsewhere.

#### A2.1 Behaviour (normative)

- Main selection:
  - if default_destination_from_main == main: show in Main
  - if == new_taskspace: create Taskspace, open launch_url in a new tab, focus Taskspace
- Taskspace selection:
  - open launch_url in a new tab in current Taskspace, focus that new tab

### A3) task_worthy_target_allowlist schema (unchanged)

Rules-based allowlist only (no inference). Each rule defines:
- rule_id
- rule_type: origin_prefix | host_suffix | content_type | url_suffix
- match_value
- destination (v0.1 always new_taskspace)
- notes (optional)

## Appendix B: v0.1 routing interpretation hooks (where tables are used)

1. When user selects a toolbar pin:
- Resolve toolbar_entry_table[entry_id] -> app_id
- Resolve launch_url:
  - launch_url_override if present else app_identity_table[app_id].default_launch_url
- Then route based on surface:
  - In Main: use app_identity.default_destination_from_main
  - In Taskspace: always open new tab in current Taskspace

2. When user clicks a link inside Main:
- Evaluate task_worthy_target_allowlist first:
  - if match -> new Taskspace
- Else evaluate within_app(app_id, target_url):
  - if within-app -> remain in Main
  - else -> new Taskspace

3. Omnibar rules remain as previously specified (Main vs Taskspace difference).

## Appendix C: v0.1 toolbar_entry_table seed set (moved)

The authoritative v0.1 seed dataset for toolbar_entry_table is defined in:
- docs/features/impl/FB-322_routing_table_seed_data_v0_1.md (planned)

This epic does not embed seed YAML to preserve the “non-implementable” boundary. Seed datasets are implementable artefacts and must live only in FB-322.

## Appendix D: v0.1 app_identity_table seed set (moved)

The authoritative v0.1 seed dataset for app_identity_table is defined in:
- docs/features/impl/FB-322_routing_table_seed_data_v0_1.md (planned)

This epic does not embed seed YAML to preserve the “non-implementable” boundary. Seed datasets are implementable artefacts and must live only in FB-322.

## Appendix E: v0.1 task_worthy_target_allowlist seed set (moved)

The authoritative v0.1 seed dataset for task_worthy_target_allowlist is defined in:
- docs/features/impl/FB-322_routing_table_seed_data_v0_1.md (planned)

This epic does not embed seed YAML to preserve the “non-implementable” boundary. Seed datasets are implementable artefacts and must live only in FB-322.

---

## Appendix F: Optional strictness modes (agent-implementation guidance)

This is optional but reduces ambiguity during alpha.

1. Strict mode (recommended once stable)

- If a toolbar entry references an app_id not present in app_identity_table: STOP (configuration error).
- If app_identity_table lacks required fields: STOP.

2. Lenient alpha mode

- Allow missing app_identity entries to fall back to:

  - canonical origin = origin(default_launch_url)
  - within_app_origin_allowlist = {canonical origin}
  - default_destination_from_main = main
  - Log locally (no telemetry).

Status: orientation guidance only; implementable requirements must be specified in FB-3xx bundles.

---

## Appendix G: Practical v0.1 simplifications you are still keeping

- No wildcard origins in within_app_origin_allowlist.
- Tenant-specific apps (e.g., Jira tenants, SharePoint tenants) are supported via task_worthy host_suffix rules, not within-app matching.
- No DOM-level detection for semantic actions (ChatGPT “new chat”, Gmail “open doc with context tab”, etc.).

Status: orientation guidance only; implementable requirements must be specified in FB-3xx bundles.
