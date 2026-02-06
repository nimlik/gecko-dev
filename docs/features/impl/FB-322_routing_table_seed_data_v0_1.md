artefact_type: feature_bundle
implementable: yes
status: draft
version: v0.1
path: docs/features/impl/FB-322_routing_table_seed_data_v0_1.md

parent_epic:
- docs/features/epics/EFB-003_navigation_routing_policy.md

depends_on_adrs:
- docs/adrs/ADR-0001_Routing_Defaults_and_Constraints.md

authority_dependencies:
- Foundation v5:
  - 5. Network Posture and Telemetry Discipline (v0.1)
  - 6.2 Main Window Behaviour
  - 6.3 Taskspace Behaviour
- docs/spec_registry.md
- EFB-003:
  - Appendix C/D/E (seed datasets are moved to FB-322; epic contains stubs only)
- FB-321:
  - routing table schemas and validation constraints (v0.1)


# FB-322 routing table seed data (v0.1)

## 1. authority_dependencies

Schema conformance is governed by FB-321. Architectural constraints are governed by ADR-0001.

## 2. scope

This FB defines v0.1 seed datasets (records and their exact field values) for:

* toolbar_entry_table
* app_identity_table
* task_worthy_target_allowlist

Provenance (non-normative)

EFB-003 no longer embeds seed YAML (Appendices C/D/E are “moved” stubs) to preserve the non-implementable epic boundary. FB-322 is the canonical v0.1 authority for routing table seed datasets. The initial values were transcribed into the canonical baseline at docs/archive/legacy/seed_baselines/epic3_routing_tables_seed_baseline_v0_1.md and must validate against FB-321.

## 3. non_goals

* Not defining routing precedence or routing algorithms (see ADR-0001 and EFB-003 orientation).
* Not changing, extending, or improving the seed datasets.
* Not introducing new seed records, new keys, or inferred values.
* Not editing schemas (FB-321) or architecture (ADR-0001).
* Not defining physical file layout for persisted configuration.

## 4. definitions

* table: a logical routing policy dataset (toolbar_entry_table, app_identity_table, task_worthy_target_allowlist).
* record: one entry in a table.
* app_id: stable identifier for an application identity record (app_identity_table.app_id).
* entry_id: stable identifier for a toolbar pin record (toolbar_entry_table.entry_id).
* rule_id: stable identifier for an allowlist rule record (task_worthy_target_allowlist.rule_id).
* origin: scheme://host[:port] with no path, query, or fragment (per FB-321).
* strict mode: configuration load fails closed; any invalid or inconsistent data triggers STOP (per FB-321).

## 5. dataset_overview

Source of truth: FB-322 (this document).

Record counts (v0.1):

* toolbar_entry_table: 15 records
* app_identity_table: 15 records
* task_worthy_target_allowlist: 9 records

Notes:

* This FB packages the seed datasets as a single container YAML with `schema_version: "0.1"`, per FB-321.

## 6. seed_data

```yaml
schema_version: "0.1"
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

    # Jira is tenant-scoped. v0.1 does not wildcard tenant origins. Add explicit origins if needed.
  - app_id: jira
    default_launch_url: "https://id.atlassian.com/"
    canonical_origins:
      - "https://id.atlassian.com"
    within_app_origin_allowlist:
      - "https://id.atlassian.com"
    default_destination_from_main: new_taskspace
    default_destination_from_taskspace: current_taskspace_new_tab


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

## 7. validation_and_integrity_rules

All rules below are constraints on using this seed data in implementation and test fixtures; the seed records themselves must not be altered to satisfy them.

Schema validity (FB-321)

* All records MUST validate against FB-321 v0.1 schemas and validators for their table.
* Unknown fields MUST trigger STOP in strict mode (FB-321).
* Enum fields MUST use only permitted values (FB-321).

No wildcard origins (FB-321)

* app_identity_table.canonical_origins MUST contain exact origins only and MUST NOT include wildcard/pattern syntax.
* app_identity_table.within_app_origin_allowlist MUST contain exact origins only and MUST NOT include wildcard/pattern syntax.
* Origins MUST NOT include any path, query, or fragment.

Uniqueness (FB-321)

* toolbar_entry_table.entry_id MUST be unique.
* app_identity_table.app_id MUST be unique.
* task_worthy_target_allowlist.rule_id MUST be unique.

Referential integrity (FB-321)

* In strict mode: every toolbar_entry_table.app_id MUST reference an existing app_identity_table.app_id; otherwise STOP.

Strict-mode failure behaviour (FB-321)

* Any schema violation, uniqueness failure, or referential integrity failure MUST trigger STOP at load-time in strict mode with precise error reporting (table name, record identifier, field, rule violated).

Packaging note (non-normative; constraint reminder)

* FB-321 requires schema_version on persisted routing policy datasets. This FB includes `schema_version: "0.1"` and packages all v0.1 seed tables in a single container YAML.

## 8. acceptance_criteria

AC-322-01 Completeness
- All v0.1 seed records in the canonical Epic-3 seed source are present verbatim in this FB.
- Note: EFB-003 does not embed YAML; it delegates seed datasets to FB-322.


AC-322-02 Schema validity
- All records validate against FB-321 v0.1 schema and validation rules.

AC-322-03 No semantic drift
- No keys, values, record identifiers, or record ordering differ from the canonical Epic-3 seed source used to populate this FB.

AC-322-04 Strict-mode loadability
- A strict-mode loader MUST be able to load and validate the seed datasets without modification of record contents.
- Invalid records (if introduced in future edits) MUST trigger STOP with a precise error report.

AC-322-05 Referential integrity (strict)
- In strict mode, toolbar_entry_table.app_id references resolve to an existing app_identity_table.app_id for every toolbar entry.

AC-322-06 Uniqueness
- No duplicate entry_id, app_id, or rule_id exists within the respective datasets.

## 9. verification_steps

Step 1: Source alignment (diff-based)

* Canonical seed baseline: docs/archive/legacy/seed_baselines/epic3_routing_tables_seed_baseline_v0_1.md (reference only; non-authority)
* Compare each table’s YAML against the corresponding YAML in this FB:
  * toolbar_entry_table comparison
  * app_identity_table comparison
  * task_worthy_target_allowlist comparison
* Verification passes only if the comparison shows no differences in keys, values, record ordering, or comments contained within the YAML.

Step 2: Schema validation against FB-321 (describe checks; no code required here)

* Validate each table against FB-321 v0.1:

  * Required fields present and non-empty for each record.
  * Field types and enums valid.
  * Origins meet the origin validator and do not trigger the wildcard/pattern detector.
  * URL fields are absolute URLs.

Step 3: Uniqueness checks

* Confirm that:

  * entry_id values are all unique in toolbar_entry_table.
  * app_id values are all unique in app_identity_table.
  * rule_id values are all unique in task_worthy_target_allowlist.

Step 4: Referential integrity (if validating in strict mode per FB-321)

* For each toolbar_entry_table record, confirm app_id exists in app_identity_table.app_id.

Step 5: Strict-mode failure reporting (spot-check)

* Confirm that the validator’s failure output (when a fault is introduced in a test copy) identifies:

  * table name
  * record identifier (entry_id/app_id/rule_id)
  * field name (or unknown field path)
  * violated rule reference (FB-321 constraint)

Record count guardrails (anti-transcription-loss)

* Confirm toolbar_entry_table record count = 15
* Confirm app_identity_table record count = 15
* Confirm task_worthy_target_allowlist record count = 9

## 10. invariants_touched (IC-x identifiers only; TBD if unverified)

TBD

## 11. stop_sign_triggers (SS-xx identifiers only; TBD if unverified)

stop_sign_triggers

SS-01 Semantic ambiguity

* Applies if any seed entry’s meaning is unclear (e.g., ambiguous default_destination_from_main) such that implementing it would require guessing.

SS-02 Authority conflict

* Applies if any seed entry or dataset structure conflicts with FB-321 schema constraints or ADR-0001 constraints.

SS-04 Missing artefact

* Applies if required authoritative inputs are missing (e.g., seed source text is unavailable, or FB-321 is not available to validate against).

SS-05 Inference required

* Applies if completing the seed datasets would require inferring missing entries, fields, or values not explicitly provided.

SS-07 Verification ambiguity

* Applies if acceptance criteria or verification steps cannot be executed deterministically (e.g., no record counts, no diffable source, or validation rules are underspecified).

SS-09 Drift signal

* Applies if there is evidence of transcription loss or mismatch across documents (e.g., record counts differ between versions, or fields differ unexpectedly).

SS-11 Non-binary acceptance criteria

* Applies if any acceptance criterion is not objectively testable (must be rewritten to be binary).

SS-12 Conflicting acceptance criteria

* Applies if acceptance criteria conflict with each other or with authority requirements (must STOP and resolve).

## 12. rollout_and_rollback

Rollout (v0.1)

* Introduce FB-322 alongside FB-321.
* Validate the seed datasets against FB-321 in strict mode before any routing implementation consumes them.
* Use these seeds as the baseline test fixture set for routing-table loading and validation.

Rollback

* If a change to seed datasets causes validation failure or behavioural regression:

  * revert FB-322 to the previous known-valid version that matches the then-current FB-321.
  * do not hotfix individual records without corresponding change control and verification.

## 13. change_log_entry_required

Required:

* Adding FB-322 or materially modifying its seed datasets MUST include an entry in Governing_Docs/change_log.md consistent with Phase 6 (what changed, where, why, verification impact).
