artefact_type: feature_bundle
implementable: yes
status: draft
version: v0.1
path: docs/features/impl/FB-362_link_click_routing.md

id: FB-362
title: Link Click Routing

parent_epic:
- docs/features/epics/EFB-003_navigation_routing_policy.md

depends_on_adrs: []
depends_on_fbs: []

authority_dependencies:
- docs/importal_foundation_document_v5.md
- Governing_Docs/Phase_0_Authority_Contract_Setup.md
- Governing_Docs/Phase_1_Immutable_Constraints_Extraction.md
- Governing_Docs/Phase_2_Global_Stop_Sign_Index.md
- Governing_Docs/Phase_3_Phase_Execution_Model.md
- Governing_Docs/Phase_4_Glossary_and_Naming_Enforcement.md
- Governing_Docs/Phase_5_Spec_Classification_Mapping.md
- Governing_Docs/Phase_6_Governance_Stability_Policy.md
- docs/spec_registry.md
- agents.md
- docs/agent_activation_rules.md
- docs/agent_coding_best_practises__AI-Optimised_v2.1.md
- docs/features/epics/EFB-003_navigation_routing_policy.md

stop_signs_invoked: []

---


# FB-362 — Link Click Routing

## scope

This feature bundle specifies deterministic routing outcomes for a user-initiated link activation event (“click_link”) based on:

1. Current window type (Main vs Taskspace)
2. Current Main pinned-app identity (when in Main)
3. Task-worthiness allowlist match result for the target URL (when in Main)
4. Within-app match result for the target URL under the current pinned-app identity (when in Main)

It defines the destination window type for the navigation and the default tab placement rule for Taskspace.

This feature bundle does not define the internal matching algorithms for “task-worthy allowlist” or “within-app matching”.

It treats task_worthy(target_url) and within_app(current_app_id, target_url) as required deterministic inputs whose definition and configuration MUST be specified by one or more authoritative artefacts (FB and/or ADR).

If no authoritative artefact exists that defines and configures either evaluator, implementation of this feature MUST STOP under SS-05 (Inference-required implementation).

## non_goals

1. Does not define context-menu routing options (for example, “Open in new Taskspace”) or modifier-key behaviour.
2. Does not define omnibar submit routing.
3. Does not define external_open (OS-level) routing.
4. Does not define the data schemas, storage formats, or seed data for allowlists and app identity rules.
5. Does not define how “current pinned-app identity” is derived or persisted; it is treated as an available input when a Main window is showing a pinned app.

## definitions

click_link:
A user-initiated navigation that occurs by activating a link in page content.

window_type:
A classification of the current top-level window. For this feature bundle, only these are in scope:

* main
* taskspace

main pinned-app identity:
The active application identity context for the content currently shown in Main (the “current_app_id” input).

task-worthy allowlist:
A deterministic ruleset that evaluates (target_url) and returns a boolean indicating whether the click is “task-worthy” and therefore must be escalated to a new Taskspace.

within-app matching:
A deterministic ruleset that evaluates (current_app_id, target_url) and returns a boolean indicating whether the navigation remains within the current app boundary for the pinned app in Main.

new Taskspace:
A new Taskspace window created as the destination for a routed navigation, distinct from the current window.

in-tab:
Navigate in the currently active tab of the current Taskspace window (no new Taskspace is created as the default behaviour).

## constraints_mapping

Derived constraints (higher-tier):

1. docs/importal_foundation_document_v5.md, 5.1 “Zero non-user-initiated outbound network traffic” (definition of user-initiated includes clicking a link). Applies to click_link being a valid user-initiated navigation event.
2. docs/importal_foundation_document_v5.md, 6.2 Main Window Behaviour:
   2.1 External links from Main MUST open in a new Taskspace.
   2.2 If a URL/domain does not match pinned identity/origin, it MUST open in a new Taskspace.
   These anchor R2 and the R3 outcome cases where Main must escalate to a new Taskspace.
3. docs/importal_foundation_document_v5.md, 6.3 Taskspace Behaviour:
   3.1 Taskspaces are created only by explicit user action (click_link qualifies).
   3.2 Routing within a Taskspace MUST remain scoped to that Taskspace.
   These anchor R1 and the prohibition on default Taskspace click_link escalating to a new Taskspace.

Feature-local constraints (introduced by this feature bundle):

1. Main decision order and precedence between task_worthy and within_app (R2; validation_rules 1–2).
2. Deterministic, non-inferential routing based only on declared inputs (R4; validation_rules 5; AC7).

## requirements

### R1. Taskspace click_link default routing

When window_type is taskspace, click_link MUST route the navigation within the same Taskspace window.

Default behaviour for Taskspace click_link MUST be in-tab.

No new Taskspace MUST be created as a side effect of a default click_link occurring inside a Taskspace window.

### R2. Main click_link routing decision order

When window_type is main, click_link MUST be routed by evaluating, in order:

1. task_worthy(target_url)
2. within_app(current_app_id, target_url)

The first condition that matches determines the routing outcome.

### R3. Main routing outcomes

When window_type is main:

R3.1 If task_worthy(target_url) is true:

* The navigation MUST open in a new Taskspace.
* The navigation MUST NOT also proceed in Main.

R3.2 Else if within_app(current_app_id, target_url) is true:

* The navigation MUST remain in Main.
* No new Taskspace MUST be created by this routing decision.

R3.3 Else:

* The navigation MUST open in a new Taskspace.
* The navigation MUST NOT also proceed in Main.

### R4. Determinism and non-inference

Routing decisions in this feature bundle MUST be deterministic and MUST NOT depend on:

* browsing history state
* any inference about page content meaning
* any heuristic or probabilistic classification

The routing decision MUST be fully determined by:

* window_type
* target_url
* current_app_id (Main only)
* task_worthy evaluator result (Main only)
* within_app evaluator result (Main only)

## validation_rules

1. The routing order in Main is fixed: task_worthy is evaluated before within_app.
2. If both task_worthy and within_app evaluate to true for the same target_url in Main, task_worthy takes precedence (new Taskspace).
3. Taskspace click_link default behaviour never escalates to a new Taskspace.
4. A Main click_link routed to a new Taskspace must not “double-navigate” (it must not navigate in Main and also open a Taskspace).
5. Behaviour must be stable under repeated trials: the same inputs produce the same routing outcome.

## acceptance_criteria

AC1 (Taskspace, in-tab):
Given a Taskspace window with a page containing a link, performing click_link on that link results in navigation occurring in the same Taskspace window and in the currently active tab.

AC2 (Taskspace, no implicit escalation):
Given a Taskspace window, performing click_link on any link MUST NOT create a new Taskspace window as part of the default click_link behaviour.

AC3 (Main, task-worthy routes to new Taskspace):
Given a Main window and a target_url where task_worthy(target_url) is true, performing click_link MUST open the target_url in a new Taskspace and MUST NOT navigate the Main window to that target_url.

AC4 (Main, within-app stays in Main):
Given a Main window with a resolved current_app_id and a target_url where task_worthy(target_url) is false and within_app(current_app_id, target_url) is true, performing click_link MUST navigate within Main and MUST NOT create a new Taskspace.

AC5 (Main, not task-worthy and not within-app escalates):
Given a Main window with a resolved current_app_id and a target_url where task_worthy(target_url) is false and within_app(current_app_id, target_url) is false, performing click_link MUST open the target_url in a new Taskspace and MUST NOT navigate the Main window to that target_url.

AC6 (Precedence when both match):
Given a Main window and a target_url where task_worthy(target_url) is true and within_app(current_app_id, target_url) is also true, performing click_link MUST route to a new Taskspace (task_worthy precedence) and MUST NOT navigate Main.

AC7 (History-blind outcome stability):
Given two environments that differ only by browsing history state, performing the same click_link from the same window_type with the same current_app_id and target_url MUST result in the same routing outcome.

## verification_steps

These steps are written to be reproducible without requiring any specific test harness, but they may be automated if an in-repo harness exists.

### Setup (once)

1. Ensure you can open a Main window with a pinned app context (current_app_id is resolved for the active Main content).
2. Identify the authoritative artefact(s) (FB and/or ADR) that define and configure task_worthy(target_url) for this environment, and record:
   - canonical path(s)
   - the exact configuration used for this verification run
   - how you obtained:
     - task_worthy(URL_A) = true
     - task_worthy(URL_B) = false
   If no authoritative configuration mechanism exists, STOP under SS-07 (Verification ambiguity).

3. Identify the authoritative artefact(s) (FB and/or ADR) that define and configure within_app(current_app_id, target_url) for this environment, and record:
   - canonical path(s)
   - the exact configuration used for this verification run
   - how you obtained:
     - within_app(current_app_id, URL_B) = true
     - within_app(current_app_id, URL_C) = false
   If no authoritative configuration mechanism exists, STOP under SS-07 (Verification ambiguity).


### Manual verification (AC1–AC6)

1. Taskspace in-tab (AC1):

   * Open a Taskspace window.
   * Navigate to a page containing a link to URL_C.
   * Activate the link via click_link.
   * Verify no new window opens and the navigation occurs in the same Taskspace tab.

2. Taskspace no escalation (AC2):

   * Repeat the above using multiple distinct links.
   * Verify that default click_link never opens a new Taskspace window.

3. Main task-worthy routing (AC3):

   * Open Main with current_app_id resolved.
   * In Main, ensure a link to URL_A is present (or use a page where you can click to URL_A).
   * Activate the link via click_link.
   * Verify a new Taskspace opens to URL_A.
   * Verify Main does not navigate to URL_A.

4. Main within-app routing (AC4):

   * In Main, activate a link to URL_B.
   * Verify Main navigates to URL_B.
   * Verify no new Taskspace is created.

5. Main escalation routing (AC5):

   * In Main, activate a link to URL_C.
   * Verify a new Taskspace opens to URL_C.
   * Verify Main does not navigate to URL_C.

6. Precedence (AC6):

   * Configure (or choose) a URL_D such that task_worthy(URL_D) = true and within_app(current_app_id, URL_D) = true.
   * In Main, activate a link to URL_D.
   * Verify it routes to a new Taskspace and Main does not navigate.

### History-blind stability (AC7)

1. Baseline run:

   * Clear or isolate to a fresh profile (or otherwise ensure minimal history).
   * Perform the Main routing checks for URL_A, URL_B, URL_C and record outcomes.

2. History-varied run:

   * Populate history with unrelated browsing in both Main and Taskspaces.
   * Repeat the same click_link actions for URL_A, URL_B, URL_C.
   * Verify outcomes match the baseline run.

## rollout_plan

1. Implement routing decision logic for click_link according to requirements R1–R4.
2. Add automated tests that cover AC3–AC6 using controlled task_worthy and within_app evaluator stubs/mocks, if test infrastructure supports it.
3. Add at least one integration-style verification run consistent with the manual verification steps above.
4. Ship when all acceptance criteria pass and verification evidence exists.

## rollback_plan

1. Revert the implementation commit(s) that introduce click_link routing changes.
2. Re-run the verification steps to confirm behaviour returns to the prior baseline.
3. Record the rollback in the change log entry associated with the original change.

## change_log_entry_required

Yes.

Change-control and audit recording requirements are governed by:

- Governing_Docs/Phase_6_Governance_Stability_Policy.md
- docs/agent_activation_rules.md

This feature bundle adds no additional change-log schema beyond those authorities.

