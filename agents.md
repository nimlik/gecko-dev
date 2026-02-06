# agents.md

Closed authority system. Agents MUST load `docs/agent_activation_rules.md` before any work.

## Canonical artefacts (exact paths)

Canonical means: the exact path. Name-only references are invalid.

Duplicate scanning applies to files within the repository working tree only (repo root to HEAD). Do not scan outside the repo unless the user explicitly instructs it.

If more than one candidate exists within the repo for any canonical artefact (duplicate/near-duplicate), STOP under SS-09.

- `agents.md`
- `docs/agent_activation_rules.md`
- `docs/agent_prompts/agent_system_prompt__bootstrap.md`
- `docs/agent_prompts/agent_system_prompt__read_only_audit_clerk.md`
- `docs/agent_prompts/agent_system_prompt__change_proposal_clerk.md`
- `docs/agent_prompts/agent_system_prompt__phase_executor_clerk.md`
- `docs/agent_prompts/agent_system_prompt__governance_record_clerk.md`
- `docs/agent_prompts/agent_system_prompt__registry_clerk.md`
- `docs/spec_registry.md`
- `Governing_Docs/Phase_0_Authority_Contract_Setup.md`
- `Governing_Docs/Phase_1_Immutable_Constraints_Extraction.md`
- `Governing_Docs/Phase_2_Global_Stop_Sign_Index.md`
- `Governing_Docs/Phase_3_Phase_Execution_Model.md`
- `Governing_Docs/Phase_4_Glossary_and_Naming_Enforcement.md`
- `Governing_Docs/Phase_5_Spec_Classification_Mapping.md`
- `Governing_Docs/Phase_6_Governance_Stability_Policy.md`
- `Governing_Docs/change_log.md`
- `docs/importal_foundation_document_v5.md` canonical path MUST be registered in docs/spec_registry.md. If the registry indicates absence or ambiguity, STOP under SS-04/SS-09.
## Authority routing (binding)

Governing_Docs/Phase_0–Governing_Docs/Phase_6 artefacts and docs/importal_foundation_document_v5.md are the highest-order authorities and outrank all other artefacts.- Stage 4 documents (this file, activation rules, and system prompts) govern agent operation only. They MUST NOT be treated as product behaviour specs.
- Any corpus labelled `legacy_non_authoritative_archived` in `docs/spec_registry.md` is non-authoritative. Agents MUST NOT open, quote, or rely on it unless the user explicitly instructs. If instructed, treat as historical context only; decisions MUST be justified from Class A/B/C artefacts, otherwise STOP under SS-05.
- If `docs/spec_registry.md` does not contain the exact legacy label token `legacy_non_authoritative_archived`, STOP under SS-09 (treat as drift/ambiguity).

## Output channels (hard gate)

- Agent Response Contract: what the agent reports (scope, evidence, stop-signs, verification, remaining risks).
- Repository Artefact Content: what may be written into repo files.

Operational policy text (role posture rules, stop-sign boilerplate, tool/command constraints, response schema boilerplate) MUST stay in policy documents only. It MUST NOT be pasted into non-policy artefacts.

Change log entries MUST be factual audit records of what changed (paths + intent). They MUST NOT be policy copies.

Agents MUST satisfy the “Response output contract (hard gate)” in `docs/agent_activation_rules.md` before any work. The response schema belongs in the agent response only.

## Roles

- Read-Only Audit Clerk: inspects artefacts and reports; never changes state.
- Change Proposal Clerk: produces diffs only; never applies changes.
- Phase Executor Clerk: executes allowed actions for one phase; produces verification artefacts.
- Governance Record Clerk: edits governance artefacts and appends to `Governing_Docs/change_log.md`; no product work.
- Registry Clerk: edits `docs/spec_registry.md` and appends to `Governing_Docs/change_log.md`; no other changes.
- Stack Verification Clerk: preflight only; no other actions.

## Activation handshake (hard gate)

1. Preflight stack check: verify every canonical artefact listed above exists and is unique (duplication scan). If any is missing or ambiguous, STOP under SS-04 or SS-09.
2. Declare role: state which role you are assuming. If unrecognised, STOP.
3. Declare phase scope: specify exactly one phase or “policy-only”.
4. Check stop-signs: review `Governing_Docs/Phase_2_Global_Stop_Sign_Index.md` for triggers.
5. Act or STOP: perform only the allowed actions for your role and declared scope.

STOP is success. No workaround, no retry, no substitute. If any stop-sign triggers at any point, STOP and output only: minimum questions + stop-sign ID invoked.

Agents MUST refuse to act if the authority stack is missing, duplicated, or ambiguous.
