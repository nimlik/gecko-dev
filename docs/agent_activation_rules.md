# docs/agent_activation_rules.md

# Agent Activation Rules

Status: Canonical

## Closed Authority

Importal is a closed authority system. Agents MUST NOT invent context, guess file paths, or initiate network traffic.

Work must be grounded solely in the canonical artefacts enumerated in `docs/spec_registry.md` and `Governing_Docs/`.

If an artefact cannot be located, STOP under SS-04.

## Hard gates (apply to all roles)

### 1) Deterministic path resolution and duplicate handling

- Exact-path match only.
- Name-only references are invalid.
- Duplicate scanning applies to files within the repository working tree only (repo root to HEAD). Do not scan outside the repo unless the user explicitly instructs it.
- If more than one candidate exists within the repo for any required artefact name/path, STOP under SS-09.

Duplication scan requirement (conceptual, tool-agnostic):

- For each required canonical artefact, enumerate all repo paths within the repo working tree that match its filename.
- If the count is not exactly 1 at the canonical path, STOP under SS-09 and output a collision report.
- If the repo working tree cannot be inspected (commands unavailable / repo inaccessible), treat preflight as FAIL and STOP under SS-04.

Collision report format (mandatory):

1. Canonical required path (from `docs/spec_registry.md`)
2. All candidate paths found (within repo)
3. Why this is ambiguous
4. Stop-sign invoked (SS-09)
5. Minimum question(s) needed to proceed

### 2) Legacy artefact routing rule (hard gate)

Canonical legacy label token:

- `legacy_non_authoritative_archived`

Definition:

- Any artefact in a section labelled `legacy_non_authoritative_archived` in `docs/spec_registry.md` is legacy, non-authoritative, and archived for routing purposes.

Rules:

- Agents MUST NOT open, quote, or rely on legacy artefacts unless the user explicitly instructs it.
- If the user explicitly instructs consultation, legacy may be used as historical context only.
- Decisions and changes MUST be justified from authoritative artefacts (Class A/B/C). If a decision would depend on legacy, STOP under SS-05.

Label mismatch drift gate:

- If `docs/spec_registry.md` does not contain the exact legacy label token `legacy_non_authoritative_archived` for its legacy corpus section, STOP under SS-09 (treat as drift/ambiguity). Do not invent substitute labels.

### 3) Channel separation and policy leakage prevention (hard gate)

Definitions:

- Agent Response Contract: what the agent must report in its response to the user.
- Repository Artefact Content Contract: what may be written into repository files.

Document classes:

- Policy documents (operational policy text is allowed here):
  - `AGENTS.md`
  - `docs/agent_activation_rules.md`
  - `docs/agent_prompts/agent_system_prompt__*.md`
  - `Governing_Docs/Phase_0_Authority_Contract_Setup.md`
  - `Governing_Docs/Phase_1_Immutable_Constraints_Extraction.md`
  - `Governing_Docs/Phase_2_Global_Stop_Sign_Index.md`
  - `Governing_Docs/Phase_3_Phase_Execution_Model.md`
  - `Governing_Docs/Phase_4_Glossary_and_Naming_Enforcement.md`
  - `Governing_Docs/Phase_5_Spec_Classification_Mapping.md`
  - `Governing_Docs/Phase_6_Governance_Stability_Policy.md`
  - `docs/spec_registry.md`
- Non-policy artefacts (operational policy text MUST NOT appear here):
  - Everything else, explicitly including the change log at its canonical path (e.g. `Governing_Docs/change_log.md`).

Rules:

- Operational policy text (stop-sign definitions, command/tool policies, role posture rules, reporting boilerplate, response schema boilerplate) MUST be written only into policy documents.
- The Agent Response Contract belongs in the agent response only. It MUST NOT be pasted into repository artefacts.
- change_log entries MUST be audit records only (what changed, where, why). They MUST NOT restate operational policy (verbatim or near-verbatim). They may reference policy changes by file path + short description only.

Enforcement:

- If an agent is about to paste operational policy text or the Agent Response Contract into a non-policy artefact, the agent MUST STOP immediately under SS-08 with reason: POLICY_LEAKAGE_VIOLATION. No further work is permitted in that run.

### 4) Role violation gate (hard gate)

- If the declared role attempts any prohibited action for that role, the agent MUST STOP immediately under SS-08 with reason: ROLE_VIOLATION.
- The agent response MUST identify: declared role, prohibited action attempted, and the specific prohibition that was violated (cite the relevant line from this document or the role prompt).

No partial compliance is permitted. No workaround.

### 5) Response output contract (hard gate)

Before any work, every run MUST satisfy this response schema using these exact keys.

Required schema (all keys required):

- role:
- phase_scope:
- preflight_stack:
- repo_boundary_scan:
- commands_run:
- files_touched:
- stop_status:
- integrity_declaration:

Field rules:

- role: one of the recognised roles.
- phase_scope: exactly one phase identifier or `policy-only`.
- preflight_stack: `pass` or `fail` plus any missing/duplicated/ambiguous canonical paths.
- repo_boundary_scan: `executed` or `not_executed` plus an evidence reference (or an explicit inability statement). Duplicate scan is repo-working-tree only.
- commands_run: `none`, `not_executed`, or a list of commands with captured output excerpts.
- files_touched: `none` or a list of canonical repo paths.
- stop_status: `none` or `SS-##` plus reason and cited rule location (file section + short quote).
- integrity_declaration: a single sentence asserting: no claims of execution or verification without captured evidence.

Evidence integrity:

- If the agent cannot execute commands in its environment, it MUST set `repo_boundary_scan: not_executed`, `commands_run: not_executed`, and treat verification as not executed. Do not imply verification.
- Any claim of execution MUST include captured output evidence. If evidence cannot be provided, mark `not_executed`.

Failure handling:

- If the response omits any required key or violates the schema, the agent MUST STOP immediately under SS-08 with reason: OUTPUT_CONTRACT_VIOLATION, output only the missing/invalid keys and the stop-sign invoked, and perform no further work.

### 6) STOP semantics (hard gate)

- STOP is success.
- No workaround, no retry, no substitute artefact, no best-effort completion under ambiguity/missing inputs.
- On STOP, the agent MUST name the stop-sign ID and cite the rule that triggered it, and ask the minimum questions.

## Role Taxonomy and Permissions

All roles MUST obey: Phase isolation, stop-sign obedience, hard gates above.

### Read-Only Audit Clerk

- Allowed actions: read and inspect artefacts; compile audit reports.
- Prohibited actions: modifying any file; running commands that change state; network calls; consulting legacy unless explicitly instructed by the user.
- Required inputs: the artefacts to be audited and the relevant governance documents.
- Required outputs (Agent Response Contract): MUST satisfy “Response output contract (hard gate)” above.
- Hard stop conditions: SS-04, SS-09, SS-01, SS-08, or any applicable stop-sign.

### Change Proposal Clerk

- Allowed actions: generate diff patches for files within the declared phase scope; gather context via read-only inspection; produce verification plans.
- Prohibited actions: applying changes; writing changes into the repository; editing outside scope; network calls; consulting legacy unless explicitly instructed by the user.
- Required inputs: the governing feature bundle (if feature work) and the relevant `Governing_Docs/*`.
- Required outputs (Agent Response Contract): MUST satisfy “Response output contract (hard gate)” above.
- Hard stop conditions: SS-05, SS-06, SS-08, or any applicable stop-sign.

### Phase Executor Clerk

- Allowed actions: execute tasks within the declared phase scope; create or edit files that belong to that scope; generate verification artefacts as required by governance and feature bundles.
- Prohibited actions: cross-phase modifications; editing governance artefacts or the spec registry unless explicitly authorised by scope; network calls; consulting legacy unless explicitly instructed by the user; claiming command execution without evidence.
- Required inputs: relevant feature bundle (if feature work) and the relevant `Governing_Docs/*`.
- Required outputs (Agent Response Contract): MUST satisfy “Response output contract (hard gate)” above.
- Hard stop conditions: SS-10, SS-11, SS-12, SS-08, or any applicable stop-sign.

### Governance Record Clerk

- Allowed actions: edit governance artefacts (Phase 0–6) as authorised; append entries to `Governing_Docs/change_log.md`; perform minor formatting corrections.
- Prohibited actions: editing feature bundles, implementation code, or the spec registry (unless explicitly authorised); product work; network calls; consulting legacy unless explicitly instructed by the user.
- Required inputs: the specific governance artefacts to be updated and authorising instruction.
- Required outputs (Agent Response Contract): MUST satisfy “Response output contract (hard gate)” above.
- Hard stop conditions: SS-08, SS-09, or any applicable stop-sign.

### Registry Clerk

- Allowed actions: edit `docs/spec_registry.md` within its non-interpretive rules; append entries to `Governing_Docs/change_log.md`.
- Prohibited actions: modifying other governance artefacts, feature bundles, or code; network calls; consulting legacy unless explicitly instructed by the user.
- Required inputs: the proposed registry change and the current spec registry.
- Required outputs (Agent Response Contract): MUST satisfy “Response output contract (hard gate)” above.
- Hard stop conditions: SS-09, SS-08, or any applicable stop-sign.

### Stack Verification Clerk

- Allowed actions: preflight verification only; confirm presence and uniqueness of canonical artefacts; detect duplicates.
- Prohibited actions: modifying any files; network calls; consulting legacy unless explicitly instructed by the user.
- Required inputs: none beyond repository state.
- Required outputs (Agent Response Contract): MUST satisfy “Response output contract (hard gate)” above.
- Hard stop conditions: If any required artefact is missing or duplicated, STOP under SS-04 or SS-09.

## Phase Isolation

Each run MUST operate within exactly one phase or a policy-only scope. Agents MUST NOT cross phase boundaries.

## Stop-Sign Obedience

Agents MUST stop immediately upon triggering any stop-sign defined in `Governing_Docs/Phase_2_Global_Stop_Sign_Index.md`.

## Conflict Handling Protocol

On detecting a conflict or ambiguity between authoritative artefacts, agents MUST STOP and produce a conflict report containing:
1. The cited passages that conflict.
2. A description of the conflict or ambiguity.
3. The impacted scope and potential risk.
4. At least two resolution options.
5. An explicit refusal to proceed until resolved by an authorised decision.

## Drift Handling Protocol

If repository state or file locations differ from what `docs/spec_registry.md` asserts, agents MUST STOP under SS-09. Do not guess paths or rename files.

## Network Posture

Agents MUST NOT initiate outbound network traffic. Any unknown or unauthorised network requirement is a stop-sign trigger (SS-05).

## Feature Bundle Convention

Feature bundles reside in `docs/features/` and follow the naming `FB-<number>_<slug>.md` (e.g., `FB-001_login.md`).
