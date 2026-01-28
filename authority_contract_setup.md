# Phase 0 – Importal Documentation Authority & Operating Contract

This document establishes the governing rules that apply to all future
changes to the Importal documentation. It defines who holds authority,
what agents are allowed to do, when they must stop and ask, how
completion is verified, and how changes are tracked. These rules are
binding on both AI agents and human contributors.

## 1 Authority hierarchy

The Importal documentation operates under a strict chain of authority.
Higher‑tier documents define vision, scope and non‑negotiable
constraints; lower‑tier documents may add detail **but must never
redefine or extend** the intent of their superiors. The
**Agent Coding Best Practices – AI‑Optimised** document is an external
compliance standard governing how agents behave; it does not override
Importal’s content but guides the process by which changes are made.

1.  **External compliance standard** – The
    *Agent Coding Best Practices – AI‑Optimised* document defines
    universal principles for AI‑assisted development. It governs
    process: planning before coding, working in small reversible steps,
    verifying outputs, updating documentation, avoiding hallucinations
    and asking for clarification. These principles MUST be followed by
    any agent working on Importal documentation. They do **not**
    supersede Importal’s product intent but dictate how to operate
    safely and transparently.
2.  **Foundation Document** – Defines Importal’s product vision,
    philosophy, scope boundaries and non‑goals. No lower document may
    reinterpret or extend these concepts. Even when not consulted
    directly, it is assumed to be the highest authority on product
    intent.
3.  **Authority & Scope specifications** – Documents like
    `00_authority_hierarchy.md`, `01_scope_and_non_goals.md`,
    `02_foundational_constraints.md` and `guardrails_and_stop_signs.md`
    allocate decision rights, codify non‑negotiable constraints and
    index deferrals (stop signs). They translate the Foundation Document
    into actionable rules. They MUST defer upward on any matter of
    product vision or philosophy but are binding on all lower documents.
4.  **Core concept & product specifications** – These files describe
    sanctioned features, user flows and behaviours (e.g.
    `conceptual_data_model.md`, `taskspace_lifecycle.md`). They may
    elaborate on concepts within the boundaries set above, but MUST NOT
    introduce new primitives, user personas or extend scope. Any
    ambiguity here MUST be resolved by consulting higher‑tier docs or by
    halting for clarification.
5.  **Implementation‑adjacent specifications** – Lowest tier documents
    (API shapes, window type specs, hook points, dashboard descriptions,
    etc.) that provide implementation guidance. They MUST NEVER redefine
    product intent or add new functionality. They exist solely to aid
    consistent implementation of approved concepts.

**Conflict resolution:** When two instructions conflict, the higher‑tier
document prevails. If the external compliance standard conflicts with
Importal’s product constraints, the Importal constraint wins for
content, but the agent MUST still follow the safest process defined by
the best practices. Any irreconcilable conflict MUST trigger a stop (see
Section 3) and escalation to human reviewers.

## 2 Agent operating mandate

This contract empowers agents to maintain and evolve Importal
documentation within strictly defined limits. Agents MUST act
conservatively, ask when unclear, and prioritise safety over progress.

### 2.1 What agents MAY do

- **Plan before acting.** Before editing or creating a document, agents
  MUST generate or reference a clear written specification of the
  change. This includes problem description, affected files, acceptance
  criteria, and success metrics. Without a spec, the agent MUST stop.
- **Work in small, reversible steps.** Agents MUST break tasks into
  discrete changes that can be individually reviewed and rolled back.
  Each change should touch only related areas and be commit‑ready on its
  own. Large refactors MUST be decomposed into smaller commits.
- **Follow conventions and constraints.** Agents MUST adhere to the
  coding and documentation conventions present in the Importal specs.
  When adding details, agents may reorganise prose or improve clarity
  provided the underlying intent is unchanged and the authority
  hierarchy is respected.
- **Update documentation alongside changes.** Whenever code or design
  changes are made (in future phases), corresponding documentation MUST
  be updated in the same commit. Documentation changes are a first‑class
  deliverable, not an optional task.
- **Record all changes.** Agents MUST append an entry to the change log
  (see Section 5) describing what was changed, why, and which documents
  were affected.
- **Use tests and verification tools.** When applicable, agents MAY run
  linters, type‑checkers or test suites to verify that their changes
  meet acceptance criteria. Successful checks MUST be documented in the
  completion evidence.

### 2.2 What agents MUST NOT do

- **Do not alter scope or product intent.** Agents MUST NOT invent new
  features, change user personas, redefine primitives or extend the
  scope beyond what higher‑tier documents allow. All proposed scope
  changes MUST be escalated for human decision and captured in a future
  Foundation update.
- **Do not override constraints or guardrails.** Agents MUST NOT violate
  any constraint specified in the Foundation Document, Authority & Scope
  specs, or guardrails (e.g. local‑first storage, truthful history,
  privacy boundaries, single workspace). If a change would violate a
  guardrail, the agent MUST stop and report.
- **Do not remove or merge documents without authority.** Consolidation
  or deletion of specs is a structural change and requires explicit
  approval at the appropriate authority level. Agents may reorganise
  content within a document for clarity but MUST preserve original
  sections and cross‑references.
- **Do not operate outside the current development phase.** If the
  development plan defines week‑level stop signs, agents MUST respect
  them. Deferred features (provider integrations, multi‑workspace
  support, etc.) remain off‑limits until authorised.
- **Do not hallucinate or guess.** If information is missing, ambiguous
  or conflicting, agents MUST ask for clarification or retrieve
  authoritative sources. Inventing details or making assumptions is
  forbidden.
- **Do not make irreversible changes without human approval.** Actions
  that cannot be trivially undone (e.g. deleting data, restructuring
  multiple files) MUST be paused and escalated to a human reviewer.

### 2.3 When agents MUST stop and ask

Agents MUST immediately halt and seek clarification or human input under
any of the following conditions (global stop signs):

1.  **Missing authority.** A required higher‑tier document (spec,
    constraint or guideline) is unavailable or incomplete, making it
    impossible to confirm that a change is authorised.
2.  **Conflicting instructions.** Two sources of equal or higher
    authority give contradictory guidance (e.g. a core spec contradicts
    a guardrail). The agent MUST not arbitrarily choose; instead, stop
    and request a resolution.
3.  **Ambiguous terminology or undefined scope.** The task contains
    vague terms, undefined concepts, or references to unscoped features.
    The agent MUST ask for definitions or updated documentation.
4.  **Spec drift detection.** If documentation appears out of sync with
    implementation or with other specs, the agent MUST stop and flag the
    inconsistency. Drift MUST be resolved before proceeding.
5.  **Unverifiable completion.** If acceptance criteria, tests or other
    means of verifying success are missing, the agent MUST not declare
    the task complete. It should request that criteria be defined and
    tests be created.
6.  **Exceeding context or token limits.** When too much content is
    being loaded or context budgets are exhausted, the agent MUST stop
    and summarise or prioritise as needed, following Principle 13 of the
    best practices.
7.  **Security, privacy or ethical concerns.** Any change that could
    introduce a security vulnerability, leak private data, or impact
    user trust MUST be halted pending human review.
8.  **High‑impact decisions.** Decisions involving product scope,
    architecture shifts, or irreversible deletions require a human in
    the loop. Agents MUST stop and obtain explicit approval.

If any stop sign is triggered, the agent MUST not proceed until the
issue is resolved by updated documentation or direct human instruction.

## 3 Verification rules

For a documentation change to be considered **complete**, the following
conditions MUST be satisfied:

1.  **Specification available and followed.** A written spec or plan
    exists describing the task, and the final deliverable matches that
    spec without introducing new scope.
2.  **Authority compliance.** The change respects the hierarchy defined
    in Section 1, does not conflict with higher‑tier documents, and does
    not violate any guardrails or constraints.
3.  **Documentation updated.** All affected documents are updated
    consistently. Cross‑references, indices and diagrams MUST reflect
    the new state. There MUST be no orphaned sections or broken links.
4.  **Change log entry created.** An entry is appended to the change log
    (see Section 5) summarising what changed, why it changed, and
    listing affected documents.
5.  **Evidence provided.** The agent MUST provide evidence of
    completion: this may include passing test results, linter outputs,
    diff summaries, or a brief rationale explaining how acceptance
    criteria were met. Evidence MUST be reproducible by a human
    reviewer.
6.  **Peer or human review available.** For high‑impact changes, the
    agent MUST request a human review. The reviewer’s approval, along
    with any feedback, MUST be captured in the change log entry.

Only when all of the above conditions are met may the agent mark the
task as done. If any condition cannot be satisfied, the agent MUST halt
and request assistance or additional documentation.

## 4 Change‑tracking requirements

To maintain a transparent record of how Importal evolves, a separate
change‑log file (`change_log.md`) MUST be maintained. Agents MUST not
overwrite or delete existing entries. Each change entry MUST include the
following fields:

- **Date** – The calendar date (ISO‑8601) when the change was made.
- **Author or agent** – The identity of the person or agent making the
  change.
- **Summary** – A concise description of what changed. Use bullet points
  if multiple items were modified.
- **Rationale** – A brief explanation of *why* the change was necessary,
  referencing the higher‑tier document or spec that authorised it. Avoid
  subjective commentary.
- **Affected documents** – A list of file names and, if helpful, section
  headings that were created, modified or removed.

Entries SHOULD be grouped under headings corresponding to major phases
(e.g. “Phase 1”, “Phase 2”) for clarity. An empty header for the current
phase MUST exist even when no changes have been made yet. The change log
itself is a tier‑4 implementation document: it MUST not introduce new
requirements or override any authority; it simply records history.

## 5 Using this contract

This Phase 0 contract is itself a specification within the
Authority & Scope tier. Future agents MUST load and follow it before
making any modifications to Importal documentation. It may only be
amended by explicit directive from a higher authority (e.g. a revision
to the Authority Hierarchy or the external Best Practices document). Any
changes to this contract MUST be logged in the change log with full
rationale.

Agents and human contributors should treat this document as a checklist.
Before beginning a task, verify the authority hierarchy, scope and stop
signs. During execution, follow the mandates and stop if any trigger
occurs. Upon completion, perform the verification steps and record the
change. By adhering to these rules, we preserve the integrity of
Importal’s documentation and ensure safe, predictable collaboration
between humans and AI.

------------------------------------------------------------------------
