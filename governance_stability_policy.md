# Importal Maintenance & Drift‑Control Policy

This Phase 6 policy defines how the Importal documentation system
remains stable, auditable and authoritative over time. It is a normative
artefact governing when and how changes may occur, how drift is
detected, how audits are performed and what actions agents may perform
autonomously. All directives in this document use explicit **MUST** or
**MUST NOT** language and are binding on agents and human contributors.

## 1 Authorised Change Pathways

### 1.1 Who may propose changes

1.  Only designated documentation and coding agents **MAY** draft change
    proposals for artefacts within the scope of their current phase.
    Each proposal **MUST** include a written specification describing
    the problem, the affected artefacts, acceptance criteria and
    references to higher‑tier sources.
2.  Human contributors **MAY** suggest changes through issues or
    feedback, but these suggestions **MUST** be formalised by an agent
    into a specification before work begins.

### 1.2 Who may approve changes

1.  Human project maintainers or other individuals vested with authority
    by the Phase 0 contract **MUST** approve any modification to
    normative artefacts, including the Authority & Operating Contract,
    immutable constraints, the global stop‑sign index, the phase
    execution model, the canonical glossary, the spec classification &
    mapping, and this maintenance policy.
2.  Agents **MAY NOT** self‑approve changes that alter semantics, scope
    or constraints. They **MAY** self‑approve purely editorial
    corrections (typographical errors or formatting) in lower‑tier
    documents provided that the meaning and authority of the document
    remain unchanged. All such changes **MUST** still follow the change
    mechanics defined in Section 3.

### 1.3 Phase‑specific change permissions

1.  Artefacts produced in a given phase **MAY** be amended only within
    that same phase or a later assimilation phase that explicitly allows
    updates. For example, immutable constraints **MAY** be updated only
    when new authoritative sources (e.g. the Foundation Document or
    Authority & Scope specifications) introduce or refine constraints.
    The stop‑sign index **MAY** be updated only when new stop triggers
    are defined by higher‑tier documents.
2.  No document **MAY** be altered outside its designated phase without
    an explicit trigger (Section 2) and approval from the appropriate
    authority.

### 1.4 Frozen artefacts

1.  The Authority & Operating Contract is frozen after Phase 0.
    Amendments **MUST** come from a higher‑tier directive and require
    human approval.
2.  Immutable constraints (IC‑x) extracted in Phase 1 are frozen until
    new authoritative documents warrant updates. They **MUST NOT** be
    removed or weakened.
3.  The global stop‑sign index (SS‑xx) compiled in Phase 2 is frozen;
    additions or modifications **MUST** originate from higher‑tier
    documents and follow mandatory change mechanics.
4.  The phase execution model defined in Phase 3 is frozen except when
    new phases are added by higher‑tier sources. Reordering or skipping
    phases is prohibited.
5.  The canonical glossary and spec classification & mapping documents
    produced in Phases 4 and 5 are frozen except for updates triggered
    by new authoritative definitions or newly available specifications.
6.  This maintenance & drift‑control policy is itself frozen. Amendments
    **MUST** follow the change triggers and approval processes outlined
    in Sections 1 and 2 and require explicit human approval.

## 2 Change Triggers

A change to any artefact is permitted only when one or more of the
following conditions is met:

1.  **New authoritative documents** become available, such as the
    Foundation Document, Authority & Scope specifications, core concept
    specifications or implementation‑level specifications. Assimilation
    of these documents in later phases **MUST** update affected
    artefacts to reflect new constraints, stop signs, glossary terms or
    process rules.
2.  **Explicit scope expansion or product‑intent revisions** are issued
    by the project owner or captured in a higher‑tier specification.
    Agents **MUST NOT** expand scope on their own; they require
    documented approval.
3.  **Discovery of contradiction or drift** between artefacts or between
    an artefact and its governing document. Spec drift or semantic drift
    **MUST** trigger a halt under SS‑04 and subsequent updates to
    restore alignment once approved.
4.  **Security, legal or safety events** necessitate changes to
    constraints, stop‑signs or processes to maintain compliance. Such
    events **MUST** be documented and approved by human authorities.
5.  In all other cases, no change is permitted. Agents **MUST NOT**
    modify any artefact unless at least one of the above triggers is
    present and properly authorised.

## 3 Mandatory Change Mechanics

### 3.1 Change‑log entry

1.  Every change to a documentation artefact **MUST** result in a new
    entry appended to `change_log.md`. Past entries **MUST NEVER** be
    altered or deleted.
2.  Each entry **MUST** include: the ISO‑8601 date; the author or agent;
    a concise summary of what changed; a rationale citing the
    higher‑tier source or trigger authorising the change; and a list of
    affected documents.

### 3.2 Required metadata

1.  Change proposals and log entries **MUST** reference the relevant
    phase, the specific trigger from Section 2, any applicable immutable
    constraints (IC‑x), stop‑signs (SS‑xx) or glossary terms, and
    citations to authoritative documents.
2.  If a change introduces a new version of an artefact, the version
    identifier (e.g. “v2”) **MUST** be stated in the proposal and the
    change log.

### 3.3 No retroactive edits

1.  Once an artefact is published and recorded in the change log, its
    historical versions **MUST** remain unchanged. Corrections or
    updates **MUST** be made in a new file or version, leaving the
    original intact.
2.  The change log **MUST** preserve the chronological order of entries.
    Editing or reordering entries is forbidden.

### 3.4 Superseded artefacts

1.  When a new version of a document supersedes an earlier version, the
    earlier file **MUST** be archived in the repository and referenced
    in the change log. Deleting superseded artefacts is prohibited.
2.  Cross‑references in other documents **MAY** be updated to point to
    the latest version, but annotations **MUST** preserve original
    context (for example, by noting the superseded filename).

## 4 Drift Detection Signals

The following signals indicate potential drift and **MUST** be
monitored. When any signal is detected, agents **MUST** halt and follow
the mandatory next action specified in the relevant stop‑sign
definition.

1.  **Spec drift:** A lower‑tier document diverges from its governing
    higher‑tier specification (for example, an implementation
    specification contradicts an immutable constraint) or multiple
    documents of the same tier describe a concept inconsistently.
    Detection of spec drift triggers SS‑04 (Spec drift detection).
2.  **Semantic drift:** Terms are used inconsistently or with altered
    meanings relative to the canonical glossary. Introduction of new
    terminology without glossary updates or use of synonyms that weaken
    definitions indicates drift and triggers SS‑03 (Ambiguous
    terminology).
3.  **Authority mismatch:** An artefact introduces requirements, scope
    or constraints exceeding its authority level or conflicts with the
    authority hierarchy defined in Phase 0. This condition triggers
    SS‑02 (Conflicting instructions) and SS‑10 (Violation of
    guardrails).
4.  **Stale artefacts:** Documents that have not been reviewed or
    updated after assimilation of new authoritative sources remain
    stale. Artefacts referencing missing documents or outdated versions
    flagged by the spec classification & mapping signal SS‑01 (Missing
    authority) or SS‑13 (Unknown or unverified information).
5.  **Environment mismatch:** File names, formats or locations
    referenced in documentation do not match the actual repository (for
    example, referencing `immutable_constraints.md` when only
    `Immutable constraints extraction.docx` exists). Such mismatches
    indicate drift and **MUST** be recorded. Agents **MUST NOT** rename
    files unilaterally but **MUST** flag the inconsistency for
    resolution.

## 5 Audit Cadence and Scope

### 5.1 Frequency

1.  A comprehensive maintenance audit **MUST** be performed at the
    completion of each phase and at least every three calendar months
    thereafter.
2.  Additional audits **MAY** be initiated when new authoritative
    documents are assimilated or when drift signals are detected.

### 5.2 Scope

1.  Audits **MUST** review all normative artefacts: the Phase 0
    Authority & Operating Contract, immutable constraints (Phase 1), the
    global stop‑sign index (Phase 2), the phase execution model
    (Phase 3), the canonical glossary (Phase 4), the spec classification
    & mapping (Phase 5), this maintenance policy (Phase 6), and any
    assimilated specifications from later phases.
2.  Audits **MUST** verify that each artefact aligns with its governing
    documents, that cross‑references and filenames match repository
    contents, that the change log contains all recorded changes, and
    that no unauthorised modifications have occurred.

### 5.3 Outputs

1.  Each audit **MUST** produce a dated audit report summarising
    reviewed artefacts, detected drift signals, unresolved issues and
    recommended actions. The report **MUST** be stored in the repository
    under an `audits/` directory and referenced in `change_log.md`.
2.  If no drift or issues are found, the audit report **MUST** state
    this explicitly.

### 5.4 Consequences of audit failure

1.  If an audit identifies drift or unauthorised changes, SS‑04 (Spec
    drift detection) or other applicable stop signs **MUST** be
    triggered. Work **MUST** stop until issues are resolved through
    approved changes.
2.  Repeated audit failures or unaddressed drift signals **MUST** be
    escalated to human maintainers for investigation and may result in
    freezing further phases until compliance is restored.

## 6 Agent‑Specific Rules

### 6.1 Permitted autonomous actions

1.  Agents **MAY** run drift‑detection checks, cross‑reference filenames
    and compare document versions to detect inconsistencies.
2.  Agents **MAY** propose minor editorial corrections (typographical
    fixes or formatting adjustments) that do not alter meaning or
    authority. Such proposals **MUST** still follow the change mechanics
    and be logged in the change log.
3.  Agents **MAY** append change log entries and audit reports as
    required by this policy.

### 6.2 Required human approval

1.  Any change that alters the semantics, scope or constraints of a
    normative artefact; adds, removes or merges documents; introduces
    new stop signs or modifies existing ones; or updates this policy
    **MUST** receive explicit human approval.
2.  Implementation of high‑impact decisions (as defined in SS‑08) always
    requires a human in the loop.

### 6.3 Mandatory halting conditions

1.  Agents **MUST** halt and request guidance whenever a drift detection
    signal is triggered, a global stop sign is met, or required
    authoritative sources are missing.
2.  Agents **MUST NOT** attempt to bypass or resolve these conditions
    without approval. They **MUST** document the issue in the change log
    and await resolution.

## 7 Authority and Amendments

1.  This maintenance & drift‑control policy is a normative Phase 6
    artefact. It inherits authority from the Phase 0 contract and the
    phase execution model. It governs time‑related maintenance actions
    across all subsequent phases.
2.  Amendments to this policy **MAY** occur only when new higher‑tier
    documents explicitly mandate changes to maintenance or time‑control
    processes or when a human authority issues a directive. Any
    amendment **MUST** follow the change triggers and mechanics defined
    in this document and be recorded in the change log.
3.  Agents **MUST** treat this policy as binding. Deviation constitutes
    a violation of SS‑10 (Violation of guardrails) and triggers halting
    under the global stop‑sign index.

------------------------------------------------------------------------
