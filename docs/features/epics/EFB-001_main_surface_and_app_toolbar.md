# FB-001 — Main Surface and Application Toolbar

Status: Draft (v0.1)

Scope: Define the Main surface (tabless), the Application Toolbar UI presence/behaviour in Main and Taskspaces, and selection semantics.

Non-goals: No behavioural inference; no DOM-level semantic detection; no “smart” cross-taskspace heuristics.

## 1. Definitions

Main
- Tabless surface.
- Shows one pinned app/site view at a time, selected via the Application Toolbar.
- Hosts the Omnibar.
- Can show History (when Omnibar mode is Importal).

Application Toolbar
- Dock-like toolbar of pinned apps/sites (webapps and websites).
- Accessible in Main and Taskspaces.
- The toolbar can be pinned to left, right, top, or bottom of the screen.
- Selecting an entry in Main switches the Main view (unless routing policy specifies opening a Taskspace).
- Selecting an entry in a Taskspace opens the target in a new tab in the current Taskspace.

## 2. Required UI behaviour

2.1 Toolbar availability
- Toolbar MUST be available in both Main and Taskspaces.

2.2 Toolbar docking
- Toolbar MUST support docking on left, right, top, or bottom edge.
- The docking position is a UI preference; it does not change routing semantics.

2.3 Selection semantics in Main (tabless)
- Selecting a toolbar entry shows that app/site in Main, unless the app’s identity/routing metadata specifies “open in new Taskspace from Main”.

2.4 Selection semantics in Taskspaces
- Selecting any toolbar entry opens its launch URL in a new tab within the current/active Taskspace.

2.5 No tabs in Main
- Main MUST NOT present browser-like tabs.
- Navigation inside the current pinned app/site is rendered in the Main view only.

## 3. Inputs and outputs

Inputs
- Toolbar pin click (entry_id)
- Current surface (Main vs Taskspace)

Outputs
- Either: Main switches displayed app/site
- Or: A new Taskspace is created and shown (per routing policy and app identity defaults)
- Or: A new tab is opened in the current Taskspace (when invoked from a Taskspace)
