artefact_type: feature_bundle
implementable: yes
status: draft
parent_epic:
- docs/features/epics/EFB-003_navigation_routing_policy.md
depends_on_adrs:
- docs/adrs/ADR-0001_routing_defaults_and_constraints.md
authority_dependencies:
- docs/importal_foundation_document_v5.md: 6.1 windowType Semantics; 6.2 Main Window Behaviour; 6.3 Taskspace Behaviour
- Governing_Docs: Phase_2_Global_Stop_Sign_Index.md; Phase_1_Immutable_Constraints_Extraction.md; Phase_4_Glossary_and_Naming_Enforcement.md

# FB-301 — Router Core Inputs and Precedence (Non-omnibar, Non-external)

## 1. authority_dependencies

Constitutional (docs/importal_foundation_document_v5.md)
- 6.1 windowType Semantics (main/taskspace/aux; windowType is a first-class behavioural boundary)
- 6.2 Main Window Behaviour (Main constrained; non-matching URLs MUST open in a new Taskspace; external links from Main MUST open in a new Taskspace)
- 6.3 Taskspace Behaviour (Taskspaces created only by explicit user action; routing within a Taskspace remains scoped to that Taskspace)

Architecture (ADR)
- ADR-0001_routing_defaults_and_constraints.md
  - Deterministic routing with explicit inputs and precedence
  - No inference
  - Default is to stay within current windowType and current Taskspace unless an explicit rule requires escalation

Governance (Governing_Docs)
- Phase_2_Global_Stop_Sign_Index.md (stop-sign identifiers referenced in this FB; see section 13)
- Phase_1_Immutable_Constraints_Extraction.md (IC mapping concept; see section 12 and REQUIRED_AUTHORITY_INPUT)
- Phase_4_Glossary_and_Naming_Enforcement.md (avoid redefining core terms; use docs/importal_foundation_document_v5.md as the pointer for windowType semantics)

## 2. scope

In scope
- Define the router’s allowed routing inputs and prohibited inputs.
- Define core precedence ordering and core routing outcomes for:
  - app_toolbar_select(entry_id)
  - click_link(target_url)
  - context-menu explicit overrides (as a precedence class, with detailed behaviour delegated to FB-363)
- Define within-app evaluation rule used by Main pinned-app link clicks (exact origin allowlist; no wildcard origins).
- Define default tab disposition rules where explicitly stated for v0.1 (toolbar selection behaviour).

Out of scope (delegated to other FBs)
- omnibar_submit(mode, value) routing (FB-341_omnibar_submit_routing.md)
- external_open(target_url) routing (FB-342_external_open_routing.md)
- Full routing table schemas and seed data (FB-321 and FB-322)

## 3. non_goals

- Any implicit behavioural inference or heuristic routing (including history-derived inference).
- Any DOM-level semantic interpretation of “what a page is”.
- Any automatic cross-taskspace routing based on “smart” matching.

## 4. user_stories

- As a user in a Taskspace, when I click a link, navigation stays inside my current Taskspace by default.
- As a user in Main viewing a pinned app/site, when I click a link that is outside the app’s within-app allowlist, it opens in a new Taskspace.
- As a user, when I use an explicit “open in … taskspace” override, the system does exactly what I asked (no reinterpretation).

## 5. definitions

- windowType: main | taskspace | aux (canonical semantics and behavioural constraints defined by docs/importal_foundation_document_v5.md).
- source_surface: main | taskspace (derived from current windowType at the time of trigger evaluation; aux is not a valid routing source for this FB’s triggers).
- target_url: the fully qualified URL being navigated to or opened.
- target_origin: mechanical parse of target_url’s origin, used only for exact-match comparisons.
- within_app(app_id, target_url): exact origin match against an allowlist defined by app_identity_table for that app_id (no wildcard origins).

## 6. functional_requirements

FR-301-01 Allowed routing inputs only
- The routing decision logic MUST depend only on the following explicit inputs:
  - Source: source_surface; source_taskspace_id (only if source_surface == taskspace); source_app_id (only when Main is displaying a pinned app/site)
  - Trigger: app_toolbar_select(entry_id); click_link(target_url); context_menu overrides (delegated)
  - Target: target_url; target_origin (mechanical parse from target_url)
  - Policy tables: toolbar_entry_table; app_identity_table; task_worthy_target_allowlist
- The routing decision logic MUST NOT consult any other implicit signals (including implicit behavioural inference, history-derived inference, learned heuristics, or domain categorisation) unless explicitly authorised by a separate implementable FB.

FR-301-02 Precedence class: explicit user overrides
- If an explicit context-menu “open in … taskspace” command is invoked, it MUST take precedence over all other routing rules for that action.
- The exact override behaviours and parameters are specified in FB-363_context_menu_taskspace_overrides.md.

FR-301-03 Trigger: app_toolbar_select(entry_id) when source_surface == taskspace
- The selected app/site MUST open in the current Taskspace.
- Default disposition: open in a new tab in the current Taskspace.

FR-301-04 Trigger: app_toolbar_select(entry_id) when source_surface == main
- The router MUST resolve entry_id to (app_id, launch_url) using toolbar_entry_table.
- The router MUST consult app_identity_table[app_id].default_destination_from_main to determine destination:
  - main: show launch_url in Main
  - new_taskspace: open a new Taskspace with launch_url in a new tab
- Showing content in Main via this route MUST remain consistent with docs/importal_foundation_document_v5.md Main constraints (Main renders only content that matches toolbar entry identity/origin matching as defined by routing policy tables).

FR-301-05 Trigger: click_link(target_url) when source_surface == taskspace
- Default behaviour MUST be in-tab navigation within the current Taskspace.
- The router MUST NOT auto-switch Taskspaces or create a new Taskspace as a result of a click_link from a Taskspace unless explicitly specified by another implementable FB.

FR-301-06 Trigger: click_link(target_url) when source_surface == main (Main pinned-app context)
- If target_url matches task_worthy_target_allowlist, the router MUST open the target in a new Taskspace.
- Else if within_app(source_app_id, target_url) is true, the router MUST remain in Main and navigate within the pinned app/site.
- Else the router MUST open the target in a new Taskspace.

FR-301-07 within_app definition (locked for v0.1)
- within_app(app_id, target_url) MUST be true iff:
  - target_origin is an exact match for an origin in app_identity_table[app_id].within_app_origin_allowlist
- Wildcard origins are prohibited in v0.1 (exact match only).

## 7. non_functional_requirements

Determinism and testability
- Routing MUST be deterministic and mechanically testable (table-driven rules; no inference), per ADR-0001.

Privacy and data-handling
- Routing decisions MUST NOT use implicit behavioural inference (including history-derived inference) unless an implementable FB explicitly authorises it.
- This FB defines no data collection, telemetry, or background network behaviour. Any network activity must be user-initiated per constitutional network posture constraints.

## 8. state_model

persisted_state
- This FB depends on the existence of the routing policy tables:
  - toolbar_entry_table
  - app_identity_table
  - task_worthy_target_allowlist
- This FB does not specify storage mechanism, schema encoding, or persistence layer for these tables (see FB-321 and FB-322).

lifecycle
- On each routing trigger, the router reads:
  - current source_surface and any applicable source identifiers
  - the trigger parameters (entry_id or target_url)
  - current routing policy tables (as an immutable snapshot for that decision)
- The router produces a routing outcome:
  - destination surface (main or new taskspace or current taskspace)
  - disposition (in-tab vs new tab, where specified)

## 9. edge_cases_and_failures

- If toolbar_entry_table lookup for entry_id fails, behaviour is unspecified in this FB and MUST NOT be implemented by guessing.
- If app_identity_table is missing app_id referenced by a toolbar entry, behaviour is unspecified in this FB and MUST NOT be implemented by guessing.
- If multiple app_identity entries would match a given origin in a way that affects routing, behaviour is unspecified in this FB and MUST NOT be implemented by guessing (requires explicit resolution in schemas/seed data or via an ADR/FB update).
- If Main is not currently displaying a pinned app/site (no source_app_id) and a click_link occurs, behaviour is unspecified in this FB (Main click routing outside pinned-app context must be specified elsewhere if required).

## 10. acceptance_criteria (numbered, testable)

1. Allowed-input purity
   - Given a routing trigger, the routing decision is explainable solely from the allowed inputs listed in FR-301-01 and the policy tables (no dependence on implicit behavioural inference, including history-derived inference, heuristics, or additional signals).

2. Taskspace toolbar selection routing
   - From a Taskspace, app_toolbar_select(entry_id) opens the selected app/site in the current Taskspace in a new tab.

3. Main toolbar selection routing
   - From Main, app_toolbar_select(entry_id) routes according to app_identity_table[app_id].default_destination_from_main:
     - main routes to Main
     - new_taskspace routes to a new Taskspace with a new tab

4. Taskspace link click containment
   - From a Taskspace, click_link(target_url) remains within the current Taskspace (in-tab), and does not auto-create/switch Taskspaces.

5. Main pinned-app link click escalation
   - From Main (pinned app context), click_link(target_url) routes as follows:
     - task-worthy allowlist match => new Taskspace
     - else within_app true => remains in Main
     - else => new Taskspace

6. within_app exact-match enforcement
   - within_app(app_id, target_url) is true only on exact origin matches from app_identity_table[app_id].within_app_origin_allowlist, with no wildcard interpretation.

## 11. verification_steps (reproducible)

1. Create a minimal table-driven test fixture (in code or test harness) that supplies:
   - toolbar_entry_table with at least one entry_id -> (app_id, launch_url)
   - app_identity_table with:
     - default_destination_from_main values (main and new_taskspace)
     - within_app_origin_allowlist with at least one exact origin
   - task_worthy_target_allowlist with at least one URL/origin that triggers escalation

2. Execute the following scenario matrix and assert destinations/dispositions:
   - Taskspace + app_toolbar_select(entry_id) => current taskspace, new tab
   - Main + app_toolbar_select(entry_id) with default_destination_from_main=main => Main
   - Main + app_toolbar_select(entry_id) with default_destination_from_main=new_taskspace => new Taskspace, new tab
   - Taskspace + click_link(target_url) => current taskspace, in-tab
   - Main pinned-app + click_link(target_url) where target matches task_worthy => new Taskspace
   - Main pinned-app + click_link(target_url) where within_app true and not task_worthy => Main
   - Main pinned-app + click_link(target_url) where within_app false and not task_worthy => new Taskspace

3. Add a negative test that attempts to influence routing using a non-allowed signal (implicit behavioural inference, including history-derived inference); verify routing outcome is unchanged when allowed inputs are held constant.

## 12. invariants_touched (IC-x identifiers only, no re-hosting)

none

## 13. stop_sign_triggers (SS-xx identifiers only)

- SS-01 Semantic ambiguity: Applies if any seed entry’s meaning is unclear (e.g., ambiguous default_destination_from_main) such that implementing it would require guessing.

- SS-02 Authority conflict: Applies if any seed entry or dataset structure conflicts with FB-321 schema constraints or ADR-0001 constraints.

- SS-03 Missing immutable constraint mapping: applies if implementing omnibar submit routing touches an immutable constraint area but the required mapping/anchors are absent or unclear.

- SS-05 Inference required: Applies if completing the seed datasets would require inferring missing entries, fields, or values not explicitly provided.

## 14. rollout_and_rollback

- Rollout: implement as a table-driven router with deterministic branching per this FB and ADR-0001, with tests covering the acceptance criteria matrix.
- Rollback: changes implementing this FB MUST be reversible via reverting the implementing changesets; no irreversible migrations may be introduced as part of this FB.

## 15. change_log_entry_required

Yes. On implementation, append an audit-only entry to Governing_Docs/change_log.md referencing:
- docs/features/impl/FB-301_router_core_inputs_and_precedence.md
- any implementing code paths changed
- verification artefacts produced (tests/matrix reference)

REQUIRED_AUTHORITY_INPUT

- Phase 1 defines the IC concept but may not enumerate IC-## identifiers. What is the canonical file and identifier list for IC-## (if any)? If none exist yet, should invariants_touched remain “none” until the IC list is created?
