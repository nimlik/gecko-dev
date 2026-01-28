# Importal Global Stop‑Sign Index

This document enumerates all global stop signs that apply across all
tasks and phases for Importal documentation and system development. Each
entry defines a hard halting condition. Whenever any stop sign is
triggered, work **must** stop until the issue is resolved through
clarification, updated documentation or explicit human approval.

1.  **SS‑01 – Missing authority**  
    *Trigger condition:* A required higher‑tier document (specification,
    constraint, guideline or authority reference) is unavailable,
    incomplete or not fully accessible, preventing confirmation that a
    change is authorised.  
    *Affected actor:* Documentation agent, coding agent, human
    contributor  
    *Mandatory next action:* **Halt and ask** for the missing document
    or guidance before proceeding.  
    *Source reference:* Phase 0 Authority contract §2.3 “Missing
    authority”.

2.  **SS‑02 – Conflicting instructions**  
    *Trigger condition:* Two or more sources of equal or higher
    authority provide contradictory guidance (e.g. a core specification
    conflicts with a guardrail or immutable constraint). The agent
    cannot choose between them without violating the authority
    hierarchy.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and ask** for a resolution from a
    human reviewer or higher authority.  
    *Source reference:* Phase 0 Authority contract §2.3 “Conflicting
    instructions”.

3.  **SS‑03 – Ambiguous terminology or undefined scope**  
    *Trigger condition:* The task contains vague terms, undefined
    concepts, references to unscoped features or insufficient detail
    that makes the intent unclear.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and ask** for precise definitions or
    updated documentation.  
    *Source reference:* Phase 0 Authority contract §2.3 “Ambiguous
    terminology or undefined scope”; Best Practices – avoid
    hallucination and guessing.

4.  **SS‑04 – Spec drift detection**  
    *Trigger condition:* Existing documentation appears out of sync with
    the implementation or with other specifications, indicating drift or
    inconsistency.  
    *Affected actor:* Documentation agent  
    *Mandatory next action:* **Halt and flag** the inconsistency for
    resolution before proceeding.  
    *Source reference:* Phase 0 Authority contract §2.3 “Spec drift
    detection”.

5.  **SS‑05 – Unverifiable completion**  
    *Trigger condition:* Acceptance criteria, tests, linters or other
    means of verifying success are missing or undefined, making it
    impossible to confirm that a change meets requirements.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and ask** for defined acceptance
    criteria or verification methods.  
    *Source reference:* Phase 0 Authority contract §2.3 “Unverifiable
    completion”; Best Practices on verification.

6.  **SS‑06 – Exceeding context or token limits**  
    *Trigger condition:* The amount of content to be loaded or processed
    exceeds available context budgets or token limits, risking loss of
    information or hallucination.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and summarise or prioritise**
    content, then ask for guidance on how to proceed within limits.  
    *Source reference:* Phase 0 Authority contract §2.3 “Exceeding
    context or token limits”; Best Practices Principle 13 on
    summarisation.

7.  **SS‑07 – Security, privacy or ethical concerns**  
    *Trigger condition:* A proposed change could introduce a security
    vulnerability, leak private or confidential data, violate privacy
    boundaries or otherwise harm user trust or ethical standards.  
    *Affected actor:* Documentation agent, coding agent, human
    contributor  
    *Mandatory next action:* **Halt and escalates** to a human reviewer
    for security or ethics assessment.  
    *Source reference:* Phase 0 Authority contract §2.3 “Security,
    privacy or ethical concerns”; Phase 1 immutable constraints
    IC‑1–IC‑4 on local‑first storage, truthful history, privacy
    boundaries and single workspace.

8.  **SS‑08 – High‑impact decisions**  
    *Trigger condition:* A change involves product scope or
    architectural shifts, introduces irreversible deletions or
    modifications, removes or merges documents, or otherwise has broad
    impact that cannot be trivially undone.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and escalates** for explicit human
    approval before proceeding.  
    *Source reference:* Phase 0 Authority contract §2.3 “High‑impact
    decisions”; §2.2 “Do not remove or merge documents without
    authority”; Best Practices – human‑in‑loop for irreversible actions.

9.  **SS‑09 – Missing specification or plan**  
    *Trigger condition:* No written specification or plan exists
    describing the problem, affected files, acceptance criteria or
    success metrics for the intended change.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and create** or request a clear
    written spec before taking action.  
    *Source reference:* Phase 0 Authority contract §2.1 “Plan before
    acting”.

10. **SS‑10 – Violation of guardrails or immutable constraints**  
    *Trigger condition:* The proposed change would contravene any
    non‑negotiable guardrail or immutable constraint (e.g. local‑first
    storage, truthful history, privacy boundaries or single‑workspace
    paradigm) extracted in Phase 1.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and ask** for clarification or seek
    approval to modify guardrails.  
    *Source reference:* Phase 0 Authority contract §2.2 “Do not override
    constraints or guardrails”; Phase 1 immutable constraints IC‑1–IC‑4.

11. **SS‑11 – Outside the authorised development phase**  
    *Trigger condition:* The task attempts to implement deferred
    features, operate outside the current phase’s scope, or ignore
    week‑level stop signs defined in the development plan (e.g.
    introducing multi‑workspace support before authorised).  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and ask** whether the work is
    authorised or deferred.  
    *Source reference:* Phase 0 Authority contract §2.2 “Do not operate
    outside the current development phase”; Phase 1 immutable
    constraints (deferred multi‑workspace support).

12. **SS‑12 – Irreversible or non‑reversible change without approval**  
    *Trigger condition:* The action cannot be easily undone or rolled
    back (e.g. permanently deleting data or restructuring multiple
    files) and has not been explicitly approved by a human.  
    *Affected actor:* Coding agent, documentation agent  
    *Mandatory next action:* **Halt and escalates** for human approval
    and create a reversible plan.  
    *Source reference:* Phase 0 Authority contract §2.2 “Do not make
    irreversible changes without human approval”; Best Practices on
    reversibility.

13. **SS‑13 – Unknown or unverified information**  
    *Trigger condition:* Required information is missing, conflicting or
    cannot be verified; proceeding would require guessing, speculation
    or hallucination.  
    *Affected actor:* Documentation agent, coding agent  
    *Mandatory next action:* **Halt and ask** to obtain authoritative
    information or clarification.  
    *Source reference:* Phase 0 Authority contract §2.2 “Do not
    hallucinate or guess”; Best Practices on verification and truthful
    behaviour.

------------------------------------------------------------------------
