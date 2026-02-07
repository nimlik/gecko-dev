fb_id: FB-363
artefact_type: feature_bundle
implementable: yes
status: draft
title: Context menu Taskspace overrides
purpose: Specify explicit context-menu overrides (open in specified Taskspace), including active/inactive targeting, with execute-exactly-as-requested semantics.
parent_epic_path: docs/features/epics/EFB-003_navigation_routing_policy.md
canonical_path: docs/features/impl/FB-363_context_menu_taskspace_overrides.md

# FB-363_context_menu_taskspace_overrides

## 1. scope

This feature bundle defines explicit context-menu routing overrides for opening a navigable target (for example, a link URL) in a specified Taskspace.

In-scope behaviours:

- Active Taskspace targeting:
  - User can direct the open action to the currently active Taskspace.

- Inactive Taskspace targeting:
  - User can direct the open action to a Taskspace that exists and is open but not currently active.

- Execute-exactly-as-requested semantics:
  - When a user explicitly selects a target Taskspace via the context menu, Importal must execute that target selection exactly as specified, with no inference-based rerouting and no target substitution.

Authority constraints this FB must not violate:

- Constitutional constraints (docs/importal_foundation_document_v5.md):
  - Taskspaces are created only by explicit user action; no inference-based creation or substitution (docs/importal_foundation_document_v5.md, section 6.3 Taskspace Behaviour).
  - Routing within a Taskspace must remain scoped to that Taskspace (docs/importal_foundation_document_v5.md, section 6.3 Taskspace Behaviour).
  - windowType is a first-class boundary; targeting in this FB applies only to windowType=taskspace (docs/importal_foundation_document_v5.md, section 6.1 windowType Semantics).
  - Context-menu selection is a user-initiated action for network posture purposes (docs/importal_foundation_document_v5.md, section 5.1 Zero Outbound Traffic Rule definition).

- Immutable constraints (Phase 1):
  - IC references: TODO — insert the relevant IC-## identifiers once the immutable constraint set enumerates them. This FB must not be treated as implementation-ready until IC references are resolved.

## 2. non_goals

- Defining router-core input precedence across all routing surfaces (owned by the router-core FB set referenced by the parent epic).
- Defining routing table schemas or seed data.
- Defining toolbar pin semantics.
- Defining tab disposition defaults beyond what is strictly required to guarantee “opens in the selected Taskspace” (any broader tab policy belongs in the relevant routing FBs).
- Implementing or specifying Taskspace creation flows beyond invoking an already-existing Taskspace (this FB does not introduce new Taskspace creation triggers).

## 3. definitions

- Context-menu override:
  - A user-initiated selection from a context menu that explicitly specifies the routing target Taskspace.

- Navigable target:
  - A concrete URL or equivalent navigation target extracted from the UI element that opened the context menu, suitable for an open/navigation request.

- Active Taskspace:
  - The currently active (focused) Taskspace window at the time the user selects the context-menu override.

- Inactive Taskspace:
  - A Taskspace window that exists and is open, but is not the active Taskspace at the time the user selects the context-menu override.

- Target substitution:
  - Opening the navigable target in any window or Taskspace other than the user-selected Taskspace, including opening in:
    - Main
    - a different Taskspace
    - a newly created Taskspace
    - any aux surface

- Execute-exactly-as-requested:
  - The system must treat the user-selected target Taskspace as binding for that action and must not apply heuristics that alter, replace, or “optimise” the chosen target.

## 4. requirements

R1. Context-menu entries for Taskspace targeting

- When a context menu is opened on a UI element that yields a navigable target, the context menu MUST provide Taskspace-targeting override actions that allow the user to choose:
  - the active Taskspace, and
  - any inactive Taskspace currently open.

R2. Target list construction

- The list of Taskspaces shown for selection MUST be derived from the set of currently open Taskspace windows (windowType=taskspace).
- Each selectable Taskspace entry MUST map to a specific Taskspace instance (a stable internal handle for the duration of the menu’s lifetime is sufficient).
- The UI label for each Taskspace entry MAY be user-friendly (for example, derived from Taskspace title), but the selection MUST bind to the underlying Taskspace instance, not to the label.

R3. Execute-exactly binding flag

- When the user selects a Taskspace-targeting override, the resulting open/navigation request MUST be marked as an explicit override with execute-exactly-as-requested semantics.
- While this override is in effect for that request:
  - The routing layer MUST NOT apply any inference-based rerouting.
  - The routing layer MUST NOT substitute a different target Taskspace.
  - The routing layer MUST NOT escalate to creating a new Taskspace as a fallback.
  - The routing layer MUST NOT route into Main as a fallback.

R4. Deterministic resolution

- The open/navigation request MUST target exactly the Taskspace instance selected by the user at the time of selection.
- The selected Taskspace MUST remain the target even if it is inactive (not focused).

R5. Failure handling without substitution

- If the selected target Taskspace becomes unavailable between:
  - context menu open, and
  - user selection execution
  (for example, the Taskspace window is closed),
  then the system MUST:
  - refuse to perform the open/navigation action, and
  - surface a user-visible error indicating the selected Taskspace is no longer available.
- In this failure case, the system MUST NOT fall back to any alternative target (no substitution).

R6. WindowType boundary enforcement

- The target of a Taskspace override MUST be a Taskspace window (windowType=taskspace).
- If the internal handle resolved from the selection is not a Taskspace window at execution time, the system MUST treat this as an invalid target and apply R5 (refuse, error, no substitution).

R7. User gesture integrity

- The action MUST be treated as user-initiated as defined by docs/importal_foundation_document_v5.md section 5.1, because it originates from an explicit context menu selection.
- The system MUST NOT execute the override automatically without a user selection.

## 5. validation_rules

V1. Eligibility gating

- If the context menu does not have a navigable target, Taskspace-targeting override entries MUST NOT be shown.

V2. Zero Taskspace case

- If there are zero open Taskspace windows at the time the context menu is shown:
  - Taskspace-targeting override entries MUST NOT be shown, or MUST be present but disabled.
  - Any disabled entry MUST clearly indicate unavailability (for example, disabled state).

V3. Self-target sanity

- If the only open Taskspace is the active Taskspace:
  - The active Taskspace option MAY be shown.
  - No inactive Taskspace entries will exist.
  - Behaviour MUST remain correct and deterministic (no special-casing that introduces substitution).

V4. Menu snapshot consistency

- If the Taskspace list changes while the menu is open (for example, a Taskspace closes):
  - The system MUST still apply R5 (refuse, error, no substitution) if the selected target is no longer available.

## 6. acceptance_criteria

AC1. Active Taskspace targeting from Main

- Given:
  - Main is open.
  - At least one Taskspace window exists and is active (focused).
  - A context menu is opened on a navigable target.
- When the user selects the “open in active Taskspace” override
- Then the navigable target opens in the active Taskspace, and does not open in Main, and does not open in any other Taskspace.

AC2. Inactive Taskspace targeting from Main

- Given:
  - Main is open.
  - Two Taskspace windows exist: Taskspace A (active) and Taskspace B (inactive).
  - A context menu is opened on a navigable target.
- When the user selects the override targeting Taskspace B
- Then the navigable target opens in Taskspace B, and does not open in Main, and does not open in Taskspace A.

AC3. Cross-Taskspace targeting

- Given:
  - Taskspace A is active.
  - Taskspace B exists and is inactive.
  - A context menu is opened on a navigable target inside Taskspace A.
- When the user selects the override targeting Taskspace B
- Then the navigable target opens in Taskspace B, and does not open in Taskspace A.

AC4. No target substitution on unavailability

- Given:
  - Taskspace A is listed in the context menu as a selectable target Taskspace.
  - The context menu remains open.
- When Taskspace A is closed before the user executes the selection, and the user then selects the override targeting Taskspace A
- Then the open/navigation action is refused, a user-visible error is shown, and the navigable target does not open anywhere else.

AC5. Zero Taskspace case

- Given:
  - Zero Taskspace windows are open.
  - A context menu is opened on a navigable target.
- Then Taskspace-targeting override entries are not shown, or are shown disabled, and selecting them is not possible.

AC6. Non-navigable context

- Given:
  - A context menu is opened on a non-navigable target (no URL or equivalent).
- Then Taskspace-targeting override entries are not shown.

## 7. verification_steps

Prerequisites:

- Ability to open Main and create/open at least two Taskspace windows (windowType=taskspace).
- A test page containing at least one link (or any UI element producing a navigable target).

Steps:

1. Verify AC1
   1. Open Main.
   2. Ensure a Taskspace window exists and is active.
   3. In Main, open a page with a link.
   4. Open the link’s context menu.
   5. Select “open in active Taskspace”.
   6. Confirm the target URL opens in the active Taskspace and does not open in Main.

2. Verify AC2
   1. Open Taskspace A and Taskspace B.
   2. Focus Taskspace A (so Taskspace B is inactive).
   3. Focus Main.
   4. In Main, open a page with a link and open the link’s context menu.
   5. Select the menu entry targeting Taskspace B.
   6. Confirm the target URL opens in Taskspace B and does not open in Taskspace A or Main.

3. Verify AC3
   1. Focus Taskspace A and ensure Taskspace B is open but inactive.
   2. In Taskspace A, open a page with a link and open the link’s context menu.
   3. Select the menu entry targeting Taskspace B.
   4. Confirm the target URL opens in Taskspace B and does not open in Taskspace A.

4. Verify AC4
   1. In any window where a link is available, open the link context menu and observe the selectable Taskspace list includes Taskspace A.
   2. Without closing the context menu, close Taskspace A.
   3. Execute the selection for Taskspace A from the still-open menu.
   4. Confirm:
      - an error is shown indicating the selected Taskspace is unavailable
      - no navigation occurs in Main or any other Taskspace

5. Verify AC5
   1. Close all Taskspace windows, leaving only Main.
   2. In Main, open a page with a link and open the link’s context menu.
   3. Confirm Taskspace override entries are absent or disabled.

6. Verify AC6
   1. Open a context menu on a non-link area that yields no navigable target.
   2. Confirm Taskspace override entries are absent.

## 8. rollout_plan

- Land the feature behind a default-off gate suitable for v0.1 development.
- Enable the gate in development builds only after all acceptance criteria pass via the verification steps above.
- If instrumentation is used to support verification, ensure it does not alter routing behaviour and can be disabled independently.

## 9. rollback_plan

- Disable the rollout gate to fully remove the behaviour without requiring structural changes.
- If removal is required, revert the implementing commit(s) that add:
  - context menu entries, and
  - the explicit override flag/path that enforces execute-exactly semantics.
- Re-run verification steps AC5 and AC6 after rollback to confirm the UI no longer exposes the override entries.

## 10. change_log_entry_required

A change log entry MUST be appended to:

- Governing_Docs/change_log.md

The entry MUST include:

- Date (YYYY-MM-DD)
- Artefact: docs/features/impl/FB-363_context_menu_taskspace_overrides.md
- Summary of change (one to three lines)
- Verification evidence reference:
  - either a short note that verification steps 1–6 were executed, or
  - a pointer to the captured verification artefact (logs, screenshots, or test run reference)
