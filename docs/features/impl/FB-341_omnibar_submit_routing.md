artefact_type: feature_bundle
fb_id: FB-341
title: Omnibar submit routing (Google / Importal / URL) with explicit mode selection and history-blind dropdown
status: draft
implementable: yes
version: v0.1
canonical_path: docs/features/impl/FB-341_omnibar_submit_routing.md
parent_epic: docs/features/epics/EFB-003_navigation_routing_policy.md
authority_dependencies: docs/importal_foundation_document_v5.md (5.1, 5.2, 6.1, 6.2, 6.3, 7, 8); Governing_Docs/Phase_2_Global_Stop_Sign_Index.md; Governing_Docs/Phase_4_Glossary_and_Naming_Enforcement.md; docs/spec_registry.md
architecture_dependencies: docs/features/impl/FB-301_router_core_inputs_and_precedence.md; docs/adrs/ADR-0001_routing_defaults_and_constraints.md
schema_dependencies: docs/features/impl/FB-321_routing_table_schemas.md; docs/features/impl/FB-322_routing_table_seed_data_v0_1.md
last_updated: 2026-02-06

# FB-341_omnibar_submit_routing

## scope

This feature bundle specifies deterministic omnibar submit routing across windowType surfaces:

1. Search Google submit routing (Main vs Taskspace)
2. Search Importal submit routing (History in Main, with history-blind dropdown gating)
3. URL submit routing (Main vs Taskspace, including Main identity/origin match behaviour)

This bundle is limited to omnibar submit behaviour and the minimal omnibar dropdown gating required by the constitution (history-blind by default; explicit mode selection).

## non_goals

1. Defining or implementing the routing tables, schemas, or seed data (see FB-321 and FB-322)
2. Defining the full History UI feature set beyond what is explicitly required by the constitutional Omnibar Behaviour section (History view existence, recency sorting, Taskspace attribution, Open Taskspace action)
3. Any behavioural inference from user input, page semantics, or DOM content (see EFB-003 non-goals and ADR-0001)
4. Any network suggestion or autocomplete features (this bundle neither enables nor specifies them)

## definitions

1. windowType

   - Canonical values: main, taskspace, aux (see docs/importal_foundation_document_v5.md §6.1)
   - This FB applies only to main and taskspace.

2. Main

   - Constrained browsing surface (see docs/importal_foundation_document_v5.md §6.2)

3. Taskspace

   - Primary browsing surface; scoped routing within the Taskspace (see docs/importal_foundation_document_v5.md §6.3)

4. Omnibar

   - A UI input that accepts user text and presents a dropdown of actions. This FB governs the action selection and submit routing.

5. Omnibar mode (submit_mode)

   - One of: search_google, search_importal, url
   - submit_mode is set only via explicit user selection.

6. Explicit mode selection

   - A user action that sets submit_mode by selecting exactly one of the omnibar dropdown options:

     - “Search Google”
     - “Search Importal”
     - “URL”
   - Selection mechanisms may include click or keyboard selection in the dropdown.
   - Inference from typed content (for example “looks like a URL”) is prohibited (see EFB-003 non-goals and ADR-0001).

7. History-blind dropdown

   - Prior to explicit selection of “Search Importal”, the omnibar dropdown must not display history-derived suggestions (see docs/importal_foundation_document_v5.md §7).

8. Origin match to pinned app/site identity

   - The rule used by Main to decide whether a URL may render in Main (see docs/importal_foundation_document_v5.md §6.2 and §7).
   - Matching semantics are defined by routing policy tables and identity definitions (see EFB-003 and the schemas in FB-321/FB-322).

## requirements

R1. History-blind dropdown default

1. When the omnibar dropdown is shown and before explicit selection, the dropdown must contain only:

   - “Search Google”
   - “Search Importal”
   - “URL”
2. No history suggestions may appear in the dropdown prior to explicit selection of “Search Importal”.
3. This requirement applies in both main and taskspace.

R2. Explicit mode selection gating

1. Omnibar submit routing must be determined solely by:

   - current windowType (main vs taskspace)
   - explicitly selected submit_mode
   - the submitted text value
   - routing policy tables where explicitly required (for Main origin match)
2. The omnibar must not infer submit_mode from the submitted text.

R3. Search Google routing (submit_mode = search_google)

1. From main:

   - Create a new Taskspace.
   - Open Google search results in that new Taskspace.
2. From taskspace:

   - Open Google search results in the current Taskspace.
   - Default behaviour is a new tab in the current Taskspace.

R4. Search Importal routing (submit_mode = search_importal)

2. From main or taskspace:

   - Navigate to the History view in Main.

3. History results in Main must satisfy the constitutional requirements:

   - Results are organised by recency and Taskspace.
   - A one-click “Open Taskspace” action is present for results.

R5. URL routing (submit_mode = url)

1. From taskspace:

   - Open the submitted URL in the current Taskspace.
   - Default behaviour is a new tab in the current Taskspace.
2. From main:

   - If the submitted URL origin matches a pinned app/site identity, render that URL in Main.
   - Else, open the URL in a new Taskspace in a new tab.

R6. Main constraints must be preserved

1. This FB must not weaken the Main constraints in docs/importal_foundation_document_v5.md §6.2.
2. Specifically: if a URL does not match a pinned identity/origin rule, it must not render in Main and must open in a new Taskspace.

R7. Network posture compliance

1. Omnibar behaviour must remain compatible with docs/importal_foundation_document_v5.md §5.1 and §5.2.
2. This FB does not authorise any outbound network traffic prior to user-initiated submit.

## validation_rules

V1. Determinism and no inference

1. For a given tuple (windowType, submit_mode, submitted_text, routing_tables_state), the routing outcome must be deterministic.
2. No behaviour may depend on heuristics such as “this looks like a URL” or “this is likely a search”.

V2. History-blindness boundary

1. Before submit_mode = search_importal is explicitly selected, the omnibar dropdown must not disclose history-derived suggestions.

V3. Taskspace creation boundary

1. Taskspaces may be created only by explicit user action (docs/importal_foundation_document_v5.md §6.3).
2. Omnibar submit is an explicit user action; Taskspace creation by this FB is permitted only in the cases defined in R3 and R5.

V4. Main identity/origin enforcement

1. Main renders only content matching pinned app/site identity/origin rules (docs/importal_foundation_document_v5.md §6.2, §7).
2. The identity/origin matching rules are defined by routing policy tables (see EFB-003; schemas/seeds in FB-321/FB-322).

## acceptance_criteria

AC-01 History-blind dropdown contents

* Given the omnibar is focused in main or taskspace, and no submit_mode has been explicitly selected, the dropdown contains exactly three options:

  - “Search Google”
  - “Search Importal”
  - “URL”
* No other dropdown entries are present.

AC-02 No history suggestions before explicit Search Importal selection

* Given the omnibar is focused in main or taskspace, and no submit_mode has been explicitly selected, typing any text must not cause any history-derived suggestion entries to appear in the dropdown.

AC-03 Search Google from Main opens results in a new Taskspace

* Given windowType = main, and the user explicitly selects “Search Google” and submits the query “importal test”:

  - Exactly one new Taskspace is created as a direct result of the submit action.
  - The active tab in that Taskspace loads the Google search results page.
  - The rendered search query on that results page equals “importal test”.

AC-04 Search Google from Taskspace opens results in the current Taskspace

* Given windowType = taskspace, and the user explicitly selects “Search Google” and submits the query “importal test”:

  - No new Taskspace is created.
  - A new tab in the current Taskspace loads the Google search results page.
  - The rendered search query on that results page equals “importal test”.

AC-05 URL from Taskspace opens in the current Taskspace

- Given windowType = taskspace, and the user explicitly selects “URL” and submits "https://example.com/":
  - No new Taskspace is created.
  - A new tab in the current Taskspace loads a URL whose origin is exactly "https://example.com".

AC-06 URL from Main renders in Main when origin matches pinned identity

- Given windowType = main, and the routing policy tables define at least one pinned app/site identity whose canonical origin is exactly "https://example.com":
  - When the user explicitly selects “URL” and submits "https://example.com/path":
    - No new Taskspace is created.
    - Main renders a URL whose origin is exactly "https://example.com".

AC-07 URL from Main opens a new Taskspace when origin does not match pinned identity

- Given windowType = main, and the submitted URL origin does not match any pinned app/site identity per routing policy tables:
  - When the user explicitly selects “URL” and submits "https://example.org/":
    - Exactly one new Taskspace is created as a direct result of the submit action.
    - A new tab in that new Taskspace loads a URL whose origin is exactly "https://example.org".

AC-08 Search Importal always routes to History in Main with recency and Taskspace attribution

* Given windowType = main or taskspace, and the user explicitly selects “Search Importal” and submits any text:

  - Main displays the History view.
  - If at least two History results exist with distinct visit times, the UI ordering is strictly most-recent-first.
  - Each displayed result shows Taskspace attribution (the Taskspace associated with the visit record).

AC-09 One-click Open Taskspace action exists on History results

* Given the History view in Main is displaying at least one history result:

  - Each result exposes a one-click “Open Taskspace” action.
  - Activating that action focuses (or opens) the associated Taskspace for that history item.

## verification_steps

Preflight (drift and authority checks)

1. Verify canonical paths exist and are unique in-repo:

   - docs/importal_foundation_document_v5.md
   - docs/features/epics/EFB-003_navigation_routing_policy.md
   - docs/features/impl/FB-341_omnibar_submit_routing.md
   - Governing_Docs/Phase_2_Global_Stop_Sign_Index.md
   - docs/spec_registry.md
2. Verify docs/spec_registry.md still routes docs/features/impl/ as active_authoritative_implementable.
3. If ADR-0001 is required by the implementation, verify it exists at:

   - docs/adrs/ADR-0001_routing_defaults_and_constraints.md

Manual verification matrix (map to AC IDs)

1. AC-01, AC-02

   - In main: focus omnibar; verify dropdown shows only the three options and never shows history suggestions before selecting “Search Importal”.
   - In taskspace: repeat.

2. AC-03

   - From main: select “Search Google”, submit “importal test”. 
   - Verify a new Taskspace is created and the results load in that Taskspace.

3. AC-04

   - From taskspace: select “Search Google”, submit “importal test”.
   - Verify results load in the current Taskspace (default new tab) and no new Taskspace is created.

4. AC-05

   - From taskspace: select “URL”, submit "https://example.com/".
   - Verify the final loaded URL origin is "https://example.com", and no new Taskspace is created.

5. AC-06

   - Ensure routing policy tables include a pinned identity whose canonical origin is "https://example.com".
   - From main: select “URL”, submit "https://example.com/path".
   - Verify Main renders a URL whose origin is "https://example.com", and no new Taskspace is created.

6. AC-07

   - Ensure "https://example.org" is not included in any pinned identity origins.
   - From main: select “URL”, submit "https://example.org/".
   - Verify a new Taskspace is created and the final loaded URL origin is "https://example.org".

7. AC-08, AC-09

   - Precondition setup:
     - Create Taskspace A and visit "https://example.com/".
     - Create Taskspace B and visit "https://example.org/" after the Taskspace A visit.
   - From main: select “Search Importal”, submit any text.
   - Verify History view appears in Main, results are ordered most-recent-first (example.org entry above example.com entry), each result shows Taskspace attribution, and each result has an “Open Taskspace” action that focuses/opens the associated Taskspace.

Network posture check (compatibility with docs/importal_foundation_document_v5.md §5.1/§5.2)

1. With omnibar focused and dropdown visible but before submit, confirm no outbound network traffic is emitted, using one of:
   - Browser developer tools network monitor; or
   - OS-level packet capture / connection monitor.
2. Confirm outbound traffic occurs only on submit in Search Google or URL mode (as the user’s primary intent is network access), using the same measurement method as step 1.


## stop_sign_triggers

- SS-01 Semantic ambiguity: applies if any routing rule or acceptance criterion wording is ambiguous such that implementation would require guessing.
- SS-02 Authority conflict: applies if any requirement in this FB conflicts with docs/importal_foundation_document_v5.md, ADR-0001, or FB-301/FB-321/FB-322 constraints.
- SS-03 Missing immutable constraint mapping: applies if implementing omnibar submit routing touches an immutable constraint area but the required mapping/anchors are absent or unclear.
- SS-05 Inference-required implementation: applies if any implementation requires heuristics (e.g., “looks like a URL”) or any non-explicit inference.
- SS-07 Verification ambiguity: applies if verification cannot be executed deterministically (e.g., network posture cannot be measured with available tools, or expected outcomes are not observable).
- SS-09 Drift signal detected: applies if any referenced canonical path does not exist, is duplicated, or is routed differently by docs/spec_registry.md than assumed here.
- SS-11 Acceptance criteria absent or non-binary: applies if any AC becomes non-verifiable or subjective.
- SS-12 Conflicting acceptance criteria: applies if any AC conflicts with another AC or with higher-tier constraints.


## rollout_plan

1. Implement routing for the three explicit omnibar modes as specified in requirements R1 to R7.
2. Execute verification_steps in a clean profile and record evidence (logs/screenshots) as required by Governing_Docs/Phase_6_Governance_Stability_Policy.md.
3. Land changes only after all acceptance_criteria pass.

## rollback_plan

1. Revert the implementation commits that introduce FB-341 behaviour.
2. Re-run the verification_steps matrix to confirm previous routing behaviour is restored and no partial state remains.
3. Ensure no schema or seed-data migrations were introduced by this change (FB-341 is routing/behaviour only).

## change_log_entry_required

On first introduction of this feature bundle, and on any material update to its requirements or acceptance criteria:

1. Append an audit-style entry to Governing_Docs/change_log.md that records:

   - Date
   - File path: docs/features/impl/FB-341_omnibar_submit_routing.md
   - Summary of what changed and why (short, non-policy)
   - Any verification artefact references required by Governing_Docs/Phase_6_Governance_Stability_Policy.md

