artefact_type: feature_bundle
id: FB-342
title: External Open Routing
implementable: yes
status: draft
version: v0.1
path: docs/features/impl/FB-342_external_open_routing.md

parent_epic:
- docs/features/epics/EFB-003_navigation_routing_policy.md

depends_on_adrs: []
depends_on_fbs: []

authority_dependencies:
- docs/importal_foundation_document_v5.md:
  - 6.2 Main Window Behaviour
  - 6.3 Taskspace Behaviour
  - 7 Omnibar Behaviour (Locked) (URL routing via pinned identity vs new Taskspace)
- Governing_Docs/Phase_2_Global_Stop_Sign_Index.md (SS-01..SS-12)
- Governing_Docs/Phase_4_Glossary_and_Naming_Enforcement.md
- Governing_Docs/Phase_6_Governance_Stability_Policy.md

stop_signs_referenced:
- SS-05: Non-http(s) scheme behaviour is out of scope; if implementation requires it without higher authority, STOP.
- SS-07: If verification cannot be made reproducible without a defined test harness/entrypoint, STOP.


## 1. overview

This feature bundle specifies routing semantics for OS-level external open events:

external_open(target_url)

It defines how Importal routes a target URL into Main vs a new Taskspace, without inferring user intent from the currently focused window.

Normative stance:

- external_open is treated as Main-initiated for routing purposes.
- Routing outcome depends only on explicit inputs: pinned_identity_set and task_worthy_target_allowlist.

## 2. non_goals

- This FB does not define how pinned_identity_set or task_worthy_target_allowlist are authored, stored, or seeded.
- This FB does not define OS-specific system integration mechanisms (e.g., macOS LSOpenURLsWithRole, Windows shell handlers).
- This FB does not define UI surfaces, menus, or settings for managing pinned identity or allowlists.
- This FB does not define Taskspace naming, persistence, or user-facing lifecycle behaviours beyond creation/open.

## 3. definitions

external_open(target_url):
- OS-level event delivered to Importal requesting a URL open.

target_url:
- The http/https URL passed into external_open.
- Other schemes are out of scope; if encountered, STOP under SS-05 unless higher authority specifies behaviour.

target_origin:
- The origin component of target_url (scheme + host + optional port).

pinned app/site identity (pinned_identity_set):
- The set of exact origins considered “pinned” for Main.
- This FB consumes pinned_identity_set as an explicit input (exact origins only). It does not define the source tables, schemas, or seed data that produce it.

pinned_identity_match(target_origin):
- true iff target_origin is an exact-match member of pinned_identity_set.

task_worthy_target_allowlist:
- A rules-based allowlist (no inference) that can match target_url using rule types defined by the authoritative allowlist specification.
- This FB consumes task_worthy_target_allowlist as an explicit input. It does not define the schema, authoring rules, or seed data for the allowlist.


task_worthy_match(target_url):
- true iff target_url matches any allowlist rule.

routing_outcome:
- A deterministic output of the decision procedure, one of:
  - destination: main
  - destination: new_taskspace

## 4. requirements

REQ-342-01 (Main-initiated treatment)
- external_open MUST be treated as Main-initiated for routing purposes.
- The currently focused window (Main/Taskspace/Aux) MUST NOT influence external_open routing decisions.

REQ-342-02 (Pinned identity precedence)
- If pinned_identity_match(target_origin) is true, routing_outcome MUST be destination: main.

REQ-342-03 (Task-worthy target)
- Else if task_worthy_match(target_url) is true, routing_outcome MUST be destination: new_taskspace.

REQ-342-04 (Default: new Taskspace)
- Else routing_outcome MUST be destination: new_taskspace.

REQ-342-05 (No inference)
- The implementation MUST NOT infer user intent from:
  - the active window type
  - prior history
  - heuristics beyond pinned_identity_set and task_worthy_target_allowlist

REQ-342-06 (No Taskspace inheritance)
- external_open MUST NOT route into an existing Taskspace purely because a Taskspace window is currently focused.

REQ-342-07 (Taskspace creation)
- If routing_outcome is destination: new_taskspace, the implementation MUST create a new Taskspace and open target_url within that Taskspace (new tab is acceptable).

REQ-342-08 (Main open semantics)
- If routing_outcome is destination: main, the implementation MUST open target_url in Main.
- If Main is not currently open, implementation MAY open Main window (or equivalent) to satisfy this requirement, consistent with global window handling rules.

REQ-342-09 (Determinism)
- Given the same inputs:
  - target_url
  - pinned_identity_set
  - task_worthy_target_allowlist
the routing_outcome MUST be identical.

## 5. acceptance_criteria

AC-342-01 (Pinned identity routes to Main)
- Given pinned_identity_set contains target_origin,
- And task_worthy_target_allowlist does not match target_url,
- When external_open(target_url) is invoked,
- Then routing_outcome is destination: main.

AC-342-02 (Task-worthy routes to new Taskspace)
- Given pinned_identity_set does not contain target_origin,
- And task_worthy_target_allowlist matches target_url,
- When external_open(target_url) is invoked,
- Then routing_outcome is destination: new_taskspace.

AC-342-03 (Default routes to new Taskspace)
- Given pinned_identity_set does not contain target_origin,
- And task_worthy_target_allowlist does not match target_url,
- When external_open(target_url) is invoked,
- Then routing_outcome is destination: new_taskspace.

AC-342-04 (No Taskspace inheritance)
- Given an existing Taskspace is currently focused,
- When external_open(target_url) is invoked under any of AC-342-01..03 preconditions,
- Then the routing_outcome matches AC-342-01..03 exactly, and the open does not occur within the already-focused Taskspace.

## 6. constraints_mapping

Constitutional anchors (authoritative; do not restate semantics here):

- docs/importal_foundation_document_v5.md: 6.2 Main Window Behaviour
- docs/importal_foundation_document_v5.md: 6.3 Taskspace Behaviour
- docs/importal_foundation_document_v5.md: 7 Omnibar Behaviour (Locked)

Stop-sign triggers (explicit):

- SS-05: If behaviour for non-http(s) schemes is required for external_open, STOP unless higher authority specifies it.
- SS-07: If verification cannot be made reproducible via a defined harness/entrypoint, STOP.



## 7. verification_steps (reproducible)

VS-342-00 (harness requirement)
1. The verification harness MUST provide a reproducible mechanism to invoke external_open(target_url) with a supplied http/https URL.
2. Acceptable mechanisms include:
   - A unit test that calls the isolated decision function described in 8. rollout_plan, or
   - An integration test that invokes the external_open entrypoint.
3. For each test run, record which mechanism was used (unit vs integration) in the test output/log.

VS-342-01 (task-worthy route)
1. Configure task_worthy_target_allowlist with a rule that matches a known test URL (http/https).
2. Ensure pinned_identity_set does not include the test URL origin (to isolate the branch).
3. Invoke external_open(target_url) via the VS-342-00 harness mechanism.
4. Verify routing_outcome is destination: new_taskspace.

VS-342-02 (pinned identity route)
1. Configure pinned_identity_set to include the exact origin of a known test URL (http/https).
2. Ensure task_worthy_target_allowlist does not match the test URL.
3. Invoke external_open(target_url) via the VS-342-00 harness mechanism.
4. Verify routing_outcome is destination: main.

VS-342-03 (default route)
1. Ensure task_worthy_target_allowlist does not match the test URL.
2. Ensure pinned_identity_set does not include the test URL origin.
3. Invoke external_open(target_url) via the VS-342-00 harness mechanism.
4. Verify routing_outcome is destination: new_taskspace.

VS-342-04 (no Taskspace inheritance)
1. Open and focus any Taskspace window.
2. Repeat VS-342-01..VS-342-03.
3. Verify outcomes match exactly and that no case opens in the currently active Taskspace.


## 8. rollout_plan

Implementation should isolate a deterministic decision function (pure, side-effect free):

external_open_route_decision(target_url, pinned_identity_set, task_worthy_target_allowlist) -> routing_outcome

Then integrate it into the external_open entrypoint.

Rationale:
- Enables unit-testing of routing decisions independent of OS integration.
- Supports deterministic behaviour and reproducible verification steps.

## 9. risks_and_edge_cases

- Non-http(s) schemes:
  - This FB does not specify behaviour.
  - MUST STOP under SS-05 if implementation attempts to define it without authority.

- OS integration variability:
  - Routing semantics must remain identical regardless of platform mechanism.

- Misconfiguration of pinned_identity_set / allowlist:
  - Verification should explicitly control these inputs to avoid false positives.
  - Production behaviour should remain deterministic even if inputs are empty.

- Interaction with window lifecycle:
  - If Main window does not exist, opening Main may require window creation; implementation must ensure this is consistent with window invariants and avoids implicitly inheriting Taskspace context.

- Audit trail:
  - Any changes to the source/authoring of pinned_identity_set or task_worthy_target_allowlist are out of scope for this FB and require separate authoritative specs to avoid agent inference.

- Regression risk:
  - Ensure external_open routing does not begin depending on focused window type, history, or heuristics over time (drift risk).
  - Tests should lock in determinism and no-inference guarantees to prevent future regressions.

## 10. change_control

Change-control and audit logging are governed by:

- Governing_Docs/Phase_6_Governance_Stability_Policy.md
- Governing_Docs/change_log.md

This FB introduces no additional change-control requirements beyond those governing artefacts.
