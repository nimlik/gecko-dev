Reference baseline only; not authoritative; FB-322 is authoritative.

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