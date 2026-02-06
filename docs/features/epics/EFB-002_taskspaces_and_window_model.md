# FB-002 — Taskspaces and Window Model

Status: Draft (v0.1)

Scope: Define Taskspace lifecycle, active/inactive semantics, and window cardinality (v0.1).

Non-goals: No behavioural inference; no DOM-level semantic detection; no “smart” cross-taskspace heuristics.

## 1. Definitions

Taskspace
- Separate window containing tabs.

Active Taskspace
- Taskspace that currently has an open window.

Inactive Taskspace
- Taskspace that currently has no open window (closed), but still exists in persisted state.

v0.1 Cardinality
- One Taskspace can have at most one active window at a time (1:1 taskspace ↔ window when active).

## 2. Lifecycle

2.1 Create Taskspace
- Creating a Taskspace creates a new Taskspace window and makes it Active.

2.2 Close Taskspace window
- Closing a Taskspace window makes the Taskspace Inactive.
- Closing a Taskspace window does NOT implicitly close the Taskspace’s open pages; they remain open while inactive.

2.3 Launch Taskspace (from History or other explicit command)
- Launching an Inactive Taskspace opens its window and makes it Active.
- All open pages for that Taskspace are restored as tabs and rendered.

## 3. Focus policy

- “Open in active Taskspace…” (explicit user selection) MUST bring the target Taskspace window to the front.

## 4. Non-goals (v0.1)

- Multiple windows showing the same Taskspace simultaneously.
