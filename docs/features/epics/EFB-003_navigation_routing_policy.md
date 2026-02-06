# FB-003 — Navigation Routing Policy

Status: Draft (v0.1)

Scope: Define allowed routing inputs, precedence rules, omnibar behaviour (Main vs Taskspace), link-click rules, external opens, and routing tables.

Non-goals: No behavioural inference; no DOM-level semantic detection; no “smart” cross-taskspace heuristics.

# Authority dependencies

ADR dependencies (authoritative architecture):
 * docs/adrs/ADR-0001_Routing_Defaults_and_Constraints.md (Decision: Default routing precedence + allowed routing inputs; Applies to: routing policy tables and ambiguity handling)

Rule: ADRs are normative for architecture and constraints. Implementable requirements live only in docs/features/impl/*. EFBs are orientation only and must not be implemented directly.

## 1. Allowed routing inputs (router may read only these)

Source
- source_surface: main | taskspace
- source_taskspace_id: present only if source_surface == taskspace
- source_app_id: app_id currently shown in Main (for within-app evaluation)

Trigger
- app_toolbar_select(entry_id)
- omnibar_submit(mode, value) where mode is google | importal | url
- click_link(target_url)
- external_open(target_url)
- context_menu_open_in_new_taskspace(target_url)
- context_menu_open_in_active_taskspace(target_url, target_taskspace_id)
- context_menu_open_in_inactive_taskspace(target_url, target_taskspace_id)

Target
- target_url (full URL)
- target_origin (mechanical parse from target_url)

Policy tables
- toolbar_entry_table
- app_identity_table
- task_worthy_target_allowlist

Prohibited inputs
- Any “smart” matching, intent inference, or history-based heuristics (unless explicitly specified in these tables).

## 2. Precedence order (first match wins)

2.1 Explicit user overrides
- If a context-menu “open in … taskspace” command is invoked, execute exactly as requested.

2.2 Source is Taskspace
- Toolbar selection: open the selected app/site in a new tab in the current Taskspace.
- Omnibar:
  - google: open results in current Taskspace (default: new tab)
  - importal: open History in Main
  - url: open in current Taskspace (default: new tab)
- Clicked links: default in-tab navigation (no auto taskspace switching).

2.3 Source is Main (tabless)
- Omnibar:
  - google: open new Taskspace with results
  - importal: open History in Main
  - url:
    - if URL matches any pinned app identity (origin match) then show that app in Main
    - else open new Taskspace with URL in a new tab
- Toolbar selection:
  - resolve entry_id → app_id and launch_url; apply app_identity_table[app_id].default_destination_from_main:
    - main: show in Main
    - new_taskspace: open new Taskspace with launch_url
- Clicked links inside Main pinned app/site:
  - if target matches task_worthy_target_allowlist: open new Taskspace
  - else if within_app(app_id, target_url): remain in Main
  - else: open new Taskspace

2.4 External opens (OS-level)
- Treat as if initiated from Main:
  - task-worthy target → new Taskspace
  - else if matches pinned app identity origin → show in Main
  - else → new Taskspace

## 3. Within-app definition (locked)

within_app(app_id, target_url) is true iff:
- target_origin is an exact match for an origin in app_identity_table[app_id].within_app_origin_allowlist

No wildcard origins in v0.1.

## 4. Default tab disposition (Taskspaces)

Unless user explicitly chooses “open in current tab”:
- Toolbar selection opens in a new tab.
- Omnibar (google/url) opens in a new tab.

## 5. Routing tables (authoritative appendices)

The tables below are authoritative for v0.1 routing behaviour.


## Routing Tables Appendix (refined v0.1): split into toolbar_entry_table + app_identity_table

This refinement separates:

* UI pins (what the user sees and can reorder/pin)
  from
* App identity + routing semantics (what the router uses)

That makes it easier to add pins without accidentally changing routing logic, and easier for an agent to implement deterministically.

---

# Appendix A: Table schemas (authoritative for v0.1)

## A1) toolbar_entry_table schema (UI pins)

Each pinned toolbar entry MUST define:

1. entry_id

* Stable identifier for the pin instance (string), e.g., tb_gmail, tb_slack.
* Note: entry_id is a UI pin identifier, not the same as app_id.

2. label

* UI label shown in the toolbar.

3. app_id

* References an entry in app_identity_table.

4. launch_url_override (optional)

* If present, overrides app_identity_table[app_id].default_launch_url when launching from the toolbar.
* Use only when you want multiple pins for the same app_id with different landing URLs.

5. ui_pin_location (optional)

* Enum: left | right | top | bottom
* Optional because you also have global toolbar docking state; include only if per-entry needed.

No routing semantics live here.

### A1.1 Behaviour (normative)

* Selecting a toolbar entry resolves:

  * app_id from the entry
  * launch_url = launch_url_override if present else app_identity.default_launch_url
* Then routing rules apply based on surface (Main vs Taskspace) and app_identity defaults.

---

## A2) app_identity_table schema (identity + routing semantics)

Each app definition MUST define:

1. app_id

* Stable identifier string (slug), e.g., gmail, slack.

2. default_launch_url

* Default URL opened when launched from toolbar (unless overridden by the toolbar entry).

3. canonical_origins

* List of exact origins treated as core identity for this app.
* Origin format: scheme://host[:port]

4. within_app_origin_allowlist

* List of exact origins treated as “within-app navigation” in Main for this app.
* within_app(app_id, target_url) is true iff target_origin exact-matches an allowlist origin.
* No wildcard origins in v0.1.

5. default_destination_from_main

* Enum: main | new_taskspace
* Meaning: if the user selects this app from the toolbar while in Main, where does it open?

6. default_destination_from_taskspace

* Fixed for v0.1: current_taskspace_new_tab
* Meaning: if selected from toolbar inside a Taskspace, open as a new tab in the current taskspace.

7. notes (optional)

* Must not be used for behaviour unless encoded elsewhere.

### A2.1 Behaviour (normative)

* Main selection:

  * if default_destination_from_main == main: show in Main
  * if == new_taskspace: create Taskspace, open launch_url in a new tab, focus Taskspace
* Taskspace selection:

  * open launch_url in a new tab in current Taskspace, focus that new tab

---

## A3) task_worthy_target_allowlist schema (unchanged)

Rules-based allowlist only (no inference). Each rule defines:

* rule_id
* rule_type: origin_prefix | host_suffix | content_type | url_suffix
* match_value
* destination (v0.1 always new_taskspace)
* notes (optional)

---

# Appendix B: v0.1 routing interpretation hooks (where tables are used)

1. When user selects a toolbar pin:

* Resolve toolbar_entry_table[entry_id] → app_id
* Resolve launch_url:

  * launch_url_override if present else app_identity_table[app_id].default_launch_url
* Then route based on surface:

  * In Main: use app_identity.default_destination_from_main
  * In Taskspace: always open new tab in current Taskspace

2. When user clicks a link inside Main:

* Evaluate task_worthy_target_allowlist first:

  * if match → new Taskspace
* Else evaluate within_app(app_id, target_url):

  * if within-app → remain in Main
  * else → new Taskspace

3. Omnibar rules remain as previously specified (Main vs Taskspace difference).

---

# Appendix C: v0.1 toolbar_entry_table (seed set)

YAML:

```yaml
toolbar_entry_table:
  - entry_id: tb_gmail
    label: Gmail
    app_id: gmail

  - entry_id: tb_calendar
    label: Calendar
    app_id: google_calendar

  - entry_id: tb_zoom
    label: Zoom
    app_id: zoom

  - entry_id: tb_linkedin
    label: LinkedIn
    app_id: linkedin

  - entry_id: tb_slack
    label: Slack
    app_id: slack

  - entry_id: tb_drive
    label: Google Drive
    app_id: google_drive

  - entry_id: tb_chatgpt
    label: ChatGPT
    app_id: chatgpt

  - entry_id: tb_docs
    label: Google Docs
    app_id: google_docs

  - entry_id: tb_sheets
    label: Google Sheets
    app_id: google_sheets

  - entry_id: tb_slides
    label: Google Slides
    app_id: google_slides

  - entry_id: tb_asana
    label: Asana
    app_id: asana

  - entry_id: tb_trello
    label: Trello
    app_id: trello

  - entry_id: tb_jira
    label: Jira
    app_id: jira

  - entry_id: tb_microsoft365
    label: Microsoft 365
    app_id: microsoft_office

  - entry_id: tb_onedrive
    label: OneDrive
    app_id: onedrive
```

Notes:

* You can have multiple pins for the same app_id by adding another toolbar entry with a different entry_id and optionally a launch_url_override.

---

# Appendix D: v0.1 app_identity_table (seed set)

YAML:

```yaml
app_identity_table:
  - app_id: gmail
    default_launch_url: "https://mail.google.com/"
    canonical_origins:
      - "https://mail.google.com"
    within_app_origin_allowlist:
      - "https://mail.google.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: google_calendar
    default_launch_url: "https://calendar.google.com/"
    canonical_origins:
      - "https://calendar.google.com"
    within_app_origin_allowlist:
      - "https://calendar.google.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: zoom
    default_launch_url: "https://zoom.us/"
    canonical_origins:
      - "https://zoom.us"
    within_app_origin_allowlist:
      - "https://zoom.us"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: linkedin
    default_launch_url: "https://www.linkedin.com/"
    canonical_origins:
      - "https://www.linkedin.com"
    within_app_origin_allowlist:
      - "https://www.linkedin.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: slack
    default_launch_url: "https://app.slack.com/"
    canonical_origins:
      - "https://app.slack.com"
    within_app_origin_allowlist:
      - "https://app.slack.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: google_drive
    default_launch_url: "https://drive.google.com/"
    canonical_origins:
      - "https://drive.google.com"
    within_app_origin_allowlist:
      - "https://drive.google.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: chatgpt
    default_launch_url: "https://chat.openai.com/"
    canonical_origins:
      - "https://chat.openai.com"
    within_app_origin_allowlist:
      - "https://chat.openai.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: google_docs
    default_launch_url: "https://docs.google.com/"
    canonical_origins:
      - "https://docs.google.com"
    within_app_origin_allowlist:
      - "https://docs.google.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: google_sheets
    default_launch_url: "https://sheets.google.com/"
    canonical_origins:
      - "https://sheets.google.com"
    within_app_origin_allowlist:
      - "https://sheets.google.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: google_slides
    default_launch_url: "https://slides.google.com/"
    canonical_origins:
      - "https://slides.google.com"
    within_app_origin_allowlist:
      - "https://slides.google.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: asana
    default_launch_url: "https://app.asana.com/"
    canonical_origins:
      - "https://app.asana.com"
    within_app_origin_allowlist:
      - "https://app.asana.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: trello
    default_launch_url: "https://trello.com/"
    canonical_origins:
      - "https://trello.com"
    within_app_origin_allowlist:
      - "https://trello.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: jira
    default_launch_url: "https://id.atlassian.com/"
    canonical_origins:
      - "https://id.atlassian.com"
    within_app_origin_allowlist:
      - "https://id.atlassian.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab
    notes: "Tenant jira origins are not wildcarded in v0.1. Add explicit origins if needed."

  - app_id: microsoft_office
    default_launch_url: "https://www.office.com/"
    canonical_origins:
      - "https://www.office.com"
      - "https://office.com"
    within_app_origin_allowlist:
      - "https://www.office.com"
      - "https://office.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab

  - app_id: onedrive
    default_launch_url: "https://onedrive.live.com/"
    canonical_origins:
      - "https://onedrive.live.com"
    within_app_origin_allowlist:
      - "https://onedrive.live.com"
    default_destination_from_main: main
    default_destination_from_taskspace: current_taskspace_new_tab
```

---

# Appendix E: v0.1 task_worthy_target_allowlist (same as before, restated)

YAML:

```yaml
task_worthy_target_allowlist:
  # Google Workspace web documents
  - rule_id: tw_google_docs
    rule_type: origin_prefix
    match_value: "https://docs.google.com/"
    destination: new_taskspace

  - rule_id: tw_google_sheets
    rule_type: origin_prefix
    match_value: "https://sheets.google.com/"
    destination: new_taskspace

  - rule_id: tw_google_slides
    rule_type: origin_prefix
    match_value: "https://slides.google.com/"
    destination: new_taskspace

  # Microsoft web documents (explicit host families)
  - rule_id: tw_office_com
    rule_type: origin_prefix
    match_value: "https://www.office.com/"
    destination: new_taskspace

  - rule_id: tw_officeapps_live
    rule_type: host_suffix
    match_value: ".officeapps.live.com"
    destination: new_taskspace

  - rule_id: tw_onedrive_live
    rule_type: host_suffix
    match_value: ".onedrive.live.com"
    destination: new_taskspace

  - rule_id: tw_sharepoint
    rule_type: host_suffix
    match_value: ".sharepoint.com"
    destination: new_taskspace

  # PDFs
  - rule_id: tw_pdf_content_type
    rule_type: content_type
    match_value: "application/pdf"
    destination: new_taskspace

  - rule_id: tw_pdf_url_suffix
    rule_type: url_suffix
    match_value: ".pdf"
    destination: new_taskspace
```

---

# Appendix F: Optional strictness modes (agent-implementation guidance)

This is optional but reduces ambiguity during alpha.

1. Strict mode (recommended once stable)

* If a toolbar entry references an app_id not present in app_identity_table: STOP (configuration error).
* If app_identity_table lacks required fields: STOP.

2. Lenient alpha mode

* Allow missing app_identity entries to fall back to:

  * canonical origin = origin(default_launch_url)
  * within_app_origin_allowlist = {canonical origin}
  * default_destination_from_main = main
* Log locally (no telemetry).

---

# Appendix G: Practical v0.1 simplifications you are still keeping

* No wildcard origins in within_app_origin_allowlist.
* Tenant-specific apps (e.g., Jira tenants, SharePoint tenants) are supported via task_worthy host_suffix rules, not within-app matching.
* No DOM-level detection for semantic actions (ChatGPT “new chat”, Gmail “open doc with context tab”, etc.).
