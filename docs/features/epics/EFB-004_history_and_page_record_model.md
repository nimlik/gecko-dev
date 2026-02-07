# FB-004 — History and Page Record Model

Status: Draft (v0.1)

Scope: Define page record lifecycle (open/close), persistence fields, History UI behaviour, Taskspace launch/restore semantics, and session restore policy.

Non-goals: No behavioural inference; no DOM-level semantic detection; no “smart” cross-taskspace heuristics.

# Authority dependencies

ADR dependencies (authoritative architecture):
 - docs/adrs/ADR-0002_state_stores_and_persistence_boundaries.md (Decision: Separate session restore state from history records, with explicit persistence boundaries and crash-consistency rules; Applies to: persisted state model, retention boundaries, and crash/restore behaviour for History and Session Restore)

Rule: ADRs are normative for architecture and constraints. Implementable requirements live only in docs/features/impl/*. EFBs are orientation only and must not be implemented directly.

Accepted.

- Taskspaces are Active (window open) or Inactive (window closed).
- Closing a Taskspace window makes it Inactive; its open pages remain open while inactive.
- Every navigation creates a separate page record; record URL, title, favicon, and timestamps.
- History displays open and closed pages per Taskspace.
- On startup, restore Main and all previously active Taskspace windows.

## 1. Page records

A page record is created for every navigation event.

Persisted fields (v0.1)
- url
- title
- favicon (or favicon reference)
- opened_at timestamp
- closed_at timestamp (null while open)

## 2. When pages open and close

A new page record is created when:
- a tab is created with a URL
- an existing tab navigates to a different URL (including link clicks)
- a tab’s URL is replaced
- an omnibar URL submission loads a URL

A page record becomes closed (closed_at set) when:
- the tab is closed
- the tab navigates away to a different URL (previous record closes; new record opens)
- the tab’s URL is replaced

## 3. Open vs closed pages while a Taskspace is inactive

- Taskspace Active/Inactive is independent from Page Open/Closed.
- When a Taskspace window is closed:
  - the Taskspace becomes Inactive
  - its open pages remain open (closed_at stays null)
- When the Taskspace is launched:
  - all open pages are restored as tabs and rendered
  - closed pages are not rendered as tabs

## 4. History surface (Main)

History must display:
- all Taskspaces (active and inactive)
- for each Taskspace:
  - open pages (closed_at null)
  - closed pages (closed_at set)
- per page: url, title, favicon, timestamps

History actions:
- Launch Taskspace (for inactive Taskspaces): opens window and restores open pages only.

## 5. Session restore (persistence across restarts)

Persist:
- all Taskspaces
- active/inactive status at shutdown
- for each Taskspace: open tab set, active tab, tab order
- page records (append-only)

Startup restore policy (v0.1)
- Restore Main.
- Restore all previously active Taskspace windows.
- Inactive Taskspaces remain inactive but retain open pages.

Crash-consistency (baseline)
- Session state writes should be atomic (temp + fsync + rename).
- On corrupt session state:
  - start in safe mode with Main only
  - preserve corrupt state for forensics.
